"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ExternalLink } from "lucide-react";

const links = [
  { href: "/services", label: "Services" },
  { href: "/about",    label: "About" },
  { href: "/the-1000", label: "The 1000" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 50);
      const p = document.getElementById("reading-progress");
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (p && h > 0) p.style.width = `${(window.scrollY / h) * 100}%`;
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      padding: `${scrolled ? "1rem" : "1.5rem"} var(--space-page-x)`,
      background: scrolled ? "rgba(245,240,235,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid var(--c-border)" : "none",
      transition: "all 0.35s ease",
    }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.15rem", color: "var(--c-ink)", letterSpacing: "-0.01em" }}>Decra</span>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: "2.5rem" }} className="nav-desktop">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="nav-link">{l.label}</Link>
          ))}
          <a href="https://entrorasystems.com" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
            Entrora <ExternalLink size={10} />
          </a>
          <Link href="/book" style={{
            display: "inline-flex", alignItems: "center",
            border: "1px solid var(--c-ink)", color: "var(--c-ink)",
            fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.7rem",
            letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "0.55rem 1.25rem", borderRadius: "100px", textDecoration: "none",
            transition: "background 0.22s, color 0.22s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--c-ink)"; (e.currentTarget as HTMLElement).style.color = "var(--c-bg)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"; }}>
            Book a Call
          </Link>
        </nav>

        <button className="nav-mobile-btn" onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--c-ink)" }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div style={{ background: "var(--c-surface)", borderTop: "1px solid var(--c-border)", padding: "1.5rem var(--space-page-x)" }}>
          {[...links, { href: "https://entrorasystems.com", label: "Entrora Systems ↗" }].map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ display: "block", fontFamily: "var(--font-manjari)", fontSize: "1rem", color: "var(--c-ink-mid)", textDecoration: "none", padding: "0.75rem 0", borderBottom: "1px solid var(--c-border)" }}>
              {l.label}
            </Link>
          ))}
          <Link href="/book" className="btn-primary" onClick={() => setOpen(false)} style={{ marginTop: "1.5rem", display: "inline-flex" }}>
            Book a Call
          </Link>
        </div>
      )}

      <style>{`
        .nav-link { font-family: var(--font-manjari); font-size: 0.82rem; color: var(--c-ink-mid); text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: var(--c-sage-deep); }
        @media (min-width: 768px) { .nav-desktop { display: flex !important; } .nav-mobile-btn { display: none !important; } }
        @media (max-width: 767px) { .nav-desktop { display: none !important; } .nav-mobile-btn { display: block !important; } }
      `}</style>
    </header>
  );
}
