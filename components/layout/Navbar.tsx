"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const lk: React.CSSProperties = {
  fontFamily: "var(--font-manjari)",
  fontSize: "0.6rem",
  fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--c-ink-muted)",
  textDecoration: "none",
  transition: "color 0.2s",
};

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 50);
      const rp = document.getElementById("rp");
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (rp && h > 0) rp.style.width = `${(window.scrollY / h) * 100}%`;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: `${scrolled ? "1.1rem" : "1.75rem"} var(--space-x)`,
      background: scrolled
        ? "rgba(var(--nav-bg, 8,8,8), 0.88)"
        : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid var(--c-border)" : "none",
      transition: "padding 0.35s, background 0.35s, border 0.35s",
    }}>
      <style>{`[data-theme="light"] { --nav-bg: 248,247,245; } [data-theme="dark"] { --nav-bg: 8,8,8; }`}</style>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.1rem", color: "var(--c-ink)", letterSpacing: "-0.01em" }}>Decra</span>
        </Link>

        <nav style={{ display: "flex", align: "center", gap: "2.25rem", alignItems: "center" }}>
          {[["/#services", "Services"], ["/about", "About"], ["/book", "Book a Call"]].map(([h, l]) => (
            <Link key={h} href={h} style={lk}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-ink)"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-ink-muted)"}>
              {l}
            </Link>
          ))}
          <button onClick={toggle} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--c-ink-muted)", lineHeight: 0, padding: 0, transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = "var(--c-ink)"}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = "var(--c-ink-muted)"}>
            {theme === "dark" ? <Sun size={13} strokeWidth={1.5} /> : <Moon size={13} strokeWidth={1.5} />}
          </button>
        </nav>
      </div>
    </header>
  );
}
