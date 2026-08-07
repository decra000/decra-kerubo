export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/lib/booking";
import { submitInquiry } from "@/lib/inquiry";
import { CONSULTATION_TYPES } from "@/lib/types";
import { generateReply, type AiMessage } from "@/lib/ai";

const today = new Date().toISOString().slice(0, 10);

/**
 * Actions are a text protocol rather than OpenAI-style function calling:
 * the free/keyless providers this site runs on reject the `tools` array
 * even when plain completions work. The model writes a tagged block, we
 * parse it, run the real thing, and feed the result back — same outcome,
 * no dependency on a paid tool-calling tier.
 */
const ACTION_PROTOCOL = `HOW TO ACT: You can perform real actions. To run one, end your message with exactly one block on its own line, and nothing after it:
<action>{"tool":"TOOL_NAME","args":{ ... }}</action>

The block must be valid JSON. Never show it to the person, never describe it, never mention that you are "running" anything technical, and never output more than one per message. Only emit a block once you actually have every required value — otherwise just ask for what's missing.

Available tools:

1. request_discovery_call — submits a request for the free 15-minute Discovery call.
   args: name, email, organization (optional), primary_challenge, desired_outcome, date (YYYY-MM-DD, at least 1 day from today), time (HH:MM, 24-hour, East Africa Time).
   IMPORTANT: this does NOT confirm the meeting. It sends the request to Decra, who reviews it and confirms the slot by email. Always tell the person their request has been received and is being processed, and that Decra will confirm by email. Never tell anyone their call is booked, confirmed, or locked in.

2. redirect_to_book — sends the person to the /book page for a paid "Priority Discovery" call or anything needing payment, which this chat can't process.
   args: name, email, organization, primary_challenge (all optional, pass whatever you already know so the page pre-fills).

3. submit_inquiry — sends an inquiry straight to Decra and logs it as a lead. Use it for partnership questions, anything you can't fully resolve, or requests to be contacted.
   args: name, email, organization (optional), summary (2-3 sentences briefing Decra).

Never just tell someone to visit a page themselves when a tool exists for it. Only describe another page in words as an absolute last resort, when none of the tools apply.`;

const DEFAULT_SYSTEM = `You are Decra Kerubo's AI advisor on decrakerubo.com. Today's date is ${today} (East Africa Time, UTC+3).

About Decra:
- Nairobi-based lawyer (LLB) and computer scientist (BSc), technology law consultant
- Services: Technology Law (IP, data privacy/ODPC, tech contracts, regulatory compliance) and Founder/Startup Legal (incorporation, equity, co-founder agreements, eTIMS/KRA tax, fundraising readiness)
- Also advises on: foreign company branches in Kenya, Public Benefit Organizations (PBOs, the new framework replacing NGOs in Kenya), international expansion into East Africa
- Based in Nairobi, works across East Africa and internationally

Your job is to actually get things done for the person you're talking to, not just describe where they could go to do it themselves. Before submitting a meeting request, get their name, email, a one-line summary of what they want to discuss, and a date/time that works (assume East Africa Time), then read the details back to them before you submit.

${ACTION_PROTOCOL}

Be concise (2-3 sentences per reply outside of action confirmations), warm, and professional. Never mention Anthropic, Claude, GitHub, OpenAI, or any AI company/model names.`;

const DISCOVERY = CONSULTATION_TYPES.find(c => c.id === "discovery");

type ToolResult = { content: string; redirect?: { url: string } };

