import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
import { ATPRC_DIVISIONS } from "@/lib/atprc";

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: NextRequest) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people never see or fill this field.
  if (clip(data.company_url, 200)) return NextResponse.json({ ok: true });

  const name = clip(data.name, 120);
  const email = clip(data.email, 200);
  const startup = clip(data.startup, 160);
  const website = clip(data.website, 300);
  const country = clip(data.country, 80);
  const stage = clip(data.stage, 80);
  const division = clip(data.division, 80);
  const product = clip(data.product, 2000);
  const question = clip(data.question, 3000);

  if (!name || !startup || !product || !question || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please complete all required fields." }, { status: 400 });
  }
  const divisionLabel = ATPRC_DIVISIONS.find((d) => d.id === division)?.label;
  if (!divisionLabel) {
    return NextResponse.json({ ok: false, error: "Please choose a division." }, { status: 400 });
  }
  if (data.consent !== true) {
    return NextResponse.json({ ok: false, error: "Consent is required to submit." }, { status: 400 });
  }

  const TO_EMAIL = process.env.CONTACT_EMAIL || "decrakerry@gmail.com";

  const internal = await sendMail({
    to: TO_EMAIL,
    replyTo: email,
    subject: `ATPRC application: ${startup} (${divisionLabel})`,
    text: [
      "New ATPRC application from decrakerubo.com/atprc",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Startup: ${startup}`,
      `Website: ${website || "Not provided"}`,
      `Country: ${country || "Not provided"}`,
      `Stage: ${stage || "Not provided"}`,
      `Division: ${divisionLabel}`,
      "",
      "What the product does:",
      product,
      "",
      "What they want reviewed:",
      question,
    ].join("\n"),
  });

  await sendMail({
    to: email,
    subject: "Your ATPRC application has been received",
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #222;">
        <h1 style="color: #0F4D3F; font-size: 26px;">Application received.</h1>
        <p>Hi ${esc(name)},</p>
        <p>This confirms that ${esc(startup)} has applied to the African Tech Product Risk Clinic under <strong>${esc(divisionLabel)}</strong>.</p>
        <p>Applications are reviewed each quarter. You will hear from Decra directly once your application has been considered.</p>
        <p style="margin-top: 40px;">Decra</p>
      </div>
    `,
  });

  if (!internal.ok) {
    return NextResponse.json({ ok: false, error: "We could not send your application. Please try again shortly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
