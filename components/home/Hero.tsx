"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Intent = "legal" | "founder" | "exploring" | null;

export function Hero({ intent }: { intent: Intent }) {
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section style={{
      minHeight: "100svh",
      background: "var(--c-bg)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      padding: "8rem var(--space-page-x) 5rem",
      overflow: "hidden",
    }}>

      {/* Photo — centre stage */}
      <div style={{
        width: "clamp(260px, 36vw, 460px)",
        aspectRatio: "3/4",
        borderRadius: "6px",
        overflow: "hidden",
        position: "relative",
        marginBottom: "2.5rem",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(16px)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
      }}>
        <img
          src="/decra-hero.png"
          alt="Decra Kerubo"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
        />
      </div>

      {/* Name */}
      <div style={{
        textAlign: "center",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(10px)",
        transition: "opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s",
      }}>
        <h1 style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 400,
          fontStyle: "italic",
          fontSize: "clamp(2rem, 3.5vw, 3rem)",
          color: "var(--c-ink)",
          letterSpacing: "-0.01em",
          lineHeight: 1,
          marginBottom: "0.6rem",
        }}>
          Decra Kerubo
        </h1>
        <p style={{
          fontFamily: "var(--font-manjari)",
          fontWeight: 700,
          fontSize: "0.6rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--c-ink-muted)",
          marginBottom: "2rem",
        }}>
          Lawyer &nbsp;&middot;&nbsp; Computer Scientist &nbsp;&middot;&nbsp; Nairobi
        </p>

        {/* Two links only */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2.5rem" }}>
          <a href="#services" style={{
            fontFamily: "var(--font-manjari)", fontWeight: 700,
            fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "var(--c-ink-muted)", textDecoration: "none", transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"}>
            Services
          </a>
          <span style={{ width: "1px", height: "12px", background: "var(--c-border-strong)", display: "inline-block" }} />
          <Link href="/book" style={{
            fontFamily: "var(--font-manjari)", fontWeight: 700,
            fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "var(--c-accent)", textDecoration: "none", transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"}>
            Book a Call
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1}50%{opacity:0.35} }
      `}</style>
    </section>
  );
}
