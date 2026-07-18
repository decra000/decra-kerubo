import { NextRequest, NextResponse } from "next/server";

/**
 * Shared password gate for the /admin dashboard's API routes, mirroring the
 * /api/broadcast pattern. The dashboard sends the shared admin password in
 * an `x-admin-password` header on every request; all data access then
 * happens server-side with the service-role key. Returns a ready error
 * response when access is denied, or null when the request may proceed.
 */
export function checkAdminPassword(req: NextRequest): NextResponse | null {
  const password = req.headers.get("x-admin-password") || "";
  const expected = process.env.ADMIN_PASSWORD || process.env.BROADCAST_PASSWORD;
  if (!expected) {
    return NextResponse.json({ error: "Admin is not configured (missing ADMIN_PASSWORD / BROADCAST_PASSWORD env var)." }, { status: 500 });
  }
  if (password !== expected) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }
  return null;
}
