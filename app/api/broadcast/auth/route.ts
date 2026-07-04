export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const expected = process.env.BROADCAST_PASSWORD;
  if (!expected) {
    return NextResponse.json({ error: "Broadcast is not configured (missing BROADCAST_PASSWORD env var)." }, { status: 500 });
  }
  if (password !== expected) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
