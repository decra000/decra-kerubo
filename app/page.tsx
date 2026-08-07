"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, X, Mic, Volume2, VolumeX, RefreshCw, Plus } from "lucide-react";
import { useSpeech } from "@/hooks/useSpeech";
import { ResearchSlides } from "@/components/research/ResearchSlides";

/* ── helpers ── */
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
  opacity: vis ? 1 : 0,
  transform: vis ? "none" : "translateY(18px)",
  transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
});

/* A more expressive sibling to `fade`, lets different sections feel distinct
   instead of every element doing the same up-fade. */
const reveal = (vis: boolean, opts: { delay?: number; dir?: "up" | "down" | "left" | "right" | "scale"; distance?: number } = {}): React.CSSProperties => {
  const { delay = 0, dir = "up", distance = 26 } = opts;
  const hidden =
    dir === "up" ? `translateY(${distance}px)` :
    dir === "down" ? `translateY(-${distance}px)` :
    dir === "left" ? `translateX(${distance}px)` :
    dir === "right" ? `translateX(-${distance}px)` :
    "scale(0.94)";
  return {
    opacity: vis ? 1 : 0,
    transform: vis ? "none" : hidden,
    filter: vis ? "blur(0px)" : "blur(3px)",
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, filter 0.7s ease ${delay}s`,
  };
};

const LBL: React.CSSProperties = {
  fontFamily: "var(--font-manjari)", fontWeight: 700,
  fontSize: "0.55rem", letterSpacing: "0.24em", textTransform: "uppercase",
  color: "var(--c-ink-muted)",
};
const SERIF = (sz = "clamp(2rem,3.5vw,3rem)"): React.CSSProperties => ({
  fontFamily: "var(--font-serif)", fontWeight: 400,
  fontSize: sz, color: "var(--c-ink)", lineHeight: 1.05,
});
const BODY: React.CSSProperties = {
  fontFamily: "var(--font-sans)", fontWeight: 400,
  fontSize: "0.875rem", color: "var(--c-ink-muted)", lineHeight: 1.85,
};
const SEC: React.CSSProperties = {
  padding: "var(--space-section) var(--space-x)",
};

/* Shared AI-intake modal trigger, used by Hero, Services, and Who I Work With */
const OPEN_PARTNER_MODAL_EVENT = "decra:open-partner-modal";
const PRODUCT_COUNSEL_GROUP = {
  key: "product-counsel",
  label: "Technical Product Counsel",
  opening: "Hi, I'd like to retain Decra as embedded Technical Product Counsel for my product and engineering team.",
};
const PACK_GROUP = {
  key: "startup-pack",
  label: "Full Startup Advisory Pack",
  opening: "Hi, tell me about the Full Startup Advisory Pack, what's included and how it works.",
};
const POST_LAUNCH_REVIEW_GROUP = {
  key: "post-launch-review",
  label: "Post-Launch Review",
  opening: "Hi, tell me about the Post-Launch Review, I already have a product live and want it looked at.",
};
const EVENTS_GROUP = {
  key: "events-conferences",
  label: "Events & Conferences",
  opening: "Hi, I'm organizing or partnering on an event or conference and would like to discuss having Decra speak, participate, or partner.",
};
const TECH_DEV_GROUP = {
  key: "tech-development",
  label: "Tech Development Services",
  opening: "Hi, I'd like to secure Decra's tech development services and go through a build discovery for my website or product.",
};

/* Shared "line button" style, outline only, no fill, used for every CTA on the page */
const lineBtn = (opts?: { light?: boolean }): React.CSSProperties => ({
  display: "inline-flex", alignItems: "center", gap: "0.6rem",
  fontFamily: "var(--font-manjari)", fontWeight: 700,
  fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
  color: opts?.light ? "rgba(255,255,255,0.85)" : "var(--c-ink)",
  background: "transparent",
  border: `1px solid ${opts?.light ? "rgba(255,255,255,0.3)" : "var(--c-border)"}`,
  padding: "0.9rem 1.75rem", cursor: "pointer", textDecoration: "none",
  transition: "border-color 0.25s ease, color 0.25s ease",
});

/* ── Section 1: Hero ── */
function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t); }, []);
  return (
    <section id="hero" className="hero-sec" style={{ position: "relative", overflow: "hidden", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Background photo, wide studio shot on larger screens, portrait selfie on small screens */}
      <div aria-hidden className="hero-bg hero-kenburns" style={{
        position: "absolute", inset: 0, backgroundSize: "cover", backgroundRepeat: "no-repeat", zIndex: 0,
      }} />
      {/* Dark overlay so text stays legible, deeper on mobile where the portrait shot needs more contrast */}
      <div aria-hidden className="hero-overlay" style={{ position: "absolute", inset: 0, zIndex: 1 }} />

      {/* Corner glows in brand teal + cream, echoing the reference mood boards but on-palette, slow ambient drift so the hero doesn't feel static */}
      <div aria-hidden className="hero-glow-a" style={{
        position: "absolute", top: "-18%", left: "-14%", width: "min(60vw,620px)", height: "min(60vw,620px)",
        borderRadius: "50%", pointerEvents: "none", zIndex: 1,
        background: "radial-gradient(circle, #5FA98F 0%, transparent 70%)",
        opacity: 0.35, filter: "blur(40px)",
      }} />
      <div aria-hidden className="hero-glow-b" style={{
        position: "absolute", bottom: "-22%", right: "-16%", width: "min(65vw,680px)", height: "min(65vw,680px)",
        borderRadius: "50%", pointerEvents: "none", zIndex: 1,
        background: "radial-gradient(circle, #F0EEE9 0%, transparent 68%)",
        opacity: 0.12, filter: "blur(50px)",
      }} />

      <div id="hero-content" style={{
        position: "relative", zIndex: 2, width: "100%",
        display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center",
        padding: "0 var(--space-x)",
        paddingTop: "21vh",
        maxWidth: "calc(var(--max-w) + (var(--space-x) * 2))", margin: "0 auto",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(14px)",
        transition: "opacity 1.1s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.3s",
      }}>
        <div style={{ maxWidth: "26rem", textAlign: "left" }} className="hero-copy">
          <h1 style={{
            fontFamily: "var(--font-serif)", fontWeight: 400,
            fontSize: "clamp(1.75rem,4vw,2.75rem)", color: "#F0EEE9",
            lineHeight: 1.15, letterSpacing: "-0.01em", marginBottom: "1.75rem",
          }}>
            Technology Lawyer &amp; Technical Product Counsel.
          </h1>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent(OPEN_PARTNER_MODAL_EVENT, { detail: PRODUCT_COUNSEL_GROUP }))}
            style={lineBtn({ light: true })}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#5FA98F"; (e.currentTarget as HTMLElement).style.color = "#5FA98F"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)"; }}
          >
            Retain as Technical Product Counsel
          </button>
        </div>
      </div>

      <style>{`
        .hero-sec { height: 100vh; }
        @supports (height: 100svh) { .hero-sec { height: 100svh; } }

        /* Slow, continuous zoom on the hero photo, keeps the hero feeling alive rather than a static poster */
        .hero-kenburns { animation: heroKenBurns 22s ease-in-out infinite alternate; }
        @keyframes heroKenBurns { from { transform: scale(1); } to { transform: scale(1.08); } }

        /* Gentle ambient drift on the corner glows */
        .hero-glow-a { animation: heroGlowA 16s ease-in-out infinite alternate; }
        .hero-glow-b { animation: heroGlowB 19s ease-in-out infinite alternate; }
        @keyframes heroGlowA { from { transform: translate(0,0) scale(1); } to { transform: translate(3%,4%) scale(1.08); } }
        @keyframes heroGlowB { from { transform: translate(0,0) scale(1); } to { transform: translate(-3%,-4%) scale(1.1); } }
        @media (prefers-reduced-motion: reduce) { .hero-kenburns, .hero-glow-a, .hero-glow-b { animation: none; } }

        /* Wide studio shot for larger screens, subject sits right-of-centre, copy hugs the left edge */
        .hero-bg { background-image: url('/decra-hero-wide.jpg'); background-position: 68% 22%; }
        /* No darkening over the face, the wash only picks up a little below it, on the right/lower two-thirds */
        .hero-overlay {
          background:
            linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0) 42%, rgba(10,10,10,0.5) 62%, rgba(10,10,10,0.75) 100%),
            linear-gradient(90deg, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.25) 38%, rgba(10,10,10,0) 55%);
        }

        /* Small screens get the portrait-orientation shot instead of the wide
           studio one, which crops badly at phone aspect. Same warm palette as
           the desktop hero. The copy sits at the bottom, so the overlay stays
           clear over her face and deepens underneath it, where the heading and
           button actually land. */
        @media (max-width: 640px) {
          /* height:100% is what actually makes the flex-end below bite — without
             it the content box is only as tall as its text, so it sat centred,
             directly over her face. Dropping the copy to the lower third keeps
             her face clear and puts the text on the dark tank top and backdrop. */
          #hero-content {
            align-items: center !important;
            justify-content: flex-end !important;
            height: 100%;
            padding-top: 0 !important;
            padding-bottom: clamp(3rem, 9vh, 5rem) !important;
          }
          .hero-copy { text-align: center !important; }
          .hero-bg {
            background-image: url('/decra-hero-mobile.jpg') !important;
            background-position: 50% 28% !important;
          }
          /* Clear across her face (roughly 15-45% down), then ramping hard from
             the midpoint so the heading and button below always have contrast. */
          .hero-overlay {
            background:
              linear-gradient(180deg, rgba(10,10,10,0.60) 0%, rgba(10,10,10,0.12) 22%, rgba(10,10,10,0.18) 45%, rgba(10,10,10,0.62) 64%, rgba(10,10,10,0.88) 80%, rgba(10,10,10,0.96) 100%) !important;
          }
          #hero-content h1 { font-size: clamp(1.65rem, 7vw, 2.1rem) !important; margin-bottom: 1.5rem !important; }
          #hero-content button { width: auto; max-width: 82%; white-space: normal; line-height: 1.5; }
        }
      `}</style>
    </section>
  );
}

/* ── Section 1.5: About (condensed) ── */
function About() {
  const { ref, vis } = useReveal();
  return (
    <section id="about" ref={ref as React.RefObject<HTMLElement>} style={SEC}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <p style={{
          ...SERIF("clamp(1.2rem,1.7vw,1.45rem)"),
          maxWidth: "820px",
          lineHeight: 1.6,
          ...reveal(vis, { dir: "scale", distance: 10 }),
        }}>
I guide technology developers towards safe and compliant tech. I help investors and procurers buy compliant, safe and scalable tech.
        </p>
      </div>
    </section>
  );
}

/* ── Section 2: Services ── */
const SERVICES = [
  {
    id: "product-strategy-advisory",
    label: "Product Strategy & Advisory",
    body: "Developing technology products with integrated technical and legal guidance.",
    items: ["Product strategy", "Product architecture reviews", "Feature & roadmap advisory", "Go-to-market readiness", "Startup incorporation", "Product lifecycle planning"],
    opening: "Hi, I need help with product strategy, architecture reviews, feature & roadmap advisory, go-to-market readiness, or startup incorporation.",
  },
  {
    id: "product-governance",
    label: "Product Governance & Standards",
    body: "Establishing governance frameworks for responsible, compliant, and scalable products.",
    items: ["AI governance", "Data governance", "Digital governance", "Regulatory compliance", "Governance frameworks", "Internal policies", "ISO readiness and implementation"],
    opening: "Hi, I need help with product governance, AI or data governance, regulatory compliance, governance frameworks, internal policies, or ISO readiness.",
  },
  {
    id: "product-safety-privacy",
    label: "Product Safety & Privacy",
    body: "Embedding safety, trust, and privacy into products from the outset.",
    items: ["Privacy by Design", "Safety by Design", "Data protection", "Responsible AI", "Security governance", "Product design reviews"],
    opening: PRODUCT_COUNSEL_GROUP.opening,
  },
  {
    id: "risk-assurance",
    label: "Risk & Assurance",
    body: "Evaluating products for technical, legal, and regulatory resilience.",
    items: ["Product stress testing", "Product audits", "Privacy impact assessments", "AI impact assessments", "Risk assessments", "Launch readiness"],
    opening: "Hi, I need help with risk & assurance, product stress testing, audits, privacy or AI impact assessments, risk assessments, or launch readiness.",
  },
  {
    id: "intellectual-property",
    label: "Intellectual Property",
    body: "Protecting innovation, software, and digital assets.",
    items: ["IP strategy", "Software licensing", "Open-source governance", "Open-source compliance", "Technology ownership"],
    opening: "Hi, I need help with intellectual property, IP strategy, software licensing, open-source governance or compliance, or technology ownership.",
  },
  {
    id: "technology-transactions",
    label: "Technology Transactions",
    body: "Structuring agreements that enable technology development and commercialization.",
    items: ["SaaS agreements", "Platform agreements", "Technology procurement", "Software licensing", "Vendor agreements", "Commercial partnerships"],
    opening: "Hi, I need help with technology transactions, SaaS or platform agreements, technology procurement, vendor agreements, or commercial partnerships.",
  },
  {
    id: "technical-due-diligence",
    label: "Technical Due Diligence",
    body: "Assessing technology products for investment, acquisition, and strategic growth.",
    items: ["Technology due diligence", "Product due diligence", "AI due diligence", "IP due diligence", "Technology audits", "Investment readiness"],
    opening: "Hi, I need help with technical due diligence, technology or product due diligence, AI or IP due diligence, technology audits, or investment readiness.",
  },
];

function ServiceDetailBody({ s }: { s: (typeof SERVICES)[number] }) {
  return (
    <>
      <p style={{ ...BODY, fontSize: "0.84rem", marginBottom: "1.5rem", maxWidth: "40rem" }}>{s.body}</p>
      <ul className="svc-items" style={{ listStyle: "none", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem 2rem", marginBottom: "1.5rem" }}>
        {s.items.map(item => (
          <li key={item} style={{ display: "flex", gap: "0.85rem", ...BODY, fontSize: "0.82rem" }}>
            <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--c-accent)", marginTop: "0.5rem", flexShrink: 0 }} />
            {item}
          </li>
        ))}
      </ul>
      <button
        onClick={() => window.dispatchEvent(new CustomEvent(OPEN_PARTNER_MODAL_EVENT, { detail: { key: s.id, label: s.label, opening: s.opening } }))}
        style={{
          display: "inline-flex", alignItems: "center", gap: "0.4rem",
          background: "none", border: "none", borderBottom: "1px solid var(--c-border)",
          padding: 0, paddingBottom: "0.3rem", cursor: "pointer",
          fontFamily: "var(--font-manjari)", fontWeight: 700,
          fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase",
          color: "var(--c-ink-muted)", transition: "color 0.2s, border-color 0.2s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"; }}
      >
        Discuss this <ArrowRight size={10} strokeWidth={1.5} />
      </button>
    </>
  );
}

function Services() {
  const { ref, vis } = useReveal();
  const [active, setActive] = useState(0);
  const s = SERVICES[active];

  // Mobile accordion: which service (if any) is expanded. Kept separate
  // from `active` since desktop always has one tab active, mobile starts
  // fully collapsed.
  const [mobileOpenId, setMobileOpenId] = useState("");

  return (
    <section id="services" ref={ref as React.RefObject<HTMLElement>} style={{ ...SEC, borderTop: "none" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <p style={{ ...LBL, marginBottom: "2.5rem", ...fade(vis) }}>Services</p>

        {/* Desktop/tablet: label column + shared detail panel on the right */}
        <div
          className="svc-grid svc-desktop"
          style={{
            display: "grid", gridTemplateColumns: "minmax(15rem, 0.85fr) 1.15fr",
            gap: "clamp(2.5rem, 6vw, 6rem)", alignItems: "start",
            borderTop: "1px solid var(--c-border)", paddingTop: "3.5rem",
            ...reveal(vis, { delay: 0.05, dir: "up", distance: 22 }),
          }}
        >
          {/* Left, the index of services */}
          <div className="svc-nav" style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {SERVICES.map((item, i) => {
              const on = i === active;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(i)}
                  style={{
                    background: "none", border: "none", padding: 0, cursor: "pointer",
                    textAlign: "left", display: "block",
                  }}
                >
                  <span style={{ position: "relative", display: "inline-block", paddingBottom: "0.3rem" }}>
                    <span style={{
                      fontFamily: "var(--font-serif)", fontWeight: 400,
                      fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)", lineHeight: 1.25,
                      color: on ? "var(--c-ink)" : "var(--c-ink-muted)",
                      transition: "color 0.3s ease",
                    }}>{item.label}</span>
                    <span style={{
                      position: "absolute", left: 0, bottom: 0, height: "1px",
                      width: on ? "100%" : "0%", background: "var(--c-accent)",
                      transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)",
                    }} />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right, the selected service's detail */}
          <div key={s.id} style={{ animation: "svcDetailFade 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(1.05rem,1.6vw,1.3rem)", color: "var(--c-ink)", lineHeight: 1.25, marginBottom: "1rem" }}>{s.label}</h3>
            <ServiceDetailBody s={s} />
          </div>
        </div>

        {/* Mobile: accordion, each service's detail unfolds directly beneath
            itself instead of in a shared panel far below a 7-item list */}
        <div className="svc-mobile" style={{ borderTop: "1px solid var(--c-border)" }}>
          {SERVICES.map((item) => {
            const isOpen = item.id === mobileOpenId;
            return (
              <div key={item.id} className="svc-accordion-item" style={{ borderBottom: "1px solid var(--c-border)" }}>
                <button
                  type="button"
                  onClick={() => setMobileOpenId(isOpen ? "" : item.id)}
                  aria-expanded={isOpen}
                  className="svc-accordion-header"
                >
                  <span style={{
                    fontFamily: "var(--font-serif)", fontWeight: 400,
                    fontSize: "1.05rem", lineHeight: 1.25,
                    color: isOpen ? "var(--c-ink)" : "var(--c-ink-muted)",
                  }}>{item.label}</span>
                  <Plus size={16} className="svc-accordion-icon" style={{ transform: isOpen ? "rotate(45deg)" : "none" }} />
                </button>
                <div className="svc-accordion-panel" style={{ maxHeight: isOpen ? "40rem" : "0px", opacity: isOpen ? 1 : 0 }}>
                  <div style={{ paddingTop: "0.5rem", paddingBottom: "1.5rem" }}>
                    <ServiceDetailBody s={item} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @keyframes svcDetailFade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}

        .svc-mobile{ display: none; }

        @media(max-width:860px){
          .svc-desktop{ display: none !important; }
          .svc-mobile{ display: block; }
        }
        @media(max-width:560px){
          .svc-items{grid-template-columns:1fr!important}
        }

        .svc-accordion-header{
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
          width: 100%; background: none; border: none; cursor: pointer;
          padding: 1.15rem 0; text-align: left;
        }
        .svc-accordion-icon{
          flex: none; color: var(--c-ink-muted);
          transition: transform 0.25s ease, color 0.25s ease;
        }
        .svc-accordion-header[aria-expanded="true"] .svc-accordion-icon{
          color: var(--c-accent);
        }
        .svc-accordion-panel{
          overflow: hidden;
          transition: max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease;
        }
      `}</style>
    </section>
  );
}

