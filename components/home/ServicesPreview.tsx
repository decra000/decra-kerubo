"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus, Minus } from "lucide-react";

const tracks = [
  {
    id: "tech",
    label: "Technology Law",
    sub: "For companies & products",
    body: "IP protection, data privacy, tech contracts, regulatory compliance. The legal surface most startups ignore until it's expensive.",
    process: ["Legal exposure audit", "IP strategy & registration", "Contract review & drafting", "Data privacy gap analysis", "Regulatory mapping", "Ongoing retainer (optional)"],
    outcomes: ["Protected IP", "Sound contracts", "Privacy compliance", "Reduced exposure"],
  },
  {
    id: "founder",
    label: "Founder Legal",
    sub: "For founders & builders",
    body: "Incorporation, equity structure, co-founder agreements, tax compliance, fundraising readiness. What you skip early costs you later.",
    process: ["Situation assessment", "Incorporation advisory", "Equity & vesting design", "Co-founder agreement", "Tax structuring", "Fundraising readiness"],
    outcomes: ["Right entity structure", "Protected equity", "Clean cap table", "Investment-ready standing"],
  },
];

const faqs = [
  { q: "What's the difference between the two tracks?", a: "Technology Law covers your company's legal exposure — IP, contracts, data, regulation. Founder Legal covers you personally — equity, structure, tax, governance. Some need both." },
  { q: "Do you work outside Kenya?", a: "Yes. Based in Nairobi, working across East Africa and internationally. Most sessions are remote." },
  { q: "What does an engagement look like?", a: "Discovery call, then a scoped piece of work. Some clients engage once; others retain ongoing support." },
];

