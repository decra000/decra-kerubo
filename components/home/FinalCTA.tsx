"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const prompts = [
  { q: "Do you have a digital product handling user data?",       a: "Technology Law", color: "var(--c-gold)" },
  { q: "About to sign a major contract or license IP?",          a: "Technology Law", color: "var(--c-gold)" },
  { q: "Expanding operations into another jurisdiction?",        a: "Technology Law", color: "var(--c-gold)" },
  { q: "Incorporating a company or formalising your structure?", a: "Entrepreneurial Law", color: "#86efac" },
  { q: "Raising funding or bringing in investors?",             a: "Entrepreneurial Law", color: "#86efac" },
  { q: "Co-founders with no written agreement yet?",            a: "Entrepreneurial Law", color: "#86efac" },
];

export function FinalCTA() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="section page-x" style={{ background: "var(--c-sage-deep)", position: "relative", overflow: "hidden" }}>
      {/* Decorative circle */}
      <div style={{ position: "absolute", right: "-10%", top: "-30%", width: "50vw", height: "50vw", borderRadius: "50%", border: "1px solid rgba(244,245,240,0.04)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: "-5%", top: "-15%", width: "35vw", height: "35vw", borderRadius: "50%", border: "1px solid rgba(244,245,240,0.04)", pointerEvents: "none" }} />

      <div className="inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start", position: "relative", zIndex: 1 }} id="cta-grid">
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.75rem" }}>
            <span style={{ display: "inline-block", width: "1.75rem", height: "1px", background: "var(--c-gold)" }} />
            <span style={{ fontSize: "0.675rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,245,240,0.4)" }}>Get started</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(2.1rem,4vw,3.4rem)", lineHeight: 1.08, color: "rgba(244,245,240,0.93)", marginBottom: "1.35rem" }}>
            Not sure where<br />to start?
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(244,245,240,0.5)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "24rem" }}>
            A 15-minute discovery call costs nothing. We'll identify which track fits — or whether it's a combination — and define the right first step.
          </p>
          <Link href="/book" style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", background: "var(--c-gold)", color: "#fff", fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.07em", padding: "0.9rem 1.9rem", borderRadius: "100px", textDecoration: "none", transition: "opacity 0.2s, transform 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
            Book a Discovery Call <ArrowRight size={14} />
          </Link>

          <div style={{ marginTop: "3rem", padding: "1.5rem", borderRadius: "14px", border: "1px solid rgba(244,245,240,0.08)", background: "rgba(244,245,240,0.03)" }}>
            <p style={{ fontSize: "0.675rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(244,245,240,0.35)", marginBottom: "0.85rem" }}>Also available via</p>
            <a href="https://entrorasystems.com" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.querySelector("span") as HTMLElement).style.color = "rgba(244,245,240,0.9)"}
              onMouseLeave={e => (e.currentTarget.querySelector("span") as HTMLElement).style.color = "rgba(244,245,240,0.55)"}>
              <span style={{ fontSize: "0.925rem", fontWeight: 700, color: "rgba(244,245,240,0.55)", transition: "color 0.2s" }}>Entrora Systems — AI Engineering</span>
              <ArrowRight size={13} color="var(--c-gold)" />
            </a>
          </div>
        </div>

        {/* Decision prompt cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.2s" }}>
          <p style={{ fontSize: "0.72rem", color: "rgba(244,245,240,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.5rem" }}>Which track applies to you?</p>
          {prompts.map((item, i) => (
            <div key={item.q}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                gap: "1.25rem", padding: "0.95rem 1.15rem", borderRadius: "10px",
                border: `1px solid ${hovered === i ? "rgba(244,245,240,0.12)" : "rgba(244,245,240,0.06)"}`,
                background: hovered === i ? "rgba(244,245,240,0.05)" : "transparent",
                transition: "background 0.2s, border-color 0.2s, transform 0.2s",
                transform: hovered === i ? "translateX(4px)" : "translateX(0)",
                cursor: "default",
              }}>
              <p style={{ fontSize: "0.875rem", color: hovered === i ? "rgba(244,245,240,0.75)" : "rgba(244,245,240,0.45)", lineHeight: 1.55, flex: 1, transition: "color 0.2s" }}>{item.q}</p>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: hovered === i ? item.color : "rgba(244,245,240,0.25)", whiteSpace: "nowrap", transition: "color 0.2s" }}>{item.a}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){ #cta-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }`}</style>
    </section>
  );
}