/* ── Section 3+7: Who I work with & How to work with Decra, unified ── */
type ChatMsg = { role: "user" | "assistant"; text: string; options?: { items: string[]; multi: boolean }; rateLimited?: boolean };

/* Parses a trailing <options>[...]</options> or <multi_options>[...]</multi_options> block out of an
   assistant reply so it can be rendered as clickable chips instead of raw JSON text. */
function extractOptions(raw: string): { text: string; options?: { items: string[]; multi: boolean } } {
  const multiMatch = raw.match(/<multi_options>([\s\S]*?)<\/multi_options>/);
  const singleMatch = !multiMatch ? raw.match(/<options>([\s\S]*?)<\/options>/) : null;
  const match = multiMatch || singleMatch;
  if (!match) return { text: raw };
  try {
    const items = JSON.parse(match[1].trim());
    if (!Array.isArray(items) || items.length === 0) return { text: raw };
    const text = raw.replace(match[0], "").trim();
    return { text, options: { items: items.map(String), multi: !!multiMatch } };
  } catch {
    return { text: raw.replace(match[0], "").trim() };
  }
}

const ENGAGE_GROUPS = [
  { key: "startup-founders", label: "Startup Founders", opening: "Hi, I'm a founder or builder looking for help with incorporation, equity, fundraising, or startup advisory." },
  { key: "technology-companies", label: "Technology Companies", opening: "Hi, I work at a tech company and need support with regulatory compliance, data protection, or product legal review." },
  { key: "law-firms", label: "Law Firms", opening: "Hi, I represent a law firm interested in working with Decra on technology law advisory or compliance." },
  { key: "innovation-ecosystems", label: "Innovation Ecosystems", opening: "Hi, I'm with an investor, incubator, accelerator, or ecosystem body and would like to discuss legal support or partnership opportunities." },
];

