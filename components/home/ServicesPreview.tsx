"use client";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

const services = [
  { area: "Incorporation & Structure", desc: "Set up correctly from day one — company type, shareholding, governance." },
  { area: "Tax & Compliance", desc: "KRA obligations, eTIMS, VAT, PAYE — for local and cross-border operations." },
  { area: "Contracts & IP", desc: "SaaS agreements, NDAs, IP registration, licensing." },
  { area: "Data Privacy", desc: "ODPC compliance, privacy policies, data processing agreements." },
  { area: "International Expansion", desc: "Multi-jurisdiction structuring for Africa and beyond." },
  { area: "Fundraising Readiness", desc: "Cap tables, equity, term sheets, investor agreements." },
];

export function ServicesPreview() {
  return (
    <section className="section page-x" style={{ background: "var(--c-surface)", borderTop: "1px solid var(--c-border)" }}>
      <div className="inner">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
              <span className="t-label">Legal Consulting</span>
            </div>
            <h2 className="t-display t-display-lg">What's covered.</h2>
            <p className="t-body" style={{ maxWidth: "30rem", marginTop: "0.75rem" }}>
              For startups, NGOs, and founders — from first incorporation through regional expansion.
            </p>
          </div>
          <Link href="/services" className="btn-text">Full scope <ArrowRight size={12} /></Link>
        </div>

        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", borderTop: "1px solid var(--c-border)", borderLeft: "1px solid var(--c-border)" }}>
          {services.map((s) => (
            <div key={s.area} style={{ padding: "1.5rem 1.35rem", borderRight: "1px solid var(--c-border)", borderBottom: "1px solid var(--c-border)" }}>
              <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.825rem", color: "var(--c-forest)", marginBottom: "0.4rem" }}>{s.area}</p>
              <p style={{ fontSize: "0.72rem", color: "var(--c-ink-muted)", lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "1.25rem", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          <Link href="/book" className="btn-primary">Book a Call <ArrowRight size={13} /></Link>
          <a href="https://entrorasystems.com" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.72rem", color: "var(--c-ink-muted)", textDecoration: "none" }}>
            AI Engineering via Entrora Systems <ExternalLink size={11} />
          </a>
        </div>
      </div>
      <style>{`@media(max-width:640px){ .services-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
