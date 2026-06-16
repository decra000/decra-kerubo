"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, CheckCircle2, Scale, Users, ExternalLink } from "lucide-react";

const tracks = [
  {
    id: "tech",
    icon: Scale,
    number: "01",
    label: "Technology Law",
    audience: "For companies and products",
    tagline: "When your product, data, or technology faces legal exposure.",
    distinction: "This track covers your company's legal surface — IP, contracts, data privacy, and the regulations you must navigate.",
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
    offerings: ["Technology Law Advisory", "IP Protection Strategy", "Data Privacy & Compliance", "Regulatory Frameworks", "Tech Contracts", "Policy Research"],
  },
  {
    id: "founder",
    icon: Users,
    number: "02",
    label: "Founder Legal",
    audience: "For founders and entrepreneurs",
    tagline: "When the legal decisions are about you — not just your company.",
    distinction: "This track is about the founder as a person — how you structure ownership, protect equity, navigate tax, and set up governance that doesn't haunt you later.",
    problem: "Most founders treat legal structure as paperwork. Wrong company type, informal equity arrangements, no vesting, unclear tax positions — these aren't administrative oversights. They determine how much of what you build you actually keep.",
    solution: "Helping founders make sound legal decisions at the right time — from the first day of incorporation through to fundraising readiness. Focus is always on what this decision means for you, not just the entity.",
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
    offerings: ["Company Incorporation", "Founder Agreements & Equity", "Tax Decision Guidance", "Co-founder Structuring", "Governance Setup", "Fundraising Readiness"],
  },
];

const faqs = [
  { q: "What is the difference between the two tracks?", a: "Technology Law protects your company and product — IP, contracts, data, regulation. Founder Legal protects you as a person — your equity, structure, tax position, and governance rights. Some clients need both; many start with one." },
  { q: "Do you work with clients outside Kenya?", a: "Yes. Based in Nairobi, I work across East Africa and internationally. Most sessions are via Google Meet." },
  { q: "What does a typical engagement look like?", a: "It starts with a discovery call, followed by a scoped engagement. Some clients engage for a single strategy session; others retain ongoing support." },
  { q: "Are you a practising advocate?", a: "I hold a Bachelor of Laws and advise at a strategic level. For formal legal representation or filing, I refer to practising advocates within my network." },
];