export function ServicesPreview({ intent }: { intent?: string | null }) {
  const [active, setActive] = useState<number | null>(null);
  const [faq, setFaq] = useState<number | null>(null);
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLElement>(null);
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

  const toggle = (i: number) => {
    const next = active === i ? null : i;
    setActive(next);
    if (next !== null) setTimeout(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };

  return (
    <section id="services" ref={ref} style={{
      borderTop: "1px solid var(--c-border)",
      padding: `var(--space-section) var(--space-x)`,
    }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>

        {/* Heading */}
        <div style={{
          marginBottom: "5rem",
          opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(16px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <p className="label" style={{ marginBottom: "1.25rem" }}>Advisory</p>
          <h2 style={{
            fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
            fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--c-ink)",
            lineHeight: 1.05, maxWidth: "20rem",
          }}>Two tracks.<br />One question.</h2>
        </div>

        {/* Track rows — accordion, text only */}
        <div style={{ borderTop: "1px solid var(--c-border)" }}>
          {tracks.map((t, i) => {
            const open = active === i;
            return (
              <div key={t.id}>
                <button onClick={() => toggle(i)} style={{
                  width: "100%", display: "flex", alignItems: "center",
                  justifyContent: "space-between", gap: "2rem",
                  padding: "2.25rem 0", background: "none", border: "none",
                  cursor: "pointer", borderBottom: open ? "none" : "1px solid var(--c-border)",
                  textAlign: "left",
                }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "2rem", flex: 1, minWidth: 0 }}>
                    <span style={{
                      fontFamily: "var(--font-serif)", fontStyle: "italic",
                      fontSize: "0.8rem", color: "var(--c-ink-muted)",
                      flexShrink: 0,
                    }}>{String(i + 1).padStart(2, "0")}</span>
                    <div style={{ minWidth: 0 }}>
                      <p style={{
                        fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
                        fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "var(--c-ink)",
                        lineHeight: 1.1, marginBottom: "0.3rem",
                      }}>{t.label}</p>
                      <p style={{
                        fontFamily: "var(--font-sans)", fontWeight: 300,
                        fontSize: "0.78rem", color: "var(--c-ink-muted)",
                      }}>{t.sub}</p>
                    </div>
                  </div>
                  <div style={{ flexShrink: 0, color: "var(--c-ink-muted)" }}>
                    {open ? <Minus size={14} strokeWidth={1.5} /> : <Plus size={14} strokeWidth={1.5} />}
                  </div>
                </button>

                {/* Expanded */}
                <div style={{
                  maxHeight: open ? "900px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.6s cubic-bezier(0.4,0,0.2,1)",
                  borderBottom: "1px solid var(--c-border)",
                }}>
                  <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr",
                    gap: "5rem", paddingBottom: "3.5rem",
                  }} id={`detail-${i}`}>
                    {/* Left */}
                    <div>
                      <p style={{
                        fontFamily: "var(--font-sans)", fontWeight: 300,
                        fontSize: "0.9rem", color: "var(--c-ink-mid)",
                        lineHeight: 1.85, marginBottom: "2.5rem",
                      }}>{t.body}</p>

                      <p className="label" style={{ marginBottom: "1.1rem" }}>Process</p>
                      <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                        {t.process.map((step, j) => (
                          <li key={j} style={{ display: "flex", gap: "1.25rem", fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.82rem", color: "var(--c-ink-mid)" }}>
                            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.7rem", color: "var(--c-accent)", flexShrink: 0, minWidth: "1.5rem" }}>{j + 1}</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Right */}
                    <div style={{ paddingTop: "0.25rem" }}>
                      <p className="label" style={{ marginBottom: "1.1rem" }}>Outcomes</p>
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem", marginBottom: "3rem" }}>
                        {t.outcomes.map(o => (
                          <li key={o} style={{ display: "flex", gap: "1rem", fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.82rem", color: "var(--c-ink-mid)" }}>
                            <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--c-accent)", marginTop: "0.5rem", flexShrink: 0 }} />
                            {o}
                          </li>
                        ))}
                      </ul>
                      <Link href="/book" style={{
                        display: "inline-flex", alignItems: "center", gap: "0.5rem",
                        fontFamily: "var(--font-manjari)", fontWeight: 700,
                        fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase",
                        color: "var(--c-ink)", textDecoration: "none",
                        borderBottom: "1px solid var(--c-ink)", paddingBottom: "2px",
                        transition: "color 0.2s, border-color 0.2s",
                      }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-accent)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--c-accent)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-ink)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--c-ink)"; }}>
                        Book a consultation <ArrowRight size={10} strokeWidth={1.5} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQs */}
        <div style={{
          marginTop: "6rem",
          opacity: vis ? 1 : 0, transition: "opacity 0.8s ease 0.2s",
        }}>
          <p className="label" style={{ marginBottom: "2.5rem" }}>Questions</p>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderTop: "1px solid var(--c-border)" }}>
              <button onClick={() => setFaq(faq === i ? null : i)} style={{
                width: "100%", display: "flex", justifyContent: "space-between",
                alignItems: "center", gap: "2rem",
                padding: "1.5rem 0", background: "none", border: "none",
                cursor: "pointer", textAlign: "left",
              }}>
                <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1rem", color: "var(--c-ink)", fontWeight: 400, lineHeight: 1.3 }}>{f.q}</span>
                {faq === i ? <Minus size={12} strokeWidth={1.5} style={{ color: "var(--c-ink-muted)", flexShrink: 0 }} /> : <Plus size={12} strokeWidth={1.5} style={{ color: "var(--c-ink-muted)", flexShrink: 0 }} />}
              </button>
              <div style={{ maxHeight: faq === i ? "200px" : "0", overflow: "hidden", transition: "max-height 0.35s ease" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.85rem", color: "var(--c-ink-muted)", lineHeight: 1.85, paddingBottom: "1.5rem", maxWidth: "36rem" }}>{f.a}</p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--c-border)" }} />
        </div>

        {/* CTA row */}
        <div style={{
          marginTop: "5rem", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: "2rem",
          opacity: vis ? 1 : 0, transition: "opacity 0.8s ease 0.3s",
        }}>
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.1rem", color: "var(--c-ink-muted)", fontWeight: 400 }}>
            AI engineering is handled through Entrora Systems.
          </p>
          <Link href="/book" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            fontFamily: "var(--font-manjari)", fontWeight: 700,
            fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "var(--c-ink)", textDecoration: "none",
            borderBottom: "1px solid var(--c-ink)", paddingBottom: "2px",
            whiteSpace: "nowrap", flexShrink: 0,
            transition: "color 0.2s, border-color 0.2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-accent)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--c-accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-ink)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--c-ink)"; }}>
            Book a discovery call <ArrowRight size={10} strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      <style>{`
        @media(max-width:700px){
          #detail-0,#detail-1{grid-template-columns:1fr!important;gap:2.5rem!important}
        }
      `}</style>
    </section>
  );
}
