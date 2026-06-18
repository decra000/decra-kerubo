"use client";
import Link from "next/link";

export function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--c-border)",
      padding: "3rem var(--space-x) 2.5rem",
    }}>
      <div style={{
        maxWidth: "var(--max-w)", margin: "0 auto",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: "1.5rem",
      }}>
        <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1rem", color: "var(--c-ink)" }}>Decra Kerubo</span>

        <nav style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {[["/#services","Services"],["/about","About"],["/book","Book a Call"]].map(([h,l]) => (
            <Link key={h} href={h} style={{
              fontFamily: "var(--font-manjari)", fontWeight: 700,
              fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--c-ink-muted)", textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-ink)"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-ink-muted)"}>
              {l}
            </Link>
          ))}
        </nav>

        <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.7rem", color: "var(--c-ink-muted)" }}>
          {new Date().getFullYear()} · Nairobi
        </p>
      </div>
    </footer>
  );
}
