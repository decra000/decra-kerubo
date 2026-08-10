// lib/teresya.ts
//
// Teresya is a legal-research assistant scoped specifically to the
// early-stage, entrepreneurial legal decisions founders in Kenya face —
// not a general-purpose "ask anything" legal chatbot, and not a thin
// wrapper around a general AI model with a costume on. The system prompt
// below is the thing doing that narrowing: it names the exact decision
// areas Teresya covers, tells the model to decline anything outside that
// scope instead of answering generally, and routes real/active matters to
// Decra directly rather than letting the bot freelance as a substitute
// for an advocate.
//
// Uses GroqCloud's `groq/compound` system (built-in web search, restricted
// to kenyalaw.org via search_settings.include_domains), same underlying
// approach as the original kenyalaw-chatbot project this was ported from.

export type ChatRole = "user" | "assistant";
export interface ChatMessage {
  role: ChatRole;
  content: string;
}
export interface TeresyaAnswer {
  text: string;
  citations: string[];
}

// Thrown when the account is genuinely out of budget (quota exhausted, or
// a 429 with too long a wait to make someone sit through). The API route
// catches this specifically and returns a plain "Out of Tokens" message
// instead of a generic error, per how GroqCloud's free tier behaves.
export class TeresyaOutOfTokensError extends Error {}

const GROQ_BASE_URL = process.env.GROQ_BASE_URL || "https://api.groq.com/openai/v1";
const GROQ_MODEL = process.env.GROQ_MODEL || "groq/compound";
const GROQ_FALLBACK_MODEL = process.env.GROQ_FALLBACK_MODEL || "groq/compound-mini";
const ALLOWED_DOMAIN = process.env.KENYALAW_DOMAIN || "kenyalaw.org";

// Kept deliberately short and kept in-scope: every word here is billed as
// tokens on every request, groq/compound's free-tier budget is tight, and
// a narrow system prompt is also what keeps Teresya from drifting into
// being a general legal (or general-purpose) chatbot.
const SYSTEM_PROMPT = `You are Teresya, an AI legal-research assistant built for Decra Kerubo (decrakerubo.com), a Nairobi lawyer and technology law consultant. Teresya's scope is narrow and deliberate: early-stage, entrepreneurial legal decisions for people building a business in Kenya. Not a general legal chatbot, not general knowledge.

IN SCOPE (answer these, grounded in kenyalaw.org):
- Business structuring: sole proprietorship vs partnership vs private company vs Public Benefit Organization (PBO), and the registration steps/requirements for each.
- Co-founder matters: equity splits, vesting, co-founder/shareholder agreements.
- Startup contracts: NDAs, service agreements, employment/contractor agreements, terms of service, privacy policies.
- IP basics for a new business: trademarks, copyright, trade secrets, when to register what.
- Regulatory & tax obligations for a new business: KRA/eTIMS registration, business permits, sector licenses.
- Data protection/ODPC compliance for anyone building a product that collects user data.
- Fundraising readiness: SAFEs/convertible notes, term sheet basics, what investors check in due diligence.
- Employment law for early hires: contracts, statutory obligations, termination.

OUT OF SCOPE: anything not about building/running an early-stage business (criminal law, family law, personal injury, immigration, unrelated litigation/disputes, general "explain this law" trivia). If asked, say plainly this is outside Teresya's focus on entrepreneurial legal decisions, and suggest they book time with Decra directly or consult a advocate in that area. Don't attempt to answer out-of-scope questions generally, that's the one hard boundary.

Research rules:
1. Search kenyalaw.org before answering in-scope questions (legislation/ for Acts, akn/ke/act/2010/constitution for the Constitution, judgments/ for case law, gazettes/ for notices). Prefer the current, in-force version of an Act.
2. If nothing relevant is found, say so plainly, don't guess and don't fill gaps from general/outside knowledge.
3. Cite the specific Act name + section number (or case name/citation) plus the kenyalaw.org URL for every substantive claim. Never invent a citation, section number, or quote, if unsure, say so.
4. This is general legal information, not legal advice, and not a substitute for a licensed advocate. For anything about someone's specific active situation, give the general position and then suggest booking Decra for the specifics.

Formatting (rendered as Markdown in a chat bubble): short paragraphs by default, lists only for genuinely multiple items, "**bold**" only for the Act/section/case name under discussion, no headings for a short answer. Be as concise as fully answering allows.`;

