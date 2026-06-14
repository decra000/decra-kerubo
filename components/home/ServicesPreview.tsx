"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

const tracks = [
  {
    id: "tech", label: "Technology Law",
    intro: "For companies building or operating digital products.",
    items: [
      { title: "Data Privacy & ODPC",     body: "Compliance frameworks, privacy policies, and DPAs structured before regulators arrive.", icon: "⚖️" },
      { title: "Tech Contracts & IP",     body: "SaaS agreements, IP registration, licensing, NDAs, and software development contracts.", icon: "📄" },
      { title: "Regulatory Mapping",      body: "Understanding your legal landscape before you build or launch in any market.", icon: "🗺️" },
      { title: "International Expansion", body: "Cross-border structuring for companies scaling across Africa and beyond.", icon: "🌍" },
    ],
  },
  {
    id: "startup", label: "Entrepreneurial Law",
    intro: "For founders, startups, and NGOs building from the ground up.",
    items: [
      { title: "Incorporation & Structure",  body: "Right entity type, shareholding setup, governance, and constitutional documents.", icon: "🏛️" },
      { title: "Tax & eTIMS Compliance",    body: "KRA, eTIMS, VAT, PAYE — structured correctly from the start.", icon: "🧾" },
      { title: "Founder Equity & Vesting",  body: "Cap tables, vesting schedules, and co-founder agreements that hold up.", icon: "📊" },
      { title: "Fundraising Readiness",     body: "Term sheets, investor agreements, and full legal prep for raising capital.", icon: "💼" },
    ],
  },
];

export function ServicesPreview({ intent }: { intent?: string | null }) {
  const [active, setActive] = useState(intent === "founder" ? 1 : 0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  return (
    <section className="section page-x" style={{ background: "var(--c-surface)", borderTop: "1px solid var(--c-border)" }}>
      <div className="inner" ref={ref}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1rem", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(16px)", transition: "all 0.6s ease" }}>
          <div>
            <p className="t-label" style={{ marginBottom: "0.85rem" }}>Advisory Services</p>
            <h2 className="t-display t-display-lg" style={{ color: "var(--c-ink)" }}>What's covered.</h2>
          </div>
          <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.82rem", color: "var(--c-ink-muted)", textDecoration: "none", borderBottom: "1px solid var(--c-border)", paddingBottom: "2px", fontFamily: "var(--font-sans)" }}>
            Full scope <ArrowRight size={12} />
          </Link>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--c-border)", marginBottom: "2.5rem", opacity: vis ? 1 : 0, transition: "opacity 0.6s ease 0.1s" }}>
          {tracks.map((t, i) => (
            <button key={t.id} onClick={() => setActive(i)} style={{
              padding: "0.75rem 1.5rem", background: "none", border: "none", cursor: "pointer",
              fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600,
              color: active === i ? "var(--c-ink)" : "var(--c-ink-muted)",
              borderBottom: `2px solid ${active === i ? "var(--c-accent)" : "transparent"}`,
              marginBottom: "-1px", transition: "color 0.2s, border-color 0.2s",
            }}>{t.label}</button>
          ))}
        </div>

        {tracks.map((track, ti) => ti === active && (
          <div key={track.id}>
            <p style={{ fontSize: "0.9rem", color: "var(--c-ink-muted)", marginBottom: "2rem", fontFamily: "var(--font-sans)" }}>{track.intro}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1px", background: "var(--c-border)" }} id="svc-grid">
              {track.items.map((s, i) => (
                <div key={s.title}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    padding: "2rem", position: "relative", overflow: "hidden",
                    background: hovered === i ? "var(--c-ink)" : "var(--c-surface)",
                    transition: "background 0.28s", cursor: "default",
                    opacity: vis ? 1 : 0, transitionDelay: `${0.15 + i * 0.07}s`,
                  }}>
                  {/* Glass shimmer on hover */}
                  {hovered === i && (
                    <div style={{ position: "absolute", top: 0, right: 0, width: "120px", height: "120px", background: "radial-gradient(circle, rgba(196,162,101,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
                  )}
                  <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.9rem" }}>{s.icon}</span>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", marginBottom: "0.55rem", color: hovered === i ? "var(--c-bg)" : "var(--c-ink)", transition: "color 0.28s" }}>{s.title}</p>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.75, color: hovered === i ? "rgba(245,237,216,0.5)" : "var(--c-ink-muted)", transition: "color 0.28s", marginBottom: hovered === i ? "1rem" : "0" }}>{s.body}</p>
                  {hovered === i && <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--c-accent)", letterSpacing: "0.08em", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>LEARN MORE <ChevronRight size={11} /></span>}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ marginTop: "2.5rem" }}>
          <Link href="/book" className="btn btn-accent">Book a Discovery Call <ArrowRight size={13} /></Link>
        </div>
      </div>
      <style>{`@media(max-width:600px){#svc-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
