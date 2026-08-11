/**
 * One place for the site's text generation.
 *
 * GitHub Models used to power this and has been retired, so nothing here
 * depends on it any more. The provider is chosen at runtime:
 *
 *   1. If AI_BASE_URL + AI_API_KEY are set, any OpenAI-compatible provider
 *      is used. Several have genuinely free tiers with no credit card —
 *      see .env.local for the exact URLs and model names.
 *   2. Otherwise it falls back to a keyless public endpoint, so the site
 *      still answers with no key configured at all.
 *
 * The keyless tier is best-effort by nature: it throttles hard and can
 * refuse outright when its free quota is exhausted, which is why every
 * failure here is reported honestly to the caller (see `retryable`) rather
 * than papered over. The chat UI turns that into a "try again" affordance
 * plus a plain contact form, so a dead model never costs Decra a lead.
 *
 * Note: no OpenAI `tools` array is ever sent. Free tiers commonly reject
 * tool calls even when plain completions are allowed, so tool use is done
 * as a text protocol instead — see app/api/chat/route.ts.
 */

export type AiMessage = { role: "system" | "user" | "assistant"; content: string };

export type AiResult =
  | { ok: true; content: string }
  | { ok: false; error: string; retryable: boolean };

/** Public, no-account endpoint used when no key is configured. */
const KEYLESS_ENDPOINT = "https://text.pollinations.ai/openai";
const KEYLESS_MODEL = "openai-fast";

const MAX_ATTEMPTS = 3;

function resolveProvider() {
  const key = process.env.AI_API_KEY;
  const baseUrl = process.env.AI_BASE_URL;

  if (key && baseUrl) {
    return {
      endpoint: `${baseUrl.replace(/\/+$/, "")}/chat/completions`,
      model: process.env.AI_MODEL || "gemini-2.0-flash",
      key,
      keyless: false,
    };
  }

  return {
    endpoint: process.env.AI_BASE_URL
      ? `${process.env.AI_BASE_URL.replace(/\/+$/, "")}/chat/completions`
      : KEYLESS_ENDPOINT,
    model: process.env.AI_MODEL || KEYLESS_MODEL,
    key: null,
    keyless: true,
  };
}

/** Reasoning-style models sometimes inline their scratchpad — never show it. */
function stripThinking(raw: string): string {
  return raw
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, "")
    .trim();
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

/**
 * Sends a conversation and returns the assistant's reply text.
 * Retries transient failures (429s and 5xx) a couple of times before
 * giving up, so a brief throttle doesn't kill a live conversation.
 */
export async function generateReply(
  messages: AiMessage[],
  opts: { temperature?: number } = {},
): Promise<AiResult> {
  const { endpoint, model, key } = resolveProvider();

  let lastError = "The assistant is unavailable.";
  let lastRetryable = true;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    if (attempt > 0) await sleep(attempt * 1200);

    let res: Response;
    try {
      res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(key ? { Authorization: `Bearer ${key}` } : {}),
        },
        body: JSON.stringify({
          model,
          messages,
          ...(opts.temperature != null ? { temperature: opts.temperature } : {}),
        }),
      });
    } catch (err) {
      // Network-level failure, worth another go.
      console.error("AI request failed to send:", err);
      lastError = "Could not reach the assistant.";
      lastRetryable = true;
      continue;
    }

    if (res.ok) {
      let data: {
        choices?: { message?: { content?: string | null } }[];
      };
      try {
        data = await res.json();
      } catch {
        lastError = "The assistant returned something unreadable.";
        lastRetryable = true;
        continue;
      }

      const content = stripThinking(data.choices?.[0]?.message?.content || "");
      if (content) return { ok: true, content };

      // An empty completion is usually a truncated or refused generation —
      // retrying often produces a real answer.
      lastError = "The assistant returned an empty reply.";
      lastRetryable = true;
      continue;
    }

    const bodyText = await res.text().catch(() => "");
    console.error("AI provider error:", res.status, bodyText.slice(0, 500));

    // 429 (throttled) and 5xx (provider hiccup) are worth retrying.
    // 402 means the free quota is spent — retrying won't fix it, but from
    // the visitor's side it behaves the same as being throttled.
    if (res.status === 429 || res.status >= 500) {
      const retryAfter = parseInt(res.headers.get("retry-after") || "", 10);
      // Some providers return a Retry-After measured in hours when a daily
      // quota is gone; there's no point waiting that out mid-conversation.
      if (!isNaN(retryAfter) && retryAfter > 0 && retryAfter <= 5) await sleep(retryAfter * 1000);
      lastError = "The assistant is busy right now.";
      lastRetryable = true;
      continue;
    }

    // 402 is a spent quota, not a throttle. Reporting it as retryable told
    // people to "try again in a moment" for something that cannot succeed
    // until a key is configured, so they retried instead of leaving their
    // details. Non-retryable puts the fallback form in front of them.
    if (res.status === 402) {
      return { ok: false, error: "The assistant's quota is exhausted.", retryable: false };
    }

    // 400/401/403 etc. are configuration problems — no amount of retrying helps.
    return { ok: false, error: "The assistant is not configured correctly.", retryable: false };
  }

  return { ok: false, error: lastError, retryable: lastRetryable };
}
