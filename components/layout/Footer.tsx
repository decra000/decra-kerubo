"use client";
import Link from "next/link";

const SOCIALS = [
  {
    label: "Instagram",
    url: "https://www.instagram.com/_little._d._/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/decra/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--c-border)", padding: "2.75rem var(--space-x)" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
        <span style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", color: "var(--c-ink)" }}>Decra Kerubo</span>

        <nav style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {[["/#about","About"],["/#collaborate","Collaborate"],["/#services","Services"],["/?engage=tech-development#collaborate","Request a Build"]].map(([h,l]) => (
            <Link key={h} href={h} style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-ink-muted)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"}>
              {l}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          {SOCIALS.map(({ label, url, icon }) => (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}
              style={{ color: "var(--c-ink-muted)", lineHeight: 0, display: "block", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"}>
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
