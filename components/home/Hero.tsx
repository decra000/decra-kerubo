"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const roleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const roles = ["Lawyer", "Computer Scientist", "AI Engineer", "Entrepreneur"];
    let i = 0, charIndex = 0, deleting = false;
    const tick = () => {
      const current = roles[i % roles.length];
      if (roleRef.current) {
        if (!deleting) {
          roleRef.current.textContent = current.slice(0, charIndex + 1);
          charIndex++;
          if (charIndex === current.length) { deleting = true; setTimeout(tick, 2000); return; }
        } else {
          roleRef.current.textContent = current.slice(0, charIndex - 1);
          charIndex--;
          if (charIndex === 0) { deleting = false; i++; }
        }
      }
      setTimeout(tick, deleting ? 55 : 90);
    };
    tick();
  }, []);

  return (
    <section style={{
      minHeight: "100svh",
      display: "flex",
      alignItems: "center",
      background: "var(--c-bg)",
      paddingLeft: "var(--space-page-x)",
      paddingRight: "var(--space-page-x)",
      paddingTop: "7rem",
      paddingBottom: "5rem",
    }}>
      <div className="inner hero-grid" style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 420px", gap: "5rem", alignItems: "center" }}>

        {/* Left: content */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "2.5rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <span style={{ fontSize: "0.7rem", color: "var(--c-ink-muted)" }}>
              <span ref={roleRef} />
              <span style={{ color: "var(--c-gold)", animation: "blink 1s step-end infinite" }}>|</span>
            </span>
          </div>

          <h1 className="t-display t-display-xl" style={{ maxWidth: "24rem", marginBottom: "1.5rem" }}>
            Protecting what you build — legally and technically.
          </h1>

          <p className="t-body" style={{ maxWidth: "26rem", marginBottom: "2.5rem" }}>
            I help startups, NGOs, and founders navigate technology law, structure their companies correctly, and build AI systems that work. Based in Nairobi, operating across Africa.
          </p>

          {/* Two-track cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem", maxWidth: "34rem", marginBottom: "2.5rem" }}>
            <Link href="/services#tech-law" className="track-card" style={{ display: "block", padding: "1rem 1.15rem", borderRadius: "10px", border: "1px solid var(--c-border)", background: "var(--c-surface)", textDecoration: "none" }}>
              <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: "0.3rem" }}>Companies & products</p>
              <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.825rem", color: "var(--c-forest)", marginBottom: "0.25rem" }}>Tech Policy & Startup Law</p>
              <p style={{ fontSize: "0.68rem", color: "var(--c-ink-muted)", lineHeight: 1.5 }}>IP, contracts, data privacy, regulation.</p>
            </Link>
            <Link href="/services#founder-legal" className="track-card" style={{ display: "block", padding: "1rem 1.15rem", borderRadius: "10px", border: "1px solid var(--c-border)", background: "var(--c-surface)", textDecoration: "none" }}>
              <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: "0.3rem" }}>Founders & entrepreneurs</p>
              <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.825rem", color: "var(--c-forest)", marginBottom: "0.25rem" }}>Founder Legal</p>
              <p style={{ fontSize: "0.68rem", color: "var(--c-ink-muted)", lineHeight: 1.5 }}>Equity, structure, incorporation, governance.</p>
            </Link>
          </div>

          <Link href="/book" className="btn-primary">
            Book a Discovery Call <ArrowRight size={13} />
          </Link>

          <div style={{ display: "flex", gap: "2.5rem", marginTop: "3.5rem", paddingTop: "2.5rem", borderTop: "1px solid var(--c-border)", flexWrap: "wrap" }}>
            {[["Nairobi", "East Africa focus"], ["2", "Advisory tracks"], ["Law + Tech", "In one practice"]].map(([v, l]) => (
              <div key={v}>
                <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "1.1rem", color: "var(--c-forest)", lineHeight: 1 }}>{v}</p>
                <p style={{ fontSize: "0.62rem", color: "var(--c-ink-muted)", marginTop: "0.3rem" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: portrait */}
        <div className="hero-portrait" style={{ position: "relative" }}>
          <div style={{ borderRadius: "16px", overflow: "hidden", background: "rgba(14,61,50,0.04)", border: "1px solid var(--c-border)", aspectRatio: "3/4", position: "relative" }}>
            <Image
              src="/decra-hero.png"
              alt="Decra"
              fill
              style={{ objectFit: "cover", objectPosition: "top center" }}
              priority
            />
          </div>
          {/* Floating tag */}
          <div style={{ position: "absolute", bottom: "1.25rem", left: "1.25rem", right: "1.25rem", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderRadius: "10px", padding: "0.8rem 1rem", border: "1px solid var(--c-border)" }}>
            <p className="t-label" style={{ marginBottom: "0.35rem" }}>Based in Nairobi, Kenya</p>
            <p style={{ fontSize: "0.72rem", color: "var(--c-ink-mid)" }}>Lawyer · Computer Scientist · AI Engineer</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .track-card:hover { border-color: rgba(14,61,50,0.28) !important; box-shadow: 0 4px 16px rgba(14,61,50,0.06); }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .hero-portrait { display: none; }
        }
      `}</style>
    </section>
  );
}
