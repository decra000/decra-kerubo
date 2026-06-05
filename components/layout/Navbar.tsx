"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ExternalLink } from "lucide-react";

const links = [
  { href: "/services",  label: "Services" },
  { href: "/about",     label: "About & Work" },
  { href: "/the-1000",  label: "The 1000" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const prog = document.getElementById("reading-progress");
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (prog && docH > 0) prog.style.width = `${(window.scrollY / docH) * 100}%`;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "background 0.4s, border-color 0.4s, padding 0.3s",
      background: scrolled ? "rgba(248,246,241,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--c-border)" : "1px solid transparent",
      paddingTop: scrolled ? "0.9rem" : "1.4rem",
      paddingBottom: scrolled ? "0.9rem" : "1.4rem",
      paddingLeft: "var(--space-page-x)",
      paddingRight: "var(--space-page-x)",
    }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "-0.01em", color: "var(--c-forest)" }}>
            Decra
          </span>
        </Link>

        {/* Desktop */}
        <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="nav-desktop">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="nav-link">{l.label}</Link>
          ))}
          <a href="https://entrorasystems.com" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", background: "var(--c-forest)", color: "var(--c-bg)", fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.06em", padding: "0.5rem 1rem", borderRadius: "100px", textDecoration: "none" }}>
            AI & Tech Services <ExternalLink size={11} />
          </a>
          <Link href="/book" className="btn-primary" style={{ fontSize: "0.7rem", padding: "0.55rem 1.25rem" }}>
            Book a Call
          </Link>
        </nav>

        <button className="nav-mobile-btn" onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--c-forest)" }} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div style={{ background: "var(--c-bg)", borderTop: "1px solid var(--c-border)", padding: "1.5rem var(--space-page-x)" }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ display: "block", fontFamily: "var(--font-manjari)", fontSize: "0.875rem", color: "var(--c-ink-mid)", textDecoration: "none", padding: "0.65rem 0", borderBottom: "1px solid var(--c-border)" }}>
              {l.label}
            </Link>
          ))}
          <a href="https://entrorasystems.com" target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontFamily: "var(--font-manjari)", fontSize: "0.875rem", color: "var(--c-ink-mid)", textDecoration: "none", padding: "0.65rem 0", borderBottom: "1px solid var(--c-border)" }}>
            AI & Tech Services <ExternalLink size={12} />
          </a>
          <Link href="/book" className="btn-primary" onClick={() => setOpen(false)} style={{ marginTop: "1.25rem", display: "inline-flex" }}>
            Book a Call
          </Link>
        </div>
      )}

      <style>{`
        .nav-link { font-family: var(--font-manjari); font-size: 0.75rem; font-weight: 400; color: var(--c-ink-mid); text-decoration: none; letter-spacing: 0.01em; transition: color 0.2s; }
        .nav-link:hover { color: var(--c-forest); }
        @media (min-width: 768px) { .nav-desktop { display: flex !important; } .nav-mobile-btn { display: none !important; } }
        @media (max-width: 767px) { .nav-desktop { display: none !important; } .nav-mobile-btn { display: block !important; } }
      `}</style>
    </header>
  );
}
