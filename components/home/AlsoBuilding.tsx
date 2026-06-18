"use client";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function AlsoBuilding() {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      borderTop: "1px solid var(--c-border)",
      padding: `var(--space-section) var(--space-x)`,
    }}>
      <div style={{
        maxWidth: "var(--max-w)", margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "8rem", alignItems: "start",
        opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(16px)",
        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
      }} id="also-g">

        <div>
          <p className="label" style={{ marginBottom: "1.5rem" }}>Also building</p>
          <h2 style={{
            fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
            fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--c-ink)",
            lineHeight: 1.05, marginBottom: "1.5rem",
          }}>Entrora<br />Systems.</h2>
          <p style={{
            fontFamily: "var(--font-sans)", fontWeight: 300,
            fontSize: "0.875rem", color: "var(--c-ink-muted)",
            lineHeight: 1.85, maxWidth: "22rem", marginBottom: "2rem",
          }}>
            AI engineering and software development for organisations that need real technical depth — not just advice.
          </p>
          <a href="https://entrorasystems.com" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: "0.3rem",
            fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.78rem",
            color: "var(--c-ink-muted)", textDecoration: "none", transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-ink)"}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-ink-muted)"}>
            entrorasystems.com <ArrowUpRight size={11} strokeWidth={1.5} />
          </a>
        </div>

        <div style={{ paddingTop: "3.5rem" }}>
          {[
            ["AI Document Systems", "Custom pipelines for document classification, extraction, and review."],
            ["Legal Tech Development", "Software built for legal workflows — by someone who understands both sides."],
            ["AI Adoption Advisory", "Scoping, readiness, and implementation without enterprise budgets."],
          ].map(([title, body], i) => (
            <div key={title} style={{
              paddingBottom: "2rem", marginBottom: "2rem",
              borderBottom: "1px solid var(--c-border)",
              opacity: vis ? 1 : 0,
              transition: `opacity 0.6s ease ${0.1 + i * 0.1}s`,
            }}>
              <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: "1rem", color: "var(--c-ink)", marginBottom: "0.5rem" }}>{title}</p>
              <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.82rem", color: "var(--c-ink-muted)", lineHeight: 1.75 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:700px){#also-g{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
    </section>
  );
}
