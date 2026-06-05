"use client";
import Link from "next/link";
import { ArrowRight, ExternalLink, Scale, Users } from "lucide-react";

const tracks = [
  {
    id: "tech-law",
    icon: Scale,
    audience: "For companies & products",
    label: "Tech Policy & Startup Law",
    description: "IP protection, data privacy, contracts, and regulatory clarity — protecting what your company has built from the outside in.",
    examples: ["IP strategy & registration", "Data privacy compliance", "Tech contracts & agreements", "Regulatory mapping"],
    href: "/services#tech-law",
  },
  {
    id: "founder-legal",
    icon: Users,
    audience: "For founders & entrepreneurs",
    label: "Founder Legal",
    description: "Equity, incorporation, co-founder agreements, and governance — protecting you as the person building the company.",
    examples: ["Company structure & incorporation", "Founder equity & vesting", "Co-founder agreements", "Fundraising readiness"],
    href: "/services#founder-legal",
  },
];

export function ServicesPreview() {
  return (
    <section className="section page-x" style={{ background: "var(--c-surface)" }}>
      <div className="inner">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
              <span className="t-label">Advisory Services</span>
            </div>
            <h2 className="t-display t-display-lg">What do you need protected?</h2>
          </div>
          <Link href="/services" className="btn-text">Full breakdown <ArrowRight size={12} /></Link>
        </div>

        {/* Two tracks side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
          {tracks.map(t => {
            const Icon = t.icon;
            return (
              <div key={t.id} className="card" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <div style={{ width: "2rem", height: "2rem", borderRadius: "7px", background: "rgba(14,61,50,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={14} style={{ color: "var(--c-forest)" }} />
                  </div>
                  <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-gold)" }}>{t.audience}</span>
                </div>
                <h3 className="t-display t-display-sm" style={{ marginBottom: "0.65rem" }}>{t.label}</h3>
                <p className="t-body-sm" style={{ marginBottom: "1.25rem", flex: 1 }}>{t.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
                  {t.examples.map(e => (
                    <span key={e} style={{ fontSize: "0.62rem", color: "var(--c-ink-muted)", background: "rgba(28,28,26,0.04)", padding: "0.2rem 0.55rem", borderRadius: "100px" }}>{e}</span>
                  ))}
                </div>
                <Link href={t.href} className="btn-text" style={{ alignSelf: "flex-start" }}>
                  Learn more <ArrowRight size={11} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Entrora referral — ad-style, clearly different */}
        <a href="https://entrorasystems.com" target="_blank" rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", background: "var(--c-forest)", borderRadius: "10px", padding: "1.1rem 1.4rem", textDecoration: "none", border: "1px solid rgba(14,61,50,0.0)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: "1.75rem", height: "1.75rem", borderRadius: "6px", background: "rgba(248,246,241,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "var(--c-gold)" }}>AI</span>
            </div>
            <div>
              <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: "0.2rem" }}>Need AI Engineering?</p>
              <p style={{ fontSize: "0.78rem", color: "rgba(248,246,241,0.65)" }}>
                Built and delivered through <strong style={{ color: "rgba(248,246,241,0.9)", fontWeight: 700 }}>Entrora Systems</strong> — Decra's tech development practice.
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--c-gold)", flexShrink: 0 }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700 }}>entrorasystems.com</span>
            <ExternalLink size={13} />
          </div>
        </a>
      </div>
      <style>{`@media(max-width:768px){.inner > div:nth-child(2){grid-template-columns:1fr !important;} .inner > a{flex-direction:column !important; align-items:flex-start !important;}}`}</style>
    </section>
  );
}
