export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const password = req.headers.get("x-broadcast-password") || "";
  const expected = process.env.BROADCAST_PASSWORD;
  if (!expected) {
    return NextResponse.json({ error: "Broadcast is not configured (missing BROADCAST_PASSWORD env var)." }, { status: 500 });
  }
  if (password !== expected) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  try {
    const db = supabaseAdmin();
    const { data, error } = await db
      .from("broadcasts")
      .select("email, company, subject, status, created_at")
      .order("created_at", { ascending: false })
      .limit(1000);

    if (error) throw error;

    const rows = data || [];
    const uniqueEmails = new Set(rows.filter(r => r.status === "sent").map(r => r.email.toLowerCase()));

    return NextResponse.json({
      rows,
      summary: {
        totalSent: rows.filter(r => r.status === "sent").length,
        totalFailed: rows.filter(r => r.status === "failed").length,
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
