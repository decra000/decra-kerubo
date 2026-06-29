import { NextRequest, NextResponse } from "next/server";

const DEFAULT_SYSTEM = `You are Decra Kerubo's professional AI advisor on decrakerubo.com.

About Decra:
- Nairobi-based lawyer (LLB) and computer scientist (BSc), technology law consultant
- Services: Technology Law (IP, data privacy/ODPC, tech contracts, regulatory compliance) and Founder/Startup Legal (incorporation, equity, co-founder agreements, eTIMS/KRA tax, fundraising readiness)
- Also advises on: foreign company branches in Kenya, Public Benefit Organizations (PBOs — the new framework replacing NGOs in Kenya), international expansion into East Africa
- Runs Entrora Systems separately for AI engineering
- Based in Nairobi, works across East Africa and internationally

Your role: help visitors understand which service fits them, answer questions about Decra's practice, and guide them to the right next step (/#collaborate or /start).
Be concise (2-3 sentences per reply), warm, and professional.
Never mention Anthropic, Claude, GitHub, OpenAI, or any AI company names.`;

// GitHub Models (OpenAI-compatible chat completions API).
// Docs: https://docs.github.com/en/github-models
// Note: personal-token access to GitHub Models is rate-limited and intended
// for prototyping — if traffic grows, this should move to a dedicated
// service credential or a different provider.
const GITHUB_MODELS_ENDPOINT = "https://models.github.ai/inference/chat/completions";
const GITHUB_MODELS_MODEL = "openai/gpt-4o-mini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [], system } = body;

    if (!message) {
      return NextResponse.json({ reply: "What can I help you with?" });
    }

    const apiKey = process.env.GITHUB_MODELS_TOKEN || process.env.GITHUB_TOKEN;
    if (!apiKey) {
      return NextResponse.json({ reply: "Reach Decra directly at hello@decrakerubo.com or use the Talk page." });
    }

    // OpenAI-compatible chat format: system prompt is a message, not a
    // separate field (unlike Anthropic's API).
    const messages = [
      { role: "system", content: system || DEFAULT_SYSTEM },
      ...history.map((m: { role: string; text: string }) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.text,
      })),
      { role: "user", content: message },
    ];

    const res = await fetch(GITHUB_MODELS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GITHUB_MODELS_MODEL,
        messages,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("GitHub Models API error:", res.status, err);
      return NextResponse.json({ reply: "I'm having trouble connecting right now. Email hello@decrakerubo.com or use the Talk page." });
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json({ reply: "Something went wrong. Email hello@decrakerubo.com or use the Talk page." });
    }

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json({ reply: "Email hello@decrakerubo.com or use the Talk page to reach Decra." });
  }
}
