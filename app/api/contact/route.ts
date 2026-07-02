import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

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

    const TO_EMAIL = process.env.CONTACT_EMAIL || "hello@decrakerubo.com";

    // Internal notification — to Decra
    await sendMail({
      to: TO_EMAIL,
      replyTo: email || TO_EMAIL,
      subject: `${subject || "New message"} — from ${name || "Anonymous"}`,
      text: body,
    });

    // Immediate auto-reply — to the sender
    if (email) {
      await sendMail({
        to: email,
        subject: `Got it, ${name || "there"} — thank you for reaching out`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #222;">
            <h1 style="color: #0F4D3F; font-size: 26px;">Thank you for reaching out.</h1>
            <p>Hi ${name || "there"},</p>
            <p>This confirms your message has been received.</p>
            <p>Decra reviews every message personally and will be in touch within <strong>48 hours</strong>.</p>
            <p>If anything changes in the meantime, just reply directly to this email.</p>
            <p style="margin-top: 40px;">— Decra Kerubo</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
