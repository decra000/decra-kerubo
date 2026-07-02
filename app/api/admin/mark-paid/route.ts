export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// Used by the admin dashboard's "Mark Paid" button on manual M-Pesa/bank
// bookings — moves a booking from pending_payment to confirmed once Decra
// has checked the payment landed. This uses the service-role client, so it
// bypasses RLS; make sure /admin itself is access-gated (see SETUP_GUIDE.md
// Step 8) before relying on this in production.
export async function POST(req: NextRequest) {
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
    return NextResponse.json({ success: true, booking: data });
  } catch (err) {
    console.error("Mark-paid error:", err);
    return NextResponse.json({ error: "Could not update booking." }, { status: 500 });
  }
}