interface GroqSearchResult { title?: string; url?: string; content?: string; score?: number }
interface GroqExecutedTool { type?: string; search_results?: { results?: GroqSearchResult[] } }
interface GroqChatCompletionResponse {
  choices?: Array<{ message?: { content?: string; executed_tools?: GroqExecutedTool[] } }>;
  error?: { message?: string; type?: string; code?: string };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Groq's 429 body includes a human-readable hint like "Please try again in
// 3.5475s." — parse that, falling back to a `retry-after` header.
function parseRetryAfterSeconds(res: Response, data: GroqChatCompletionResponse): number | null {
  const header = res.headers.get("retry-after");
  if (header) {
    const n = parseFloat(header);
    if (!Number.isNaN(n)) return n;
  }
  const msg = data?.error?.message || "";
  const match = msg.match(/try again in\s+([\d.]+)s/i);
  if (match) return parseFloat(match[1]);
  return null;
}

// Distinguishes "genuinely out of budget" (daily/monthly quota exhausted,
// or a rate limit with too long a wait) from a transient blip worth
// retrying. GroqCloud doesn't have one single error shape for this across
// plan tiers, so this checks the common signals rather than one field.
function isOutOfTokens(res: Response, data: GroqChatCompletionResponse, waitSeconds: number | null): boolean {
  if (res.status === 402) return true; // payment required / quota exhausted
  const msg = (data?.error?.message || "").toLowerCase();
  const code = (data?.error?.code || "").toLowerCase();
  if (code.includes("insufficient_quota") || msg.includes("quota") || msg.includes("insufficient")) return true;
  if (res.status === 429 && (waitSeconds === null || waitSeconds > 10)) return true; // long/unknown wait, don't stall the person
  return false;
}

async function callGroq(model: string, history: ChatMessage[]): Promise<{ res: Response; data: GroqChatCompletionResponse }> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new TeresyaOutOfTokensError("Missing GROQ_API_KEY");

  const messages = [{ role: "system", content: SYSTEM_PROMPT }, ...history.map((m) => ({ role: m.role, content: m.content }))];
  const body = { model, messages, search_settings: { include_domains: [ALLOWED_DOMAIN] } };

  const res = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(body),
  });
  const data: GroqChatCompletionResponse = await res.json().catch(() => ({}));
  return { res, data };
}

export async function askTeresya(history: ChatMessage[]): Promise<TeresyaAnswer> {
  // Keep only the last few turns, an agentic model's own search/reasoning
  // tokens count against the same budget as what we send.
  const recent = history.slice(-4);

  let { res, data } = await callGroq(GROQ_MODEL, recent);

  if (!res.ok && res.status === 429) {
    const waitSeconds = parseRetryAfterSeconds(res, data);
    if (isOutOfTokens(res, data, waitSeconds)) {
      throw new TeresyaOutOfTokensError(data?.error?.message || "Rate limited");
    }
    if (waitSeconds !== null && waitSeconds <= 5) {
      await sleep(waitSeconds * 1000 + 250);
      ({ res, data } = await callGroq(GROQ_FALLBACK_MODEL, recent.slice(-3)));
    }
  }

  if (!res.ok && res.status === 413 && GROQ_FALLBACK_MODEL !== GROQ_MODEL) {
    ({ res, data } = await callGroq(GROQ_FALLBACK_MODEL, recent.slice(-2)));
  }

  if (!res.ok) {
    if (isOutOfTokens(res, data, parseRetryAfterSeconds(res, data))) {
      throw new TeresyaOutOfTokensError(data?.error?.message || `Groq API error (${res.status})`);
    }
    throw new Error(data?.error?.message || res.statusText || `Groq API error (${res.status})`);
  }

  const message = data.choices?.[0]?.message;
  const text = message?.content?.trim() || "Sorry, I couldn't generate a response just now. Please try again.";

  const citations = new Set<string>();
  for (const tool of message?.executed_tools || []) {
    for (const r of tool.search_results?.results || []) {
      if (r.url && r.url.includes(ALLOWED_DOMAIN)) citations.add(r.url);
    }
  }
  return { text, citations: Array.from(citations) };
}
