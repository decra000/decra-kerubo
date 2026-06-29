import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

/**
 * Serves research paper PDFs for inline viewing only.
 *
 * Files are NOT stored in /public — they live in /private/research,
 * which Next.js never exposes as a static route. This handler is the
 * only way to reach them, and it always responds with:
 *   - Content-Disposition: inline   → opens in the in-page viewer,
 *                                      doesn't trigger a "Save as" download
 *   - Cache-Control: no-store        → not cached or retained by browsers/CDNs
 *   - X-Robots-Tag: noindex          → never indexed by search engines
 *
 * To add a paper: drop "<slug>.pdf" into /private/research and reference
 * that same slug in the `papers` array in app/about/page.tsx.
 */

const SLUG_PATTERN = /^[a-z0-9-]+$/;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!SLUG_PATTERN.test(slug)) {
    return NextResponse.json({ ok: false, error: "Invalid slug" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "private", "research", `${slug}.pdf`);

  if (!existsSync(filePath)) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  try {
    const file = await readFile(filePath);
    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        // inline (not attachment) → renders in the embedded viewer, no save dialog
        "Content-Disposition": `inline; filename="${slug}.pdf"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "X-Robots-Tag": "noindex, nofollow",
        "X-Content-Type-Options": "nosniff",
        // Disallow this response from being framed by any other origin
        "Content-Security-Policy": "frame-ancestors 'self'",
      },
    });
  } catch (error) {
    console.error("Research route error:", error);
    return NextResponse.json({ ok: false, error: "Read failed" }, { status: 500 });
  }
}
