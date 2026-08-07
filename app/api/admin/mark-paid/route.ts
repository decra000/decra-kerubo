export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { checkAdminPassword } from "@/lib/adminAuth";
import { sendBookingConfirmedEmail } from "@/lib/booking";

// Confirms a booking from the admin dashboard: the "Confirm" button on a
// pending meeting request, and "Mark paid" on manual M-Pesa/bank bookings
// once Decra has checked the payment landed. Both move the booking to
// confirmed and send the client the confirmation they were promised when
// their request was acknowledged. Uses the service-role client (bypasses
// RLS), so it's gated by the same admin password as the rest of /admin.
export async function POST(req: NextRequest) {
  const denied = await checkAdminPassword(req);
  if (denied) return denied;

  try {
    const { id, amount_paid } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing booking id." }, { status: 400 });

    const db = supabaseAdmin();
    const { data, error } = await db
      .from("bookings")
      .update({ status: "confirmed", ...(amount_paid != null ? { amount_paid } : {}) })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    // Best-effort: the status change is the source of truth, a mail hiccup
    // shouldn't make the confirmation look like it failed.
    if (data) {
      const mailed = await sendBookingConfirmedEmail(data);
      if (!mailed.ok) console.error("Confirmation email failed for booking", id, mailed.error);
      return NextResponse.json({ success: true, booking: data, emailed: mailed.ok });
    }
    return NextResponse.json({ success: true, booking: data });
  } catch (err) {
    console.error("Mark-paid error:", err);
    return NextResponse.json({ error: "Could not update booking." }, { status: 500 });
  }
}
