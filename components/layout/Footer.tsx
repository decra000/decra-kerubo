import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ background: "var(--c-surface)", borderTop: "1px solid var(--c-border)", padding: "3.5rem var(--space-page-x) 2rem" }}>
      <div className="inner" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "4rem", paddingBottom: "2.5rem", borderBottom: "1px solid var(--c-border)", marginBottom: "1.75rem" }} id="footer-grid">
        <div>
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.1rem", color: "var(--c-ink)", marginBottom: "0.75rem" }}>Decra Kerubo</p>
          <p style={{ fontSize: "0.875rem", color: "var(--c-ink-muted)", lineHeight: 1.8, maxWidth: "20rem", marginBottom: "1.25rem" }}>
            Technology law and entrepreneurial advisory for startups, NGOs, and founders. Nairobi, Kenya.
          </p>
          <a href="mailto:hello@decrakerubo.com" style={{ fontSize: "0.82rem", color: "var(--c-accent)", textDecoration: "none" }}>hello@decrakerubo.com</a>
        </div>
        <div>
          <p className="t-label" style={{ marginBottom: "1rem" }}>Navigate</p>
          {[["Services", "/services"], ["About", "/about"], ["The 1000", "/the-1000"], ["Book a Call", "/book"]].map(([l, h]) => (
            <Link key={h} href={h} style={{ display: "block", fontSize: "0.875rem", color: "var(--c-ink-muted)", textDecoration: "none", marginBottom: "0.5rem", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"}>
              {l}
            </Link>
          ))}
        </div>
        <div>
          <p className="t-label" style={{ marginBottom: "1rem" }}>Also</p>
          {[["Entrora Systems", "https://entrorasystems.com"], ["The 1000 · Spotify", "https://open.spotify.com"]].map(([l, h]) => (
            <a key={h} href={h} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.875rem", color: "var(--c-ink-muted)", textDecoration: "none", marginBottom: "0.5rem", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"}>
              {l} <ArrowUpRight size={11} />
            </a>
          ))}
        </div>
      </div>
      <div className="inner" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
        <p style={{ fontSize: "0.72rem", color: "var(--c-ink-muted)" }}>© {new Date().getFullYear()} Decra Kerubo. All rights reserved.</p>
        <p style={{ fontSize: "0.72rem", color: "var(--c-ink-muted)" }}>Nairobi, Kenya</p>
      </div>
      <style>{`@media(max-width:640px){#footer-grid{grid-template-columns:1fr!important;gap:2rem!important}}`}</style>
    </footer>
  );
}
