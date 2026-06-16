"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const langs = [
  { code: "en", label: "EN" }, { code: "fr", label: "FR" },
  { code: "sw", label: "SW" }, { code: "ar", label: "AR" },
  { code: "pt", label: "PT" }, { code: "es", label: "ES" },
];

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/about",    label: "About" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("EN");

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      const p = document.getElementById("reading-progress");
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (p && h > 0) p.style.width = `${(window.scrollY / h) * 100}%`;
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const selectLang = (lang: typeof langs[0]) => {
    setActiveLang(lang.label);
    setLangOpen(false);
    if (typeof window !== "undefined") {
      const el = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
      if (el) { el.value = lang.code; el.dispatchEvent(new Event("change")); }
      else {
        const s = document.createElement("script");
        s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        s.async = true;
        document.body.appendChild(s);
        (window as any).googleTranslateElementInit = () => {
          new (window as any).google.translate.TranslateElement(
            { pageLanguage: "en", includedLanguages: "en,fr,sw,ar,pt,es", autoDisplay: false },
            "google_translate_element"
          );
          setTimeout(() => {
            const el2 = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
            if (el2) { el2.value = lang.code; el2.dispatchEvent(new Event("change")); }
          }, 1200);
        };
      }
    }
  };

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }} />
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: `${scrolled ? "0.85rem" : "1.5rem"} var(--space-page-x)`,
        background: scrolled
          ? "var(--c-glass)"
          : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
        borderBottom: scrolled ? "1px solid var(--c-glass-border)" : "none",
        transition: "all 0.35s ease",
      }}>
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "1px" }}>
            <span style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "1.25rem", color: "var(--c-ink)", lineHeight: 1, letterSpacing: "0.02em" }}>Decra</span>
            <span style={{ fontFamily: "var(--font-manjari)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-ink-muted)" }}>Legal & Tech Advisory</span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "2.25rem" }} className="nav-desktop">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-ink-muted)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"}>
                {l.label}
              </Link>
            ))}

            {/* Language selector */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setLangOpen(v => !v)} style={{ display: "flex", alignItems: "center", gap: "0.3rem", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-manjari)", fontSize: "0.72rem", fontWeight: 700, color: "var(--c-ink-muted)", letterSpacing: "0.1em" }}>
                <Globe size={12} /> {activeLang}
              </button>
              {langOpen && (
                <div className="glass" style={{ position: "absolute", top: "calc(100% + 0.6rem)", right: 0, borderRadius: "6px", overflow: "hidden", minWidth: "80px", zIndex: 200 }}>
                  {langs.map(l => (
                    <button key={l.code} onClick={() => selectLang(l)} style={{ display: "block", width: "100%", padding: "0.5rem 1rem", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-manjari)", fontSize: "0.72rem", fontWeight: 700, color: activeLang === l.label ? "var(--c-accent)" : "var(--c-ink-mid)", textAlign: "left", letterSpacing: "0.1em", transition: "background 0.15s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(196,162,101,0.08)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "none"}>
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button onClick={toggle} style={{ background: "var(--c-glass)", border: "1px solid var(--c-glass-border)", borderRadius: "100px", padding: "0.4rem 0.5rem", cursor: "pointer", display: "flex", alignItems: "center", color: "var(--c-ink-muted)", transition: "all 0.2s", backdropFilter: "blur(8px)" }}>
              {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
            </button>

            <Link href="/book" className="btn btn-accent" style={{ fontSize: "0.7rem", padding: "0.65rem 1.4rem" }}>Book a Call</Link>
          </nav>

          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }} className="nav-mobile-controls">
            <button onClick={toggle} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--c-ink-muted)" }}>
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={() => setMobileOpen(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--c-ink)" }}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="glass" style={{ marginTop: "0.5rem", borderRadius: "8px", padding: "1.25rem var(--space-page-x)" }}>
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                style={{ display: "block", fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-ink-mid)", textDecoration: "none", padding: "0.75rem 0", borderBottom: "1px solid var(--c-border)" }}>
                {l.label}
              </Link>
            ))}
            <Link href="/book" className="btn btn-accent" onClick={() => setMobileOpen(false)} style={{ marginTop: "1.25rem", width: "100%", justifyContent: "center" }}>Book a Call</Link>
          </div>
        )}
      </header>

      <style>{`
        @media (min-width: 768px) { .nav-desktop { display: flex !important; } .nav-mobile-controls { display: none !important; } }
        @media (max-width: 767px) { .nav-desktop { display: none !important; } .nav-mobile-controls { display: flex !important; } }
      `}</style>
    </>
  );
}
