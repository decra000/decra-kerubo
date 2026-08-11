export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { checkAdminPassword } from "@/lib/adminAuth";

/**
 * Answers "why isn't the assistant replying?" with facts instead of guesses.
 *
 * The chat route deliberately never shows a visitor a provider error — it
 * says the assistant is busy and offers the contact form — which is right
 * for visitors but leaves no way to tell a missing key from a wrong model
 * name from a dead endpoint. This makes one real call and reports exactly
 * what came back.
 *
 * Admin-gated, because the response describes server configuration. The key
 * itself is never returned, only whether one is present and its length.
 */
export async function GET(req: NextRequest) {
  const denied = await checkAdminPassword(req);
  if (denied) return denied;

  const baseUrl = process.env.AI_BASE_URL;
  const key = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL;

  const configured = !!(baseUrl && key);
  const endpoint = baseUrl
    ? `${baseUrl.replace(/\/+$/, "")}/chat/completions`
    : "https://text.pollinations.ai/openai";
  const effectiveModel = model || (configured ? "gemini-2.0-flash" : "openai-fast");

  const report: Record<string, unknown> = {
    configured,
    usingKeylessFallback: !configured,
    endpoint,
    model: effectiveModel,
    env: {
      AI_BASE_URL: baseUrl ? "set" : "MISSING",
      AI_API_KEY: key ? `set (${key.length} chars, starts "${key.slice(0, 4)}")` : "MISSING",
      AI_MODEL: model ? "set" : "not set (using default above)",
    },
  };

  if (!configured) {
    report.verdict =
      "No AI_BASE_URL/AI_API_KEY on this deployment, so the site is falling back to the keyless endpoint, which now refuses almost every request. Set both and redeploy, env changes only apply to a new deployment.";
    return NextResponse.json(report);
  }

  // One real round-trip, kept tiny.
  try {
    const started = Date.now();
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: effectiveModel,
        messages: [{ role: "user", content: "Reply with the single word: ok" }],
      }),
    });
    const raw = await res.text();
    report.httpStatus = res.status;
    report.latencyMs = Date.now() - started;

    let parsed: { choices?: { message?: { content?: string } }[] } | null = null;
    try { parsed = JSON.parse(raw); } catch { /* not JSON, raw excerpt below tells the story */ }

    const content = parsed?.choices?.[0]?.message?.content;
    report.reply = content ?? null;
    report.ok = res.ok && !!content;

    if (!report.ok) {
      // Truncated so a provider error can't dump a wall of text.
      report.providerResponse = raw.slice(0, 600);
      // Providers disagree on the status for a bad key — Google answers 400
      // with "valid API key" in the body rather than 401 — so match on the
      // message too, otherwise a rejected key reads as a generic failure.
      const looksLikeBadKey = /api[\s_-]?key|unauthenticated|invalid_argument/i.test(raw);
      report.verdict =
        res.status === 401 || res.status === 403 || (res.status === 400 && looksLikeBadKey)
          ? "The key was rejected. Check it was copied whole, has no stray spaces or quotes, and belongs to the provider in AI_BASE_URL."
          : res.status === 404
            ? "Endpoint or model not found. Check AI_BASE_URL ends at the OpenAI-compatible root and that AI_MODEL exists for this provider."
            : res.status === 429
              ? "Rate limited by the provider. The key works; it is over quota right now."
              : "The provider answered, but not with a usable completion. See providerResponse.";
    } else {
      report.verdict = "Working. If the site still shows the busy message, it is serving an older deployment, redeploy.";
    }
  } catch (err) {
    report.ok = false;
    report.verdict = "Could not reach the endpoint at all. Check AI_BASE_URL is a full https URL.";
    report.error = err instanceof Error ? err.message : String(err);
  }

  return NextResponse.json(report);
}
