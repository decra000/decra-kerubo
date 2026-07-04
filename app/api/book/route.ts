export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendMail } from "@/lib/mail";

// Verifies a Paystack transaction reference server-side — never trust the
// amount/status reported by the client alone. Free (no monthly fee),
// pay-as-you-go; see https://paystack.com/ke/pricing.
async function verifyPaystackPayment(reference: string, expectedAmountKES: number) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) throw new Error("Paystack is not configured (missing PAYSTACK_SECRET_KEY).");

  const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secretKey}` },
  });
  const data = await res.json();
  const tx = data?.data;

  if (!res.ok || !tx || tx.status !== "success") {
    throw new Error("Payment could not be verified.");
  }
  // Paystack amounts are in the lowest currency unit (cents).
  if (Math.round(tx.amount) !== Math.round(expectedAmountKES * 100)) {
    throw new Error("Payment amount does not match the selected consultation.");
  }
  if ((tx.currency || "").toUpperCase() !== "KES") {
    throw new Error("Payment currency mismatch.");
  }
  return tx;
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Booking error: Supabase is not configured (missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY).");
      return NextResponse.json({ error: "Booking is temporarily unavailable (server not configured). Please email hello@decrakerubo.com to book directly." }, { status: 500 });
    }

    const body = await req.json();
    const {
      name, email, organization, website, industry, team_size,
      primary_challenge, desired_outcome, consultation_type, scheduled_at,
      amount, payment_reference, payment_method,
    } = body;

    if (!name || !email || !consultation_type || !scheduled_at) {
      return NextResponse.json({ error: "Missing required booking details." }, { status: 400 });
    }
    if (isNaN(new Date(scheduled_at).getTime())) {
      return NextResponse.json({ error: "Invalid date/time selected." }, { status: 400 });
    }

    let status = "confirmed";

    if (amount > 0) {
      if (payment_method === "manual") {
        // No processor configured — the person paid (or will pay) directly
        // via M-Pesa/bank and self-reported a reference. Booking goes in as
        // "pending_payment" until confirmed by hand in the admin dashboard.
        status = "pending_payment";
      } else {
        // Paystack path — must carry a verified reference before this booking
        // is ever written to the database as "confirmed".
        if (!payment_reference) {
          return NextResponse.json({ error: "Payment reference missing." }, { status: 400 });
        }
        try {
          await verifyPaystackPayment(payment_reference, amount);
        } catch (verifyErr) {
          console.error("Payment verification failed:", verifyErr);
          return NextResponse.json({ error: "We couldn't verify your payment. If you were charged, email hello@decrakerubo.com with your reference number." }, { status: 402 });
        }
      }
    }

    const db = supabaseAdmin();

    // Store booking in Supabase
    const { data: booking, error } = await db
      .from("bookings")
      .insert({
        name, email, organization, website, industry, team_size,
        primary_challenge, desired_outcome, consultation_type,
        scheduled_at, status,
        amount_paid: status === "pending_payment" ? 0 : (amount || 0),
        payment_reference: payment_reference || null,
        payment_method: amount > 0 ? (payment_method === "manual" ? "manual" : "paystack") : null,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error (bookings):", error);
      return NextResponse.json({ error: `Booking failed: ${error.message}` }, { status: 500 });
    }

    // Store as lead — best-effort, shouldn't fail the booking if this errors
    const { error: leadError } = await db.from("leads").insert({
      name, email, organization, source: "booking",
    });
    if (leadError) console.error("Supabase insert error (leads):", leadError);

    // Send confirmation email via Gmail — best-effort, sendMail never throws
    const pendingPayment = status === "pending_payment";
    await sendMail({
      to: email,
      subject: pendingPayment
        ? `Booking received — awaiting payment confirmation (${consultation_type})`
        : `Consultation confirmed — ${consultation_type}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #222;">
          <h1 style="color: #0F4D3F; font-size: 28px;">${pendingPayment ? "Booking received — payment pending." : "Your consultation is confirmed."}</h1>
          <p>Hi ${name},</p>
          <p>Your <strong>${consultation_type}</strong> consultation is booked for:</p>
          <p><strong>Date:</strong> ${scheduled_at}</p>
          ${pendingPayment
            ? `<p>We've noted your M-Pesa/bank reference (<strong>${payment_reference || "none provided"}</strong>) and will confirm the slot as soon as the payment is verified — usually within a few hours.</p>`
            : (amount > 0 ? `<p><strong>Amount paid:</strong> KES ${Number(amount).toLocaleString("en-KE")} (ref: ${payment_reference})</p>` : "")}
          <p>I'll send a Google Meet link shortly. In the meantime, feel free to reply to this email with any questions.</p>
          <p style="margin-top: 40px;">— Decra Kerubo</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, booking, meet_link: null, status });
  } catch (err) {
    console.error("Booking error:", err);
    const message = err instanceof Error ? err.message : "Booking failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
