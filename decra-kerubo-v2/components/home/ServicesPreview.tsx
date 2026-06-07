"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const techLaw = [
  { area: "Data Privacy & ODPC", desc: "Compliance frameworks, privacy policies, DPAs — for products handling user data." },
  { area: "Tech Contracts & IP", desc: "SaaS agreements, IP registration, licensing, NDAs, and software development contracts." },
  { area: "Regulatory Mapping", desc: "Identifying the regulatory landscape before you build or launch." },
  { area: "International Expansion", desc: "Cross-border structuring for companies growing across Africa and beyond." },
];

const entrepreneurLaw = [
  { area: "Incorporation & Structure", desc: "Choosing the right entity, setting up shareholding, governance, and constitutional documents." },
  { area: "Tax & Compliance", desc: "KRA, eTIMS, VAT, PAYE — structured correctly from the start." },
  { area: "Founder Equity & Vesting", desc: "Cap tables, vesting schedules, and co-founder agreements that hold up." },
  { area: "Fundraising Readiness", desc: "Term sheets, investor agreements, and legal preparation for raising capital." },
];

function ServiceGrid({ items }: { items: typeof techLaw }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", borderTop: "1px solid var(--c-border)", borderLeft: "1px solid var(--c-border)" }}>
      {items.map(s => (
        <div key={s.area} style={{ padding: "1.5rem 1.4rem", borderRight: "1px solid var(--c-border)", borderBottom: "1px solid var(--c-border)" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", color: "var(--c-sage-deep)", marginBottom: "0.4rem" }}>{s.area}</p>
          <p style={{ fontSize: "0.875rem", color: "var(--c-ink-muted)", lineHeight: 1.7 }}>{s.desc}</p>
        </div>
      ))}
    </div>
  );
}

export function ServicesPreview() {
  return (
    <section className="section page-x" style={{ background: "var(--c-surface)", borderTop: "1px solid var(--c-border)" }}>
      <div className="inner">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "4rem", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1rem" }}>
              <span style={{ display: "inline-block", width: "1.75rem", height: "1px", background: "var(--c-gold)" }} />
              <span className="t-label">Advisory Services</span>
            </div>
            <h2 className="t-display t-display-lg">What's covered.</h2>
          </div>
          <Link href="/services" className="btn-text">Full scope <ArrowRight size={12} /></Link>
        </div>

        {/* Technology Law */}
        <div style={{ marginBottom: "3.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "8px", background: "var(--c-sage-deep)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "var(--c-gold)", letterSpacing: "0.1em" }}>TL</span>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", color: "var(--c-sage-deep)" }}>Technology Law</p>
              <p style={{ fontSize: "0.825rem", color: "var(--c-ink-muted)" }}>For companies building or operating digital products.</p>
            </div>
          </div>
          <ServiceGrid items={techLaw} />
        </div>

        {/* Entrepreneurial Law */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "8px", background: "var(--c-sage-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "var(--c-sage-dark)", letterSpacing: "0.1em" }}>EL</span>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", color: "var(--c-sage-deep)" }}>Entrepreneurial Law</p>
              <p style={{ fontSize: "0.825rem", color: "var(--c-ink-muted)" }}>For founders, startups, and NGOs building from the ground up.</p>
            </div>
          </div>
          <ServiceGrid items={entrepreneurLaw} />
        </div>

        <Link href="/book" className="btn-primary">Book a Discovery Call <ArrowRight size={14} /></Link>
      </div>
      <style>{`@media(max-width:640px){ div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
