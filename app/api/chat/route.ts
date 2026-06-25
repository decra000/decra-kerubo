import { NextRequest, NextResponse } from "next/server";

const DEFAULT_SYSTEM = `You are Decra Kerubo's AI advisor on her professional website decrakerubo.com.
Decra is a Nairobi-based lawyer and computer scientist offering:
1. Technology Law: IP protection, data privacy/ODPC compliance, tech contracts, regulatory mapping, startup law.
2. Founder Legal: company incorporation, equity & vesting, co-founder agreements, tax (eTIMS/KRA), fundraising readiness.
She also runs Entrora Systems for AI engineering work.

Help visitors identify which track fits their situation and guide them to book a discovery call or use the /start page.
Keep responses concise (2-4 sentences). Professional and warm. Never mention Anthropic, Claude, or AI models.`;

export async function POST(req: NextRequest) {
  const { message, history = [], system } = await req.json();

  const messages = [
    ...history.map((m: { role: string; text: string }) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.text,
    })),
    { role: "user", content: message },
  ];

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY || "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system: system || DEFAULT_SYSTEM,
      messages,
    }),
  });

  const data = await res.json();
  const reply = data.content?.[0]?.text || "Reach Decra at hello@decrakerubo.com.";

  return NextResponse.json({ reply });
}
