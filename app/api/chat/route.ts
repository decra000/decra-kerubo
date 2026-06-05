import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a concise, warm assistant for Decra — a Nairobi-based legal and tech advisory practice run by Decra Kerubo (LLB + BSc Computer Science).

Your job: help visitors quickly understand if and how Decra can help them, then guide them to book a call or send a message.

About Decra's work:
- Tech Policy & Startup Law: IP protection, data privacy compliance, tech contracts, regulatory mapping — for companies with products.
- Founder Legal: company incorporation, equity & vesting, co-founder agreements, fundraising readiness — for founders building companies.
- The 1000: tech harm research and policy advocacy (non-commercial).
- AI Engineering: delivered through Entrora Systems (entrorasystems.com).

Key facts: Based in Nairobi, Kenya. Operates across East Africa and globally. Discovery calls are free (15 min).

Rules:
- Keep answers SHORT — 2-3 sentences max unless asked for detail.
- Be direct: tell people which track applies to their situation.
- If someone is unsure, ask one clarifying question.
- Never invent specific pricing or timelines.
- If it's clearly outside Decra's scope, say so honestly.
- End with a gentle nudge to book a call or send a message when appropriate.`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const apiMessages = messages.map((m: { role: string; text: string }) => ({
    role: m.role,
    content: m.text,
  }));

  const res = await fetch("https://models.github.ai/inference/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-4.1-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...apiMessages],
      max_tokens: 300,
      temperature: 0.7,
    }),
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || "Something went wrong — please email hello@decrakero.com.";

  return NextResponse.json({ reply });
}