/* Full set offered inside the Partner modal picker, includes Events & Conferences,
   which is intentionally left off the "Who I work with" pill row on the homepage. */
const PARTNER_GROUPS = [...ENGAGE_GROUPS, EVENTS_GROUP];

const ENGAGE_SYSTEM = `You are Decra Kerubo's AI intake advisor on decrakerubo.com.
Decra is a Nairobi-based lawyer and computer scientist specialising in technology law and startup legal advisory in Kenya and across Africa.
She works with: startup founders needing incorporation, equity, co-founder agreements, eTIMS/KRA tax, fundraising, foreign branches, PBO registration; technology companies needing ODPC/data protection, product legal review, tech contracts; law firms needing tech law support or compliance; innovation ecosystem players, investors, incubators, and accelerators, seeking legal support or partnership; and event/conference organizers seeking Decra as a speaker, panelist, or partner.

The Full Startup Advisory Pack is a bundled engagement covering: company incorporation & structure, founder & co-founder agreements, equity/vesting/cap table setup, tax structuring (eTIMS, VAT, PAYE), fundraising legal readiness, and foreign branch/PBO registration, the complete legal foundation from formation through fundraising. If someone asks about "the pack" or the Full Startup Advisory Pack, briefly explain what's included in 2-3 sentences FIRST, before moving into intake questions.

Post-Launch Review is for products already live, not still being built, a one-time legal review covering compliance exposure, liability, privacy-by-design, terms of service, third-party/API integrations, and regulatory gaps, versus Product Counsel which is ongoing embedded support during the build itself. If someone asks about Post-Launch Review, briefly explain this distinction in 2-3 sentences FIRST, before moving into intake questions.

The 1000 is Decra's upcoming podcast on technology law in Africa, launching soon on Spotify, not yet live. If someone expresses interest in The 1000, first find out how they'd like to be involved (e.g. featured guest, topic suggestion, sponsor/partner, or just notified when it launches), then continue normal intake gathering name and email.

Tech Development Services is Decra building the actual product, websites, web apps, and MVPs, not legal work. If someone opens this conversation (mentions wanting a site/app/product built, or the opening message says "tech development services" or "build discovery"), you switch personas entirely: for this flow ONLY, you are not a legal intake assistant, you are acting as a senior solution strategist, product designer, AND technical architect running a real discovery/scoping call. Speak with the specificity and confidence of someone who has actually shipped products, reference real technology, real font names, real hex codes, real trade-offs. Never sound like a generic customer-service form. Every question should demonstrate you understood the last answer.

CHIP TOOLS, you can present clickable options instead of making the person type freeform answers. Use these often in this flow, always preceded by a short sentence of context:
- Single-select (person picks one, sent immediately): end your message with <options>["Option A","Option B","Option C"]</options>
- Multi-select (person can pick several, then hits Continue): end your message with <multi_options>["Option A","Option B","Option C"]</multi_options>
Only ONE chip block per message, always as the very last thing in the message, valid JSON array of strings. Always include an escape hatch chip like "Other (I'll describe it)" or "Not sure (recommend one)" where relevant so the person is never stuck.

Run the discovery in this order:
1. Entity/business name, AND the actual goal, what they're trying to achieve, for whom, and what outcome success looks like. Do not move on until you genuinely understand the goal, ask a real follow-up if the first answer is vague (e.g. "an app for my business" needs a follow-up: what does the business do, who's the end user).
2. Jurisdiction, which country/countries this will operate in or serve, since compliance requirements (data protection law, cookie/consent rules, payment regulations) differ by jurisdiction. Ask directly.
3. ONLY once you understand the goal: reason about what functionality actually fits THIS specific goal (don't ask generic questions) and present a tailored <multi_options> chip list of the features most relevant to their type of product (e.g. an e-commerce goal gets chips like product catalog, cart & checkout, M-Pesa/card payments, inventory management, order tracking, reviews, a booking/service goal gets chips like calendar/scheduling, client accounts, automated reminders, staff management). Always include "Other (I'll describe it)".
4. Ask if there are any special or custom interactions/user flows beyond the standard ones for this kind of product, open-ended, no chips needed here.
5. For any feature area where it's a real fork (commonly: search, customer support/chat, content or recommendation features), briefly explain in plain, non-technical language the difference between a traditional (rule-based, cheaper, predictable) approach and an AI-powered (smarter, handles nuance, has ongoing cost and needs more data) approach, and what that means for their budget and timeline, THEN offer the choice via <options> chips: ["Traditional","AI-powered","Not sure (recommend for me)"]. Skip this step entirely if nothing in their scope actually needs it.
6. Ask about cookie consent banners and bot/spam protection (e.g. CAPTCHA), briefly note these matter for the jurisdiction they gave in step 2, via <multi_options>: ["Cookie consent banner","Bot/spam protection (CAPTCHA)","Neither needed right now"].
7. Ask about analytics via <options>: ["Google Analytics","Privacy-friendly analytics (e.g. Plausible)","No analytics needed","Not sure (recommend)"].
8. Fonts, ask if they have brand fonts already. If not, pull from the free Google Fonts library and offer 3-4 real, well-paired combinations suited to their brand tone via <options>, e.g. ["Playfair Display + Inter","DM Serif Display + Plus Jakarta Sans","Poppins + Roboto","Space Grotesk + Work Sans"], plus "I have my own fonts".
9. Colors, ask if they have brand colors already. If not, offer 3-4 real curated palettes (as if pulled from a free tool like Coolors or Adobe Color) with actual hex codes written into each chip label, e.g. ["Forest & Cream: #0E3D32 / #F5F4F1 / #C9A24B","Ocean Blue: #123C69 / #4F98CA / #EAF6FF","Warm Terracotta: #B3542A / #F2E4D8 / #2B2B2B"], via <options>, plus "I have brand colors already".
10. Logo, <options>: ["I have a logo","I need one designed","Not sure yet"].
11. Roughly how many pages/screens, if known, <options>: ["Just a landing page","3-5 pages","6-10 pages","10+ / full app","Not sure yet"].
12. Any reference sites/apps whose feel they like (optional, don't dwell).
13. Tell them this scope is exactly what Decra needs to put together a quick, accurate pricing quote.
14. Finally, name and email.
Keep it warm and conversational, one step at a time, briefly acknowledging their previous answer before moving on, like a real discovery call, never a form. Once complete, say exactly: "Perfect, I have everything Decra needs. She'll be in touch within 48 hours with a scoped quote." Then on a new line output the intake_complete block, including these additional keys beyond name/email/summary: entityName, purpose, jurisdiction, functionalities, specialInteractions, aiVsTraditional, cookiesAndBots, analytics, fontPreference, colorPreference, hasLogo, pageCount, referenceSites. Example:
<intake_complete>
{"name":"...","email":"...","summary":"2-3 sentence briefing for Decra","entityName":"...","purpose":"...","jurisdiction":"...","functionalities":"...","specialInteractions":"...","aiVsTraditional":"...","cookiesAndBots":"...","analytics":"...","fontPreference":"...","colorPreference":"...","hasLogo":"...","pageCount":"...","referenceSites":"..."}
</intake_complete>

Your job for every OTHER flow (not Tech Development): warm natural conversation, ONE question at a time. Gather over 4-6 exchanges: what they need, their context/stage, name, email.
If they mention NGO, nonprofit, or international branch, ask: PBO (local Kenyan entity) or foreign company branch?
Once done say exactly: "Perfect, I have everything Decra needs. She'll be in touch within 48 hours." Then on a new line:
<intake_complete>
{"name":"...","email":"...","summary":"2-3 sentence briefing for Decra"}
</intake_complete>
Style: 2 sentences per reply outside the Tech Development flow. Warm and direct. Never mention Anthropic, Claude, GitHub, or any AI company.`;

