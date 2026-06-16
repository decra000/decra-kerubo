import { NextRequest, NextResponse } from "next/server";

const SYSTEM = `You are Decra Kerubo's AI advisor on her professional website decrakerubo.com.
Decra is a Nairobi-based lawyer and computer scientist offering two advisory tracks:
1. Technology Law: IP protection, data privacy/ODPC compliance, tech contracts, regulatory mapping, startup law.
2. Founder Legal: company incorporation, equity & vesting, co-founder agreements, tax (eTIMS/KRA), fundraising readiness.
She also runs Entrora Systems for AI engineering work.

Your role: help visitors identify which track fits their situation, answer questions about her services and process, and guide them toward booking a discovery call. 
Keep responses concise, professional, and warm — 2-4 sentences max. Never make up specific pricing. 
If someone is ready to engage, direct them to the Book a Call page or hello@decrakerubo.com.`;

export async function POST(req: NextRequest) {
  const { message, history = [] } = await req.json();

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
      max_tokens: 300,
      system: SYSTEM,
      messages,
    }),
  });

  const data = await res.json();
  const reply = data.content?.[0]?.text || "I'm having trouble connecting — reach Decra directly at hello@decrakerubo.com.";

  return NextResponse.json({ reply });
}
