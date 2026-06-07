"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

const tracks = [
  {
    id: "tech",
    tag: "Technology Law",
    tagline: "For companies building or operating digital products.",
    services: [
      { area: "Data Privacy & ODPC", desc: "Compliance frameworks, privacy policies, and DPAs — structured before regulators come knocking.", icon: "🔒" },
      { area: "Tech Contracts & IP", desc: "SaaS agreements, IP registration, licensing, NDAs, and software development contracts.", icon: "📄" },
      { area: "Regulatory Mapping", desc: "Understand the legal landscape before you build or launch in a new market.", icon: "🗺️" },
      { area: "International Expansion", desc: "Cross-border structuring for companies scaling across Africa and beyond.", icon: "🌍" },
    ],
  },
  {
    id: "entrepreneur",
    tag: "Entrepreneurial Law",
    tagline: "For founders, startups, and NGOs building from the ground up.",
    services: [
      { area: "Incorporation & Structure", desc: "Right entity type, shareholding setup, governance docs, and constitutional documents.", icon: "🏛️" },
      { area: "Tax & eTIMS Compliance", desc: "KRA, eTIMS, VAT, PAYE — structured correctly from day one.", icon: "🧾" },
      { area: "Founder Equity & Vesting", desc: "Cap tables, vesting schedules, and co-founder agreements built to hold up.", icon: "📊" },
      { area: "Fundraising Readiness", desc: "Term sheets, investor agreements, and legal prep for raising capital.", icon: "💼" },
    ],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export function ServicesPreview() {
  const [active, setActive] = useState(0);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const { ref, visible } = useInView();

  return (
    <section className="section page-x" style={{ background: "var(--c-surface)", borderTop: "1px solid var(--c-border)" }}>
      <div className="inner" ref={ref}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1.5rem",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1rem" }}>
              <span style={{ display: "inline-block", width: "1.75rem", height: "1px", background: "var(--c-gold)" }} />
              <span className="t-label">Advisory Services</span>
            </div>
            <h2 className="t-display t-display-lg">What's covered.</h2>
          </div>
          <Link href="/services" className="btn-text">Full scope <ArrowRight size={12} /></Link>
        </div>

        {/* Tab switcher */}
        <div style={{ display: "flex", gap: "0", marginBottom: "2.5rem", background: "var(--c-bg)", borderRadius: "12px", padding: "4px", width: "fit-content",
          opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.15s" }}>
          {tracks.map((t, i) => (
            <button key={t.id} onClick={() => setActive(i)} style={{
              padding: "0.65rem 1.5rem", borderRadius: "9px", border: "none", cursor: "pointer",
              fontFamily: "var(--font-manjari)", fontSize: "0.825rem", fontWeight: 700, letterSpacing: "0.02em",
              background: active === i ? "var(--c-sage-deep)" : "transparent",
              color: active === i ? "var(--c-bg)" : "var(--c-ink-muted)",
              transition: "background 0.25s, color 0.25s",
            }}>
              {t.tag}
            </button>
          ))}
        </div>

        {/* Active track */}
        {tracks.map((track, ti) => (
          <div key={track.id} style={{ display: ti === active ? "block" : "none" }}>
            <p className="t-body" style={{ marginBottom: "2rem", color: "var(--c-ink-muted)" }}>{track.tagline}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }} id="svc-grid">
              {track.services.map((s, i) => (
                <div key={s.area}
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                  style={{
                    padding: "1.75rem", borderRadius: "14px", cursor: "default",
                    border: "1px solid var(--c-border)",
                    background: hoveredService === i ? "var(--c-sage-deep)" : "var(--c-bg)",
                    transition: "background 0.3s ease, border-color 0.3s ease, transform 0.25s ease, box-shadow 0.25s ease",
                    transform: hoveredService === i ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: hoveredService === i ? "0 12px 32px rgba(44,59,40,0.15)" : "none",
                    opacity: visible ? 1 : 0,
                    transitionDelay: `${0.2 + i * 0.08}s`,
                  }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.85rem" }}>{s.icon}</div>
                  <p style={{
                    fontFamily: "var(--font-serif)", fontSize: "1.05rem", marginBottom: "0.5rem",
                    color: hoveredService === i ? "rgba(244,245,240,0.92)" : "var(--c-sage-deep)",
                    transition: "color 0.3s",
                  }}>{s.area}</p>
                  <p style={{
                    fontSize: "0.875rem", lineHeight: 1.75,
                    color: hoveredService === i ? "rgba(244,245,240,0.55)" : "var(--c-ink-muted)",
                    transition: "color 0.3s",
                  }}>{s.desc}</p>
                  {hoveredService === i && (
                    <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.72rem", fontWeight: 700, color: "var(--c-gold)", letterSpacing: "0.05em" }}>
                      Learn more <ChevronRight size={12} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ marginTop: "2.5rem", opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.5s" }}>
          <Link href="/book" className="btn-primary">Book a Discovery Call <ArrowRight size={14} /></Link>
        </div>
      </div>
      <style>{`@media(max-width:640px){ #svc-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
