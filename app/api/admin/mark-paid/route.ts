export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { checkAdminPassword } from "@/lib/adminAuth";

// Used by the admin dashboard's "Mark Paid" button on manual M-Pesa/bank
// bookings, moves a booking from pending_payment to confirmed once Decra
// has checked the payment landed. Uses the service-role client (bypasses
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
    return NextResponse.json({ success: true, booking: data });
  } catch (err) {
    console.error("Mark-paid error:", err);
    return NextResponse.json({ error: "Could not update booking." }, { status: 500 });
  }
}
