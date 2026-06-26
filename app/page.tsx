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
  fontFamily: "var(--font-sans)", fontWeight: 400,
  fontSize: "0.875rem", color: "var(--c-ink-muted)", lineHeight: 1.85,
};
const SEC: React.CSSProperties = {
  borderTop: "1px solid var(--c-border)",
  padding: "var(--space-section) var(--space-x)",
};

/* ── Section 1: Hero ── */
function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t); }, []);
  return (
    <section style={{ height: "100svh", position: "relative", overflow: "hidden", background: "#080808" }}>
      {/* Full-bleed portrait */}
      <div style={{
        position: "absolute", inset: 0,
        opacity: vis ? 1 : 0,
        transition: "opacity 1.4s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <img src="/decra-hero.jpg" alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "72% 28%", display: "block" }} />
      </div>
      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: `
          linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.2) 35%, transparent 55%),
          linear-gradient(to right, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.5) 38%, rgba(8,8,8,0.1) 62%, transparent 75%)
        `,
      }} />
      {/* Text — bottom anchored */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "3.5rem var(--space-x) 5rem",
        maxWidth: "calc(var(--max-w) + (var(--space-x) * 2))", margin: "0 auto",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(22px)",
        transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.45s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.45s",
      }}>
        <h1 style={{
          fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
          fontSize: "clamp(2.5rem,5.5vw,5rem)",
          color: "#F0EEE9", lineHeight: 1.02, letterSpacing: "-0.01em",
          marginBottom: "1.75rem",
        }}>
          Decra Kerubo.
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
          <a href="#services" style={{
            fontFamily: "var(--font-manjari)", fontWeight: 700,
            fontSize: "0.52rem", letterSpacing: "0.24em", textTransform: "uppercase",
            color: "rgba(240,238,233,0.42)", textDecoration: "none", transition: "color 0.25s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#F0EEE9"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(240,238,233,0.42)"}>
            Services
          </a>
          <span style={{ width: "1px", height: "10px", background: "rgba(240,238,233,0.16)", display: "block" }} />
          <Link href="/about" style={{
            fontFamily: "var(--font-manjari)", fontWeight: 700,
            fontSize: "0.52rem", letterSpacing: "0.24em", textTransform: "uppercase",
            color: "rgba(196,160,106,0.8)", textDecoration: "none", transition: "color 0.25s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#C4A06A"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(196,160,106,0.8)"}>
            About
          </Link>
        </div>
      </div>
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
  const categories = Object.keys(PARTNERS);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={SEC}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }} className="partners-g">
          <div style={fade(vis)}>
            <p style={{ ...LBL, marginBottom: "1.25rem" }}>Partners</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(2rem,3.5vw,3rem)", color: "var(--c-ink)", lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: "2rem" }}>Who I work with.</h2>
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
          <div style={{ display: "flex", alignItems: "center", gap: "3rem", flexWrap: "wrap", paddingTop: "0.5rem", ...fade(vis, 0.1) }}>
            {categories.map((cat, i) => (
              <p key={cat} style={{
                fontFamily: "var(--font-sans)", fontWeight: 600,
                fontSize: "clamp(0.85rem,1.4vw,1.05rem)",
                color: "var(--c-ink)", lineHeight: 1,
                opacity: vis ? 1 : 0,
                transition: `opacity 0.5s ease ${0.08 * i}s`,
              }}>{cat}</p>
            ))}
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
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", textAlign: "center" }}>
        <div style={fade(vis)}>
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(5rem,12vw,11rem)", color: "var(--c-ink)", lineHeight: 1 }}>
            {count}+
          </p>
          <p style={{ ...LBL, marginTop: "1rem" }}>Startup founders &amp; tech developers assisted</p>
        </div>
      </div>
    </section>
  );
}

/* ── Section 5: The 1000 ── */
/* Spotify SVG logo — official green */
const SpotifyLogo = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="#1DB954">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

function The1000() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{
      borderTop: "none",
      minHeight: "clamp(420px, 60vh, 680px)",
      background: "#0F3320",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
    }}>
      {/* Full-bleed image centred, fades out to edges */}
      <img src="/decra-spotify-bg.jpg" alt="" style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        objectFit: "cover",
        objectPosition: "center 22%",
        opacity: 1,
        zIndex: 0, pointerEvents: "none",
        display: "block",
      }} />
      {/* Radial fade: centre visible, edges dissolve to #0F3320 */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: `
          radial-gradient(ellipse 72% 88% at 50% 42%, transparent 0%, rgba(15,51,32,0.55) 52%, rgba(15,51,32,0.92) 72%, #0F3320 90%)
        `,
      }} />
      {/* Top + bottom solid fade for section edge clean-up */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: `
          linear-gradient(to bottom, #0F3320 0%, transparent 14%, transparent 86%, #0F3320 100%)
        `,
      }} />

      {/* Content — centred over image */}
      <div style={{
        maxWidth: "var(--max-w)", margin: "0 auto",
        width: "100%", padding: "clamp(5rem,9vw,9rem) var(--space-x)",
        position: "relative", zIndex: 3,
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(20px)",
        transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer"
          style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: "1.5rem", textDecoration: "none",
            transition: "filter 0.25s", filter: "none",
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.filter = "opacity(0.7)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter = "none"}>
          <SpotifyLogo />
          <p style={{
            fontFamily: "'Circular Std', 'Circular', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2.5rem,5vw,4.5rem)",
            color: "#FFFFFF",
            letterSpacing: "-0.02em", lineHeight: 1,
          }}>The 1000</p>
          <p style={{
            fontFamily: "var(--font-sans)", fontWeight: 400,
            fontSize: "0.9rem", color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.04em",
          }}>Technology law in Africa &nbsp;&mdash;&nbsp; on Spotify</p>
        </a>
      </div>
    </section>
  );
}


