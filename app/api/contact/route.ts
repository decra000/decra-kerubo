import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, org, subject, message } = data;

    const body = `
New message from decrakerubo.com

Name: ${name || "Not provided"}
Email: ${email || "Not provided"}
Organisation: ${org || "Not provided"}
Subject: ${subject || "General enquiry"}

Message:
${message || "No message"}
    `.trim();

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
          from: "contact@decrakerubo.com",
          to: [TO_EMAIL],
          reply_to: email || TO_EMAIL,
          subject: `${subject || "New message"} — from ${name || "Anonymous"}`,
          text: body,
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
