import nodemailer from "nodemailer";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (transporter) return transporter;
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
  return transporter;
}

export async function sendMail(opts: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
}) {
  const t = getTransporter();
  if (!t) {
    console.error("Email skipped — GMAIL_USER / GMAIL_APP_PASSWORD not set");
    return { ok: false };
  }
  try {
    await t.sendMail({
      from: `Decra Kerubo <${process.env.GMAIL_USER}>`,
      to: opts.to,
      replyTo: opts.replyTo,
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
    });
    return { ok: true };
  } catch (err) {
    console.error("Gmail send failed:", err);
    return { ok: false, error: err };
  }
}
