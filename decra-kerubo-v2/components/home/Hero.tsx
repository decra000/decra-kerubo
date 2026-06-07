"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section style={{
      minHeight: "100svh",
      display: "flex",
      alignItems: "center",
      background: "var(--c-bg)",
      paddingLeft: "var(--space-page-x)",
      paddingRight: "var(--space-page-x)",
      paddingTop: "8rem",
      paddingBottom: "6rem",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle sage background texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(124,140,110,0.08) 0%, transparent 70%)",
      }} />

      <div className="inner" style={{ width: "100%", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 420px", gap: "6rem", alignItems: "center" }} id="hero-grid">
        {/* Left */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "2.25rem" }}>
            <span style={{ display: "inline-block", width: "1.75rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">Nairobi, Kenya · Technology Law & Entrepreneurial Advisory</span>
          </div>

          <h1 className="t-display t-display-xl" style={{ marginBottom: "1.75rem", maxWidth: "28rem" }}>
            Protecting what you build.
          </h1>

          <p className="t-body" style={{ maxWidth: "28rem", marginBottom: "1rem" }}>
            Legal consulting for founders, startups, and NGOs navigating the intersection of technology and law — from first incorporation through international expansion.
          </p>
          <p className="t-body" style={{ maxWidth: "28rem", marginBottom: "3rem" }}>
            Two disciplines. One practice. Based in Nairobi.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/book" className="btn-primary">
              Book a Discovery Call <ArrowRight size={14} />
            </Link>
            <Link href="/services" className="btn-outline">
              See what's covered
            </Link>
          </div>
        </div>

        {/* Right — clean sage panel, no photo */}
        <div className="hero-panel" style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {/* Two main tracks */}
          {[
            {
              tag: "Technology Law",
              headline: "Keeping your product legally sound.",
              items: ["Data privacy & ODPC compliance", "Tech contracts & IP", "Regulatory mapping", "International structuring"],
            },
            {
              tag: "Entrepreneurial Law",
              headline: "Building a company that holds.",
              items: ["Incorporation & company structure", "Tax & eTIMS compliance", "Founder equity & vesting", "Fundraising readiness"],
            },
          ].map((track, i) => (
            <div key={track.tag} style={{
              padding: "1.75rem",
              background: i === 0 ? "var(--c-sage-deep)" : "var(--c-sage-light)",
              borderRadius: i === 0 ? "14px 14px 0 0" : "0 0 14px 14px",
            }}>
              <span style={{
                display: "inline-block", fontSize: "0.62rem", fontWeight: 700,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: i === 0 ? "var(--c-gold)" : "var(--c-sage-dark)",
                marginBottom: "0.6rem",
              }}>{track.tag}</span>
              <p style={{
                fontFamily: "var(--font-serif)", fontSize: "1.05rem",
                color: i === 0 ? "rgba(244,245,240,0.92)" : "var(--c-sage-deep)",
                marginBottom: "1rem", lineHeight: 1.35,
              }}>{track.headline}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {track.items.map(item => (
                  <div key={item} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                    <span style={{ color: i === 0 ? "var(--c-gold)" : "var(--c-sage)", fontSize: "0.7rem", marginTop: "0.25rem", flexShrink: 0 }}>—</span>
                    <span style={{ fontSize: "0.825rem", color: i === 0 ? "rgba(244,245,240,0.65)" : "var(--c-ink-mid)", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {/* Entrora strip */}
          <a href="https://entrorasystems.com" target="_blank" rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0.9rem 1.25rem", marginTop: "0.65rem",
              background: "var(--c-surface)", border: "1px solid var(--c-border)",
              borderRadius: "10px", textDecoration: "none",
            }}>
            <div>
              <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-sage)", display: "block", marginBottom: "0.15rem" }}>AI Engineering</span>
              <span style={{ fontSize: "0.8rem", color: "var(--c-sage-deep)", fontWeight: 700 }}>Entrora Systems</span>
            </div>
            <ArrowRight size={14} color="var(--c-sage)" />
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .hero-panel { max-width: 480px; }
        }
      `}</style>
    </section>
  );
}
