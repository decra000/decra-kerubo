export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/lib/booking";
import { submitInquiry } from "@/lib/inquiry";
import { CONSULTATION_TYPES } from "@/lib/types";

const today = new Date().toISOString().slice(0, 10);

const DEFAULT_SYSTEM = `You are Decra Kerubo's AI advisor on decrakerubo.com. Today's date is ${today} (East Africa Time, UTC+3).

About Decra:
- Nairobi-based lawyer (LLB) and computer scientist (BSc), technology law consultant
- Services: Technology Law (IP, data privacy/ODPC, tech contracts, regulatory compliance) and Founder/Startup Legal (incorporation, equity, co-founder agreements, eTIMS/KRA tax, fundraising readiness)
- Also advises on: foreign company branches in Kenya, Public Benefit Organizations (PBOs — the new framework replacing NGOs in Kenya), international expansion into East Africa
- Based in Nairobi, works across East Africa and internationally

Your job is to actually get things done for the person you're talking to, not just describe where they could go to do it themselves:
- If someone wants to schedule a call, use book_discovery_call to book the free 15-minute Discovery call directly, right in this conversation. Get their name, email, a one-line summary of what they want to discuss, and a date/time that works (assume East Africa Time). Confirm the details back before calling the tool.
- If someone wants a paid "Priority Discovery" call, or anything involving payment, tell them to complete that at /book since it needs payment — that's a genuine exception, not a default.
- For anything else where a human follow-up makes sense (partnership inquiries, questions you can't fully resolve, requests to be contacted) — use submit_inquiry to actually send it to Decra right now, rather than pointing them at a contact form. Get their name, email, and a short summary of what they need first.
- Only ever direct someone to another page as a last resort, when a tool genuinely can't cover it (e.g. payment, or something requiring Decra's personal judgment before you can promise anything).

Be concise (2-3 sentences per reply outside of tool confirmations), warm, and professional. Never mention Anthropic, Claude, GitHub, OpenAI, or any AI company/model names.`;

const GITHUB_MODELS_ENDPOINT = "https://models.github.ai/inference/chat/completions";
const GITHUB_MODELS_MODEL = "openai/gpt-4o-mini";

const DISCOVERY = CONSULTATION_TYPES.find(c => c.id === "discovery");

const TOOLS = [
  {
    type: "function",
    function: {
      name: "book_discovery_call",
      description: "Creates a real, immediately-confirmed booking for the free 15-minute Discovery call. No payment required. Use this whenever someone wants to schedule a call and hasn't specifically asked for the paid Priority option.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          organization: { type: "string", description: "Optional — their company/organization name." },
          primary_challenge: { type: "string", description: "One sentence: what they need help with." },
          desired_outcome: { type: "string", description: "One sentence: what they want out of the call." },
          date: { type: "string", description: "ISO date, YYYY-MM-DD, at least 1 day from today." },
          time: { type: "string", description: "24-hour time, HH:MM, East Africa Time (UTC+3)." },
        },
        required: ["name", "email", "primary_challenge", "desired_outcome", "date", "time"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "submit_inquiry",
      description: "Sends an inquiry directly to Decra and logs it as a lead, right now — use this for anything needing her personal follow-up instead of pointing someone at a contact form.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          organization: { type: "string" },
          summary: { type: "string", description: "2-3 sentences briefing Decra on what this person needs and any relevant context from the conversation." },
        },
        required: ["name", "email", "summary"],
      },
    },
  },
];

async function runTool(name: string, args: Record<string, unknown>): Promise<string> {
  try {
    if (name === "book_discovery_call") {
      const { name: personName, email, organization, primary_challenge, desired_outcome, date, time } = args as Record<string, string>;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "") || !/^\d{1,2}:\d{2}$/.test(time || "")) {
        return "Error: date must be YYYY-MM-DD and time must be 24-hour HH:MM. Ask the person to confirm and try again.";
      }
      const scheduled_at = `${date}T${time.padStart(5, "0")}:00+03:00`;
      const result = await createBooking({
        name: personName, email, organization,
        primary_challenge, desired_outcome,
        consultation_type: DISCOVERY?.label || "Discovery",
        scheduled_at,
        amount: 0,
      });
      if (!result.ok) return `Error: ${result.error}`;
      return `Success: Discovery call confirmed for ${date} at ${time} EAT. Confirmation email sent to ${email}.`;
    }
    if (name === "submit_inquiry") {
      const { name: personName, email, organization, summary } = args as Record<string, string>;
      const result = await submitInquiry({ name: personName, email, organization, summary, source: "chat" });
      if (!result.ok) return `Error: ${result.error}`;
      return `Success: inquiry sent to Decra and confirmation email sent to ${email}.`;
    }
    return `Error: unknown tool ${name}`;
  } catch (err) {
    console.error(`Tool execution error (${name}):`, err);
    return "Error: something went wrong running that action. Apologize and suggest emailing hello@decrakerubo.com.";
  }
}

