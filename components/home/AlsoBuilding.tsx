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
    <section ref={ref} className="page-x section" style={{ background: "var(--c-surface)", borderTop: "1px solid var(--c-border)" }}>
      <div className="inner">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} id="also-grid">
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "all 0.6s ease" }}>
            <p className="t-label" style={{ marginBottom: "1.25rem" }}>Also building</p>
            <h2 className="t-display t-display-lg" style={{ marginBottom: "1.25rem" }}>Entrora<br /><em style={{ fontStyle: "italic", color: "var(--c-accent)" }}>Systems.</em></h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--c-ink-muted)", lineHeight: 1.8, maxWidth: "26rem", marginBottom: "2rem" }}>
              AI engineering, software development, and tech consulting for organisations that need real technical depth — not just advice. Separate from the legal practice.
            </p>
            <a href="https://entrorasystems.com" target="_blank" rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{ display: "inline-flex" }}>
              Visit Entrora Systems <ArrowUpRight size={13} />
            </a>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "all 0.6s ease 0.15s" }}>
            {[
              { num: "01", label: "AI Document Systems", body: "Custom AI pipelines for document classification, extraction, and review at scale." },
              { num: "02", label: "Legal Tech Development", body: "Software built for legal workflows — designed by someone who understands both sides." },
              { num: "03", label: "Advisory on AI Adoption", body: "Scoping, readiness assessment, and implementation — without enterprise budgets." },
            ].map(item => (
              <div key={item.num} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", padding: "1.25rem 0", borderBottom: "1px solid var(--c-border)" }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "0.75rem", color: "var(--c-accent)", minWidth: "2rem", paddingTop: "0.1rem" }}>{item.num}</span>
                <div>
                  <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.04em", color: "var(--c-ink)", marginBottom: "0.35rem" }}>{item.label}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--c-ink-muted)", lineHeight: 1.65 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){#also-grid{grid-template-columns:1fr!important;gap:2.5rem!important}}`}</style>
    </section>
  );
}
