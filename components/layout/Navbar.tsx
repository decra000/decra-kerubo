"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 60);
      const p = document.getElementById("reading-progress");
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (p && h > 0) p.style.width = `${(window.scrollY / h) * 100}%`;
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const linkStyle = {
    fontFamily: "var(--font-manjari)" as const, fontWeight: 700 as const,
    fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase" as const,
    color: "var(--c-ink-muted)", textDecoration: "none", transition: "color 0.2s",
  };

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: `${scrolled ? "1rem" : "1.6rem"} var(--space-page-x)`,
        background: scrolled ? "var(--c-glass)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--c-border)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{
          maxWidth: "var(--max-w)", margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{
              fontFamily: "var(--font-serif)", fontStyle: "italic",
              fontSize: "1.05rem", color: "var(--c-ink)", letterSpacing: "-0.01em",
            }}>Decra</span>
          </Link>

          {/* Nav — very sparse */}
          <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <a href="/#services" style={linkStyle}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"}>
              Services
            </a>
            <Link href="/about" style={linkStyle}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"}>
              About
            </Link>
            <span style={{ width: "1px", height: "10px", background: "var(--c-border-strong)", display: "inline-block" }} />
            <Link href="/book" style={{ ...linkStyle, color: "var(--c-ink)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}>
              Book a Call
            </Link>
            <button onClick={toggle} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "var(--c-ink-muted)", padding: "2px", lineHeight: 0,
              transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"}>
              {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}
