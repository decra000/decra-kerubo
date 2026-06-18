"use client";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function AlsoBuilding() {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      background: "var(--c-surface)",
      borderTop: "1px solid var(--c-border)",
      paddingTop: "var(--space-section)",
      paddingBottom: "var(--space-section)",
      paddingLeft: "var(--space-page-x)",
      paddingRight: "var(--space-page-x)",
    }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8rem", alignItems: "start",
          opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)",
          transition: "all 0.7s ease",
        }} id="also-grid">
          <div>
            <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--c-ink-muted)", marginBottom: "1.5rem" }}>Also building</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontStyle: "italic", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "var(--c-ink)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
              Entrora Systems.
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--c-ink-muted)", lineHeight: 1.85, maxWidth: "24rem", marginBottom: "2.5rem" }}>
              AI engineering, software development, and tech consulting for organisations that need real technical depth. Separate from the legal practice.
            </p>
            <a href="https://entrorasystems.com" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              fontFamily: "var(--font-manjari)", fontWeight: 700,
              fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--c-ink-muted)", textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"}>
              entrorasystems.com <ArrowUpRight size={11} />
            </a>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { n: "01", t: "AI Document Systems", b: "Custom pipelines for classification, extraction, and review at scale." },
              { n: "02", t: "Legal Tech Development", b: "Software built for legal workflows — by someone who understands both sides." },
              { n: "03", t: "AI Adoption Advisory", b: "Scoping, readiness assessment, and implementation without enterprise budgets." },
            ].map((item, i) => (
              <div key={item.n} style={{
                display: "flex", gap: "2rem", alignItems: "flex-start",
                padding: "1.75rem 0",
                borderBottom: "1px solid var(--c-border)",
                opacity: vis ? 1 : 0,
                transition: `opacity 0.6s ease ${0.1 + i * 0.1}s`,
              }}>
                <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.75rem", color: "var(--c-accent)", minWidth: "2rem", paddingTop: "0.1rem" }}>{item.n}</span>
                <div>
                  <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.04em", color: "var(--c-ink)", marginBottom: "0.4rem" }}>{item.t}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--c-ink-muted)", lineHeight: 1.65 }}>{item.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){#also-grid{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
    </section>
  );
}
