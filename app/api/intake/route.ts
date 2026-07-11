import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

const ENGAGEMENT_LABELS: Record<string, string> = {
  speak: "Speaking engagement",
  compliance: "Compliance review",
  startup: "Start a business",
  "tech-development": "Tech Development Services",
};

export async function POST(req: NextRequest) {
  const data = await req.json();

  const { engagement, name, email, summary, stage, ...rest } = data;
  const label = ENGAGEMENT_LABELS[engagement] || engagement || (stage ? "Startup intake" : "General inquiry");

  // Render any remaining structured fields (varies per engagement type)
  const detailLines = Object.entries({ stage, ...rest })
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${k.charAt(0).toUpperCase() + k.slice(1)}: ${v}`)
    .join("\n");

  const body = `
New ${label} inquiry from decrakerubo.com${engagement ? "/#collaborate" : "/start"}

Name: ${name || "Not provided"}
Email: ${email || "Not provided"}
${detailLines}

Summary:
${summary || "No summary generated"}
  `.trim();

  const TO_EMAIL = process.env.CONTACT_EMAIL || "hello@decrakerubo.com";

  // Internal notification — to Decra
  await sendMail({
    to: TO_EMAIL,
    replyTo: email || TO_EMAIL,
    subject: `New ${label}: ${name || "Anonymous"}${stage ? ` — ${stage}` : ""}`,
    text: body,
  });

  // Immediate auto-reply — to the client, before Decra personally responds
  if (email) {
    await sendMail({
      to: email,
      subject: `Got it, ${name || "there"} — thank you for reaching out`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #222;">
          <h1 style="color: #0F4D3F; font-size: 26px;">Thank you for reaching out.</h1>
          <p>Hi ${name || "there"},</p>
          <p>This confirms your ${label.toLowerCase()} inquiry has been received.</p>
          ${summary ? `<p style="background: #F5F4F1; padding: 16px 20px; border-radius: 8px; font-size: 14px; line-height: 1.6;"><strong>What you shared:</strong><br/>${summary}</p>` : ""}
          <p>Decra reviews every inquiry personally and will be in touch within <strong>48 hours</strong>.</p>
          <p>If anything changes in the meantime, just reply directly to this email.</p>
          <p style="margin-top: 40px;">— Decra Kerubo</p>
        </div>
      `,
    });
  }

  // Always return success to client — don't block on email
  return NextResponse.json({ ok: true });
}
