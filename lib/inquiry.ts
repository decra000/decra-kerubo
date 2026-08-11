import { sendMail } from "@/lib/mail";
import { supabaseAdmin } from "@/lib/supabase";

export type InquiryInput = {
  name: string;
  email: string;
  organization?: string;
  summary: string;
  source?: string;
};

/**
 * Logs a lead and notifies Decra immediately, plus sends the person a
 * confirmation — the same flow /api/intake performs, factored out so the
 * chat assistant's tool call can do the exact same real thing instead of
 * just telling someone to fill out a form elsewhere.
 */
export async function submitInquiry(input: InquiryInput) {
  if (!input.name || !input.email || !input.summary) {
    return { ok: false, error: "Missing name, email, or summary." };
  }

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const db = supabaseAdmin();
      const { error } = await db.from("leads").insert({
        name: input.name, email: input.email, organization: input.organization,
        source: input.source || "chat",
      });
      if (error) console.error("Supabase insert error (leads, chat inquiry):", error);
    }
  } catch (err) {
    console.error("submitInquiry Supabase error:", err);
  }

  const TO_EMAIL = process.env.CONTACT_EMAIL || "hello@decrakerubo.com";

  await sendMail({
    to: TO_EMAIL,
    replyTo: input.email,
    subject: `New inquiry via AI chat: ${input.name}`,
    text: `${input.name} (${input.email}), ${input.organization || "no organization given"}\n\n${input.summary}`,
  });

  await sendMail({
    to: input.email,
    subject: `Got it, ${input.name}, thank you for reaching out`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #222;">
        <h1 style="color: #0F4D3F; font-size: 26px;">Thank you for reaching out.</h1>
        <p>Hi ${input.name},</p>
        <p>This confirms your inquiry has been received.</p>
        <p style="background: #F5F4F1; padding: 16px 20px; border-radius: 8px; font-size: 14px; line-height: 1.6;"><strong>What you shared:</strong><br/>${input.summary}</p>
        <p>Decra reviews every inquiry personally and will be in touch within <strong>48 hours</strong>.</p>
        <p style="margin-top: 40px;">Decra Kerubo</p>
      </div>
    `,
  });

  return { ok: true };
}
