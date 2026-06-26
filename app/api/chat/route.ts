import { NextRequest, NextResponse } from "next/server";

const DEFAULT_SYSTEM = `You are Decra Kerubo's professional AI advisor on decrakerubo.com.

About Decra:
- Nairobi-based lawyer (LLB) and computer scientist (BSc), technology law consultant
- Services: Technology Law (IP, data privacy/ODPC, tech contracts, regulatory compliance) and Founder/Startup Legal (incorporation, equity, co-founder agreements, eTIMS/KRA tax, fundraising readiness)
- Also advises on: foreign company branches in Kenya, Public Benefit Organizations (PBOs — the new framework replacing NGOs in Kenya), international expansion into East Africa
- Runs Entrora Systems separately for AI engineering
- Based in Nairobi, works across East Africa and internationally

Your role: help visitors understand which service fits them, answer questions about Decra's practice, and guide them to the right next step (/partner, /start, or /talk).
Be concise (2-3 sentences per reply), warm, and professional.
Never mention Anthropic, Claude, or any AI company names.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [], system } = body;

    if (!message) {
      return NextResponse.json({ reply: "What can I help you with?" });
    }

    const messages = [
      ...history.map((m: { role: string; text: string }) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.text,
      })),
      { role: "user", content: message },
    ];

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ reply: "Reach Decra directly at hello@decrakerubo.com or use the Talk page." });
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 500,
        system: system || DEFAULT_SYSTEM,
        messages,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Anthropic API error:", res.status, err);
      return NextResponse.json({ reply: "I'm having trouble connecting right now. Email hello@decrakerubo.com or use the Talk page." });
    }

    const data = await res.json();
    const reply = data.content?.[0]?.text;

    if (!reply) {
      return NextResponse.json({ reply: "Something went wrong. Email hello@decrakerubo.com or use the Talk page." });
    }

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json({ reply: "Email hello@decrakerubo.com or use the Talk page to reach Decra." });
  }
}
