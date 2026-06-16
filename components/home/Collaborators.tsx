"use client";
import { useEffect, useRef, useState } from "react";

const collaborators = [
  { name: "IFC / World Bank Group",  abbr: "IFC" },
  { name: "Strathmore University",   abbr: "SU" },
  { name: "GIZ Kenya",               abbr: "GIZ" },
  { name: "Nairobi Innovation Hub",  abbr: "NiHub" },
  { name: "LawTech Kenya",           abbr: "LTK" },
  { name: "iHub Nairobi",            abbr: "iHub" },
  { name: "KEPSA",                   abbr: "KEPSA" },
  { name: "Onfon Media",             abbr: "Onfon" },
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
    <section ref={ref} style={{ background: "var(--c-surface)", borderTop: "1px solid var(--c-border)", borderBottom: "1px solid var(--c-border)", padding: "3.5rem var(--space-page-x)" }}>
      <div className="inner">
        <p className="t-label" style={{
          textAlign: "center", marginBottom: "2.5rem",
          opacity: vis ? 1 : 0, transition: "opacity 0.6s ease",
        }}>Past clients & collaborators</p>

        <div style={{
          display: "flex", flexWrap: "wrap", gap: "0",
          justifyContent: "center", alignItems: "center",
          opacity: vis ? 1 : 0, transition: "opacity 0.6s ease 0.15s",
        }}>
          {collaborators.map((c, i) => (
            <div key={c.name} style={{
              padding: "1rem 2.25rem",
              borderRight: i < collaborators.length - 1 ? "1px solid var(--c-border)" : "none",
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(8px)",
              transition: `opacity 0.5s ease ${0.1 + i * 0.07}s, transform 0.5s ease ${0.1 + i * 0.07}s`,
            }}>
              <p style={{
                fontFamily: "var(--font-manjari)", fontWeight: 700,
                fontSize: "0.8rem", letterSpacing: "0.06em",
                color: "var(--c-ink-muted)", whiteSpace: "nowrap",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"}
              >{c.name}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          section div div { gap: 0 !important; }
          section div div > div { border-right: none !important; padding: 0.75rem 1.25rem !important; }
        }
      `}</style>
    </section>
  );
}
