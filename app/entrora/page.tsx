"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.06 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return { ref, vis };
}

const fade = (vis: boolean, delay = 0): React.CSSProperties => ({
  opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(18px)",
  transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
});
const LBL: React.CSSProperties = { fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--c-ink-muted)" };
const SERIF = (sz = "clamp(2rem,3.5vw,3rem)"): React.CSSProperties => ({ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: sz, color: "var(--c-ink)", lineHeight: 1.05 });
const BODY: React.CSSProperties = { fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.875rem", color: "var(--c-ink-mid)", lineHeight: 1.85 };
const SEC: React.CSSProperties = { borderTop: "1px solid var(--c-border)", padding: "var(--space-section) var(--space-x)" };

function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);
  return (
    <section style={{ minHeight: "70svh", background: "var(--c-bg)", display: "flex", alignItems: "flex-end", padding: "0 var(--space-x) 5rem", paddingTop: "10rem" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", width: "100%" }}>
        <div style={fade(vis)}>
          <p style={{ ...LBL, marginBottom: "1.25rem" }}>In partnership with Decra Kerubo</p>
          <h1 style={{ ...SERIF("clamp(2.5rem,5vw,4.5rem)"), marginBottom: "1.5rem" }}>Entrora Systems.</h1>
          <p style={{ ...BODY, maxWidth: "28rem", marginBottom: "2.5rem" }}>Regulated AI engineering and software development. Built with the legal layer from day one.</p>
          <a href="https://entrorasystems.com" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "var(--c-ink)", textDecoration: "none", borderBottom: "1px solid var(--c-ink)", paddingBottom: "2px", transition: "color 0.2s, border-color 0.2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-ink)"; }}>
            Visit entrorasystems.com <ExternalLink size={10} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={SEC}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <p style={{ ...LBL, marginBottom: "4rem", ...fade(vis) }}>Services</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--c-border)" }} className="ent-g">
          {[
            { n: "01", t: "AI Document Systems", b: "Classification, extraction, and review pipelines — built for legal and compliance workflows." },
            { n: "02", t: "Legal Tech Development", b: "Software built for legal workflows, by someone who understands both sides of the table." },
            { n: "03", t: "Compliant AI Products", b: "AI products with data governance and regulatory alignment built in from day one." },
            { n: "04", t: "AI Adoption Advisory", b: "Scoping and implementation for organisations at any stage — no enterprise budget required." },
            { n: "05", t: "Regulatory Sandbox Navigation", b: "Navigating regulatory sandbox frameworks across Kenya and East Africa." },
            { n: "06", t: "AI Governance Frameworks", b: "Governance documents for AI deployment — accountability, explainability, risk." },
          ].map((s, i) => (
            <div key={s.n} style={{ padding: "2.5rem", background: "var(--c-bg)", opacity: vis ? 1 : 0, transition: `opacity 0.5s ease ${0.06 * i}s` }}>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: "0.75rem", color: "var(--c-accent)", display: "block", marginBottom: "1.25rem" }}>{s.n}</span>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem", color: "var(--c-ink)", marginBottom: "0.75rem" }}>{s.t}</p>
              <p style={{ ...BODY, fontSize: "0.8rem" }}>{s.b}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:700px){.ent-g{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

function CTA() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ ...SEC, background: "var(--c-surface)" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "3rem", flexWrap: "wrap" }}>
        <div style={fade(vis)}>
          <p style={{ ...LBL, marginBottom: "0.75rem" }}>Ready to build</p>
          <h2 style={{ ...SERIF() }}>Start with a conversation.</h2>
        </div>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", ...fade(vis, 0.1) }}>
          <Link href="/talk" style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "var(--c-ink)", textDecoration: "none", borderBottom: "1px solid var(--c-ink)", paddingBottom: "2px", transition: "color 0.2s, border-color 0.2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-ink)"; }}>
            Talk to Decra <ArrowRight size={10} strokeWidth={1.5} />
          </Link>
          <a href="https://entrorasystems.com" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "var(--c-ink-muted)", textDecoration: "none", borderBottom: "1px solid var(--c-border)", paddingBottom: "2px", transition: "color 0.2s, border-color 0.2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-ink)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"; }}>
            Visit Entrora Systems <ExternalLink size={9} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function EntroraPage() {
  return (<><Hero /><Services /><CTA /></>);
}
