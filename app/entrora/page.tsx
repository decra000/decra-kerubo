"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ExternalLink, Menu, X } from "lucide-react";

/* Entrora reads as its own property. The shared navbar, footer and assistant
   bubble are suppressed for this route in SiteChrome, and the header below
   belongs to Entrora rather than to the site hosting it. */

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return { ref, vis };
}

const fade = (vis: boolean, delay = 0): React.CSSProperties => ({
  opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(18px)",
  transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
});

const ENTRORA_SITE = "https://entrorasystems.com";
const ENTRORA_LINKEDIN = "https://www.linkedin.com/company/entrora/";
const NEWSLETTER_URL = "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7241946044966592512";
/** Demo bookings are taken on Calendly rather than through the host site. */
const DEMO_URL = "https://calendly.com/decrakerubo/";

const NAV = [
  { href: "#initiative", label: "About" },
  { href: "#lpms", label: "Products" },
  { href: "#solutions", label: "Solutions" },
  { href: "#newsletter", label: "Insights" },
];

const PILLARS = [
  { t: "Tech for Law", b: "Better legal systems through technology." },
  { t: "Law for Tech", b: "Responsible innovation through legal clarity." },
  { t: "Legal Engineering", b: "Designing systems where law and technology work together." },
];

const PRINCIPLES = [
  { t: "One person reads both", b: "The lawyer and the engineer are the same person. Nothing is lost translating an architecture decision into a legal question, or a regulatory obligation into a technical constraint, because there is no handover between them." },
  { t: "Compliance as a build constraint", b: "Data protection, auditability and accountability are treated the way latency or uptime are treated: something the system is designed around from the first commit, not a review stage bolted on before launch." },
  { t: "Regulated by design", b: "Governance, explainability and risk documentation are produced as the product is built, so the evidence a regulator asks for already exists rather than being reconstructed afterwards." },
  { t: "Built for the rules that actually apply", b: "Scoped to Kenyan and East African regulation as it stands, including sandbox frameworks, rather than to a compliance regime borrowed from another market." },
];

const LPMS_FEATURES = [
  { t: "Client & Matter Management", b: "Centralize your clients and matters in one place." },
  { t: "Document Management", b: "Organize, store and collaborate securely." },
  { t: "Time & Billing", b: "Track time, create invoices and get paid faster." },
  { t: "Task & Deadline Tracking", b: "Stay on top of tasks and critical deadlines." },
  { t: "Insights & Reports", b: "Make data-driven decisions with ease." },
];

const SERVICES = [
  { n: "01", t: "AI Document Systems", b: "Classification, extraction, and review pipelines, built for legal and compliance workflows." },
  { n: "02", t: "Legal Tech Development", b: "Software built for legal workflows, by someone who understands both sides of the table." },
  { n: "03", t: "Compliant AI Products", b: "AI products with data governance and regulatory alignment built in from day one." },
  { n: "04", t: "AI Adoption Advisory", b: "Scoping and implementation for organisations at any stage, no enterprise budget required." },
  { n: "05", t: "Regulatory Sandbox Navigation", b: "Navigating regulatory sandbox frameworks across Kenya and East Africa." },
  { n: "06", t: "AI Governance Frameworks", b: "Governance documents for AI deployment, accountability, explainability, risk." },
];

function Eyebrow({ text }: { text: string }) {
  return (
    <div className="ent-eyebrow">
      <span className="ent-rule" />
      <span>{text}</span>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="ent-header">
      <div className="ent-header-inner">
        <a href="#top" className="ent-brand">
          <Image src="/entrora_logo.jpg" alt="" width={200} height={200} priority className="ent-brand-mark" />
          <span className="ent-brand-text">
            <strong>Entrora</strong>
            <em>Legal Engineering</em>
          </span>
        </a>

        <nav className="ent-nav">
          {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>

        <a href={ENTRORA_SITE} target="_blank" rel="noopener noreferrer" className="ent-pill ent-pill-solid ent-header-cta">
          Get in touch <ArrowRight size={13} strokeWidth={2} />
        </a>

        <button type="button" className="ent-burger" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav className="ent-nav-mobile">
          {NAV.map((n) => <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>)}
          <a href={ENTRORA_SITE} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Get in touch</a>
        </nav>
      )}
    </header>
  );
}

