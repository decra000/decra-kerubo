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

const ENTRORA_SITE = "https://entrorasystems.com";
const ENTRORA_LINKEDIN = "https://www.linkedin.com/company/entrora/";
/** The newsletter is published from the Entrora LinkedIn page, so subscribing
 *  happens there rather than through a form here. */
const ENTRORA_NEWSLETTER = "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7241946044966592512";

/** Shared outbound-link styling, matching the underlined CTAs on this page. */
const extLink = (muted = false): React.CSSProperties => ({
  display: "inline-flex", alignItems: "center", gap: "0.4rem",
  fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem",
  letterSpacing: "0.2em", textTransform: "uppercase",
  color: muted ? "var(--c-ink-muted)" : "var(--c-ink)", textDecoration: "none",
  borderBottom: `1px solid ${muted ? "var(--c-border)" : "var(--c-ink)"}`,
  paddingBottom: "2px", transition: "color 0.2s, border-color 0.2s",
});
const extIn = (e: React.MouseEvent) => { const t = e.currentTarget as HTMLElement; t.style.color = "var(--c-accent)"; t.style.borderColor = "var(--c-accent)"; };
const extOut = (muted = false) => (e: React.MouseEvent) => {
  const t = e.currentTarget as HTMLElement;
  t.style.color = muted ? "var(--c-ink-muted)" : "var(--c-ink)";
  t.style.borderColor = muted ? "var(--c-border)" : "var(--c-ink)";
};

