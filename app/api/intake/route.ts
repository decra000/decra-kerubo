import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const { name, email, stage, business, need, summary } = data;

  const body = `
New startup intake from decrakerubo.com/start

Name: ${name || "Not provided"}
Email: ${email || "Not provided"}
Stage: ${stage || "Not provided"}
Business: ${business || "Not provided"}
Main need: ${need || "Not provided"}

Summary:
${summary || "No summary generated"}
  `.trim();

  // Send via Resend (or fallback to fetch if not configured)
  const RESEND_KEY = process.env.RESEND_API_KEY;
  const TO_EMAIL = process.env.CONTACT_EMAIL || "hello@decrakerubo.com";

  if (RESEND_KEY) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_KEY}`,
      },
      body: JSON.stringify({
        from: "advisor@decrakerubo.com",
        to: [TO_EMAIL],
        reply_to: email || TO_EMAIL,
        subject: `New startup intake: ${name || "Anonymous"} — ${stage || "Unknown stage"}`,
        text: body,
      }),
    });
  }

  // Always return success to client — don't block on email
  return NextResponse.json({ ok: true });
}
