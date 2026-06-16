"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Intent = "legal" | "founder" | "exploring" | null;

const config = {
  legal: {
    label: "Technology Law · Entrepreneurial Advisory",
    headline: "Your legal foundation,",
    sub: "built right.",
    body: "From incorporation and tax compliance to data privacy and international expansion — legal advisory that understands how tech companies actually work.",
    cta: "Book a Legal Consultation",
  },
  founder: {
    label: "Startup & NGO Advisory",
    headline: "Build a company",
    sub: "that holds.",
    body: "Co-founder agreements, equity structures, eTIMS compliance, and fundraising readiness. The legal infrastructure founders skip — and regret.",
    cta: "Talk to Decra",
  },
  exploring: {
    label: "Legal & Technology Advisory · Nairobi",
    headline: "Hi, I'm",
    sub: "Decra.",
    body: "Lawyer and computer scientist helping startups, NGOs, and founders navigate technology law and build structurally sound companies. Based in Nairobi, across Africa.",
    cta: "Book a Discovery Call",
  },
};

export function Hero({ intent }: { intent: Intent }) {
  const c = config[intent || "exploring"];

  return (
    <section style={{
      minHeight: "100svh", position: "relative", overflow: "hidden",
      background: "var(--c-bg)",
    }}>
      {/* Full bleed background image with blend */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
      }}>
        <img src="/decra-hero.png" alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top",
            opacity: 0.18, filter: "saturate(0.6) sepia(0.3)" }} />
        {/* Gradient overlay for readability */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(105deg, var(--c-bg) 45%, rgba(245,237,216,0.7) 65%, transparent 100%)",
        }} />
      </div>

      {/* Gold grain texture overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        backgroundImage: "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(196,162,101,0.08) 0%, transparent 70%)",
      }} />

      <div className="inner page-x" style={{
        position: "relative", zIndex: 2, width: "100%",
        display: "grid", gridTemplateColumns: "1.1fr 0.9fr",
        gap: "5rem", alignItems: "center",
        minHeight: "100svh", paddingTop: "9rem", paddingBottom: "6rem",
      }} id="hero-grid">

        {/* LEFT — text */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "2.25rem" }}>
            <span style={{ width: "1.5rem", height: "1px", background: "var(--c-accent)", display: "inline-block" }} />
            <span className="t-label">{c.label}</span>
          </div>

          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(3rem,5.5vw,5rem)", lineHeight: 1.06, color: "var(--c-ink)", marginBottom: "1.75rem" }}>
            {c.headline}<br />
            <em style={{ fontStyle: "italic", color: "var(--c-accent)" }}>{c.sub}</em>
          </h1>

          <p style={{ fontSize: "1.0625rem", color: "var(--c-ink-mid)", lineHeight: 1.85, maxWidth: "28rem", marginBottom: "2.75rem" }}>
            {c.body}
          </p>

          <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
            <Link href="/book" className="btn btn-ink">{c.cta} <ArrowRight size={13} /></Link>
            <a href="#services" className="btn btn-glass">Services</a>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "2.75rem" }}>
            {["Technology Law", "Startup & NGO Advisory", "Nairobi · Africa"].map(t => (
              <span key={t} style={{ fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.05em", padding: "0.32rem 0.85rem", border: "1px solid var(--c-border-strong)", color: "var(--c-ink-muted)", borderRadius: "2px", background: "var(--c-glass)", backdropFilter: "blur(8px)" }}>{t}</span>
            ))}
          </div>
        </div>

        {/* RIGHT — glassmorphism card over the image */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }} className="hero-right">

          {/* Photo card with glass overlay */}
          <div style={{ position: "relative", borderRadius: "4px", overflow: "hidden", aspectRatio: "3/4", maxHeight: "480px" }}>
            <img src="/decra-hero.png" alt="Decra Kerubo"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", filter: "saturate(0.9)" }} />
            {/* Glass name card over photo */}
            <div className="glass" style={{ position: "absolute", bottom: "1.25rem", left: "1rem", right: "1rem", borderRadius: "4px", padding: "1rem 1.25rem" }}>
              <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.05rem", color: "var(--c-ink)", marginBottom: "0.2rem" }}>Decra Kerubo</p>
              <p style={{ fontSize: "0.72rem", color: "var(--c-ink-muted)", marginBottom: "0.6rem" }}>Lawyer · Computer Scientist</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#5A9A5A", animation: "pulse-dot 2.2s infinite", flexShrink: 0 }} />
                <span style={{ fontSize: "0.7rem", color: "var(--c-ink-muted)" }}>Available · Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Stats glass strip */}
          <div className="glass" style={{ borderRadius: "4px", padding: "1.15rem 1.5rem", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", textAlign: "center" }}>
            {[["15 min", "Free call"], ["48h", "Response"], ["2", "Tracks"]].map(([v, l]) => (
              <div key={l}>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", color: "var(--c-accent)", lineHeight: 1, marginBottom: "0.2rem" }}>{v}</p>
                <p style={{ fontSize: "0.65rem", color: "var(--c-ink-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1}50%{opacity:0.35} }
        @media(max-width:860px){
          #hero-grid{grid-template-columns:1fr!important;gap:2.5rem!important}
          .hero-right{display:none!important}
        }
      `}</style>
    </section>
  );
}
