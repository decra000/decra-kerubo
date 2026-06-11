"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Intent = "legal" | "founder" | "exploring" | null;

const config = {
  legal: {
    label: "Technology Law · Entrepreneurial Advisory",
    headline: "Your legal foundation,",
    headlineItalic: "built right.",
    body: "From incorporation and tax compliance to data privacy and international expansion — legal advisory that understands how tech companies actually work.",
    cta: "Book a Legal Consultation",
    sub: "Free 15-min discovery call",
  },
  founder: {
    label: "Startup & NGO Advisory",
    headline: "Build a company",
    headlineItalic: "that holds.",
    body: "Co-founder agreements, equity structures, eTIMS compliance, and fundraising readiness. The legal infrastructure founders skip and regret.",
    cta: "Talk to Decra",
    sub: "Free 15-min discovery call",
  },
  exploring: {
    label: "Legal & Technology Advisory · Nairobi",
    headline: "Hi, I'm",
    headlineItalic: "Decra.",
    body: "Lawyer and computer scientist. I help startups, NGOs, and founders navigate technology law and build structurally sound companies. Based in Nairobi, operating across Africa.",
    cta: "Book a Discovery Call",
    sub: "No commitment · 15 minutes",
  },
};

export function Hero({ intent }: { intent: Intent }) {
  const c = config[intent || "exploring"];

  return (
    <section style={{
      minHeight: "100svh", display: "flex", alignItems: "center",
      background: "var(--c-bg)", paddingLeft: "var(--space-page-x)",
      paddingRight: "var(--space-page-x)", paddingTop: "9rem", paddingBottom: "6rem",
    }}>
      <div className="inner" style={{ width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8rem", alignItems: "center" }} id="hero-grid">

          {/* Left */}
          <div>
            <p className="t-label" style={{ marginBottom: "2rem" }}>{c.label}</p>

            <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(3rem, 5.5vw, 5rem)", lineHeight: 1.06, color: "var(--c-ink)", marginBottom: "1.75rem" }}>
              {c.headline}<br />
              <em style={{ fontStyle: "italic", color: "var(--c-accent)" }}>{c.headlineItalic}</em>
            </h1>

            <p className="t-body" style={{ maxWidth: "28rem", marginBottom: "2.75rem" }}>{c.body}</p>

            <div style={{ display: "flex", gap: "0.85rem", alignItems: "center", flexWrap: "wrap", marginBottom: "3.5rem" }}>
              <Link href="/book" className="btn btn-ink">{c.cta} <ArrowRight size={13} /></Link>
              <Link href="/services" className="btn btn-ghost">Services</Link>
            </div>

            {/* Subtle track chips */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {["Technology Law", "Startup & NGO Advisory", "Nairobi · Africa"].map(t => (
                <span key={t} style={{ fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.05em", padding: "0.3rem 0.8rem", border: "1px solid var(--c-border)", color: "var(--c-ink-muted)", borderRadius: "2px" }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Right — clean vertical rule + accent stat block */}
          <div style={{ borderLeft: "1px solid var(--c-border)", paddingLeft: "5rem", display: "flex", flexDirection: "column", gap: "3rem" }} className="hero-right">
            {[
              { n: "15", unit: "min", desc: "Free discovery call — no commitment" },
              { n: "2", unit: "tracks", desc: "Technology Law & Entrepreneurial Advisory" },
              { n: "48", unit: "h", desc: "Response guarantee on all enquiries" },
            ].map(s => (
              <div key={s.desc}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "0.35rem" }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "3rem", color: "var(--c-ink)", lineHeight: 1 }}>{s.n}</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--c-accent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.unit}</span>
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--c-ink-muted)", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}

            {/* Availability badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingTop: "1rem", borderTop: "1px solid var(--c-border)" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4A8A5A", flexShrink: 0, animation: "pulse-dot 2.2s infinite" }} />
              <span style={{ fontSize: "0.78rem", color: "var(--c-ink-muted)" }}>Available for new work · Nairobi, Kenya</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @media (max-width: 900px) {
          #hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .hero-right { border-left: none !important; border-top: 1px solid var(--c-border); padding-left: 0 !important; padding-top: 2.5rem; flex-direction: row !important; flex-wrap: wrap; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
