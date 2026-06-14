"use client";
import { ArrowUpRight } from "lucide-react";

const items = [
  {
    label: "AI Engineering",
    name: "Entrora Systems",
    desc: "Building and deploying AI systems for organisations across Africa.",
    href: "https://entrorasystems.com",
    tag: "entrorasystems.com",
  },
  {
    label: "Tech Harm Research",
    name: "The 1000",
    desc: "Documenting real cases of tech-enabled harm across Africa. Stories, not statistics.",
    href: "https://open.spotify.com",
    tag: "Listen on Spotify",
  },
];

export function AlsoBuilding() {
  return (
    <section className="page-x" style={{ background: "var(--c-bg)", borderTop: "1px solid var(--c-border)", padding: "4rem var(--space-page-x)" }}>
      <div className="inner">
        <p className="t-label" style={{ marginBottom: "2rem" }}>Also building</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--c-border)" }} id="also-grid">
          {items.map(item => (
            <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer"
              style={{ display: "block", padding: "2rem 2.25rem", background: "var(--c-surface)", textDecoration: "none", transition: "background 0.22s", position: "relative", overflow: "hidden" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--c-surface2)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--c-surface)"; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.85rem" }}>
                <div>
                  <p style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--c-accent)", marginBottom: "0.35rem", fontFamily: "var(--font-sans)" }}>{item.label}</p>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", color: "var(--c-ink)" }}>{item.name}</p>
                </div>
                <ArrowUpRight size={16} color="var(--c-ink-muted)" />
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--c-ink-muted)", lineHeight: 1.7, marginBottom: "1rem", fontFamily: "var(--font-sans)" }}>{item.desc}</p>
              <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--c-ink-muted)", letterSpacing: "0.05em", borderBottom: "1px solid var(--c-border)", paddingBottom: "1px", fontFamily: "var(--font-sans)" }}>{item.tag} ↗</span>
            </a>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:600px){#also-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
