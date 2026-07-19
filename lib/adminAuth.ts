import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const MAX_FAILURES = 5;
const WINDOW_MINUTES = 15;

// Fixed-length digest comparison, avoids leaking the real password's length
// via timing the way a direct string compare (or timingSafeEqual on
// mismatched-length buffers, which throws) would.
function safeEqual(a: string, b: string): boolean {
  const digestA = crypto.createHash("sha256").update(a).digest();
  const digestB = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(digestA, digestB);
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

/**
 * Shared password gate for /admin and /broadcast API routes. Rate-limited
 * per IP against Supabase (serverless functions don't share memory between
 * invocations, so an in-process counter wouldn't actually stop brute force),
 * and compares passwords via a fixed-length digest instead of a direct
 * string/timingSafeEqual comparison to avoid leaking length or timing info.
 * Returns a ready error response when access is denied, or null when the
 * request may proceed.
 */
export async function checkAdminPassword(req: NextRequest): Promise<NextResponse | null> {
  const expected = process.env.ADMIN_PASSWORD || process.env.BROADCAST_PASSWORD;
  if (!expected) {
    return NextResponse.json({ error: "Admin is not configured (missing ADMIN_PASSWORD / BROADCAST_PASSWORD env var)." }, { status: 500 });
  }

  const password = req.headers.get("x-admin-password") || req.headers.get("x-broadcast-password") || "";
  const ip = clientIp(req);
  const db = supabaseAdmin();

  // Fail open on the rate-limit check itself, a Supabase hiccup shouldn't
  // lock Decra out of her own dashboard, the password check below still applies.
  try {
    const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();
    const { count } = await db
      .from("auth_attempts")
      .select("id", { count: "exact", head: true })
      .eq("ip", ip)
      .eq("success", false)
      .gte("created_at", since);

    if ((count || 0) >= MAX_FAILURES) {
      return NextResponse.json(
        { error: `Too many failed attempts. Try again in ${WINDOW_MINUTES} minutes.` },
        { status: 429, headers: { "Retry-After": String(WINDOW_MINUTES * 60) } }
      );
    }
  } catch (err) {
    console.error("Rate limit check failed (failing open):", err);
  }

  const ok = safeEqual(password, expected);

  try {
    await db.from("auth_attempts").insert({ ip, success: ok });
  } catch (err) {
    console.error("Auth attempt log failed:", err);
  }

  if (!ok) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }
  return null;
}
