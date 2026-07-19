import type { NextConfig } from "next";

// Content-Security-Policy is set in middleware.ts instead, it needs a fresh
// nonce per request (for the inline JSON-LD/theme-init scripts in
// app/layout.tsx) which this static, build-time config can't generate.

// Clickjacking, MIME-sniffing, referrer leakage, and unused browser
// permissions, applied to every response.
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(self)" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
