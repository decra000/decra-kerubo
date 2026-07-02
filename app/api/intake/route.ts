import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

const ENGAGEMENT_LABELS: Record<string, string> = {
  speak: "Speaking engagement",
  compliance: "Compliance review",
  startup: "Start a business",
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

  await sendMail({
    to: TO_EMAIL,
    replyTo: email || TO_EMAIL,
    subject: `New ${label}: ${name || "Anonymous"}${stage ? ` — ${stage}` : ""}`,
    text: body,
  });

  // Always return success to client — don't block on email
  return NextResponse.json({ ok: true });
}
