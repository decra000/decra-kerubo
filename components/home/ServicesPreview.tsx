"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, CheckCircle2, ExternalLink } from "lucide-react";

const tracks = [
  {
    id: "tech",
    number: "I",
    label: "Technology Law",
    tagline: "When your product, data, or technology faces legal exposure.",
    distinction: "Your company's legal surface — IP, contracts, data privacy, and the regulations you must navigate.",
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
    offerings: ["Technology Law", "IP Strategy", "Data Privacy & Compliance", "Regulatory Frameworks", "Tech Contracts", "Policy Research"],
  },
  {
    id: "founder",
    number: "II",
    label: "Founder Legal",
    tagline: "When the legal decisions are about you — not just your company.",
    distinction: "The founder as a person — ownership structure, equity protection, tax decisions, and governance that doesn't haunt you later.",
    problem: "Most founders treat legal structure as paperwork. Wrong company type, informal equity arrangements, no vesting, unclear tax positions — these aren't administrative oversights. They determine how much of what you build you actually keep.",
    solution: "Helping founders make sound legal decisions at the right time — from incorporation through to fundraising readiness. The focus is always on what this decision means for you, not just the entity.",
    process: [
      "Founder situation assessment",
      "Structure and incorporation advisory",
      "Equity split and vesting design",
      "Co-founder agreement drafting",
      "Tax structuring guidance",
      "Governance framework setup",
      "Fundraising legal readiness check",
    ],
    deliverables: ["Incorporation Advisory", "Founder Agreement Template", "Equity & Vesting Framework", "Governance Document", "Fundraising Checklist"],
    outcomes: ["Correctly structured entity", "Protected founder equity", "Clean cap table", "Tax-efficient structure", "Investment-ready legal standing"],
    offerings: ["Incorporation", "Founder Agreements", "Equity & Vesting", "Tax Guidance", "Governance", "Fundraising Readiness"],
  },
];

