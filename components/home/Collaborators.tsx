"use client";
import { useEffect, useRef, useState } from "react";

const collaborators = [
  "IFC / World Bank",
  "Strathmore University",
  "GIZ Kenya",
  "iHub Nairobi",
  "LawTech Kenya",
  "KEPSA",
  "Onfon Media",
  "Nairobi Innovation Hub",
];

export function Collaborators() {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      background: "var(--c-bg)",
      borderTop: "1px solid var(--c-border)",
      padding: "4rem var(--space-page-x)",
    }}>
      <p style={{
        fontFamily: "var(--font-manjari)", fontWeight: 700,
        fontSize: "0.55rem", letterSpacing: "0.28em", textTransform: "uppercase",
        color: "var(--c-ink-muted)", textAlign: "center", marginBottom: "2.5rem",
        opacity: vis ? 1 : 0, transition: "opacity 0.6s ease",
      }}>
        Past clients &amp; collaborators
      </p>

      <div style={{
        display: "flex", flexWrap: "wrap",
        justifyContent: "center", alignItems: "center",
        gap: "0",
        opacity: vis ? 1 : 0, transition: "opacity 0.6s ease 0.1s",
      }}>
        {collaborators.map((name, i) => (
          <span key={name} style={{
            display: "inline-flex", alignItems: "center",
            padding: "0 2rem",
            borderRight: i < collaborators.length - 1 ? "1px solid var(--c-border)" : "none",
            fontFamily: "var(--font-manjari)", fontWeight: 700,
            fontSize: "0.72rem", letterSpacing: "0.08em",
            color: "var(--c-ink-muted)",
            opacity: vis ? 0.6 : 0,
            transition: `opacity 0.5s ease ${0.12 + i * 0.06}s`,
            whiteSpace: "nowrap",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "0.6"}
          >
            {name}
          </span>
        ))}
      </div>

      <style>{`
        @media(max-width:768px){
          section > div:last-child > span {
            border-right: none !important;
            padding: 0.5rem 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
