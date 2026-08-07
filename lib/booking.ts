import { supabaseAdmin } from "@/lib/supabase";
import { sendMail } from "@/lib/mail";
import { CONSULTATION_TYPES } from "@/lib/types";

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
 * Inserts a booking (and best-effort lead + acknowledgement email), shared
 * by the /book page flow and the chat assistant's request tool. Payment
 * verification for paid consultation types is the caller's responsibility —
 * this function assumes `amount` has already been resolved.
 *
 * Nothing booked here is ever auto-confirmed: a submission is a *request*
 * for a slot, and it sits at `pending` until Decra confirms it by hand in
 * /admin. The visitor is told their request is being processed, and Decra
 * gets an action-required email so she doesn't have to keep checking the
 * portal to notice one landed.
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
  // `pending_payment` still means "money not verified yet"; everything else
  // lands on `pending`, i.e. the slot is requested but not yet confirmed.
  const status = amount > 0 && input.payment_method === "manual" ? "pending_payment" : "pending";

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
  const requestedFor = new Date(input.scheduled_at).toLocaleString("en-KE", {
    dateStyle: "full", timeStyle: "short", timeZone: "Africa/Nairobi",
  });

  await sendMail({
    to: input.email,
    subject: `Request received — we're processing it (${input.consultation_type})`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #222;">
        <h1 style="color: #0F4D3F; font-size: 28px;">Your request is being processed.</h1>
        <p>Hi ${input.name},</p>
        <p>Thank you — your request for a <strong>${input.consultation_type}</strong> consultation has been received and is now with Decra.</p>
        <p style="background: #F5F4F1; padding: 16px 20px; border-radius: 8px; font-size: 15px; line-height: 1.6;">
          <strong>Time requested:</strong> ${requestedFor} (Nairobi time)
        </p>
        <p><strong>This is not a confirmation yet.</strong> Decra reviews every request personally and will email you to confirm the slot — or propose the nearest alternative if that time isn't free.</p>
        ${pendingPayment
          ? `<p>We've also noted your M-Pesa/bank reference (<strong>${input.payment_reference || "none provided"}</strong>) and will verify the payment alongside your request.</p>`
          : (amount > 0 ? `<p><strong>Amount paid:</strong> KES ${Number(amount).toLocaleString("en-KE")} (ref: ${input.payment_reference})</p>` : "")}
        <p>Once the time is confirmed you'll get a Google Meet link. In the meantime, feel free to reply directly to this email with anything you'd like Decra to see beforehand.</p>
        <p style="margin-top: 40px;">— Decra Kerubo</p>
      </div>
    `,
  });

  // Internal notification so a request reaches Decra by email rather than
  // waiting to be noticed in /admin. Nothing is confirmed until she acts on
  // this, so it's written as an action-required alert, with a one-click
  // "add to Google Calendar" link for once she does confirm.
  const internalTo = process.env.CONTACT_EMAIL || "hello@decrakerubo.com";
  const typeInfo = CONSULTATION_TYPES.find(t => t.id === input.consultation_type);
  const start = new Date(input.scheduled_at);
  const end = new Date(start.getTime() + (typeInfo?.duration || 30) * 60_000);
  const gcalFmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const gcalParams = new URLSearchParams({
    action: "TEMPLATE",
    text: `${typeInfo?.label || input.consultation_type} — ${input.name}`,
    dates: `${gcalFmt(start)}/${gcalFmt(end)}`,
    details: `Booked via decrakerubo.com\nEmail: ${input.email}\nOrganization: ${input.organization || "—"}\nChallenge: ${input.primary_challenge}\nDesired outcome: ${input.desired_outcome}`,
  });
  const gcalUrl = `https://calendar.google.com/calendar/render?${gcalParams.toString()}`;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://decrakerubo.com";

  await sendMail({
    to: internalTo,
    replyTo: input.email,
    subject: `Action needed — meeting request from ${input.name} (${input.consultation_type})`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #222;">
        <p style="background: #FDF6E3; border-left: 4px solid #8A6D2B; padding: 12px 16px; font-size: 14px; margin-bottom: 24px;">
          <strong>This slot is not confirmed yet.</strong> ${input.name} has been told the request is being processed and that you'll confirm by email. Confirm it in the admin panel to send that confirmation.
        </p>
        <p><strong>${input.name}</strong> (${input.email}) requested <strong>${typeInfo?.label || input.consultation_type}</strong> for <strong>${start.toLocaleString("en-KE", { dateStyle: "full", timeStyle: "short", timeZone: "Africa/Nairobi" })}</strong> (Nairobi time).</p>
        <p>Status: ${status}${input.payment_reference ? ` · ref: ${input.payment_reference}` : ""}</p>
        <p>Challenge: ${input.primary_challenge || "—"}<br/>
        Desired outcome: ${input.desired_outcome || "—"}<br/>
        Organization: ${input.organization || "—"}</p>
        <p style="margin-top: 24px;">
          <a href="${siteUrl}/admin" style="background: #0F4D3F; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px;">Review &amp; confirm this request</a>
        </p>
        <p style="margin-top: 16px;">
          <a href="${gcalUrl}" style="color: #0F4D3F; font-size: 14px;">Add to Google Calendar</a>
          <span style="color: #999; font-size: 13px;"> — once you've confirmed the time.</span>
        </p>
      </div>
    `,
  });

  return { ok: true, booking, status };
}

/**
 * The confirmation the visitor was promised when their request was
 * acknowledged — sent when Decra confirms the slot in /admin, not before.
 */
export async function sendBookingConfirmedEmail(booking: {
  name: string;
  email: string;
  consultation_type: string;
  scheduled_at: string;
}) {
  const typeInfo = CONSULTATION_TYPES.find(t => t.id === booking.consultation_type);
  const when = new Date(booking.scheduled_at).toLocaleString("en-KE", {
    dateStyle: "full", timeStyle: "short", timeZone: "Africa/Nairobi",
  });

  return sendMail({
    to: booking.email,
    subject: `Confirmed — ${typeInfo?.label || booking.consultation_type} with Decra Kerubo`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #222;">
        <h1 style="color: #0F4D3F; font-size: 28px;">Your consultation is confirmed.</h1>
        <p>Hi ${booking.name},</p>
        <p>Your <strong>${typeInfo?.label || booking.consultation_type}</strong> is confirmed for:</p>
        <p style="background: #F5F4F1; padding: 16px 20px; border-radius: 8px; font-size: 15px; line-height: 1.6;">
          <strong>${when}</strong> (Nairobi time)
        </p>
        <p>I'll send the Google Meet link ahead of our time. If anything changes on your end, just reply to this email.</p>
        <p style="margin-top: 40px;">— Decra Kerubo</p>
      </div>
    `,
  });
}