function WorkWithDecra() {
  const { ref, vis } = useReveal();
  const [selected, setSelected] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const [chipSelections, setChipSelections] = useState<Record<number, string[]>>({});
  const [lastOpening, setLastOpening] = useState<{ key: string; opening: string } | null>(null);
  const [lastUserText, setLastUserText] = useState("");
  const [fallbackFormOpen, setFallbackFormOpen] = useState(false);
  const [fallbackForm, setFallbackForm] = useState({ name: "", email: "", message: "" });
  const [fallbackSending, setFallbackSending] = useState(false);
  const [fallbackSent, setFallbackSent] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { listen, stopListening, listening, supported, speak, stopSpeaking, speaking, synthSupported } = useSpeech();

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prevOverflow; };
  }, [modalOpen]);

  // Persist the in-progress conversation so a dropped connection, rate limit,
  // or accidental tab close doesn't erase what someone already typed.
  const storageKey = (groupKey: string) => `decra-chat:${groupKey}`;
  const saveConversation = (groupKey: string, messages: ChatMsg[]) => {
    try { window.localStorage.setItem(storageKey(groupKey), JSON.stringify(messages)); } catch { /* storage unavailable, non-fatal */ }
  };
  const loadConversation = (groupKey: string): ChatMsg[] | null => {
    try {
      const raw = window.localStorage.getItem(storageKey(groupKey));
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
    } catch { return null; }
  };
  const clearConversation = (groupKey: string) => {
    try { window.localStorage.removeItem(storageKey(groupKey)); } catch { /* non-fatal */ }
  };

  // Keep the cache in sync as the conversation grows.
  useEffect(() => {
    if (active && msgs.length > 0) saveConversation(active, msgs);
  }, [active, msgs]);

  const startGroup = async (groupKey: string, opening: string) => {
    setLastOpening({ key: groupKey, opening });
    setActive(groupKey); setDone(false); setInput(""); setChipSelections({});
    setFallbackFormOpen(false); setFallbackSent(false); setFallbackForm({ name: "", email: "", message: "" });

    // Resume a saved conversation for this exact engagement instead of
    // starting over and re-spending a request on the opening message.
    const cached = loadConversation(groupKey);
    if (cached) { setMsgs(cached); setLoading(false); setTimeout(() => inputRef.current?.focus(), 150); return; }

    setMsgs([]); setLoading(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: opening, history: [], system: ENGAGE_SYSTEM }) });
      const data = await res.json();
      const rawReply = data.reply || "Something went wrong. Email hello@decrakerubo.com.";
      const { text: reply, options } = extractOptions(rawReply);
      setMsgs([{ role: "assistant", text: reply, options, rateLimited: !!data.rateLimited }]);
      if (voiceOn && !data.rateLimited) speak(reply);
    } catch { setMsgs([{ role: "assistant", text: "Something went wrong. Your spot in the conversation is saved, try again in a moment.", rateLimited: true }]); }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  const openPartnerModal = () => {
    setModalOpen(true);
    if (selected) {
      const g = ENGAGE_GROUPS.find(g => g.key === selected);
      if (g) startGroup(g.key, g.opening);
    }
  };

  useEffect(() => {
    const onExternalOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ key: string; label: string; opening: string }>).detail;
      setModalOpen(true);
      if (detail) startGroup(detail.key, detail.opening);
    };
    window.addEventListener(OPEN_PARTNER_MODAL_EVENT, onExternalOpen as EventListener);
    return () => window.removeEventListener(OPEN_PARTNER_MODAL_EVENT, onExternalOpen as EventListener);
  }, []);

  // Closing the modal keeps the cached conversation (so reopening the same
  // engagement resumes it), only a completed intake clears its cache.
  const closeModal = () => { setModalOpen(false); setActive(null); setMsgs([]); setDone(false); setInput(""); setChipSelections({}); setFallbackFormOpen(false); setFallbackSent(false); stopSpeaking(); };

  const submitFallbackForm = async () => {
    if (!fallbackForm.name.trim() || !fallbackForm.email.trim()) return;
    setFallbackSending(true);
    try {
      await fetch("/api/intake", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        name: fallbackForm.name.trim(), email: fallbackForm.email.trim(),
        summary: fallbackForm.message.trim() || "No message provided, the assistant was unavailable when they reached out.",
        engagement: active ? `${active} (assistant unavailable, submitted via fallback form)` : "assistant-unavailable",
      }) });
      setFallbackSent(true);
    } catch { /* the button's own error state below handles this */ }
    setFallbackSending(false);
  };

  const send = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading || done) return;
    const userText = text; setInput(""); setLastUserText(userText);
    const next = [...msgs, { role: "user" as const, text: userText }];
    setMsgs(next); setLoading(true);
    try {
      // Rate-limit apology messages are UI-only, never feed them back to the
      // model as if they were something it actually said.
      const historyForModel = msgs.filter(m => !m.rateLimited);
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, history: historyForModel, system: ENGAGE_SYSTEM }) });
      const data = await res.json();
      let reply: string = data.reply || "";
      if (reply.includes("<intake_complete>")) {
        const m = reply.match(/<intake_complete>([\s\S]*?)<\/intake_complete>/);
        if (m) { try { const p = JSON.parse(m[1].trim()); const ir = await fetch("/api/intake", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...p, engagement: active }) }); if (!ir.ok) console.error("Intake submission failed:", ir.status); } catch (err) { console.error("Intake submission error:", err); } }
        reply = reply.replace(/<intake_complete>[\s\S]*?<\/intake_complete>/, "").trim();
        setDone(true);
        if (active) clearConversation(active);
      }
      const { text: cleanReply, options } = extractOptions(reply);
      setMsgs([...next, { role: "assistant", text: cleanReply, options, rateLimited: !!data.rateLimited }]);
      if (voiceOn && !data.rateLimited) speak(cleanReply);
    } catch { setMsgs([...next, { role: "assistant", text: "Something went wrong. Your message is saved, try again in a moment.", rateLimited: true }]); }
    setLoading(false);
  };

  const retryLast = () => {
    if (lastUserText) { send(lastUserText); return; }
    if (lastOpening) { startGroup(lastOpening.key, lastOpening.opening); }
  };

  const handleMic = () => {
    if (listening) { stopListening(); return; }
    listen((text) => { setInput(text); send(text); });
  };

  return (
    <section id="collaborate" ref={ref as React.RefObject<HTMLElement>} style={SEC}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        {/* One row: title · item · item · item · item ···· Partner */}
        <div style={{
          display: "flex", alignItems: "center", flexWrap: "wrap",
          gap: "0.5rem", rowGap: "1.5rem",
          ...fade(vis, 0.08),
        }} className="wwd-row">
          <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(1.5rem,2.4vw,2rem)", color: "var(--c-ink)", lineHeight: 1.05, marginRight: "1rem", whiteSpace: "nowrap" }}>Who I work with.</h2>
          {ENGAGE_GROUPS.map((g) => {
            const isSelected = selected === g.key;
            return (
              <div key={g.key} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ width: "1px", height: "10px", background: "var(--c-border)", display: "block" }} />
                <button
                  onClick={() => setSelected(g.key)}
                  style={{
                    display: "inline-flex", alignItems: "baseline", gap: "0.5rem",
                    background: "none", border: "none", cursor: "pointer", padding: "0.5rem 0.25rem",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-serif)", fontWeight: 400,
                    fontSize: "clamp(0.95rem,1.3vw,1.1rem)",
                    color: isSelected ? "var(--c-accent)" : "var(--c-ink)",
                    borderBottom: isSelected ? "1px solid var(--c-accent)" : "1px solid transparent",
                    lineHeight: 1.3, transition: "color 0.2s, border-color 0.2s",
                  }}>{g.label}</span>
                </button>
              </div>
            );
          })}
          <span style={{ flex: 1, minWidth: "1.5rem" }} />
          {(() => {
            const selectedGroup = ENGAGE_GROUPS.find(g => g.key === selected);
            return (
              <button
                key={selected || "none"}
                onClick={openPartnerModal}
                className={selectedGroup ? "wwd-partner-btn is-active" : "wwd-partner-btn"}
                style={{
                  ...lineBtn(),
                  position: "relative",
                  ...(selectedGroup ? {
                    background: "var(--c-accent)",
                    borderColor: "var(--c-accent)",
                    color: "var(--c-bg)",
                  } : {}),
                }}
                onMouseEnter={e => { if (!selectedGroup) (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"; }}
                onMouseLeave={e => { if (!selectedGroup) (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"; }}
              >
                {selectedGroup && (
                  <span className="wwd-partner-badge" aria-hidden="true">
                    <span className="wwd-partner-badge-ping" />
                    <span className="wwd-partner-badge-dot" />
                  </span>
                )}
                Partner
                <ArrowRight size={12} strokeWidth={1.5} />
              </button>
            );
          })()}
        </div>
        <style>{`
          @keyframes wwdPartnerActivate { 0% { transform: scale(0.96); } 50% { transform: scale(1.04); } 100% { transform: scale(1); } }
          .wwd-partner-btn.is-active { animation: wwdPartnerActivate 0.4s cubic-bezier(0.34,1.3,0.64,1); }

          .wwd-partner-badge { position: absolute; top: -5px; right: -5px; width: 12px; height: 12px; }
          .wwd-partner-badge-dot { position: absolute; inset: 0; border-radius: 50%; background: var(--c-gold); }
          .wwd-partner-badge-ping { position: absolute; inset: 0; border-radius: 50%; background: var(--c-gold); animation: wwdPing 1.4s cubic-bezier(0,0,0.2,1) infinite; }
          @keyframes wwdPing { 0% { transform: scale(1); opacity: 0.7; } 75%, 100% { transform: scale(2.2); opacity: 0; } }

          @media (prefers-reduced-motion: reduce) {
            .wwd-partner-btn.is-active { animation: none; }
            .wwd-partner-badge-ping { animation: none; opacity: 0.5; }
          }
        `}</style>
      </div>

      {modalOpen && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(10,10,10,0.6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%", maxWidth: "36rem",
              background: "var(--c-bg)", border: "1px solid var(--c-border)",
              display: "flex", flexDirection: "column",
              maxHeight: "min(38rem, 88vh)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--c-border)" }}>
              <div>
                <p style={{ ...LBL, marginBottom: "0.35rem" }}>Partner with Decra</p>
                {active && (
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", color: "var(--c-ink)" }}>
                    {[...PARTNER_GROUPS, PRODUCT_COUNSEL_GROUP, PACK_GROUP, POST_LAUNCH_REVIEW_GROUP, TECH_DEV_GROUP].find(g => g.key === active)?.label}
                  </p>
                )}
              </div>
              <button onClick={closeModal} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--c-ink-muted)", display: "flex", padding: "0.25rem" }}>
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
            {active && synthSupported && (
              <div style={{ display: "flex", justifyContent: "flex-end", padding: "0.6rem 1.5rem 0" }}>
                <button onClick={() => { if (voiceOn) stopSpeaking(); setVoiceOn(v => !v); }}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "none", border: "none", cursor: "pointer", color: voiceOn ? "var(--c-accent)" : "var(--c-ink-muted)", fontSize: "0.65rem", fontFamily: "var(--font-manjari)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: speaking ? 0.6 : 1, transition: "opacity 0.3s" }}>
                  {voiceOn ? <Volume2 size={12} strokeWidth={1.5} /> : <VolumeX size={12} strokeWidth={1.5} />}
                  {voiceOn ? "Voice on" : "Voice off"}
                </button>
              </div>
            )}

            {!active ? (
              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <p style={{ ...BODY, fontSize: "0.82rem", marginBottom: "0.5rem" }}>Tell me a bit about who you are, so I can point you the right way:</p>
                {PARTNER_GROUPS.map(g => (
                  <button
                    key={g.key}
                    onClick={() => startGroup(g.key, g.opening)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      textAlign: "left", background: "none", border: "1px solid var(--c-border)",
                      padding: "0.9rem 1.1rem", cursor: "pointer", transition: "border-color 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"}
                  >
                    <span style={{ fontFamily: "var(--font-serif)", fontSize: "0.95rem", color: "var(--c-ink)" }}>{g.label}</span>
                    <ArrowRight size={13} strokeWidth={1.5} color="var(--c-ink-muted)" />
                  </button>
                ))}
              </div>
            ) : (
              <>
                <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {(() => {
                    // Counts consecutive failures ending at the latest message, one
                    // hiccup just gets "Try again"; genuinely repeated failure ("truly
                    // fails") also surfaces the no-lost-lead fallback options.
                    let trailingFailures = 0;
                    for (let j = msgs.length - 1; j >= 0; j--) {
                      if (msgs[j].role === "assistant" && msgs[j].rateLimited) trailingFailures++;
                      else break;
                    }
                    return msgs.map((m, i) => {
                    const isLatest = i === msgs.length - 1;
                    const picks = chipSelections[i] || [];
                    return (
                      <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start", gap: "0.6rem" }}>
                        <div style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", width: "100%" }}>
                          <div style={{ maxWidth: "80%", padding: "0.7rem 1rem", background: m.role === "user" ? "var(--c-accent)" : "var(--c-surface)", color: m.role === "user" ? "#0A0A0A" : "var(--c-ink)", fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.84rem", lineHeight: 1.7 }}>{m.text}</div>
                        </div>
                        {m.options && isLatest && !loading && !done && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", maxWidth: "92%" }}>
                            {m.options.items.map(opt => {
                              const selected = picks.includes(opt);
                              return (
                                <button
                                  key={opt}
                                  onClick={() => {
                                    if (m.options!.multi) {
                                      setChipSelections(prev => {
                                        const cur = prev[i] || [];
                                        const next = cur.includes(opt) ? cur.filter(x => x !== opt) : [...cur, opt];
                                        return { ...prev, [i]: next };
                                      });
                                    } else {
                                      send(opt);
                                    }
                                  }}
                                  style={{
                                    background: selected ? "var(--c-accent)" : "var(--c-surface)",
                                    color: selected ? "#0A0A0A" : "var(--c-ink)",
                                    border: `1px solid ${selected ? "var(--c-accent)" : "var(--c-border-strong)"}`,
                                    borderRadius: "999px", padding: "0.45rem 0.9rem", cursor: "pointer",
                                    fontFamily: "var(--font-sans)", fontSize: "0.76rem", fontWeight: 500,
                                    transition: "all 0.15s ease",
                                  }}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                            {m.options.multi && picks.length > 0 && (
                              <button
                                onClick={() => send(picks.join(", "))}
                                style={{
                                  display: "inline-flex", alignItems: "center", gap: "0.35rem",
                                  background: "var(--c-ink)", color: "var(--c-bg)",
                                  border: "none", borderRadius: "999px", padding: "0.45rem 1rem", cursor: "pointer",
                                  fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.62rem",
                                  letterSpacing: "0.08em", textTransform: "uppercase",
                                }}
                              >
                                Continue <ArrowRight size={11} strokeWidth={1.5} />
                              </button>
                            )}
                          </div>
                        )}
                        {m.rateLimited && isLatest && !loading && !done && (
                          <button
                            onClick={retryLast}
                            style={{
                              display: "inline-flex", alignItems: "center", gap: "0.4rem",
                              background: "none", color: "var(--c-accent)",
                              border: "1px solid var(--c-accent)", borderRadius: "999px",
                              padding: "0.4rem 0.9rem", cursor: "pointer",
                              fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.62rem",
                              letterSpacing: "0.08em", textTransform: "uppercase",
                            }}
                          >
                            <RefreshCw size={11} strokeWidth={1.5} /> Try again
                          </button>
                        )}
                        {m.rateLimited && isLatest && !loading && !done && trailingFailures >= 2 && (
                          <div style={{ width: "100%", maxWidth: "92%", background: "var(--c-surface)", border: "1px solid var(--c-border-strong)", borderRadius: "10px", padding: "1rem", marginTop: "0.25rem" }}>
                            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.76rem", color: "var(--c-ink-muted)", lineHeight: 1.6, marginBottom: "0.85rem" }}>
                              The assistant isn&apos;t cooperating right now, here are two ways to reach Decra directly instead:
                            </p>
                            {!fallbackFormOpen && !fallbackSent && (
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                                <a href="/book" style={{
                                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                                  background: "var(--c-accent)", color: "var(--c-bg)", textDecoration: "none",
                                  border: "none", borderRadius: "999px", padding: "0.5rem 1rem",
                                  fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.68rem",
                                  letterSpacing: "0.06em",
                                }}>
                                  Book an appointment <ArrowRight size={11} strokeWidth={1.5} />
                                </a>
                                <button onClick={() => setFallbackFormOpen(true)} style={{
                                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                                  background: "none", color: "var(--c-ink)",
                                  border: "1px solid var(--c-border-strong)", borderRadius: "999px", padding: "0.5rem 1rem",
                                  cursor: "pointer", fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.68rem",
                                  letterSpacing: "0.06em",
                                }}>
                                  Leave your details instead
                                </button>
                              </div>
                            )}
                            {fallbackFormOpen && !fallbackSent && (
                              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                                <input placeholder="Your name" value={fallbackForm.name} onChange={e => setFallbackForm(f => ({ ...f, name: e.target.value }))} className="field" style={{ fontSize: "0.78rem" }} />
                                <input placeholder="Your email" type="email" value={fallbackForm.email} onChange={e => setFallbackForm(f => ({ ...f, email: e.target.value }))} className="field" style={{ fontSize: "0.78rem" }} />
                                <textarea placeholder="What did you need help with? (optional)" rows={2} value={fallbackForm.message} onChange={e => setFallbackForm(f => ({ ...f, message: e.target.value }))} className="field" style={{ fontSize: "0.78rem", resize: "none" }} />
                                <button
                                  onClick={submitFallbackForm}
                                  disabled={!fallbackForm.name.trim() || !fallbackForm.email.trim() || fallbackSending}
                                  style={{
                                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                                    background: "var(--c-accent)", color: "var(--c-bg)",
                                    border: "none", borderRadius: "999px", padding: "0.55rem 1rem",
                                    cursor: "pointer", opacity: (!fallbackForm.name.trim() || !fallbackForm.email.trim() || fallbackSending) ? 0.5 : 1,
                                    fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.06em",
                                  }}
                                >
                                  {fallbackSending ? "Sending..." : "Send to Decra"}
                                </button>
                              </div>
                            )}
                            {fallbackSent && (
                              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--c-accent)" }}>
                                Sent, Decra will follow up by email shortly.
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  });
                  })()}
                  {loading && (
                    <div style={{ display: "flex", justifyContent: "flex-start" }}>
                      <div style={{ padding: "0.7rem 1rem", background: "var(--c-surface)", display: "flex", gap: "4px", alignItems: "center" }}>
                        {[0,1,2].map(i => <span key={i} style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--c-ink-muted)", animation: `dot-pulse 1.2s ease-in-out ${i*0.2}s infinite` }} />)}
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>
                {!done ? (
                  <div style={{ borderTop: "1px solid var(--c-border)", display: "flex", alignItems: "center", padding: "0.75rem 1rem", gap: "0.75rem" }}>
                    <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }}} placeholder={listening ? "Listening…" : "Type your reply…"} style={{ flex: 1, background: "none", border: "none", outline: "none", fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.875rem", color: "var(--c-ink)" }} />
                    {supported && (
                      <button onClick={handleMic} aria-label={listening ? "Stop listening" : "Speak your message"} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.25rem", color: listening ? "#e05252" : "var(--c-ink-muted)", display: "flex", alignItems: "center", animation: listening ? "dot-pulse 1s ease-in-out infinite" : "none" }}>
                        <Mic size={15} strokeWidth={1.5} />
                      </button>
                    )}
                    <button onClick={() => send()} disabled={!input.trim() || loading} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.25rem", opacity: input.trim() ? 1 : 0.3, transition: "opacity 0.2s", color: "var(--c-ink)", display: "flex", alignItems: "center" }}>
                      <ArrowRight size={15} strokeWidth={1.5} />
                    </button>
                  </div>
                ) : (
                  <div style={{ borderTop: "1px solid var(--c-border)", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ ...LBL, color: "var(--c-accent)", fontSize: "0.52rem" }}>Message sent to Decra</p>
                    <button onClick={closeModal} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.52rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--c-ink-muted)", transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"}>Close</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
      <style>{`@media(max-width:640px){.wwd-row{gap:0.35rem}}@keyframes dot-pulse{0%,100%{opacity:0.3;transform:translateY(0)}50%{opacity:1;transform:translateY(-3px)}}`}</style>
    </section>
  );
}

/* ── Section 7: Research ── */
/* Paper type, PAPERS array, and the PaperViewer modal now live in
   lib/papers.ts and components/research/PaperViewer.tsx — shared with the
   Engineering page's paired research cards, imported at the top of this file. */

function ResearchSection() {
  const { ref, vis } = useReveal();
  const [open, setOpen] = useState(false);

  // The panel is collapsed by default, which makes it easy to walk straight
  // past. Anyone who actually asks for Research — the nav link, the footer,
  // a shared /#research URL — gets it opened and scrolled to for them.
  useEffect(() => {
    // The delay matters: Next runs its own scroll handling as part of the
    // navigation, so scrolling immediately on click just gets overridden.
    // Waiting lets that settle, and gives the panel time to start expanding
    // so we aren't scrolling to a still-collapsed section.
    const openAndReveal = (delay: number) => {
      setOpen(true);
      window.setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, delay);
    };

    // Landing directly on /#research, or arriving via back/forward.
    const onHash = () => { if (window.location.hash === "#research") openAndReveal(80); };

    // Next's <Link> navigates with history.pushState, which fires neither
    // hashchange nor popstate — so an in-app click on "Research" has to be
    // caught as a click. Covers the navbar, the footer, and anything else
    // pointing at the section.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (href === "#research" || href.endsWith("/#research")) openAndReveal(260);
    };

    onHash();
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // scrollMarginTop keeps the heading clear of the fixed navbar when the
  // section is scrolled into view.
  return (
    <section id="research" ref={ref as React.RefObject<HTMLElement>} style={{ ...SEC, textAlign: "center", scrollMarginTop: "5rem" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", ...fade(vis) }}>
        <button
          onClick={() => setOpen(o => !o)}
          className="research-toggle-btn"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
            width: "100%", padding: "1.15rem 2.25rem",
            background: "var(--c-research-btn-bg)", color: "var(--c-research-btn-text)",
            border: "none", borderRadius: "3px", cursor: "pointer",
            fontFamily: "var(--font-manjari)", fontWeight: 700,
            fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.85"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
        >
          Technology Law Research <ArrowRight size={12} strokeWidth={1.5} style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform 0.25s ease" }} />
        </button>
        <style>{`
          .research-explore-btn:hover { border-color: var(--c-accent) !important; color: var(--c-accent) !important; }
        `}</style>

        <div style={{
          maxHeight: open ? "108rem" : "0px",
          opacity: open ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.45s ease",
          marginTop: open ? "2.5rem" : "0px",
        }}>
          <p style={{ ...LBL, textAlign: "left", marginBottom: "1.5rem" }}>Research &amp; the products it powers</p>

          {/* One card per research effort, paper + the tool it produced */}
          <ResearchSlides />

          {/* The listed work is a selection — Engineering is no longer in the
              nav, so this is how someone gets to the full set of builds. */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "2.75rem" }}>
            <Link
              href="/engineering"
              className="research-explore-btn"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.6rem",
                fontFamily: "var(--font-manjari)", fontWeight: 700,
                fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--c-ink)", textDecoration: "none",
                background: "transparent", border: "1px solid var(--c-border-strong)",
                padding: "0.9rem 1.75rem",
                transition: "border-color 0.25s ease, color 0.25s ease",
              }}
            >
              Explore more <ArrowRight size={12} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Section 8: Education & Training ── */
type Cred = { key: string; src: string; name: string; detail: string; tier: 1 | 2 | 3 };

const CREDENTIALS: Cred[] = [
  {
    key: "alu",
    src: "/logos/logo-alu.png",
    name: "African Leadership University",
    detail: "BSc Computer Science (AI)",
    tier: 1,
  },
  {
    key: "nazarene",
    src: "/logos/logo-nazarene.png",
    name: "Africa Nazarene University",
    detail: "Bachelor of Laws (LLB)",
    tier: 1,
  },
  {
    key: "ksl",
    src: "/logos/logo-ksl.png",
    name: "Kenya School of Law",
    detail: "Attorney Licensing Program",
    tier: 2,
  },
  {
    key: "oxford",
    src: "/logos/logo-oxford.png",
    name: "Saïd Business School, University of Oxford",
    detail: "AI, Justice, and the Rule of Law",
    tier: 2,
  },
  {
    key: "cmu",
    src: "/logos/logo-cmu.png",
    name: "Carnegie Mellon University",
    detail: "Advanced Tech, IoT &amp; Robotics",
    tier: 2,
  },
  {
    key: "cisco",
    src: "/logos/logo-cisco.png",
    name: "Cisco",
    detail: "Ethical Hacker",
    tier: 3,
  },
  {
    key: "hkust",
    src: "/logos/logo-hkust.png",
    name: "The Hong Kong University of Science and Technology",
    detail: "Information Systems Auditing, Controls &amp; Assurance",
    tier: 3,
  },
  {
    key: "qualys",
    src: "/logos/logo-qualys.png",
    name: "Qualys",
    detail: "Vulnerability Management Foundations",
    tier: 3,
  },
];

function CredCard({ c, i, vis, size = "sm" }: { c: Cred; i: number; vis: boolean; size?: "lg" | "md" | "sm" }) {
  const [hover, setHover] = useState(false);
  const logoHeight = size === "lg" ? "clamp(64px,8vw,88px)" : size === "md" ? "clamp(54px,6.5vw,72px)" : "clamp(44px,5vw,56px)";
  const nameSize = size === "lg" ? "clamp(1rem,1.4vw,1.15rem)" : size === "md" ? "clamp(0.92rem,1.25vw,1.05rem)" : "clamp(0.85rem,1.15vw,0.95rem)";
  return (
    <div
      className="cred-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(14px) scale(0.96)",
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${0.05 + i * 0.06}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${0.05 + i * 0.06}s`,
      }}>
      <div className="cred-logo-box" style={{
        height: logoHeight,
        display: "flex", alignItems: "center",
        marginBottom: "1rem",
        position: "relative",
      }}>
        <img
          src={c.src}
          alt={c.name}
          className="cred-logo-img"
          style={{
            maxHeight: "100%", maxWidth: "100%",
            width: "auto", height: "auto",
            objectFit: "contain",
            borderRadius: "3px",
            filter: hover
              ? "saturate(1) opacity(1)"
              : "saturate(0.7) contrast(0.96) opacity(0.9)",
            transition: "filter 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>
      <div className="cred-text">
        <p style={{
          fontFamily: "var(--font-serif)", fontWeight: 400,
          fontSize: nameSize,
          color: "var(--c-ink)", lineHeight: 1.3, marginBottom: "0.3rem",
        }}>{c.name}</p>
        <p style={{
          fontFamily: "var(--font-sans)", fontWeight: 400,
          fontSize: "0.72rem",
          color: "var(--c-ink-muted)", lineHeight: 1.5,
        }} dangerouslySetInnerHTML={{ __html: c.detail }} />
      </div>
    </div>
  );
}

function Accreditations() {
  const { ref, vis } = useReveal();
  // Two rows of four, the two degree-granting institutions lead each row, rest follow by tier.
  const row1 = [CREDENTIALS[0], CREDENTIALS[1], CREDENTIALS[3], CREDENTIALS[2]]; // ALU, Nazarene, Oxford, KSL
  const row2 = [CREDENTIALS[4], CREDENTIALS[5], CREDENTIALS[6], CREDENTIALS[7]]; // CMU, Cisco, HKUST, Qualys
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={SEC}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <p style={{ ...LBL, marginBottom: "2rem", ...fade(vis) }}>Credentials &amp; Training</p>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: "clamp(1.75rem,3vw,2.75rem)",
          marginBottom: "clamp(2.25rem,4vw,3.25rem)",
          paddingBottom: "clamp(2.25rem,4vw,3.25rem)",
          borderBottom: "1px solid var(--c-border)",
        }} className="cred-grid">
          {row1.map((c, i) => <CredCard key={c.key} c={c} i={i} vis={vis} size="md" />)}
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: "clamp(1.75rem,3vw,2.75rem)",
        }} className="cred-grid">
          {row2.map((c, i) => <CredCard key={c.key} c={c} i={i} vis={vis} size="md" />)}
        </div>
      </div>
      <style>{`
        @media(max-width:820px){.cred-grid{grid-template-columns:repeat(2,1fr)!important}}
        @media(max-width:560px){
          .cred-grid{grid-template-columns:1fr!important; gap:1.5rem!important}
          .cred-card{display:flex!important; align-items:center; gap:1rem}
          .cred-card .cred-logo-box{flex-shrink:0; width:60px!important; height:60px!important; margin-bottom:0!important; background:var(--c-surface); border-radius:6px; justify-content:center; padding:0.4rem}
          .cred-card .cred-logo-img{max-height:100%!important; max-width:100%!important}
          .cred-card .cred-text{flex:1; min-width:0}
        }
      `}</style>
    </section>
  );
}

/* ── Section: Tech Development ── */
function TechDevSection() {
  const { ref, vis } = useReveal();
  return (
    <section id="tech-development" ref={ref as React.RefObject<HTMLElement>} style={{ ...SEC, borderTop: "1px solid var(--c-border)" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", ...reveal(vis, { dir: "up", distance: 18 }) }}>
        <div style={{ maxWidth: "40rem", marginBottom: "2.5rem" }}>
          <p style={{ ...LBL, marginBottom: "1.25rem" }}>Tech Development</p>
          <h2 style={{
            fontFamily: "var(--font-serif)", fontWeight: 400,
            fontSize: "clamp(1.5rem,2.6vw,2.1rem)", color: "var(--c-ink)",
            lineHeight: 1.25, marginBottom: "1.1rem",
          }}>
            Need the product actually built, not just reviewed?
          </h2>
          <p style={{ ...BODY, fontSize: "0.88rem" }}>
            Decra also builds, websites and product MVPs, from brand fundamentals through a shipped build. A short discovery conversation scopes exactly what you need, for a quick pricing quote.
          </p>
        </div>

        <button
          onClick={() => window.dispatchEvent(new CustomEvent(OPEN_PARTNER_MODAL_EVENT, { detail: TECH_DEV_GROUP }))}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
            width: "100%", padding: "1.15rem 2.25rem",
            background: "var(--c-accent)", color: "var(--c-bg)",
            border: "none", borderRadius: "3px", cursor: "pointer",
            fontFamily: "var(--font-manjari)", fontWeight: 700,
            fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.85"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
        >
          Secure My Tech Development Services <ArrowRight size={12} strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}

/* ── Page ── */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <ResearchSection />
      {/* Tech Development section temporarily hidden, TechDevSection component preserved below, just not rendered.
      <TechDevSection /> */}
      <Accreditations />
      <WorkWithDecra />
    </>
  );
}