function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);
  return (
    <section style={{ minHeight: "70svh", background: "var(--c-bg)", display: "flex", alignItems: "flex-end", padding: "0 var(--space-x) 5rem", paddingTop: "10rem" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", width: "100%" }}>
        <div style={fade(vis)}>
          <p style={{ ...LBL, marginBottom: "1.25rem" }}>Legal Engineering, in partnership with Decra Kerubo</p>
          <h1 style={{ ...SERIF("clamp(2.5rem,5vw,4.5rem)"), marginBottom: "1.5rem" }}>Entrora Systems.</h1>
          <p style={{ ...BODY, maxWidth: "30rem", marginBottom: "2.5rem" }}>
            Legal engineering: building regulated software where the legal reasoning and the technical
            reasoning happen at the same desk, at the same time, rather than one reviewing the other after the fact.
          </p>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            <a href={ENTRORA_SITE} target="_blank" rel="noopener noreferrer" className="ent-cta" style={extLink()} onMouseEnter={extIn} onMouseLeave={extOut()}>
              Visit entrorasystems.com <ExternalLink size={10} strokeWidth={1.5} />
            </a>
            <a href={ENTRORA_LINKEDIN} target="_blank" rel="noopener noreferrer" className="ent-cta" style={extLink(true)} onMouseEnter={extIn} onMouseLeave={extOut(true)}>
              Entrora on LinkedIn <ExternalLink size={9} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* What the initiative actually claims.
   Written from the positioning already used across this site rather than
   copied from the LinkedIn page, which is behind a login. */
function LegalEngineering() {
  const { ref, vis } = useReveal();
  const principles = [
    {
      t: "One person reads both",
      b: "The lawyer and the engineer are the same person. Nothing is lost translating an architecture decision into a legal question, or a regulatory obligation into a technical constraint, because there is no handover between them.",
    },
    {
      t: "Compliance as a build constraint",
      b: "Data protection, auditability and accountability are treated the way latency or uptime are treated: something the system is designed around from the first commit, not a review stage bolted on before launch.",
    },
    {
      t: "Regulated by design",
      b: "Governance, explainability and risk documentation are produced as the product is built, so the evidence a regulator asks for already exists rather than being reconstructed afterwards.",
    },
    {
      t: "Built for the rules that actually apply",
      b: "Scoped to Kenyan and East African regulation as it stands, including sandbox frameworks, rather than to a compliance regime borrowed from another market.",
    },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={SEC}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <p style={{ ...LBL, marginBottom: "2rem", ...fade(vis) }}>The initiative</p>
        <h2 style={{ ...SERIF("clamp(1.6rem,3vw,2.4rem)"), maxWidth: "34rem", marginBottom: "1.5rem", ...fade(vis, 0.04) }}>
          Legal engineering.
        </h2>
        <p style={{ ...BODY, maxWidth: "38rem", marginBottom: "4rem", ...fade(vis, 0.06) }}>
          Most regulated software is built twice: once by engineers, then again by lawyers telling them what
          they should have done. Entrora exists to collapse that into a single pass.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(17rem, 1fr))", gap: "2.5rem" }}>
          {principles.map((p, i) => (
            <div key={p.t} style={{ borderTop: "1px solid var(--c-border)", paddingTop: "1.25rem", ...fade(vis, 0.08 + i * 0.05) }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.05rem", color: "var(--c-ink)", marginBottom: "0.75rem" }}>{p.t}</h3>
              <p style={{ ...BODY, fontSize: "0.8rem" }}>{p.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* The newsletter is published from the Entrora LinkedIn page, so this points
   there rather than collecting an address here: an email form would need a
   list, a consent record and a privacy notice to do honestly, and it would
   split the subscriber base across two places. */
function Newsletter() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={SEC}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{ maxWidth: "34rem", ...fade(vis) }}>
          <p style={{ ...LBL, marginBottom: "1.25rem" }}>Newsletter</p>
          <h2 style={{ ...SERIF("clamp(1.5rem,2.6vw,2.1rem)"), marginBottom: "1.25rem" }}>
            Written from inside the build.
          </h2>
          <p style={{ ...BODY, marginBottom: "2.25rem" }}>
            Entrora Systems publishes on where technology regulation meets the work of actually shipping
            software in this region. It is free, it arrives through LinkedIn, and you can leave whenever
            you like.
          </p>
          <a href={ENTRORA_NEWSLETTER} target="_blank" rel="noopener noreferrer" className="ent-cta" style={extLink()} onMouseEnter={extIn} onMouseLeave={extOut()}>
            Subscribe on LinkedIn <ExternalLink size={10} strokeWidth={1.5} />
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
            { n: "01", t: "AI Document Systems", b: "Classification, extraction, and review pipelines, built for legal and compliance workflows." },
            { n: "02", t: "Legal Tech Development", b: "Software built for legal workflows, by someone who understands both sides of the table." },
            { n: "03", t: "Compliant AI Products", b: "AI products with data governance and regulatory alignment built in from day one." },
            { n: "04", t: "AI Adoption Advisory", b: "Scoping and implementation for organisations at any stage, no enterprise budget required." },
            { n: "05", t: "Regulatory Sandbox Navigation", b: "Navigating regulatory sandbox frameworks across Kenya and East Africa." },
            { n: "06", t: "AI Governance Frameworks", b: "Governance documents for AI deployment, accountability, explainability, risk." },
          ].map((s, i) => (
            <div key={s.n} style={{ padding: "2.5rem", background: "var(--c-bg)", opacity: vis ? 1 : 0, transition: `opacity 0.5s ease ${0.06 * i}s` }}>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: "0.75rem", color: "var(--c-accent)", display: "block", marginBottom: "1.25rem" }}>{s.n}</span>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem", color: "var(--c-ink)", marginBottom: "0.75rem" }}>{s.t}</p>
              <p style={{ ...BODY, fontSize: "0.8rem" }}>{s.b}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:700px){ .ent-g{ grid-template-columns:1fr!important } }
        /* On a phone these underlined links are the only way off this page,
           and as bare text they were about 17px tall. */
        /* !important because extLink sets padding-bottom inline, and an
           inline style beats a stylesheet rule. */
        @media(max-width:600px){
          .ent-cta{ padding-top:0.7rem !important; padding-bottom:0.8rem !important; }
        }
      `}</style>
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
          <Link href="/talk" className="ent-cta" style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "var(--c-ink)", textDecoration: "none", borderBottom: "1px solid var(--c-ink)", paddingBottom: "2px", transition: "color 0.2s, border-color 0.2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-ink)"; }}>
            Talk to Decra <ArrowRight size={10} strokeWidth={1.5} />
          </Link>
          <a href={ENTRORA_SITE} target="_blank" rel="noopener noreferrer" className="ent-cta" style={{
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
  return (<><Hero /><LegalEngineering /><Services /><Newsletter /><CTA /></>);
}