export function ServicesPreview({ intent }: { intent?: string | null }) {
  const [active, setActive] = useState<number | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    if (intent === "founder") setActive(1);
    else if (intent === "legal") setActive(0);
  }, [intent]);

  const handleTrackClick = (i: number) => {
    const next = active === i ? null : i;
    setActive(next);
    if (next !== null) {
      setTimeout(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
    }
  };

  return (
    <section id="services" className="page-x" style={{ background: "var(--c-bg)", borderTop: "1px solid var(--c-border)", paddingTop: "var(--space-section)", paddingBottom: "var(--space-section)" }}>
      <div className="inner" ref={ref}>

        {/* Section header */}
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "all 0.6s ease", marginBottom: "4rem" }}>
          <p className="t-label" style={{ marginBottom: "1rem" }}>Advisory Services</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "end" }} id="svc-header-grid">
            <h2 className="t-display t-display-lg">Two tracks.<br />One question.</h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--c-ink-muted)", lineHeight: 1.8 }}>
              Most legal challenges for founders and tech organisations fall into two categories — exposure at the company level, or vulnerability at the founder level.
            </p>
          </div>
        </div>

        {/* Track selector */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--c-border)", marginBottom: "1px", opacity: vis ? 1 : 0, transition: "opacity 0.6s ease 0.15s" }} id="track-grid">
          {tracks.map((t, i) => {
            const Icon = t.icon;
            const isActive = active === i;
            return (
              <button
                key={t.id}
                onClick={() => handleTrackClick(i)}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "2.5rem 2.75rem",
                  background: isActive ? "var(--c-ink)" : "var(--c-surface)",
                  border: "none", cursor: "pointer",
                  transition: "background 0.3s",
                  position: "relative", overflow: "hidden",
                }}
              >
                {isActive && (
                  <div style={{ position: "absolute", top: 0, right: 0, width: "200px", height: "200px", background: "radial-gradient(circle, rgba(196,162,101,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                  <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "6px", background: isActive ? "rgba(196,162,101,0.15)" : "rgba(196,162,101,0.08)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}>
                    <Icon size={15} style={{ color: "var(--c-accent)" }} />
                  </div>
                  <ChevronDown size={16} style={{ color: isActive ? "var(--c-accent)" : "var(--c-ink-muted)", transform: isActive ? "rotate(180deg)" : "none", transition: "transform 0.3s, color 0.3s" }} />
                </div>
                <p style={{ fontFamily: "var(--font-manjari)", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--c-accent)", marginBottom: "0.4rem" }}>{t.number}</p>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem,2.2vw,1.8rem)", color: isActive ? "var(--c-bg)" : "var(--c-ink)", marginBottom: "0.5rem", transition: "color 0.3s", lineHeight: 1.1 }}>{t.label}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: isActive ? "rgba(245,237,216,0.45)" : "var(--c-ink-muted)", lineHeight: 1.65, transition: "color 0.3s", maxWidth: "28rem" }}>{t.tagline}</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "1.5rem" }}>
                  {t.offerings.slice(0, 3).map(o => (
                    <span key={o} style={{ fontFamily: "var(--font-manjari)", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em", padding: "0.2rem 0.55rem", borderRadius: "100px", border: `1px solid ${isActive ? "rgba(196,162,101,0.3)" : "var(--c-border-strong)"}`, color: isActive ? "rgba(245,237,216,0.5)" : "var(--c-ink-muted)", transition: "all 0.3s" }}>{o}</span>
                  ))}
                  <span style={{ fontFamily: "var(--font-manjari)", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em", padding: "0.2rem 0.55rem", borderRadius: "100px", border: `1px solid ${isActive ? "rgba(196,162,101,0.3)" : "var(--c-border-strong)"}`, color: isActive ? "rgba(196,162,101,0.7)" : "var(--c-ink-muted)", transition: "all 0.3s" }}>+{t.offerings.length - 3} more</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Expanded detail panel */}
        <div ref={detailRef} style={{
          maxHeight: active !== null ? "1200px" : "0",
          overflow: "hidden",
          transition: "max-height 0.55s cubic-bezier(0.4,0,0.2,1)",
          background: "var(--c-surface)",
          border: active !== null ? "1px solid var(--c-border)" : "none",
          borderTop: "none",
        }}>
          {active !== null && (() => {
            const t = tracks[active];
            return (
              <div style={{ padding: "3rem 2.75rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: "4rem" }} id="detail-inner-grid">

                  {/* Left */}
                  <div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontStyle: "italic", color: "var(--c-ink-muted)", lineHeight: 1.7, marginBottom: "2rem" }}>{t.distinction}</p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "2rem" }}>
                      {t.offerings.map(o => (
                        <span key={o} style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.06em", padding: "0.22rem 0.6rem", borderRadius: "100px", border: "1px solid var(--c-border-strong)", color: "var(--c-ink-muted)" }}>{o}</span>
                      ))}
                    </div>

                    <p className="t-label" style={{ marginBottom: "0.75rem" }}>Deliverables</p>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.45rem", marginBottom: "2rem" }}>
                      {t.deliverables.map(d => (
                        <li key={d} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--c-ink-mid)" }}>
                          <CheckCircle2 size={11} style={{ color: "var(--c-accent)", marginTop: "0.2rem", flexShrink: 0 }} />{d}
                        </li>
                      ))}
                    </ul>

                    <Link href="/book" className="btn btn-accent" style={{ display: "inline-flex" }}>Book a Consultation <ArrowRight size={13} /></Link>
                  </div>

                  {/* Right */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {[{ label: "The Problem", text: t.problem }, { label: "The Approach", text: t.solution }].map(block => (
                      <div key={block.label} style={{ padding: "1.5rem", background: "var(--c-bg)", border: "1px solid var(--c-border)", borderRadius: "2px" }}>
                        <p className="t-label" style={{ marginBottom: "0.6rem" }}>{block.label}</p>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", lineHeight: 1.8, color: "var(--c-ink-mid)" }}>{block.text}</p>
                      </div>
                    ))}

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      {/* Process */}
                      <div style={{ padding: "1.5rem", background: "var(--c-bg)", border: "1px solid var(--c-border)", borderRadius: "2px" }}>
                        <p className="t-label" style={{ marginBottom: "0.85rem" }}>Process</p>
                        <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                          {t.process.map((step, i) => (
                            <li key={i} style={{ display: "flex", gap: "0.75rem", fontFamily: "var(--font-sans)", fontSize: "0.775rem", color: "var(--c-ink-mid)" }}>
                              <span style={{ fontFamily: "var(--font-serif)", color: "var(--c-accent)", minWidth: "1.25rem", fontSize: "0.7rem", paddingTop: "0.1rem", flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Outcomes — DARK background, not light */}
                      <div style={{ padding: "1.5rem", background: "var(--c-ink)", border: "1px solid var(--c-border)", borderRadius: "2px" }}>
                        <p className="t-label" style={{ marginBottom: "0.85rem", color: "rgba(245,237,216,0.4)" }}>Outcomes</p>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                          {t.outcomes.map(o => (
                            <li key={o} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontFamily: "var(--font-sans)", fontSize: "0.775rem", color: "rgba(245,237,216,0.6)" }}>
                              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--c-accent)", marginTop: "0.45rem", flexShrink: 0 }} />{o}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* FAQs */}
        <div style={{ marginTop: "5rem", opacity: vis ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}>
          <p className="t-label" style={{ marginBottom: "2.5rem" }}>Common questions</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ borderTop: "1px solid var(--c-border)" }}>
                <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "2rem" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 500, color: "var(--c-ink)", lineHeight: 1.5 }}>{f.q}</span>
                  <ChevronDown size={14} style={{ color: "var(--c-ink-muted)", flexShrink: 0, transform: expandedFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.25s" }} />
                </button>
                <div style={{ maxHeight: expandedFaq === i ? "200px" : "0", overflow: "hidden", transition: "max-height 0.35s ease" }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--c-ink-muted)", lineHeight: 1.8, paddingBottom: "1.25rem", paddingRight: "2rem" }}>{f.a}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--c-border)" }} />
          </div>
        </div>

        {/* Footer strip */}
        <div style={{ marginTop: "4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", opacity: vis ? 1 : 0, transition: "opacity 0.6s ease 0.4s" }} id="svc-footer-grid">
          <a href="https://entrorasystems.com" target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: "2px", padding: "1.25rem 1.5rem", textDecoration: "none", transition: "border-color 0.2s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"}
          >
            <div>
              <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-accent)", marginBottom: "0.3rem" }}>Need AI Engineering?</p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--c-ink-muted)" }}>Handled through <strong style={{ color: "var(--c-ink)" }}>Entrora Systems</strong></p>
            </div>
            <ExternalLink size={14} style={{ color: "var(--c-ink-muted)", flexShrink: 0 }} />
          </a>
          <Link href="/book" className="btn btn-accent" style={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "2px" }}>
            Book a Discovery Call <ArrowRight size={13} />
          </Link>
        </div>

      </div>

      <style>{`
        @media(max-width:768px) {
          #svc-header-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          #track-grid { grid-template-columns: 1fr !important; }
          #detail-inner-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          #svc-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
