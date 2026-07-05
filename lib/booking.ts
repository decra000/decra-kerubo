import { supabaseAdmin } from "@/lib/supabase";
import { sendMail } from "@/lib/mail";

export type BookingInput = {
  name: string;
  email: string;
  organization?: string;
  website?: string;
  industry?: string;
  team_size?: string;
  primary_challenge: string;
  desired_outcome: string;
  consultation_type: string;
  scheduled_at: string; // full ISO timestamp, e.g. 2026-07-10T09:00:00+03:00
  amount?: number;
  payment_reference?: string;
  payment_method?: "paystack" | "manual";
};

export type BookingResult =
  | { ok: true; booking: unknown; status: string }
  | { ok: false; error: string; httpStatus: number };

/**
 * Inserts a booking (and best-effort lead + confirmation email), shared by
 * the /book page flow and the chat assistant's booking tool. Payment
 * verification for paid consultation types is the caller's responsibility —
 * this function assumes `amount`/`status` have already been resolved.
 */
export async function createBooking(input: BookingInput): Promise<BookingResult> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { ok: false, error: "Booking is temporarily unavailable (server not configured).", httpStatus: 500 };
  }
  if (!input.name || !input.email || !input.consultation_type || !input.scheduled_at) {
    return { ok: false, error: "Missing required booking details.", httpStatus: 400 };
  }
  if (isNaN(new Date(input.scheduled_at).getTime())) {
    return { ok: false, error: "Invalid date/time.", httpStatus: 400 };
  }

  const amount = input.amount || 0;
  const status = amount > 0 && input.payment_method === "manual" ? "pending_payment" : "confirmed";

  const db = supabaseAdmin();
  const { data: booking, error } = await db
    .from("bookings")
    .insert({
      name: input.name, email: input.email, organization: input.organization,
      website: input.website, industry: input.industry, team_size: input.team_size,
      primary_challenge: input.primary_challenge, desired_outcome: input.desired_outcome,
      consultation_type: input.consultation_type, scheduled_at: input.scheduled_at, status,
      amount_paid: status === "pending_payment" ? 0 : amount,
      payment_reference: input.payment_reference || null,
      payment_method: amount > 0 ? (input.payment_method === "manual" ? "manual" : "paystack") : null,
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error (bookings):", error);
    return { ok: false, error: `Booking failed: ${error.message}`, httpStatus: 500 };
  }

  const { error: leadError } = await db.from("leads").insert({
    name: input.name, email: input.email, organization: input.organization, source: "booking",
  });
  if (leadError) console.error("Supabase insert error (leads):", leadError);

  const pendingPayment = status === "pending_payment";
  await sendMail({
    to: input.email,
    subject: pendingPayment
      ? `Booking received — awaiting payment confirmation (${input.consultation_type})`
      : `Consultation confirmed — ${input.consultation_type}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #222;">
        <h1 style="color: #0F4D3F; font-size: 28px;">${pendingPayment ? "Booking received — payment pending." : "Your consultation is confirmed."}</h1>
        <p>Hi ${input.name},</p>
        <p>Your <strong>${input.consultation_type}</strong> consultation is booked for:</p>
        <p><strong>Date:</strong> ${input.scheduled_at}</p>
        ${pendingPayment
          ? `<p>We've noted your M-Pesa/bank reference (<strong>${input.payment_reference || "none provided"}</strong>) and will confirm the slot as soon as the payment is verified — usually within a few hours.</p>`
          : (amount > 0 ? `<p><strong>Amount paid:</strong> KES ${Number(amount).toLocaleString("en-KE")} (ref: ${input.payment_reference})</p>` : "")}
        <p>I'll send a Google Meet link shortly. In the meantime, feel free to reply to this email with any questions.</p>
        <p style="margin-top: 40px;">— Decra Kerubo</p>
      </div>
    `,
  });

  // Internal notification so Decra sees it land in her own inbox too.
  const internalTo = process.env.CONTACT_EMAIL || "hello@decrakerubo.com";
  await sendMail({
    to: internalTo,
    replyTo: input.email,
    subject: `New booking: ${input.name} — ${input.consultation_type}`,
    text: `${input.name} (${input.email}) booked ${input.consultation_type} for ${input.scheduled_at}.\n\nChallenge: ${input.primary_challenge}\nDesired outcome: ${input.desired_outcome}\nOrganization: ${input.organization || "—"}`,
  });

  return { ok: true, booking, status };
}
