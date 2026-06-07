"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Zap } from "lucide-react";

const words = ["founders.", "startups.", "NGOs.", "builders."];

export function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const sectionRef = useRef<HTMLElement>(null);

  // Cycling word
  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => { setWordIdx(i => (i + 1) % words.length); setFade(true); }, 350);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  // Parallax orb
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setMousePos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section ref={sectionRef} style={{
      minHeight: "100svh", display: "flex", alignItems: "center",
      background: "var(--c-bg)", paddingLeft: "var(--space-page-x)",
      paddingRight: "var(--space-page-x)", paddingTop: "8rem", paddingBottom: "6rem",
      position: "relative", overflow: "hidden",
    }}>
      {/* Warm ambient orb */}
      <div style={{
        position: "absolute", pointerEvents: "none", zIndex: 0,
        width: "55vw", height: "55vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(143,168,152,0.15) 0%, transparent 70%)",
        left: `${mousePos.x * 0.5 + 25}%`, top: `${mousePos.y * 0.3 + 10}%`,
        transform: "translate(-50%, -50%)",
        transition: "left 1.2s cubic-bezier(0.25,0.46,0.45,0.94), top 1.2s cubic-bezier(0.25,0.46,0.45,0.94)",
      }} />
      {/* Subtle grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "linear-gradient(rgba(74,107,88,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(74,107,88,0.05) 1px, transparent 1px)",
        backgroundSize: "4rem 4rem",
      }} />

      <div className="inner" style={{ width: "100%", position: "relative", zIndex: 1 }}>
        {/* Top badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: "100px", padding: "0.35rem 0.85rem 0.35rem 0.5rem", marginBottom: "2.5rem" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
          <MapPin size={11} color="var(--c-sage)" />
          <span style={{ fontSize: "0.72rem", color: "var(--c-ink-muted)", letterSpacing: "0.04em" }}>Nairobi, Kenya · Available for new work</span>
        </div>

        <div id="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 440px", gap: "6rem", alignItems: "center" }}>
          {/* Left */}
          <div>
            <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(2.8rem,6vw,5.2rem)", lineHeight: 1.06, color: "var(--c-sage-deep)", marginBottom: "1.75rem" }}>
              Protecting what<br />
              <span style={{ position: "relative", display: "inline-block" }}>
                you build
                <svg style={{ position: "absolute", bottom: "-4px", left: 0, width: "100%", height: "6px" }} viewBox="0 0 200 6" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,4 Q150,8 200,3" stroke="var(--c-gold)" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              {" "}—<br />legally &amp; technically.
            </h1>

            <p className="t-body" style={{ maxWidth: "30rem", marginBottom: "0.9rem" }}>
              Technology law and entrepreneurial legal consulting for{" "}
              <span style={{
                color: "var(--c-sage-deep)", fontWeight: 700,
                transition: "opacity 0.35s ease",
                opacity: fade ? 1 : 0,
                display: "inline-block", minWidth: "6rem",
              }}>{words[wordIdx]}</span>
            </p>
            <p className="t-body" style={{ maxWidth: "30rem", marginBottom: "3rem" }}>
              From first incorporation through international expansion. Two disciplines. One practice.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3.5rem" }}>
              <Link href="/book" className="btn-primary">
                Book a Discovery Call <ArrowRight size={14} />
              </Link>
              <Link href="/services" className="btn-outline">
                See what's covered
              </Link>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "2.5rem", paddingTop: "2rem", borderTop: "1px solid var(--c-border)", flexWrap: "wrap" }}>
              {[["Free", "Discovery call"], ["48h", "Response time"], ["2", "Advisory tracks"], ["EA", "Focus region"]].map(([v, l]) => (
                <div key={l}>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--c-sage-deep)", lineHeight: 1 }}>{v}</p>
                  <p style={{ fontSize: "0.72rem", color: "var(--c-ink-muted)", marginTop: "0.3rem" }}>{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — interactive track cards */}
          <div className="hero-panel" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              {
                tag: "Technology Law",
                icon: "⚖️",
                headline: "Keep your product legally sound.",
                items: ["Data privacy & ODPC compliance", "Tech contracts & IP", "Regulatory mapping", "International structuring"],
                dark: true,
              },
              {
                tag: "Entrepreneurial Law",
                icon: "🏗️",
                headline: "Build a company that holds.",
                items: ["Incorporation & structure", "Tax & eTIMS compliance", "Founder equity & vesting", "Fundraising readiness"],
                dark: false,
              },
            ].map((track) => (
              <div key={track.tag} className={track.dark ? "track-card-dark" : "track-card-light"} style={{
                padding: "1.75rem", borderRadius: "14px", cursor: "default",
                background: track.dark ? "var(--c-sage-deep)" : "var(--c-sage-light)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = track.dark ? "0 16px 40px rgba(44,59,40,0.3)" : "0 12px 32px rgba(44,59,40,0.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "1rem" }}>{track.icon}</span>
                  <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: track.dark ? "var(--c-gold)" : "var(--c-sage-dark)" }}>{track.tag}</span>
                </div>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem", color: track.dark ? "rgba(244,245,240,0.9)" : "var(--c-sage-deep)", marginBottom: "1rem", lineHeight: 1.35 }}>{track.headline}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {track.items.map(item => (
                    <div key={item} style={{ display: "flex", gap: "0.55rem", alignItems: "center" }}>
                      <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: track.dark ? "var(--c-gold)" : "var(--c-sage)", flexShrink: 0 }} />
                      <span style={{ fontSize: "0.825rem", color: track.dark ? "rgba(244,245,240,0.6)" : "var(--c-ink-mid)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Entrora pill */}
            <a href="https://entrorasystems.com" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: "12px", textDecoration: "none", transition: "border-color 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--c-sage)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(44,59,40,0.08)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "2rem", height: "2rem", borderRadius: "8px", background: "var(--c-sage-deep)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Zap size={12} color="var(--c-gold)" />
                </div>
                <div>
                  <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-sage)", marginBottom: "0.1rem" }}>AI Engineering</p>
                  <p style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--c-sage-deep)" }}>Entrora Systems</p>
                </div>
              </div>
              <ArrowRight size={14} color="var(--c-sage)" />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        @media (max-width: 900px) { #hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } .hero-panel { max-width: 500px; } }
      `}</style>
    </section>
  );
}
