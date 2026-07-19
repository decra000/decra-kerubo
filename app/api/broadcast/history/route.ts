export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { checkAdminPassword } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const denied = await checkAdminPassword(req);
  if (denied) return denied;

  try {
    const db = supabaseAdmin();
    // A failed attempt never actually reached anyone, so it doesn't belong in
    // history (also filters out rows from before sends stopped being logged
    // on failure).
    const { data, error } = await db
      .from("broadcasts")
      .select("email, company, subject, status, created_at")
      .neq("status", "failed")
      .order("created_at", { ascending: false })
      .limit(1000);

    if (error) throw error;

    const rows = data || [];
    const uniqueEmails = new Set(rows.filter(r => r.status === "sent").map(r => r.email.toLowerCase()));

    return NextResponse.json({
      rows,
      summary: {
        totalSent: rows.filter(r => r.status === "sent").length,
        totalSkipped: rows.filter(r => r.status === "skipped").length,
        uniqueRecipientsContacted: uniqueEmails.size,
      },
    });
  } catch (err) {
    console.error("Broadcast history fetch error:", err);
    const message = err instanceof Error ? err.message : "Failed to load history";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