/* ── Section 6: Start Your Business / Build Tech ── */
function StartBusiness() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ borderTop: "none" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "0",
        }} className="sb-g">

          {/* LEFT — Start your business */}
          <div style={{
            padding: "3.5rem",
            background: "#0D0D0D",
            ...fade(vis),
          }}>
            <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "1.25rem" }}>Advisory</p>
            <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(1.6rem,2.8vw,2.4rem)", color: "#FFFFFF", lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "1.25rem" }}>
              Start your business with me.
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.85, maxWidth: "22rem", marginBottom: "2.5rem" }}>
              From incorporation to fundraising readiness — full-spectrum startup advisory.
            </p>
            <div style={{ display: "flex", flexDirection: "column", marginBottom: "2.5rem" }}>
              {[
                ["Incorporation & structure", "Entity type, shareholding, constitutional documents"],
                ["Equity & founder agreements", "Cap tables, vesting, co-founder terms"],
                ["Tax & compliance", "eTIMS, KRA, VAT, PAYE — from day one"],
                ["Fundraising readiness", "Term sheets, investor agreements, due diligence"],
                ["Foreign branches & PBOs", "International orgs, foreign companies, PBO registration"],
              ].map(([title, body], i) => (
                <div key={title} style={{
                  padding: "0.9rem 0", borderBottom: "1px solid rgba(255,255,255,0.1)",
                  opacity: vis ? 1 : 0,
                  transition: `opacity 0.55s ease ${0.1 + i * 0.07}s`,
                }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.85rem", color: "rgba(255,255,255,0.88)", marginBottom: "0.2rem" }}>{title}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{body}</p>
                </div>
              ))}
            </div>
            <Link href="/start" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontFamily: "var(--font-manjari)", fontWeight: 700,
              fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#0D0D0D", background: "var(--c-accent)",
              padding: "0.8rem 1.6rem", textDecoration: "none",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#D4B87A"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--c-accent)"}>
              Start here <ArrowRight size={11} strokeWidth={1.5} />
            </Link>
          </div>

          {/* RIGHT — Build compliant tech */}
          <div style={{
            padding: "3.5rem",
            background: "#0F3320",
            ...fade(vis, 0.12),
          }}>
            <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(15,51,32,0.6)", marginBottom: "1.25rem" }}>In partnership with Entrora Systems</p>
            <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(1.6rem,2.8vw,2.4rem)", color: "#0F3320", lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "1.25rem" }}>
              Build a compliant tech product.
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.85, maxWidth: "22rem", marginBottom: "2.5rem" }}>
              AI engineering and software development with legal compliance built in from day one — not bolted on after.
            </p>
            <div style={{ display: "flex", flexDirection: "column", marginBottom: "2.5rem" }}>
              {[
                ["AI Document Systems", "Classification, extraction, and review at scale"],
                ["Legal Tech Development", "Software built for legal workflows"],
                ["Compliant AI Products", "Data governance and privacy from day one"],
                ["AI Adoption Advisory", "Scoping and implementation for any budget"],
                ["Regulatory sandbox", "Navigation for AI products in East Africa"],
              ].map(([title, body], i) => (
                <div key={title} style={{
                  padding: "0.9rem 0", borderBottom: "1px solid rgba(255,255,255,0.1)",
                  opacity: vis ? 1 : 0,
                  transition: `opacity 0.55s ease ${0.15 + i * 0.07}s`,
                }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.85rem", color: "rgba(255,255,255,0.88)", marginBottom: "0.2rem" }}>{title}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{body}</p>
                </div>
              ))}
            </div>
            <Link href="/entrora" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontFamily: "var(--font-manjari)", fontWeight: 700,
              fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.75)", textDecoration: "none",
              borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "2px",
              transition: "color 0.2s, border-color 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.8)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)"; }}>
              Learn about Entrora <ArrowRight size={11} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:700px){.sb-g{grid-template-columns:1fr!important;}.sb-g>div{padding:2.5rem 0!important}}`}</style>
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
      <StartBusiness />
      <The1000 />
    </>
  );
}
