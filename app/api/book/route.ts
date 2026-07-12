export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/lib/booking";

// Verifies a Paystack transaction reference server-side, never trust the
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
    const body = await req.json();
    const {
      name, email, organization, website, industry, team_size,
      primary_challenge, desired_outcome, consultation_type, scheduled_at,
      amount, payment_reference, payment_method,
    } = body;

    if (amount > 0 && payment_method !== "manual") {
      // Paystack path, must carry a verified reference before this booking
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

    const result = await createBooking({
      name, email, organization, website, industry, team_size,
      primary_challenge, desired_outcome, consultation_type, scheduled_at,
      amount, payment_reference, payment_method,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.httpStatus });
    }
    return NextResponse.json({ success: true, booking: result.booking, meet_link: null, status: result.status });
  } catch (err) {
    console.error("Booking error:", err);
    // Don't leak raw exception text (e.g. "TypeError: fetch failed") to the person booking,
    // that's a signal to check server logs, not something a client should see verbatim.
    return NextResponse.json({ error: "We couldn't complete your booking just now, this is usually temporary. Please try again in a minute, or email hello@decrakerubo.com and we'll get you sorted." }, { status: 500 });
  }
}
