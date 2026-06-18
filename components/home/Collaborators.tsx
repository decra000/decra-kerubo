"use client";
import { useEffect, useRef, useState } from "react";

const names = [
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
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.2 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      borderTop: "1px solid var(--c-border)",
      padding: "3.5rem var(--space-x)",
    }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <p style={{
          fontFamily: "var(--font-manjari)", fontWeight: 700,
          fontSize: "0.52rem", letterSpacing: "0.24em", textTransform: "uppercase",
          color: "var(--c-ink-muted)", textAlign: "center",
          marginBottom: "2rem",
          opacity: vis ? 1 : 0, transition: "opacity 0.6s",
        }}>Past clients &amp; collaborators</p>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {names.map((name, i) => (
            <span key={name} style={{
              fontFamily: "var(--font-sans)", fontWeight: 300,
              fontSize: "0.78rem", color: "var(--c-ink-muted)",
              padding: "0.35rem 1.5rem",
              borderRight: i < names.length - 1 ? "1px solid var(--c-border)" : "none",
              opacity: vis ? 0.55 : 0,
              transition: `opacity 0.5s ease ${i * 0.05}s`,
              whiteSpace: "nowrap",
              cursor: "default",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "0.55"}
            >{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
