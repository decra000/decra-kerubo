"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus, Minus, ExternalLink } from "lucide-react";

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

const LBL: React.CSSProperties = {
  fontFamily: "var(--font-manjari)", fontWeight: 700,
  fontSize: "0.55rem", letterSpacing: "0.24em", textTransform: "uppercase",
  color: "var(--c-ink-muted)",
};
const SERIF = (sz = "clamp(2rem,3.5vw,3rem)"): React.CSSProperties => ({
  fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
  fontSize: sz, color: "var(--c-ink)", lineHeight: 1.05,
});
const BODY: React.CSSProperties = {
  fontFamily: "var(--font-sans)", fontWeight: 300,
  fontSize: "0.875rem", color: "var(--c-ink-muted)", lineHeight: 1.85,
};
const SEC: React.CSSProperties = {
  borderTop: "1px solid var(--c-border)",
  padding: "var(--space-section) var(--space-x)",
};

/* ── Section 1: Hero ── */
function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);
  return (
    <section style={{ minHeight: "100svh", background: "var(--c-bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div style={{ width: "clamp(220px,30vw,400px)", aspectRatio: "4/5", overflow: "hidden", marginBottom: "2.75rem", ...fade(vis) }}>
        <img src="/decra-hero.png" alt="Decra Kerubo" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
      </div>
      <div style={{ textAlign: "center", ...fade(vis, 0.1) }}>
        <h1 style={{ ...SERIF("clamp(1.75rem,3vw,2.5rem)"), marginBottom: "0.75rem" }}>Decra Kerubo</h1>
        <p style={{ ...LBL, marginBottom: "2rem" }}>Technology Law Consulting &nbsp;&middot;&nbsp; Nairobi</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
          <a href="#services" style={{ ...LBL, textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"}>Services</a>
          <span style={{ width: "1px", height: "10px", background: "var(--c-border-strong)", display: "block" }} />
          <Link href="/partner" style={{ ...LBL, color: "var(--c-accent)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"}>Work Together</Link>
        </div>
      </div>
      <style>{`@keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </section>
  );
}

/* ── Section 2: Services ── */
const SERVICES = [
  {
    id: "consulting",
    label: "Technology Law Consulting",
    body: "End-to-end legal advisory for technology companies, products, and digital platforms operating in Kenya and across Africa.",
    items: ["Technology regulatory compliance", "Data protection & ODPC compliance", "Cybersecurity law", "Digital commerce & platform law", "Tech contracts & licensing", "Policy engagement & representation"],
  },
  {
    id: "compliance",
    label: "Technical Products Compliance Review",
    body: "Systematic legal review of your technology product against applicable regulations — before regulators find the gaps.",
    items: ["Pre-launch compliance audit", "Product liability assessment", "Privacy-by-design review", "Terms of service & privacy policy", "API & third-party integration review", "Ongoing compliance monitoring"],
  },
  {
    id: "advisory",
    label: "Advisory to Techpreneurs",
    body: "Practical, clear-headed legal guidance for founders and builders who need to make fast decisions with real legal consequences.",
    items: ["Company incorporation & structure", "Founder & co-founder agreements", "Equity, vesting & cap table", "Tax structuring (eTIMS, VAT, PAYE)", "Fundraising legal readiness", "Investor agreement review"],
  },
  {
    id: "ai",
    label: "AI Engineering Services",
    body: "Regulated, compliant AI development and deployment through Entrora Systems — built with the legal layer built in from day one.",
    items: ["AI readiness assessment", "AI governance frameworks", "Compliant AI product development", "Data pipeline legal review", "AI policy advisory", "Regulatory sandbox navigation"],
    external: "/entrora",
    externalLabel: "Explore Entrora Systems",
  },
  {
    id: "startup",
    label: "Startup Advisory",
    body: "From idea to operational — strategic legal and business advisory for startups at every stage of growth.",
    items: ["Pre-incorporation strategy", "Multi-jurisdiction structuring", "NGO & social enterprise setup", "Grant & funding compliance", "Commercial partnership structuring", "Exit & acquisition preparation"],
  },
];

function Services() {
  const { ref, vis } = useReveal();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="services" ref={ref as React.RefObject<HTMLElement>} style={SEC}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{ marginBottom: "5rem", ...fade(vis) }}>
          <p style={{ ...LBL, marginBottom: "1.25rem" }}>Areas of Practice</p>
          <h2 style={SERIF()}>Technology Law Consulting.</h2>
        </div>

        <div style={{ borderTop: "1px solid var(--c-border)" }}>
          {SERVICES.map((s, i) => {
            const isOpen = open === s.id;
            return (
              <div key={s.id} style={{ ...fade(vis, 0.05 * i) }}>
                <button onClick={() => setOpen(isOpen ? null : s.id)} style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  gap: "2rem", padding: "2rem 0", background: "none", border: "none",
                  borderBottom: isOpen ? "none" : "1px solid var(--c-border)",
                  cursor: "pointer", textAlign: "left",
                }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "2.5rem", flex: 1 }}>
                    <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.75rem", color: "var(--c-ink-muted)", flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ ...SERIF("clamp(1.1rem,2vw,1.5rem)"), color: "var(--c-ink)" }}>{s.label}</span>
                  </div>
                  {isOpen ? <Minus size={13} strokeWidth={1.5} style={{ color: "var(--c-ink-muted)", flexShrink: 0 }} /> : <Plus size={13} strokeWidth={1.5} style={{ color: "var(--c-ink-muted)", flexShrink: 0 }} />}
                </button>
                <div style={{ maxHeight: isOpen ? "600px" : "0", overflow: "hidden", transition: "max-height 0.55s cubic-bezier(0.4,0,0.2,1)", borderBottom: "1px solid var(--c-border)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", paddingBottom: "3rem" }} className="svc-detail">
                    <div>
                      <p style={{ ...BODY, marginBottom: "2rem" }}>{s.body}</p>
                      {s.external && (
                        <Link href={s.external} style={{
                          display: "inline-flex", alignItems: "center", gap: "0.4rem",
                          fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem",
                          letterSpacing: "0.2em", textTransform: "uppercase",
                          color: "var(--c-accent)", textDecoration: "none", transition: "color 0.2s",
                        }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"}>
                          {s.externalLabel} <ExternalLink size={10} strokeWidth={1.5} />
                        </Link>
                      )}
                    </div>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                      {s.items.map(item => (
                        <li key={item} style={{ display: "flex", gap: "1rem", ...BODY }}>
                          <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--c-accent)", marginTop: "0.55rem", flexShrink: 0 }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`.svc-detail{@media(max-width:680px){grid-template-columns:1fr!important;gap:2rem!important}}`}</style>
    </section>
  );
}

/* ── Section 3: Partners slider ── */
const PARTNERS = {
  "Law Firms": ["Hamilton Harrison & Mathews", "Anjarwalla & Khanna", "Kaplan & Stratton", "TripleOKLaw", "IKM Advocates"],
  "Tech Firms": ["Safaricom PLC", "Cellulant", "Onfon Media", "Africa's Talking", "Moringa School"],
  "Individuals": ["Startup founders", "NGO directors", "Tech entrepreneurs", "Policy researchers", "Digital product teams"],
};

function Partners() {
  const { ref, vis } = useReveal();
  const cats = Object.keys(PARTNERS) as (keyof typeof PARTNERS)[];
  const [active, setActive] = useState<keyof typeof PARTNERS>("Law Firms");

  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={SEC}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }} className="partners-g">
          <div style={fade(vis)}>
            <p style={{ ...LBL, marginBottom: "1.25rem" }}>Partners</p>
            <h2 style={{ ...SERIF(), marginBottom: "1.5rem" }}>Who we work with.</h2>
            <p style={{ ...BODY, maxWidth: "22rem" }}>Across law firms, technology companies, and individual founders — building a network that connects legal rigour with technical execution.</p>
          </div>
          <div style={fade(vis, 0.1)}>
            {/* Category tabs */}
            <div style={{ display: "flex", gap: "0", borderBottom: "1px solid var(--c-border)", marginBottom: "2.5rem" }}>
              {cats.map(cat => (
                <button key={cat} onClick={() => setActive(cat)} style={{
                  fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  padding: "0.75rem 1.25rem 0.75rem 0", marginRight: "1.5rem",
                  background: "none", border: "none", cursor: "pointer",
                  color: active === cat ? "var(--c-ink)" : "var(--c-ink-muted)",
                  borderBottom: `1px solid ${active === cat ? "var(--c-ink)" : "transparent"}`,
                  marginBottom: "-1px", transition: "color 0.2s, border-color 0.2s",
                }}>{cat}</button>
              ))}
            </div>
            {/* Sliding list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {PARTNERS[active].map((name, i) => (
                <div key={name} style={{
                  padding: "1rem 0", borderBottom: "1px solid var(--c-border)",
                  fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1rem",
                  color: "var(--c-ink-mid)", lineHeight: 1.3,
                  opacity: vis ? 1 : 0,
                  transform: vis ? "none" : "translateX(-8px)",
                  transition: `opacity 0.5s ease ${0.05 * i}s, transform 0.5s ease ${0.05 * i}s`,
                }}>{name}</div>
              ))}
            </div>
            <div style={{ marginTop: "2rem" }}>
              <Link href="/partner" style={{
                fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--c-ink)", textDecoration: "none",
                borderBottom: "1px solid var(--c-ink)", paddingBottom: "2px",
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                transition: "color 0.2s, border-color 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-ink)"; }}>
                Partner with Decra <ArrowRight size={10} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:700px){.partners-g{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
    </section>
  );
}

/* ── Section 4: Impact counter ── */
function Impact() {
  const { ref, vis } = useReveal();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!vis) return;
    let n = 0;
    const t = setInterval(() => { n += 2; setCount(Math.min(n, 80)); if (n >= 80) clearInterval(t); }, 25);
    return () => clearInterval(t);
  }, [vis]);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ ...SEC, background: "var(--c-surface)" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }} className="impact-g">
          <div style={fade(vis)}>
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(5rem,12vw,10rem)", color: "var(--c-ink)", lineHeight: 1, marginBottom: "0" }}>
              {count}+
            </p>
            <p style={{ ...LBL, marginTop: "0.75rem" }}>Startup founders & tech developers assisted</p>
          </div>
          <div style={fade(vis, 0.1)}>
            <p style={{ ...SERIF("1.6rem"), marginBottom: "1.5rem" }}>Real work. Real outcomes.</p>
            <p style={{ ...BODY, marginBottom: "2.5rem" }}>
              From pre-incorporation advisory to post-fundraise compliance — helping founders navigate the legal infrastructure that determines what becomes possible later.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                ["IP strategy", "before investors flag the gaps"],
                ["Data privacy", "before regulators arrive"],
                ["Founder equity", "before co-founder disputes"],
                ["Compliance review", "before product launch"],
              ].map(([bold, rest]) => (
                <p key={bold} style={{ ...BODY, color: "var(--c-ink-mid)" }}>
                  <strong style={{ fontWeight: 400, color: "var(--c-ink)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}>{bold}</strong>
                  {" — "}{rest}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:700px){.impact-g{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
    </section>
  );
}

/* ── Section 5: The 1000 ── */
function The1000() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={SEC}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }} className="k-g">
          <div style={fade(vis)}>
            <p style={{ ...LBL, marginBottom: "1.25rem" }}>The 1000</p>
            <h2 style={{ ...SERIF(), marginBottom: "1.5rem" }}>A podcast. A movement.</h2>
            <p style={{ ...BODY, maxWidth: "22rem", marginBottom: "2.5rem" }}>
              Conversations with the founders, lawyers, engineers, and policy thinkers shaping technology law in Africa. On Spotify.
            </p>
            <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--c-ink)", textDecoration: "none",
              borderBottom: "1px solid var(--c-ink)", paddingBottom: "2px",
              transition: "color 0.2s, border-color 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-ink)"; }}>
              Listen on Spotify <ArrowRight size={10} strokeWidth={1.5} />
            </a>
          </div>
          <div style={{ ...fade(vis, 0.1), display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              { ep: "001", title: "Why African startups get IP wrong", dur: "38 min" },
              { ep: "002", title: "Data privacy in Kenya — what the ODPC actually wants", dur: "42 min" },
              { ep: "003", title: "Fundraising legal traps no one tells you about", dur: "35 min" },
              { ep: "004", title: "Building compliant AI in Africa", dur: "51 min" },
            ].map((ep, i) => (
              <div key={ep.ep} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                gap: "2rem", padding: "1.25rem 0",
                borderBottom: "1px solid var(--c-border)",
                opacity: vis ? 1 : 0,
                transition: `opacity 0.5s ease ${0.08 * i}s`,
              }}>
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.7rem", color: "var(--c-accent)" }}>{ep.ep}</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.82rem", color: "var(--c-ink-mid)" }}>{ep.title}</span>
                </div>
                <span style={{ fontFamily: "var(--font-manjari)", fontSize: "0.52rem", letterSpacing: "0.1em", color: "var(--c-ink-muted)", flexShrink: 0 }}>{ep.dur}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:700px){.k-g{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
    </section>
  );
}

/* ── Page ── */
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Partners />
      <Impact />
      <The1000 />
    </>
  );
}
