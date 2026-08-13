"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";

/* Styled to match the engineering project pages: a narrow measure, an
   eyebrow struck through with a gold rule, display headings, and artwork
   framed in a rounded panel rather than bleeding to the edge. */

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

const ENTRORA_SITE = "https://entrorasystems.com";
const ENTRORA_LINKEDIN = "https://www.linkedin.com/company/entrora/";
/** The newsletter is published from the Entrora LinkedIn page, so subscribing
 *  happens there rather than through a form here. */
const NEWSLETTER_URL = "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7241946044966592512";

const MEASURE = "52rem";

function Eyebrow({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
      <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
      <span className="t-label">{text}</span>
    </div>
  );
}

const PRINCIPLES = [
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

const SERVICES = [
  { n: "01", t: "AI Document Systems", b: "Classification, extraction, and review pipelines, built for legal and compliance workflows." },
  { n: "02", t: "Legal Tech Development", b: "Software built for legal workflows, by someone who understands both sides of the table." },
  { n: "03", t: "Compliant AI Products", b: "AI products with data governance and regulatory alignment built in from day one." },
  { n: "04", t: "AI Adoption Advisory", b: "Scoping and implementation for organisations at any stage, no enterprise budget required." },
  { n: "05", t: "Regulatory Sandbox Navigation", b: "Navigating regulatory sandbox frameworks across Kenya and East Africa." },
  { n: "06", t: "AI Governance Frameworks", b: "Governance documents for AI deployment, accountability, explainability, risk." },
];

export default function EntroraPage() {
  const [heroVis, setHeroVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVis(true), 80); return () => clearTimeout(t); }, []);
  const principles = useReveal();
  const services = useReveal();
  const news = useReveal();

  return (
    <div style={{ background: "var(--c-bg)", paddingTop: "6rem" }}>

      {/* ── Hero ── */}
      <section className="section page-x">
        <div className="inner" style={{ maxWidth: MEASURE, ...fade(heroVis) }}>
          {/* Framed rather than floating: the file is a JPG, so it carries a
              white background that would sit as a bare white square on the
              dark theme. The panel makes that read as a deliberate mark. */}
          <div className="ent-logo-frame" style={{ marginBottom: "2.5rem" }}>
            <Image
              src="/entrora_logo.jpg"
              alt="Entrora, legal engineering"
              width={200}
              height={200}
              priority
              className="ent-logo"
            />
          </div>

          <Eyebrow text="Legal Engineering" />
          <h1 className="t-display t-display-xl" style={{ marginBottom: "1.5rem" }}>Entrora Systems.</h1>
          <p className="t-body" style={{ maxWidth: "38rem", marginBottom: "2.5rem" }}>
            Regulated software built where the legal reasoning and the technical reasoning happen at the
            same desk, at the same time, rather than one reviewing the other after the fact.
          </p>

          <div style={{ display: "flex", gap: "1.75rem", flexWrap: "wrap" }}>
            <a href={ENTRORA_SITE} target="_blank" rel="noopener noreferrer" className="ent-cta">
              Visit entrorasystems.com <ExternalLink size={10} strokeWidth={1.5} />
            </a>
            <a href={ENTRORA_LINKEDIN} target="_blank" rel="noopener noreferrer" className="ent-cta ent-cta-muted">
              Entrora on LinkedIn <ExternalLink size={9} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </section>

      {/* ── The initiative ── */}
      <section className="section page-x" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div ref={principles.ref as React.RefObject<HTMLDivElement>} className="inner" style={{ maxWidth: MEASURE }}>
          <div style={fade(principles.vis)}>
            <Eyebrow text="The initiative" />
            <h2 className="t-display t-display-lg" style={{ marginBottom: "1.5rem" }}>Legal engineering.</h2>
            <p className="t-body" style={{ maxWidth: "38rem", marginBottom: "4rem" }}>
              Most regulated software is built twice: once by engineers, then again by lawyers telling them
              what they should have done. Entrora exists to collapse that into a single pass.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(17rem, 1fr))", gap: "2.5rem" }}>
            {PRINCIPLES.map((p, i) => (
              <div key={p.t} style={{ borderTop: "1px solid var(--c-border)", paddingTop: "1.25rem", ...fade(principles.vis, 0.06 + i * 0.05) }}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.05rem", color: "var(--c-ink)", marginBottom: "0.75rem" }}>{p.t}</h3>
                <p className="t-body-sm">{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section page-x" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div ref={services.ref as React.RefObject<HTMLDivElement>} className="inner" style={{ maxWidth: MEASURE }}>
          <div style={fade(services.vis)}>
            <Eyebrow text="What Entrora builds" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--c-border)", border: "1px solid var(--c-border)", borderRadius: "10px", overflow: "hidden" }} className="ent-g">
            {SERVICES.map((s, i) => (
              <div key={s.n} style={{ padding: "2rem", background: "var(--c-bg)", opacity: services.vis ? 1 : 0, transition: `opacity 0.5s ease ${0.06 * i}s` }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "0.75rem", color: "var(--c-accent)", display: "block", marginBottom: "1rem" }}>{s.n}</span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.05rem", color: "var(--c-ink)", marginBottom: "0.6rem" }}>{s.t}</h3>
                <p className="t-body-sm">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The newsletter ──
          Published from the Entrora LinkedIn page, so this points there
          rather than collecting addresses: a form here would need its own
          list, consent record and privacy notice, and would split
          subscribers across two places. Subscriber counts are deliberately
          not printed, since a hardcoded number goes stale the same week. */}
      <section className="section page-x" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div ref={news.ref as React.RefObject<HTMLDivElement>} className="inner" style={{ maxWidth: MEASURE, ...fade(news.vis) }}>
          <Eyebrow text="The newsletter" />

          <div className="ent-news">
            <div className="ent-news-art">
              <Image src="/lex.png" alt="Lex &amp; Latte, law and coffee" width={320} height={320} className="ent-news-img" />
            </div>

            <div>
              <h2 className="t-display t-display-md" style={{ marginBottom: "1rem" }}>Lex &amp; Latte.</h2>
              <p className="t-body" style={{ marginBottom: "1.25rem" }}>
                Essential legal insights, tips and updates for entrepreneurs and startups, published
                biweekly by Entrora.
              </p>
              <p className="t-body-sm" style={{ marginBottom: "2rem" }}>
                It arrives through LinkedIn, it is free, and you can leave whenever you like.
              </p>
              <a href={NEWSLETTER_URL} target="_blank" rel="noopener noreferrer" className="ent-cta">
                Subscribe on LinkedIn <ExternalLink size={10} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section page-x" style={{ borderTop: "1px solid var(--c-border)", background: "var(--c-surface)" }}>
        <div className="inner" style={{ maxWidth: MEASURE }}>
          <Eyebrow text="Ready to build" />
          <h2 className="t-display t-display-lg" style={{ marginBottom: "2rem" }}>Start with a conversation.</h2>
          <a href={ENTRORA_SITE} target="_blank" rel="noopener noreferrer" className="ent-cta">
            Get in touch with Entrora <ArrowRight size={11} strokeWidth={1.5} />
          </a>
        </div>
      </section>

      <style>{`
        /* Both source files are 200px square, so nothing is displayed larger
           than that: upscaling a 200px mark just makes it soft. */
        .ent-logo-frame{
          width: clamp(6.5rem, 13vw, 8.75rem); aspect-ratio: 1 / 1;
          border: 1px solid var(--c-border); border-radius: 10px;
          background: var(--c-surface); overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .ent-logo{ width: 100%; height: 100%; object-fit: contain; display: block; }

        .ent-cta{
          display: inline-flex; align-items: center; gap: 0.45rem;
          font-family: var(--font-manjari); font-weight: 700;
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--c-ink); text-decoration: none;
          border-bottom: 1px solid var(--c-ink); padding-bottom: 2px;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .ent-cta-muted{ color: var(--c-ink-muted); border-bottom-color: var(--c-border); }
        .ent-cta:hover{ color: var(--c-accent); border-bottom-color: var(--c-accent); }

        /* Artwork framed the way the engineering pages frame a project shot. */
        .ent-news{
          display: grid; grid-template-columns: minmax(0, 12.5rem) minmax(0, 1fr);
          gap: clamp(1.5rem, 4vw, 3rem); align-items: start;
        }
        .ent-news-art{
          border: 1px solid var(--c-border); border-radius: 10px;
          background: var(--c-surface); overflow: hidden;
          aspect-ratio: 1 / 1; display: flex; align-items: center; justify-content: center;
        }
        .ent-news-img{ width: 100%; height: 100%; object-fit: contain; display: block; }

        @media(max-width:700px){
          .ent-g{ grid-template-columns: 1fr !important; }
          .ent-news{ grid-template-columns: 1fr; }
          .ent-news-art{ max-width: 12.5rem; }
        }
        /* On a phone these underlined links are the only way off the page,
           and as bare text they were about 17px tall. */
        @media(max-width:600px){
          .ent-cta{ padding-top: 0.7rem; padding-bottom: 0.8rem; }
        }
      `}</style>
    </div>
  );
}
