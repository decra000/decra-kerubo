import { NextRequest, NextResponse } from "next/server";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Per-request CSP with a nonce, replacing 'unsafe-inline' in script-src.
 * next.config.ts's headers() runs once at build time and can't generate a
 * fresh nonce per request, hence this lives in middleware instead. The
 * three inline <script> tags in app/layout.tsx (JSON-LD + theme-init) read
 * the nonce back via the x-nonce request header and next/headers().
 * 'strict-dynamic' lets Next's own nonce'd bootstrap script load its
 * code-split chunks without allow-listing every chunk URL individually.
 */
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://js.paystack.co${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https://images.unsplash.com https://res.cloudinary.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://*.paystack.co",
    "frame-src 'self' https://*.paystack.co",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
