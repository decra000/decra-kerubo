"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutPreview() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.15 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section className="section page-x" style={{ background: "var(--c-bg)", borderTop: "1px solid var(--c-border)" }}>
      <div className="inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
        {/* Left: visual block */}
        <div style={{ background: "var(--c-forest)", borderRadius: "16px", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div>
            <span className="t-label" style={{ display: "block", marginBottom: "1rem" }}>Where I work</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                ["Tech Policy & Startup Law", "IP, contracts, data privacy, regulatory mapping"],
                ["Founder Legal", "Incorporation, equity, co-founder agreements"],
                ["The 1000", "Tech harm research & policy advocacy"],
              ].map(([title, sub]) => (
                <div key={title} style={{ border: "1px solid rgba(248,246,241,0.10)", borderRadius: "8px", padding: "0.85rem 1rem" }}>
                  <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.8rem", color: "rgba(248,246,241,0.9)" }}>{title}</p>
                  <p style={{ fontSize: "0.62rem", color: "rgba(248,246,241,0.4)", marginTop: "0.2rem" }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(248,246,241,0.08)", paddingTop: "1.5rem" }}>
            <span className="t-label" style={{ display: "block", marginBottom: "0.75rem" }}>Also through</span>
            <a href="https://entrorasystems.com" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "rgba(248,246,241,0.65)", textDecoration: "none" }}>
              Entrora Systems
              <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "var(--c-gold)", background: "rgba(184,148,74,0.12)", padding: "0.15rem 0.5rem", borderRadius: "100px" }}>AI Engineering</span>
            </a>
          </div>
        </div>

        {/* Right: copy */}
        <div ref={ref} className="reveal">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">About</span>
          </div>
          <h2 className="t-display t-display-lg" style={{ marginBottom: "1.25rem" }}>Two degrees. One practice.</h2>
          <p className="t-body" style={{ marginBottom: "0.9rem" }}>
            Law and computer science aren't the typical combination — but they're the one that makes this advisory rare. Most legal challenges in tech can't be solved by law alone, and most technical decisions carry legal consequences nobody tracks.
          </p>
          <p className="t-body" style={{ marginBottom: "2rem" }}>
            I built a practice at that intersection: tech policy and startup law for companies, founder legal for the people building them.
          </p>
          <Link href="/about" className="btn-text">
            About & selected work <ArrowRight size={12} />
          </Link>
        </div>
      </div>
      <style>{`@media(max-width:768px){.inner{grid-template-columns:1fr !important; gap:2.5rem !important;}}`}</style>
    </section>
  );
}
