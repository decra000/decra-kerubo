import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Scale, Users, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: "Tech Policy & Startup Law, and Founder Legal advisory from Decra Kerubo.",
};

const tracks = [
  {
    id: "tech-law",
    icon: Scale,
    number: "01",
    label: "Tech Policy & Startup Law",
    audience: "For companies and products",
    tagline: "When your product, data, or technology faces legal exposure.",
    distinction: "This track is about your company's legal surface — the contracts you sign, the data you collect, the IP you build, and the regulations you must navigate. It's about protecting what you've built from the outside in.",
    problem: "Technology moves fast. Law moves slow. The gap between them is where most startups get exposed — through poor IP protection, weak contracts, or data privacy violations they didn't know they were committing. By the time it surfaces, it's expensive.",
    solution: "Legal advisory specifically for technology companies and startups — helping you map and reduce your legal exposure before it finds you. This includes tech policy research where your sector needs it.",
    process: [
      "Legal audit of current structure and exposure",
      "IP strategy and protection planning",
      "Contract review and drafting",
      "Data privacy and compliance gap analysis",
      "Regulatory mapping for your sector",
      "Ongoing advisory retainer (optional)",
    ],
    deliverables: ["Legal Audit Report", "IP Strategy Document", "Contract Templates", "Compliance Checklist", "Regulatory Risk Map"],
    outcomes: ["Protected intellectual property", "Legally sound contracts", "Data privacy compliance", "Reduced regulatory exposure", "Clearer policy positioning"],
    offerings: ["Technology Law Advisory", "IP Protection Strategy", "Data Privacy & Compliance", "Regulatory Frameworks", "Tech Contracts", "Policy Research", "Risk Assessment"],
  },
  {
    id: "founder-legal",
    icon: Users,
    number: "02",
    label: "Founder Legal",
    audience: "For founders and entrepreneurs",
    tagline: "When the legal decisions are about you — not just your company.",
    distinction: "This track is about the founder as a person — how you structure your ownership, protect your equity, navigate tax decisions, and set up governance that doesn't come back to haunt you. It's inside-out: your rights, your risks, your future.",
    problem: "Most founders treat legal structure as paperwork. Wrong company type, informal equity arrangements, no vesting, unclear tax positions — these aren't administrative oversights. They determine how much of what you build you actually keep.",
    solution: "Helping founders make sound legal decisions at the right time — from the first day of incorporation through to fundraising readiness. The focus is always on what this decision means for you, not just the entity.",
    process: [
      "Founder situation assessment",
      "Structure and incorporation advisory",
      "Equity split and vesting design",
      "Co-founder agreement drafting",
      "Tax structuring guidance",
      "Governance framework setup",
      "Fundraising legal readiness check",
    ],
    deliverables: ["Incorporation Advisory Report", "Founder Agreement Template", "Equity & Vesting Framework", "Governance Document", "Fundraising Legal Checklist"],
    outcomes: ["Correctly structured entity", "Protected founder equity", "Clean cap table", "Tax-efficient structure", "Investment-ready legal standing"],
    offerings: ["Company Incorporation", "Founder Agreements & Equity", "Tax Decision Guidance", "Co-founder Structuring", "Governance Setup", "IP Registration", "Fundraising Readiness"],
  },
];

const faqs = [
  { q: "What's the difference between the two tracks?", a: "Tech Policy & Startup Law protects your company and product — IP, contracts, data, regulation. Founder Legal protects you as a person — your equity, structure, tax position, and governance rights. Some clients need both; many start with one." },
  { q: "Do you work with clients outside Kenya?", a: "Yes. Based in Nairobi, I work across East Africa and internationally. Most sessions are via Google Meet." },
  { q: "What does a typical engagement look like?", a: "It starts with a discovery call, followed by a scoped engagement based on your specific needs. Some clients engage for a single strategy session; others retain ongoing support." },
  { q: "Are you a practising advocate?", a: "I hold a Bachelor of Laws and advise at a strategic level. For formal legal representation or filing, I refer to practising advocates within my network." },
  { q: "I'm not sure which track I need.", a: "Book a discovery call. In 15 minutes we'll identify the right starting point — no pressure, no obligation." },
];

