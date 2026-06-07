"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const words = ["founders", "startups", "NGOs", "builders"];

export function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => { setWordIdx(i => (i + 1) % words.length); setFade(true); }, 300);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{
      minHeight: "100svh",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      background: "var(--c-bg)",
      position: "relative",
      overflow: "hidden",
    }} id="hero-root">

      {/* Left — text */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "10rem var(--space-page-x) 6rem",
        maxWidth: "42rem",
        marginLeft: "auto",
      }}>
        <p style={{
          fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em",
          textTransform: "uppercase", color: "var(--c-sage)", marginBottom: "2.5rem",
        }}>Technology Law · Entrepreneurial Advisory</p>

        <h1 style={{
          fontFamily: "var(--font-serif)", fontWeight: 400,
          fontSize: "clamp(2.6rem, 4.5vw, 4rem)", lineHeight: 1.12,
          color: "var(--c-ink)", marginBottom: "2rem",
        }}>
          Hi, I'm{" "}
          <em style={{ fontStyle: "italic", color: "var(--c-sage-dark)" }}>Decra.</em>
        </h1>

        <p style={{
          fontSize: "1.05rem", color: "var(--c-ink-muted)", lineHeight: 1.85,
          marginBottom: "0.75rem", maxWidth: "26rem",
        }}>
          Lawyer and computer scientist helping{" "}
          <span style={{
            color: "var(--c-sage-deep)", fontWeight: 700,
            opacity: fade ? 1 : 0, transition: "opacity 0.3s ease",
            display: "inline-block",
          }}>{words[wordIdx]}</span>{" "}
          navigate technology law and build companies that hold up.
        </p>
        <p style={{ fontSize: "1.05rem", color: "var(--c-ink-muted)", lineHeight: 1.85, marginBottom: "3rem", maxWidth: "26rem" }}>
          Based in Nairobi. Operating across Africa.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/book" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            border: "1px solid var(--c-ink)", color: "var(--c-ink)",
            fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "0.85rem 2rem", borderRadius: "100px", textDecoration: "none",
            transition: "background 0.25s, color 0.25s",
            background: "transparent",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--c-ink)"; (e.currentTarget as HTMLElement).style.color = "var(--c-bg)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"; }}>
            Book a Call
          </Link>
          <Link href="/services" style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            color: "var(--c-ink-muted)", fontFamily: "var(--font-manjari)",
            fontSize: "0.85rem", textDecoration: "none",
            borderBottom: "1px solid var(--c-border)", paddingBottom: "1px",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-sage-deep)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"}>
            See services <ArrowRight size={13} />
          </Link>
        </div>

        {/* Minimal service pills */}
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "3.5rem", flexWrap: "wrap" }}>
          {["Technology Law", "Startup Advisory", "AI Engineering →"].map((t, i) => (
            <span key={t} style={{
              fontSize: "0.7rem", padding: "0.35rem 0.85rem",
              borderRadius: "100px", fontWeight: 700, letterSpacing: "0.05em",
              border: "1px solid var(--c-border)",
              background: i === 2 ? "var(--c-sage-deep)" : "transparent",
              color: i === 2 ? "var(--c-bg)" : "var(--c-ink-muted)",
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Right — offset photo block */}
      <div style={{ position: "relative", background: "var(--c-sage-light)", overflow: "hidden" }}>
        {/* Photo */}
        <img
          src="/decra-hero.png"
          alt="Decra Kerubo"
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            objectPosition: "center top", display: "block",
          }}
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        {/* Overlay card — floats over the photo */}
        <div style={{
          position: "absolute", bottom: "2.5rem", left: "-2rem",
          background: "var(--c-surface)", borderRadius: "16px",
          padding: "1.25rem 1.5rem", boxShadow: "0 8px 32px rgba(42,40,32,0.10)",
          minWidth: "200px",
        }}>
          <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-sage)", marginBottom: "0.35rem" }}>Based in</p>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--c-ink)" }}>Nairobi, Kenya</p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.5rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", flexShrink: 0, animation: "pulse-dot 2s infinite" }} />
            <span style={{ fontSize: "0.72rem", color: "var(--c-ink-muted)" }}>Available for new work</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        @media (max-width: 860px) {
          #hero-root { grid-template-columns: 1fr !important; grid-template-rows: auto 50vh; }
          #hero-root > div:first-child { padding: 8rem 1.5rem 3rem; margin: 0; max-width: 100%; }
        }
      `}</style>
    </section>
  );
}
