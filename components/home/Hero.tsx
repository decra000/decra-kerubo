"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Intent = "legal" | "founder" | "exploring" | null;

export function Hero({ intent }: { intent: Intent }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t); }, []);

  return (
    <section style={{
      minHeight: "100svh",
      background: "var(--c-bg)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Photo — nearly full viewport height */}
      <div style={{
        width: "clamp(240px, 32vw, 420px)",
        aspectRatio: "4/5",
        overflow: "hidden",
        position: "relative",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(20px)",
        transition: "opacity 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)",
        marginBottom: "2.75rem",
      }}>
        <img src="/decra-hero.png" alt="Decra Kerubo"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
      </div>

      {/* Identity — minimal, centred */}
      <div style={{
        textAlign: "center",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(10px)",
        transition: "opacity 1.1s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.1s",
      }}>
        <p style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
          color: "var(--c-ink)",
          letterSpacing: "-0.01em",
          lineHeight: 1,
          marginBottom: "0.85rem",
          fontWeight: 400,
        }}>Decra Kerubo</p>

        <p style={{
          fontFamily: "var(--font-manjari)",
          fontSize: "0.58rem",
          fontWeight: 700,
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          color: "var(--c-ink-muted)",
          marginBottom: "2.25rem",
        }}>Lawyer &nbsp;&middot;&nbsp; Computer Scientist &nbsp;&middot;&nbsp; Nairobi</p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
          <a href="#services" style={{
            fontFamily: "var(--font-manjari)", fontWeight: 700,
            fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase",
            color: "var(--c-ink-muted)", textDecoration: "none", transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-ink)"}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-ink-muted)"}>
            Services
          </a>
          <span style={{ display: "block", width: "1px", height: "10px", background: "var(--c-border-strong)" }} />
          <Link href="/book" style={{
            fontFamily: "var(--font-manjari)", fontWeight: 700,
            fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase",
            color: "var(--c-accent)", textDecoration: "none", transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-ink)"}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-accent)"}>
            Book a Call
          </Link>
        </div>
      </div>
    </section>
  );
}
