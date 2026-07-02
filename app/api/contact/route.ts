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

    await sendMail({
      to: TO_EMAIL,
      replyTo: email || TO_EMAIL,
      subject: `${subject || "New message"} — from ${name || "Anonymous"}`,
      text: body,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