type ChatMessage = { role: string; content: string | null; tool_calls?: { id: string; function: { name: string; arguments: string } }[]; tool_call_id?: string };

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

    const messages: ChatMessage[] = [
      { role: "system", content: system || DEFAULT_SYSTEM },
      ...history.map((m: { role: string; text: string }) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.text,
      })),
      { role: "user", content: message },
    ];

    const usingDefaultAdvisor = !system;

    let finalReply: string | null = null;

    // Up to 3 rounds: model calls a tool, we execute it, feed the result
    // back, and let it either call another tool or give a final reply.
    for (let round = 0; round < 3 && finalReply === null; round++) {
      let res: Response | null = null;
      let attempt = 0;
      const maxAttempts = 3;

      // Retry loop specifically for 429s (GitHub Models' free tier is quota-limited,
      // not a hard outage) — back off and retry a couple of times before giving up,
      // so a brief throttle doesn't kill an in-progress conversation.
      while (attempt < maxAttempts) {
        res = await fetch(GITHUB_MODELS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
          body: JSON.stringify({
            model: GITHUB_MODELS_MODEL, messages,
            ...(usingDefaultAdvisor ? { tools: TOOLS, tool_choice: "auto" } : {}),
          }),
        });

        if (res.status !== 429) break;

        attempt++;
        if (attempt >= maxAttempts) break;

        const retryAfterHeader = res.headers.get("retry-after");
        const retryAfterSec = retryAfterHeader ? parseInt(retryAfterHeader, 10) : NaN;
        // Respect a short Retry-After if given; otherwise back off 1.5s then 3s.
        // (GitHub Models sometimes returns retry-after values measured in hours for
        // daily-quota exhaustion — in that case there's no point waiting, so cap it.)
        const waitMs = !isNaN(retryAfterSec) && retryAfterSec > 0 && retryAfterSec <= 5
          ? retryAfterSec * 1000
          : attempt * 1500;
        await new Promise(r => setTimeout(r, waitMs));
      }

      if (!res!.ok) {
        const errText = await res!.text();
        console.error("GitHub Models API error:", res!.status, errText);
        if (res!.status === 429) {
          // Distinct, honest message — and a flag the client can use to avoid
          // treating this as a dead end (the person's message isn't lost).
          return NextResponse.json({
            reply: "Decra's assistant is getting more traffic than it can handle right this second. Please try sending that again in a moment — nothing you've typed so far has been lost.",
            rateLimited: true,
          });
        }
        return NextResponse.json({ reply: "I'm having trouble connecting right now. Email hello@decrakerubo.com or use the Talk page." });
      }

      const data = await res!.json();
      const choice = data.choices?.[0]?.message;
      if (!choice) {
        return NextResponse.json({ reply: "Something went wrong. Email hello@decrakerubo.com or use the Talk page." });
      }

      if (choice.tool_calls?.length) {
        messages.push({ role: "assistant", content: choice.content ?? null, tool_calls: choice.tool_calls });
        for (const call of choice.tool_calls) {
          let args: Record<string, unknown> = {};
          try { args = JSON.parse(call.function.arguments || "{}"); } catch { /* leave empty */ }
          const result = await runTool(call.function.name, args);
          messages.push({ role: "tool", tool_call_id: call.id, content: result });
        }
        continue; // loop back so the model can respond to the tool result
      }

      finalReply = choice.content || null;
    }

    if (!finalReply) {
      return NextResponse.json({ reply: "Done — let me know if there's anything else." });
    }
    return NextResponse.json({ reply: finalReply });

  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json({ reply: "Email hello@decrakerubo.com or use the Talk page to reach Decra." });
  }
}
