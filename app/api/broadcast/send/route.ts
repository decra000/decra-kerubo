export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
import { supabaseAdmin } from "@/lib/supabase";

type Recipient = { company: string; email: string; contact?: string };

// Replaces {{company}}, {{Company}}, {{contact}} etc. (case-insensitive) with
// the recipient's actual values. Falls back to leaving the token in place if
// no value is available, so a typo in the template is visible, not silently eaten.
function personalize(template: string, r: Recipient) {
  return template
    .replace(/\{\{\s*company\s*\}\}/gi, r.company || "")
    .replace(/\{\{\s*contact\s*\}\}/gi, r.contact || "")
    .replace(/\{\{\s*email\s*\}\}/gi, r.email || "");
}

export async function POST(req: NextRequest) {
  try {
    const password = req.headers.get("x-broadcast-password") || "";
    const expected = process.env.BROADCAST_PASSWORD;
    if (!expected) {
      return NextResponse.json({ error: "Broadcast is not configured (missing BROADCAST_PASSWORD env var)." }, { status: 500 });
    }
    if (password !== expected) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }

    const body = await req.json();
    const { subject, bodyHtml, recipients } = body as {
      subject: string; bodyHtml: string; recipients: Recipient[];
    };

    if (!subject || !bodyHtml || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json({ error: "Missing subject, body, or recipients." }, { status: 400 });
    }
    // Kept small on purpose — the client sends in batches so a single request
    // never risks hitting the serverless function's execution time limit.
    if (recipients.length > 15) {
      return NextResponse.json({ error: "Send in batches of 15 or fewer per request." }, { status: 400 });
    }

    const db = supabaseAdmin();
    const results: { email: string; company: string; ok: boolean; error?: string }[] = [];

    for (const r of recipients) {
      const to = (r.email || "").trim();
      if (!to) {
        results.push({ email: "", company: r.company, ok: false, error: "No email address" });
        continue;
      }
      const personalizedSubject = personalize(subject, r);
      const personalizedHtml = personalize(bodyHtml, r);

      const sent = await sendMail({ to, subject: personalizedSubject, html: personalizedHtml });
      results.push({ email: to, company: r.company, ok: !!sent.ok, error: sent.ok ? undefined : "Send failed — check Gmail credentials/quota." });

      // Best-effort audit log — never blocks the send.
      try {
        await db.from("broadcasts").insert({
          company: r.company || null,
          email: to,
          subject: personalizedSubject,
          status: sent.ok ? "sent" : "failed",
        });
      } catch (logErr) {
        console.error("Broadcast log insert failed:", logErr);
      }
    }

    return NextResponse.json({ results });
  } catch (err) {
    console.error("Broadcast send error:", err);
    const message = err instanceof Error ? err.message : "Broadcast failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