async function runTool(name: string, args: Record<string, unknown>): Promise<ToolResult> {
  try {
    if (name === "request_discovery_call") {
      const { name: personName, email, organization, primary_challenge, desired_outcome, date, time } = args as Record<string, string>;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "") || !/^\d{1,2}:\d{2}$/.test(time || "")) {
        return { content: "Error: date must be YYYY-MM-DD and time must be 24-hour HH:MM. Ask the person to confirm and try again." };
      }
      const scheduled_at = `${date}T${time.padStart(5, "0")}:00+03:00`;
      const result = await createBooking({
        name: personName, email, organization,
        primary_challenge, desired_outcome,
        consultation_type: DISCOVERY?.label || "Discovery",
        scheduled_at,
        amount: 0,
      });
      if (!result.ok) return { content: `Error: ${result.error}` };
      return { content: `Success: the request for ${date} at ${time} EAT has been sent to Decra and is being processed — it is NOT yet confirmed. An acknowledgement email went to ${email}. Tell the person their request is with Decra, who will confirm the slot by email shortly. Do not say it is booked or confirmed.` };
    }
    if (name === "redirect_to_book") {
      const { name: personName, email, organization, primary_challenge } = args as Record<string, string>;
      const params = new URLSearchParams();
      if (personName) params.set("name", personName);
      if (email) params.set("email", email);
      if (organization) params.set("organization", organization);
      if (primary_challenge) params.set("primary_challenge", primary_challenge);
      const qs = params.toString();
      const url = `/book${qs ? `?${qs}` : ""}`;
      return {
        content: "Success: the person is being redirected to /book now, with their details pre-filled. Tell them briefly that you're taking them there to complete payment.",
        redirect: { url },
      };
    }
    if (name === "submit_inquiry") {
      const { name: personName, email, organization, summary } = args as Record<string, string>;
      const result = await submitInquiry({ name: personName, email, organization, summary, source: "chat" });
      if (!result.ok) return { content: `Error: ${result.error}` };
      return { content: `Success: inquiry sent to Decra and confirmation email sent to ${email}.` };
    }
    return { content: `Error: unknown tool ${name}` };
  } catch (err) {
    console.error(`Tool execution error (${name}):`, err);
    return { content: "Error: something went wrong running that action. Apologize and suggest emailing hello@decrakerubo.com." };
  }
}

type ParsedAction = { tool: string; args: Record<string, unknown> };

/**
 * Pulls a trailing <action>{...}</action> block out of a reply, returning
 * the prose the person should actually see alongside it. A malformed block
 * is stripped rather than shown — better a slightly abrupt reply than raw
 * JSON leaking into the conversation.
 */
function extractAction(raw: string): { text: string; action: ParsedAction | null } {
  const match = raw.match(/<action>([\s\S]*?)<\/action>/i);
  if (!match) return { text: raw.trim(), action: null };

  const text = raw.replace(match[0], "").trim();
  try {
    const parsed = JSON.parse(match[1].trim());
    if (parsed && typeof parsed.tool === "string") {
      return { text, action: { tool: parsed.tool, args: parsed.args && typeof parsed.args === "object" ? parsed.args : {} } };
    }
  } catch { /* fall through, block is dropped below */ }
  return { text, action: null };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [], system } = body;

    if (!message) {
      return NextResponse.json({ reply: "What can I help you with?" });
    }

    const messages: AiMessage[] = [
      { role: "system", content: system || DEFAULT_SYSTEM },
      ...history.map((m: { role: string; text: string }) => ({
        role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
        content: m.text,
      })),
      { role: "user", content: message },
    ];

    const usingDefaultAdvisor = !system;

    let finalReply: string | null = null;
    let redirect: { url: string } | null = null;

    // Up to 3 rounds: the model emits an action, we execute it, feed the
    // result back, and let it either act again or write its final reply.
    for (let round = 0; round < 3 && finalReply === null; round++) {
      const result = await generateReply(messages);

      if (!result.ok) {
        return NextResponse.json({
          reply: result.retryable
            ? "Decra's assistant is getting more traffic than it can handle right this second. Please try sending that again in a moment, nothing you've typed so far has been lost."
            : "I'm having trouble connecting right now. Email hello@decrakerubo.com or use the Talk page.",
          rateLimited: result.retryable,
        });
      }

      const { text, action } = extractAction(result.content);

      // Only the default advisor has actions; the intake flows drive
      // themselves with their own <intake_complete> protocol. If one of
      // those ever emits an action block anyway, drop it rather than run
      // it — and never let the raw JSON reach the person either way.
      if (!usingDefaultAdvisor) {
        finalReply = text;
        break;
      }

      if (!action) {
        finalReply = text;
        break;
      }

      const toolResult = await runTool(action.tool, action.args);
      if (toolResult.redirect) redirect = toolResult.redirect;

      messages.push({ role: "assistant", content: text || "(running that now)" });
      messages.push({
        role: "user",
        content: `[SYSTEM] Result of ${action.tool}: ${toolResult.content}\n\nNow reply to me directly in 1-2 sentences. Do not emit another action block unless something still genuinely needs doing.`,
      });
    }

    if (!finalReply) {
      return NextResponse.json({ reply: "Done, let me know if there's anything else.", redirect });
    }
    return NextResponse.json({ reply: finalReply, redirect });

  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json({ reply: "Email hello@decrakerubo.com or use the Talk page to reach Decra." });
  }
}