const faqs = [
  { q: "What is the difference between the two tracks?", a: "Technology Law protects your company and product — IP, contracts, data, regulation. Founder Legal protects you as a person — your equity, structure, tax position, and governance rights." },
  { q: "Do you work with clients outside Kenya?", a: "Yes. Based in Nairobi, I work across East Africa and internationally. Most sessions are via Google Meet." },
  { q: "What does a typical engagement look like?", a: "A discovery call, then a scoped engagement. Some clients engage for a single strategy session; others retain ongoing support." },
  { q: "Are you a practising advocate?", a: "I hold a Bachelor of Laws and advise at a strategic level. For formal representation or filing, I refer within my network." },
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
    if (next !== null) setTimeout(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
  };

  return (
    <section id="services" style={{
      background: "var(--c-bg)",
      borderTop: "1px solid var(--c-border)",
      paddingTop: "var(--space-section)",
      paddingBottom: "var(--space-section)",
      paddingLeft: "var(--space-page-x)",
      paddingRight: "var(--space-page-x)",
    }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }} ref={ref}>

        {/* Section label */}
        <div style={{
          opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(16px)",
          transition: "all 0.7s ease",
          marginBottom: "5rem", textAlign: "center",
        }}>
          <p style={{
            fontFamily: "var(--font-manjari)", fontWeight: 700,
            fontSize: "0.55rem", letterSpacing: "0.28em", textTransform: "uppercase",
            color: "var(--c-ink-muted)", marginBottom: "1.5rem",
          }}>Advisory Services</p>
          <h2 style={{
            fontFamily: "var(--font-serif)", fontWeight: 400, fontStyle: "italic",
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--c-ink)", lineHeight: 1.1,
          }}>
            Two tracks. One question.
          </h2>
        </div>

        {/* Tracks — side by side, text only */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "1px", background: "var(--c-border)",
          opacity: vis ? 1 : 0, transition: "opacity 0.7s ease 0.1s",
        }} id="track-grid">
          {tracks.map((t, i) => {
            const isActive = active === i;
            return (
              <button key={t.id} onClick={() => handleTrackClick(i)} style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "3rem 3.5rem",
                background: isActive ? "var(--c-ink)" : "var(--c-surface)",
                border: "none", cursor: "pointer",
                transition: "background 0.35s ease",
                position: "relative",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
                  <span style={{
                    fontFamily: "var(--font-serif)", fontStyle: "italic",
                    fontSize: "0.75rem", color: isActive ? "var(--c-accent)" : "var(--c-ink-muted)",
                    transition: "color 0.35s",
                  }}>{t.number}</span>
                  <ChevronDown size={13} style={{
                    color: isActive ? "var(--c-accent)" : "var(--c-ink-muted)",
                    transform: isActive ? "rotate(180deg)" : "none",
                    transition: "transform 0.35s, color 0.35s",
                  }} />
                </div>

                <p style={{
                  fontFamily: "var(--font-serif)", fontWeight: 400,
                  fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                  color: isActive ? "var(--c-bg)" : "var(--c-ink)",
                  lineHeight: 1.1, marginBottom: "1rem",
                  transition: "color 0.35s",
                }}>{t.label}</p>

                <p style={{
                  fontFamily: "var(--font-sans)", fontSize: "0.8rem",
                  color: isActive ? "rgba(245,237,216,0.4)" : "var(--c-ink-muted)",
                  lineHeight: 1.7, maxWidth: "26rem",
                  transition: "color 0.35s",
                }}>{t.tagline}</p>

                {/* Offering pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "2rem" }}>
                  {t.offerings.map(o => (
                    <span key={o} style={{
                      fontFamily: "var(--font-manjari)", fontWeight: 700,
                      fontSize: "0.55rem", letterSpacing: "0.12em",
                      padding: "0.2rem 0.6rem", borderRadius: "100px",
                      border: `1px solid ${isActive ? "rgba(196,162,101,0.25)" : "var(--c-border-strong)"}`,
                      color: isActive ? "rgba(245,237,216,0.35)" : "var(--c-ink-muted)",
                      textTransform: "uppercase",
                      transition: "all 0.35s",
                    }}>{o}</span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Expanded detail */}
        <div ref={detailRef} style={{
          maxHeight: active !== null ? "1400px" : "0",
          overflow: "hidden",
          transition: "max-height 0.6s cubic-bezier(0.4,0,0.2,1)",
          background: "var(--c-surface)",
          borderLeft: "1px solid var(--c-border)",
          borderRight: "1px solid var(--c-border)",
          borderBottom: active !== null ? "1px solid var(--c-border)" : "none",
        }}>
          {active !== null && (() => {
            const t = tracks[active];
            return (
              <div style={{ padding: "4rem 3.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "5rem" }} id="detail-inner-grid">

                  {/* Left — meta */}
                  <div>
                    <p style={{
                      fontFamily: "var(--font-sans)", fontSize: "0.8rem", fontStyle: "italic",
                      color: "var(--c-ink-muted)", lineHeight: 1.8, marginBottom: "2.5rem",
                    }}>{t.distinction}</p>

                    <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-ink-muted)", marginBottom: "0.85rem" }}>Deliverables</p>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "2.5rem" }}>
                      {t.deliverables.map(d => (
                        <li key={d} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--c-ink-mid)" }}>
                          <CheckCircle2 size={10} style={{ color: "var(--c-accent)", marginTop: "0.22rem", flexShrink: 0 }} />{d}
                        </li>
                      ))}
                    </ul>

                    <Link href="/book" style={{
                      display: "inline-flex", alignItems: "center", gap: "0.4rem",
                      fontFamily: "var(--font-manjari)", fontWeight: 700,
                      fontSize: "0.65rem", letterSpacing: "0.16em", textTransform: "uppercase",
                      color: "var(--c-accent)", textDecoration: "none", transition: "color 0.2s",
                    }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"}>
                      Book a Consultation <ArrowRight size={11} />
                    </Link>
                  </div>

                  {/* Right — content */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--c-border)" }}>
                    {[{ label: "The Problem", text: t.problem }, { label: "The Approach", text: t.solution }].map(block => (
                      <div key={block.label} style={{ padding: "2rem", background: "var(--c-bg)" }}>
                        <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-ink-muted)", marginBottom: "0.75rem" }}>{block.label}</p>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", lineHeight: 1.85, color: "var(--c-ink-mid)" }}>{block.text}</p>
                      </div>
                    ))}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--c-border)" }}>
                      <div style={{ padding: "2rem", background: "var(--c-bg)" }}>
                        <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-ink-muted)", marginBottom: "1rem" }}>Process</p>
                        <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                          {t.process.map((step, i) => (
                            <li key={i} style={{ display: "flex", gap: "0.85rem", fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--c-ink-mid)" }}>
                              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--c-accent)", minWidth: "1.4rem", fontSize: "0.7rem", flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                      <div style={{ padding: "2rem", background: "var(--c-ink)" }}>
                        <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,237,216,0.3)", marginBottom: "1rem" }}>Outcomes</p>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                          {t.outcomes.map(o => (
                            <li key={o} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "rgba(245,237,216,0.55)" }}>
                              <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--c-accent)", marginTop: "0.5rem", flexShrink: 0 }} />{o}
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
        <div style={{ marginTop: "6rem", opacity: vis ? 1 : 0, transition: "opacity 0.7s ease 0.2s" }}>
          <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--c-ink-muted)", textAlign: "center", marginBottom: "3rem" }}>Common questions</p>
          <div style={{ maxWidth: "44rem", margin: "0 auto" }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ borderTop: "1px solid var(--c-border)" }}>
                <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} style={{
                  width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "1.4rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "2rem",
                }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1rem", color: "var(--c-ink)", lineHeight: 1.4 }}>{f.q}</span>
                  <ChevronDown size={13} style={{ color: "var(--c-ink-muted)", flexShrink: 0, transform: expandedFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.25s" }} />
                </button>
                <div style={{ maxHeight: expandedFaq === i ? "200px" : "0", overflow: "hidden", transition: "max-height 0.35s ease" }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--c-ink-muted)", lineHeight: 1.85, paddingBottom: "1.4rem", paddingRight: "2rem" }}>{f.a}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--c-border)" }} />
          </div>
        </div>

        {/* Entrora + CTA */}
        <div style={{ marginTop: "5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", opacity: vis ? 1 : 0, transition: "opacity 0.7s ease 0.3s" }} id="svc-footer-grid">
          <a href="https://entrorasystems.com" target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
            background: "var(--c-surface)", border: "1px solid var(--c-border)",
            padding: "1.5rem 2rem", textDecoration: "none", transition: "border-color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"}>
            <div>
              <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-accent)", marginBottom: "0.35rem" }}>AI Engineering</p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--c-ink-muted)" }}>Handled through <strong style={{ color: "var(--c-ink)" }}>Entrora Systems</strong></p>
            </div>
            <ExternalLink size={12} style={{ color: "var(--c-ink-muted)", flexShrink: 0 }} />
          </a>
          <Link href="/book" style={{
            display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem",
            background: "var(--c-ink)", color: "var(--c-bg)",
            fontFamily: "var(--font-manjari)", fontWeight: 700,
            fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
            textDecoration: "none", padding: "1.5rem 2rem", transition: "background 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--c-accent)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--c-ink)"}>
            Book a Discovery Call <ArrowRight size={11} />
          </Link>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          #track-grid{grid-template-columns:1fr!important}
          #detail-inner-grid{grid-template-columns:1fr!important;gap:2rem!important}
          #svc-footer-grid{grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  );
}
