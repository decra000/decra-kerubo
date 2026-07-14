"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const links = [
  { href: "/#about",       label: "About" },
  { href: "/#services",   label: "Services" },
  { href: "/#research",   label: "Research" },
  { href: "/engineering", label: "Engineering" },
  { href: "/#spotify",    label: "Spotify" },
  { href: "/#collaborate", label: "Collaborate" },
];

const lk: React.CSSProperties = {
  fontFamily: "var(--font-manjari)", fontWeight: 700,
  fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase",
  color: "var(--c-ink-mid)", textDecoration: "none", transition: "color 0.2s",
};

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      const delta = y - lastY;
      if (y < 80) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Never hide while the mobile menu is open
  useEffect(() => { if (mob) setHidden(false); }, [mob]);

  return (
    <>
      <style>{`
        [data-theme="light"] { --nav-rgb: 248,247,245; }
        [data-theme="dark"]  { --nav-rgb: 8,8,8; }
        .nav-links { display: flex; align-items: center; gap: 2rem; }
        @media(max-width: 680px) { .nav-links { display: none !important; } .nav-mob-btn { display: flex !important; } }
        @media(min-width: 681px) { .nav-mob-btn { display: none !important; } }
      `}</style>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: `${scrolled ? "1rem" : "1.6rem"} var(--space-x)`,
        background: scrolled ? `rgba(var(--nav-rgb),0.9)` : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--c-border)" : "none",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1), background 0.35s ease, padding 0.35s ease, border-color 0.35s ease",
      }}>
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--c-ink)" }}>Decra Kerubo</span>
          </Link>

          <nav className="nav-links">
            {links.map(l => (
              <Link key={l.href} href={l.href} style={lk}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-mid)"}>
                {l.label}
              </Link>
            ))}
            <Link href="/book" style={{
              ...lk, color: "var(--c-bg)", background: "var(--c-ink)",
              padding: "0.55rem 1rem", borderRadius: "2px",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.82"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}>
              Book Appointment
            </Link>
            <button onClick={toggle} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--c-ink-muted)", lineHeight: 0, transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-mid)"}>
              {theme === "dark" ? <Sun size={13} strokeWidth={1.5} /> : <Moon size={13} strokeWidth={1.5} />}
            </button>
            <Link href="/engineering" style={lk}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-mid)"}>
              Engineering
            </Link>
          </nav>

          <div className="nav-mob-btn" style={{ display: "none", alignItems: "center", gap: "1rem" }}>
            <button onClick={toggle} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--c-ink-muted)", lineHeight: 0 }}>
              {theme === "dark" ? <Sun size={14} strokeWidth={1.5} /> : <Moon size={14} strokeWidth={1.5} />}
            </button>
            <button onClick={() => setMob(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--c-ink)", lineHeight: 0 }}>
              {mob ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {mob && (
          <div style={{ padding: "1.5rem var(--space-x)", display: "flex", flexDirection: "column", gap: "1.25rem", borderTop: "1px solid var(--c-border)", marginTop: "0.75rem" }}>
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMob(false)} style={{ ...lk, fontSize: "0.75rem" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-mid)"}>
                {l.label}
              </Link>
            ))}
            <Link href="/book" onClick={() => setMob(false)} style={{
              ...lk, fontSize: "0.75rem", color: "var(--c-bg)", background: "var(--c-ink)",
              padding: "0.7rem 1rem", borderRadius: "2px", textAlign: "center",
            }}>
              Book Appointment
            </Link>
            <Link href="/engineering" onClick={() => setMob(false)} style={{ ...lk, fontSize: "0.75rem" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-mid)"}>
              Engineering
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
