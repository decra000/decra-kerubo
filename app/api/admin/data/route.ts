export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { checkAdminPassword } from "@/lib/adminAuth";

/**
 * Single data feed for the /admin dashboard: bookings, leads, subscribers.
 *
 * Password-gated via lib/adminAuth (same pattern as /api/broadcast/history)
 * and read with the service-role key, so the public anon key never needs
 * SELECT access to these tables — the browser doesn't touch Supabase for
 * admin data at all.
 */
export async function GET(req: NextRequest) {
  const denied = checkAdminPassword(req);
  if (denied) return denied;

  try {
    const db = supabaseAdmin();
    const [bookings, leads, subscribers] = await Promise.all([
      db.from("bookings").select("*").order("scheduled_at", { ascending: false }).limit(500),
      db.from("leads").select("*").order("created_at", { ascending: false }).limit(500),
      db.from("subscribers").select("*").order("created_at", { ascending: false }).limit(500),
    ]);

    if (bookings.error) throw bookings.error;

    return NextResponse.json({
      bookings: bookings.data || [],
      leads: leads.data || [],
      subscribers: subscribers.data || [],
    });
  } catch (err) {
    console.error("Admin data fetch error:", err);
    const message = err instanceof Error ? err.message : "Failed to load admin data";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
