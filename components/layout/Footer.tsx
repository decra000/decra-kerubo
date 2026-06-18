"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer style={{
      background: "var(--c-surface)",
      borderTop: "1px solid var(--c-border)",
      padding: "4rem var(--space-page-x) 2.5rem",
    }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>

        {/* Top row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "4rem", alignItems: "start", paddingBottom: "3rem", borderBottom: "1px solid var(--c-border)", marginBottom: "2rem" }} id="footer-top">
          <div>
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.25rem", color: "var(--c-ink)", marginBottom: "0.6rem" }}>Decra Kerubo</p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--c-ink-muted)", lineHeight: 1.8, maxWidth: "22rem" }}>
              Technology law and entrepreneurial advisory for startups, NGOs, and founders in Africa.
            </p>
          </div>
          <nav style={{ display: "flex", gap: "2rem", alignItems: "flex-start", flexWrap: "wrap" }}>
            {[["Services", "/#services"], ["About", "/about"], ["Book a Call", "/book"]].map(([l, h]) => (
              <Link key={h} href={h} style={{
                fontFamily: "var(--font-manjari)", fontWeight: 700,
                fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--c-ink-muted)", textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"}>
                {l}
              </Link>
            ))}
            <a href="https://entrorasystems.com" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "0.2rem",
              fontFamily: "var(--font-manjari)", fontWeight: 700,
              fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--c-ink-muted)", textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"}>
              Entrora <ArrowUpRight size={9} />
            </a>
          </nav>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--c-ink-muted)" }}>
            {new Date().getFullYear()} Decra Kerubo. Nairobi, Kenya.
          </p>
          <a href="mailto:hello@decrakerubo.com" style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--c-ink-muted)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"}>
            hello@decrakerubo.com
          </a>
        </div>
      </div>
      <style>{`@media(max-width:640px){#footer-top{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
}