export default function ServicesPage() {
  return (
    <div style={{ background: "var(--c-bg)", paddingTop: "6rem" }}>

      {/* ── Header ── */}
      <section className="section page-x" style={{ borderBottom: "1px solid var(--c-border)" }}>
        <div className="inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "end" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
              <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
              <span className="t-label">Advisory Services</span>
            </div>
            <h1 className="t-display t-display-xl">Two tracks. One question: what do you need protected?</h1>
          </div>
          <div>
            <p className="t-body" style={{ marginBottom: "1.5rem" }}>
              Most legal problems for founders and tech organizations fall into one of two categories — exposure at the company level, or vulnerability at the founder level. The advisory is structured accordingly.
            </p>
            {/* Entrora referral banner */}
            <a href="https://entrorasystems.com" target="_blank" rel="noopener noreferrer"
              className="entrora-banner"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", background: "var(--c-forest)", borderRadius: "10px", padding: "0.9rem 1.1rem", textDecoration: "none" }}
            >
              <div>
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: "0.25rem" }}>Need AI Engineering?</p>
                <p style={{ fontSize: "0.78rem", color: "rgba(248,246,241,0.75)", lineHeight: 1.4 }}>That's handled through <strong style={{ color: "rgba(248,246,241,0.95)" }}>Entrora Systems</strong> — Decra's tech development practice.</p>
              </div>
              <ExternalLink size={16} style={{ color: "var(--c-gold)", flexShrink: 0 }} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Service Tracks ── */}
      <section className="page-x" style={{ paddingBottom: "var(--space-section)" }}>
        <div className="inner">
          {tracks.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={s.id} id={s.id} style={{ scrollMarginTop: "6rem", paddingTop: "4rem", paddingBottom: "4rem", borderBottom: "1px solid var(--c-border)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: "4rem" }}>
                  {/* Left: sticky summary */}
                  <div style={{ position: "sticky", top: "6rem", alignSelf: "start" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
                      <div style={{ width: "2.25rem", height: "2.25rem", borderRadius: "8px", background: "rgba(14,61,50,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon size={16} style={{ color: "var(--c-forest)" }} />
                      </div>
                      <span className="t-label">{s.number}</span>
                    </div>
                    <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: "0.4rem" }}>{s.audience}</p>
                    <h2 className="t-display t-display-md" style={{ marginBottom: "0.6rem" }}>{s.label}</h2>
                    <p style={{ fontSize: "0.775rem", fontStyle: "italic", color: "var(--c-ink-muted)", marginBottom: "1.5rem", lineHeight: 1.6 }}>{s.tagline}</p>

                    {/* The key distinction */}
                    <div style={{ background: "rgba(14,61,50,0.04)", borderLeft: "2px solid var(--c-forest)", padding: "0.85rem 1rem", borderRadius: "0 8px 8px 0", marginBottom: "1.75rem" }}>
                      <p style={{ fontSize: "0.75rem", color: "var(--c-ink-mid)", lineHeight: 1.65 }}>{s.distinction}</p>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2rem" }}>
                      {s.offerings.map(o => (
                        <span key={o} style={{ fontSize: "0.62rem", padding: "0.22rem 0.6rem", borderRadius: "100px", border: "1px solid rgba(14,61,50,0.16)", color: "var(--c-forest)" }}>{o}</span>
                      ))}
                    </div>
                    <Link href="/book" className="btn-primary">Book a Consultation <ArrowRight size={13} /></Link>
                  </div>

                  {/* Right: detail cards */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                    {[{ label: "The Problem", text: s.problem }, { label: "The Solution", text: s.solution }].map(block => (
                      <div key={block.label} className="card">
                        <p className="t-label" style={{ marginBottom: "0.75rem" }}>{block.label}</p>
                        <p className="t-body">{block.text}</p>
                      </div>
                    ))}
                    <div className="card">
                      <p className="t-label" style={{ marginBottom: "1rem" }}>Process</p>
                      <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                        {s.process.map((step, i) => (
                          <li key={i} style={{ display: "flex", gap: "1rem", fontSize: "0.8rem", color: "var(--c-ink-mid)" }}>
                            <span style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, color: "var(--c-gold)", minWidth: "1.25rem", fontSize: "0.68rem", paddingTop: "0.1rem" }}>{String(i + 1).padStart(2, "0")}</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem" }}>
                      <div className="card">
                        <p className="t-label" style={{ marginBottom: "1rem" }}>Deliverables</p>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                          {s.deliverables.map(d => (
                            <li key={d} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.75rem", color: "var(--c-ink-mid)" }}>
                              <CheckCircle2 size={11} style={{ color: "var(--c-gold)", marginTop: "0.2rem", flexShrink: 0 }} />{d}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div style={{ background: "var(--c-forest)", borderRadius: "12px", padding: "1.6rem" }}>
                        <p className="t-label" style={{ marginBottom: "1rem" }}>Outcomes</p>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                          {s.outcomes.map(o => (
                            <li key={o} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.75rem", color: "rgba(248,246,241,0.55)" }}>
                              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--c-gold)", marginTop: "0.45rem", flexShrink: 0 }} />{o}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="section page-x" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div className="inner" style={{ maxWidth: "44rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "3rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">FAQs</span>
          </div>
          <h2 className="t-display t-display-md" style={{ marginBottom: "2.5rem" }}>Common questions.</h2>
          {faqs.map(f => (
            <div key={f.q} style={{ borderBottom: "1px solid var(--c-border)", paddingBottom: "1.75rem", marginBottom: "1.75rem" }}>
              <h3 style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.875rem", color: "var(--c-forest)", marginBottom: "0.5rem" }}>{f.q}</h3>
              <p className="t-body-sm">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .entrora-banner { transition: opacity 0.2s; }
        .entrora-banner:hover { opacity: 0.85; }
        @media(max-width:768px){
          .inner{grid-template-columns:1fr !important; gap:2.5rem !important;}
          .inner > div > div{grid-template-columns:1fr !important; position:static !important;}
        }
      `}</style>
    </div>
  );
}
