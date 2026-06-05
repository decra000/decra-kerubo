"use client";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export function Hero() {
  return (
    <section style={{
      minHeight: "100svh",
      display: "flex",
      alignItems: "center",
      background: "var(--c-bg)",
      paddingLeft: "var(--space-page-x)",
      paddingRight: "var(--space-page-x)",
      paddingTop: "7rem",
      paddingBottom: "5rem",
    }}>
      <div className="inner" style={{ width: "100%", maxWidth: "52rem" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "2.5rem" }}>
          <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
          <span className="t-label">Nairobi, Kenya · Law & Technology</span>
        </div>

        <h1 className="t-display t-display-xl" style={{ maxWidth: "32rem", marginBottom: "1.75rem" }}>
          Law, research, and AI engineering — three distinct practices.
        </h1>

        <p className="t-body" style={{ maxWidth: "30rem", marginBottom: "3.5rem" }}>
          Legal advisory for startups, NGOs, and founders across East Africa. Tech harm research through The 1000 initiative. AI systems through Entrora Systems.
        </p>

        {/* Three tracks — clean, direct */}
        <div className="hero-tracks" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", border: "1px solid var(--c-border)", borderRadius: "12px", overflow: "hidden", marginBottom: "3rem" }}>
          {[
            {
              label: "Legal Consulting",
              desc: "For entrepreneurs, startups, and NGOs. Tax, incorporation, structuring, compliance, and international expansion.",
              href: "/services",
              cta: "View services →",
            },
            {
              label: "The 1000",
              desc: "Tech-enabled harm has faces. A Spotify initiative featuring real stories of people affected by ungoverned technology.",
              href: "https://open.spotify.com/show/placeholder",
              cta: "Listen on Spotify →",
              external: true,
            },
            {
              label: "AI Engineering",
              desc: "Building and deploying AI systems. This is handled through Entrora Systems.",
              href: "https://entrorasystems.com",
              cta: "entrorasystems.com →",
              external: true,
            },
          ].map((t, i) => (
            <div key={t.label} style={{
              padding: "1.5rem 1.35rem",
              borderRight: i < 2 ? "1px solid var(--c-border)" : "none",
              background: "var(--c-surface)",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}>
              <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.875rem", color: "var(--c-forest)" }}>{t.label}</p>
              <p style={{ fontSize: "0.72rem", color: "var(--c-ink-muted)", lineHeight: 1.6, flex: 1 }}>{t.desc}</p>
              {t.external ? (
                <a href={t.href} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--c-forest)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                  {t.cta}
                </a>
              ) : (
                <span style={{ fontSize: "0.68rem", color: "var(--c-ink-muted)" }}>{t.cta}</span>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          <Link href="/book" className="btn-primary">
            Book a Discovery Call <ArrowRight size={13} />
          </Link>
          <Link href="/services" className="btn-text">
            See what's covered <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hero-tracks { grid-template-columns: 1fr !important; }
          .hero-tracks > div { border-right: none !important; border-bottom: 1px solid var(--c-border); }
          .hero-tracks > div:last-child { border-bottom: none; }
        }
      `}</style>
    </section>
  );
}