export default function EntroraPage() {
  const [heroVis, setHeroVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVis(true), 80); return () => clearTimeout(t); }, []);
  const { ref: initRef, vis: initVis } = useReveal();
  const { ref: lpmsRef, vis: lpmsVis } = useReveal();
  const { ref: solRef, vis: solVis } = useReveal();
  const { ref: newsRef, vis: newsVis } = useReveal();

  return (
    <div className="ent-page" id="top">
      <Header />

      {/* ── Hero ── */}
      <section className="ent-hero">
        <span aria-hidden className="ent-blob ent-blob-green" />
        <span aria-hidden className="ent-blob ent-blob-pink" />

        <div className="ent-wrap" style={fade(heroVis)}>
          <h1 className="ent-h1">
            <span>Tech for Law.</span>
            <span className="ent-pink">Law for Tech.</span>
          </h1>

          <div className="ent-dashes" aria-hidden>
            <span className="ent-dash-pink" />
            <span className="ent-dash-green" />
          </div>

          <p className="ent-lead">
            We build the bridge between law and technology to create ethical, compliant and impactful
            solutions for <span className="ent-pink">African realities</span>.
          </p>

          <div className="ent-cta-row">
            <a href="#solutions" className="ent-pill ent-pill-solid">Our Solutions <ArrowRight size={13} strokeWidth={2} /></a>
            <a href="#initiative" className="ent-pill ent-pill-ghost">About Entrora</a>
          </div>

          <div className="ent-pillars">
            {PILLARS.map((p) => (
              <div key={p.t} className="ent-pillar">
                <h2>{p.t}</h2>
                <p>{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The initiative ── */}
      <section className="ent-section" id="initiative">
        <div ref={initRef as React.RefObject<HTMLDivElement>} className="ent-wrap">
          <div style={fade(initVis)}>
            <Eyebrow text="The initiative" />
            <h2 className="ent-h2">Legal engineering.</h2>
            <p className="ent-body ent-measure">
              Most regulated software is built twice: once by engineers, then again by lawyers telling them
              what they should have done. Entrora exists to collapse that into a single pass.
            </p>
          </div>

          <div className="ent-grid-4">
            {PRINCIPLES.map((p, i) => (
              <div key={p.t} className="ent-principle" style={fade(initVis, 0.06 + i * 0.05)}>
                <h3>{p.t}</h3>
                <p>{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Teresya to LPMS ──
          No dashboard screenshot exists in the repo, so the platform side is
          drawn as a panel of what it manages rather than a mocked-up image
          pretending to be the product. */}
      <section className="ent-section ent-tint" id="lpms">
        <div ref={lpmsRef as React.RefObject<HTMLDivElement>} className="ent-wrap">
          <div className="ent-center" style={fade(lpmsVis)}>
            <span className="ent-chip">Evolved. Expanded. Empowering legal teams.</span>
            <h2 className="ent-h2 ent-h2-center">
              From Legal Chatbot to<br />
              <span className="ent-pink">End-to-End Legal Practice Management.</span>
            </h2>
            <p className="ent-body ent-center-p">
              Teresya started the conversation. Now it powers an entire ecosystem.
            </p>
          </div>

          <div className="ent-evolution" style={fade(lpmsVis, 0.08)}>
            <div className="ent-prod">
              <div className="ent-prod-mark">
                <Image src="/teresya_logo.jpeg" alt="Teresya" width={200} height={200} className="ent-prod-img" />
              </div>
              <h3>Teresya</h3>
              <span className="ent-prod-kicker">Legal Chatbot</span>
              <p>Your AI legal assistant for quick answers, research and clarity.</p>
            </div>

            <div aria-hidden className="ent-arrow"><ArrowRight size={26} strokeWidth={1.5} /></div>

            <div className="ent-prod ent-prod-wide">
              <div className="ent-prod-mark">
                <Image src="/entrora_logo.jpg" alt="Entrora" width={200} height={200} className="ent-prod-img" />
              </div>
              <h3>Entrora LPMS</h3>
              <span className="ent-prod-kicker">Legal Practice Management System</span>
              <p>The all-in-one platform to manage matters, clients, documents, time, billing and more, seamlessly.</p>
              <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="ent-pill ent-pill-solid ent-demo">
                Book a demo <ArrowRight size={13} strokeWidth={2} />
              </a>
            </div>
          </div>

          <div className="ent-features" style={fade(lpmsVis, 0.12)}>
            {LPMS_FEATURES.map((f) => (
              <div key={f.t} className="ent-feature">
                <h4>{f.t}</h4>
                <p>{f.b}</p>
              </div>
            ))}
          </div>

          <p className="ent-closer" style={fade(lpmsVis, 0.16)}>
            Same intelligence. Bigger impact. <span className="ent-pink">Introducing Entrora LPMS.</span>
          </p>
        </div>
      </section>

      {/* ── Solutions ── */}
      <section className="ent-section" id="solutions">
        <div ref={solRef as React.RefObject<HTMLDivElement>} className="ent-wrap">
          <div style={fade(solVis)}><Eyebrow text="What Entrora builds" /></div>
          <div className="ent-solutions">
            {SERVICES.map((s, i) => (
              <div key={s.n} className="ent-solution" style={{ opacity: solVis ? 1 : 0, transition: `opacity 0.5s ease ${0.06 * i}s` }}>
                <span className="ent-num">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="ent-section ent-tint" id="newsletter">
        <div ref={newsRef as React.RefObject<HTMLDivElement>} className="ent-wrap" style={fade(newsVis)}>
          <Eyebrow text="The newsletter" />
          <div className="ent-news">
            <div className="ent-news-art">
              <Image src="/lex.png" alt="Lex and Latte" width={200} height={200} className="ent-news-img" />
            </div>
            <div>
              <h2 className="ent-h2">Lex &amp; Latte.</h2>
              <p className="ent-body">
                Essential legal insights, tips and updates for techpreneurs, published biweekly by Entrora.
              </p>
              <p className="ent-body ent-body-sm">
                It arrives through LinkedIn, it is free, and you can leave whenever you like.
              </p>
              <a href={NEWSLETTER_URL} target="_blank" rel="noopener noreferrer" className="ent-pill ent-pill-solid">
                Subscribe on LinkedIn <ExternalLink size={12} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="ent-footer">
        <div className="ent-wrap ent-footer-inner">
          <div>
            <strong>Entrora Systems</strong>
            <span>Legal Engineering, Nairobi</span>
          </div>
          <div className="ent-footer-links">
            <a href={ENTRORA_SITE} target="_blank" rel="noopener noreferrer">entrorasystems.com</a>
            <a href={ENTRORA_LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={NEWSLETTER_URL} target="_blank" rel="noopener noreferrer">Lex &amp; Latte</a>
          </div>
        </div>
      </footer>

      <style>{`
        /* Entrora's own palette, scoped to this page so it never leaks into
           the host site's tokens. Pink is the brand's second colour and has
           no equivalent in the design system here. */
        .ent-page{
          --ent-pink: #E1568A;
          --ent-green: #14503C;
          --ent-ink: var(--c-ink);
          background: var(--c-bg);
          padding-top: 0;
        }
        [data-theme="dark"] .ent-page{ --ent-pink: #F07FA8; --ent-green: #3E8F73; }

        .ent-wrap{ max-width: 68rem; margin: 0 auto; padding: 0 var(--space-x); width: 100%; }
        .ent-pink{ color: var(--ent-pink); }
        .ent-measure{ max-width: 38rem; }

        /* ── Header ── */
        .ent-header{
          position: sticky; top: 0; z-index: 40;
          background: color-mix(in srgb, var(--c-bg) 88%, transparent);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--c-border);
        }
        .ent-header-inner{
          max-width: 68rem; margin: 0 auto; padding: 0.85rem var(--space-x);
          display: flex; align-items: center; gap: 1.5rem;
        }
        .ent-brand{ display: flex; align-items: center; gap: 0.65rem; text-decoration: none; margin-right: auto; }
        .ent-brand-mark{ width: 34px; height: 34px; object-fit: contain; border-radius: 7px; }
        .ent-brand-text{ display: flex; flex-direction: column; line-height: 1.1; }
        .ent-brand-text strong{ font-family: var(--font-sans); font-weight: 600; font-size: 1.05rem; color: var(--c-ink); letter-spacing: -0.01em; }
        .ent-brand-text em{ font-style: normal; font-family: var(--font-manjari); font-weight: 700; font-size: 0.46rem; letter-spacing: 0.24em; text-transform: uppercase; color: var(--c-ink-muted); }

        .ent-nav{ display: flex; gap: 2rem; }
        .ent-nav a{
          font-family: var(--font-sans); font-size: 0.85rem; color: var(--c-ink-mid);
          text-decoration: none; transition: color 0.2s ease;
        }
        .ent-nav a:hover{ color: var(--ent-pink); }

        .ent-burger{ display: none; background: none; border: none; color: var(--c-ink); cursor: pointer; padding: 0.4rem; }
        .ent-nav-mobile{ display: none; flex-direction: column; padding: 0.5rem var(--space-x) 1.25rem; border-top: 1px solid var(--c-border); }
        .ent-nav-mobile a{
          font-family: var(--font-sans); font-size: 0.95rem; color: var(--c-ink-mid);
          text-decoration: none; padding: 0.75rem 0;
        }

        /* ── Pills ── */
        .ent-pill{
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-family: var(--font-sans); font-weight: 600; font-size: 0.82rem;
          padding: 0.7rem 1.4rem; border-radius: 999px; text-decoration: none;
          border: 1px solid transparent; cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .ent-pill-solid{ background: var(--ent-green); color: #FFFFFF; }
        .ent-pill-solid:hover{ background: var(--ent-pink); }
        .ent-pill-ghost{ background: transparent; color: var(--c-ink); border-color: var(--c-border-strong); }
        .ent-pill-ghost:hover{ border-color: var(--ent-pink); color: var(--ent-pink); }

        /* ── Hero ── */
        .ent-hero{ position: relative; overflow: hidden; padding: clamp(3.5rem, 9vw, 7rem) 0 clamp(3rem, 7vw, 5.5rem); }
        .ent-blob{ position: absolute; border-radius: 50%; filter: blur(10px); pointer-events: none; opacity: 0.5; }
        .ent-blob-green{ width: 34rem; height: 34rem; left: -18rem; top: -8rem; background: radial-gradient(circle, rgba(62,143,115,0.28), transparent 68%); }
        .ent-blob-pink{ width: 40rem; height: 40rem; right: -20rem; bottom: -16rem; background: radial-gradient(circle, rgba(225,86,138,0.22), transparent 68%); }

        .ent-h1{
          position: relative; z-index: 1;
          font-family: var(--font-sans); font-weight: 700;
          font-size: clamp(2.4rem, 6.4vw, 4.6rem); line-height: 1.04;
          letter-spacing: -0.03em; color: var(--c-ink);
          display: flex; flex-direction: column; margin-bottom: 1.75rem;
        }
        .ent-dashes{ display: flex; gap: 0.75rem; margin-bottom: 1.75rem; }
        .ent-dash-pink, .ent-dash-green{ display: block; width: 4.5rem; height: 2px; }
        .ent-dash-pink{ background: var(--ent-pink); }
        .ent-dash-green{ background: var(--ent-green); }

        .ent-lead{
          position: relative; z-index: 1;
          font-family: var(--font-sans); font-size: clamp(0.95rem, 1.3vw, 1.1rem);
          line-height: 1.65; color: var(--c-ink-mid); max-width: 34rem; margin-bottom: 2.25rem;
        }
        .ent-cta-row{ position: relative; z-index: 1; display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: clamp(3rem, 7vw, 5rem); }

        .ent-pillars{
          position: relative; z-index: 1;
          display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 2rem; max-width: 52rem;
        }
        .ent-pillar{ border-left: 1px solid var(--c-border); padding-left: 1.25rem; }
        .ent-pillar:first-child{ border-left: none; padding-left: 0; }
        .ent-pillar h2{ font-family: var(--font-sans); font-weight: 600; font-size: 0.92rem; color: var(--c-ink); margin-bottom: 0.4rem; }
        .ent-pillar p{ font-family: var(--font-sans); font-size: 0.8rem; line-height: 1.55; color: var(--c-ink-muted); }

        /* ── Sections ── */
        .ent-section{ padding: clamp(3.5rem, 8vw, 6.5rem) 0; border-top: 1px solid var(--c-border); }
        .ent-tint{ background: var(--c-surface); }
        .ent-eyebrow{ display: flex; align-items: center; gap: 0.6rem; margin-bottom: 1.25rem; font-family: var(--font-manjari); font-weight: 700; font-size: 0.55rem; letter-spacing: 0.24em; text-transform: uppercase; color: var(--c-ink-muted); }
        .ent-rule{ display: inline-block; width: 1.5rem; height: 1px; background: var(--ent-pink); }

        .ent-h2{
          font-family: var(--font-sans); font-weight: 700;
          font-size: clamp(1.5rem, 3.2vw, 2.4rem); line-height: 1.15;
          letter-spacing: -0.02em; color: var(--c-ink); margin-bottom: 1.1rem;
        }
        .ent-h2-center{ text-align: center; }
        .ent-body{ font-family: var(--font-sans); font-size: 0.92rem; line-height: 1.7; color: var(--c-ink-mid); margin-bottom: 1.25rem; }
        .ent-body-sm{ font-size: 0.82rem; color: var(--c-ink-muted); margin-bottom: 1.75rem; }

        .ent-grid-4{ display: grid; grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); gap: 2.25rem; margin-top: 3rem; }
        .ent-principle{ border-top: 1px solid var(--c-border); padding-top: 1.1rem; }
        .ent-principle h3{ font-family: var(--font-sans); font-weight: 600; font-size: 0.95rem; color: var(--c-ink); margin-bottom: 0.6rem; }
        .ent-principle p{ font-family: var(--font-sans); font-size: 0.82rem; line-height: 1.65; color: var(--c-ink-muted); }

        /* ── Teresya to LPMS ── */
        .ent-center{ text-align: center; max-width: 46rem; margin: 0 auto 3.5rem; }
        .ent-center-p{ margin-left: auto; margin-right: auto; max-width: 34rem; }
        .ent-chip{
          display: inline-block; margin-bottom: 1.5rem;
          border: 1px solid var(--c-border-strong); border-radius: 999px;
          padding: 0.45rem 1.1rem;
          font-family: var(--font-manjari); font-weight: 700; font-size: 0.55rem;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--ent-green);
        }
        [data-theme="dark"] .ent-chip{ color: var(--ent-pink); }

        .ent-evolution{ display: grid; grid-template-columns: minmax(0,1fr) auto minmax(0,1.3fr); gap: clamp(1.25rem, 3vw, 2.5rem); align-items: center; margin-bottom: 3rem; }
        .ent-prod{ border: 1px solid var(--c-border); border-radius: 14px; background: var(--c-bg); padding: 1.5rem; }
        /* Both marks are 200px squares, so they sit in a small square frame
           at their own scale rather than being cropped to a 16:9 banner or
           blown up to panel width. */
        .ent-prod-mark{
          width: 4.75rem; height: 4.75rem; margin-bottom: 1.1rem;
          border: 1px solid var(--c-border); border-radius: 12px;
          background: var(--c-surface); overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .ent-prod-img{ width: 100%; height: 100%; object-fit: contain; display: block; }
        .ent-prod h3{ font-family: var(--font-sans); font-weight: 700; font-size: 1.3rem; color: var(--c-ink); letter-spacing: -0.01em; }
        .ent-prod-kicker{ display: block; font-family: var(--font-manjari); font-weight: 700; font-size: 0.5rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--c-ink-muted); margin: 0.3rem 0 0.9rem; }
        .ent-prod p{ font-family: var(--font-sans); font-size: 0.85rem; line-height: 1.6; color: var(--c-ink-mid); }
        .ent-prod-wide{ border-color: var(--ent-pink); }
        .ent-demo{ margin-top: 1.5rem; }
        .ent-arrow{ color: var(--ent-pink); display: flex; justify-content: center; }

        .ent-features{ display: grid; grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr)); gap: 1px; background: var(--c-border); border: 1px solid var(--c-border); border-radius: 14px; overflow: hidden; }
        .ent-feature{ background: var(--c-bg); padding: 1.4rem; }
        .ent-feature h4{ font-family: var(--font-sans); font-weight: 600; font-size: 0.85rem; color: var(--c-ink); margin-bottom: 0.5rem; }
        .ent-feature p{ font-family: var(--font-sans); font-size: 0.76rem; line-height: 1.55; color: var(--c-ink-muted); }

        .ent-closer{ text-align: center; margin-top: 2.5rem; font-family: var(--font-sans); font-weight: 600; font-size: 0.95rem; color: var(--c-ink); }

        /* ── Solutions ── */
        .ent-solutions{ display: grid; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); gap: 1px; background: var(--c-border); border: 1px solid var(--c-border); border-radius: 14px; overflow: hidden; margin-top: 2rem; }
        .ent-solution{ background: var(--c-bg); padding: 1.85rem; }
        .ent-num{ display: block; font-family: var(--font-manjari); font-weight: 700; font-size: 0.6rem; letter-spacing: 0.2em; color: var(--ent-pink); margin-bottom: 0.9rem; }
        .ent-solution h3{ font-family: var(--font-sans); font-weight: 600; font-size: 0.98rem; color: var(--c-ink); margin-bottom: 0.55rem; }
        .ent-solution p{ font-family: var(--font-sans); font-size: 0.82rem; line-height: 1.6; color: var(--c-ink-muted); }

        /* ── Newsletter ── */
        .ent-news{ display: grid; grid-template-columns: minmax(0, 11rem) minmax(0, 1fr); gap: clamp(1.5rem, 4vw, 3rem); align-items: start; margin-top: 1rem; }
        .ent-news-art{ border: 1px solid var(--c-border); border-radius: 14px; background: var(--c-bg); overflow: hidden; aspect-ratio: 1/1; display: flex; align-items: center; justify-content: center; }
        .ent-news-img{ width: 100%; height: 100%; object-fit: contain; display: block; }

        /* ── Footer ── */
        .ent-footer{ border-top: 1px solid var(--c-border); padding: 2.5rem 0; }
        .ent-footer-inner{ display: flex; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; align-items: center; }
        .ent-footer-inner strong{ display: block; font-family: var(--font-sans); font-weight: 600; font-size: 0.9rem; color: var(--c-ink); }
        .ent-footer-inner span{ font-family: var(--font-sans); font-size: 0.78rem; color: var(--c-ink-muted); }
        .ent-footer-links{ display: flex; gap: 1.75rem; flex-wrap: wrap; }
        .ent-footer-links a{ font-family: var(--font-sans); font-size: 0.8rem; color: var(--c-ink-muted); text-decoration: none; }
        .ent-footer-links a:hover{ color: var(--ent-pink); }

        @media(max-width:900px){
          .ent-evolution{ grid-template-columns: 1fr; }
          .ent-arrow{ transform: rotate(90deg); }
          .ent-pillars{ grid-template-columns: 1fr; gap: 1.5rem; }
          .ent-pillar{ border-left: none; padding-left: 0; border-top: 1px solid var(--c-border); padding-top: 1rem; }
          .ent-pillar:first-child{ border-top: 1px solid var(--c-border); padding-top: 1rem; }
        }
        @media(max-width:820px){
          .ent-nav, .ent-header-cta{ display: none; }
          .ent-burger{ display: inline-flex; }
          .ent-nav-mobile{ display: flex; }
        }
        @media(max-width:640px){
          .ent-news{ grid-template-columns: 1fr; }
          .ent-news-art{ max-width: 11rem; }
          .ent-pill{ padding: 0.8rem 1.4rem; }
        }
      `}</style>
    </div>
  );
}
