"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
];

function Services() {
  const { ref, vis } = useReveal();

  return (
    <section id="services" ref={ref as React.RefObject<HTMLElement>} style={SEC}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{ marginBottom: "4rem", ...fade(vis) }}>
          <p style={{ ...LBL, marginBottom: "1.25rem" }}>Areas of Practice</p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(2rem,3.5vw,3rem)", color: "var(--c-ink)", lineHeight: 1.05 }}>Technology Law Consulting.</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0" }} className="svc-grid">
          {SERVICES.map((s, i) => (
            <div key={s.id} style={{
              padding: "2.25rem 2rem",
              borderTop: "1px solid var(--c-border)",
              borderLeft: i > 0 ? "1px solid var(--c-border)" : "none",
              ...fade(vis, 0.06 * i),
            }}>
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.7rem", color: "var(--c-ink-muted)", display: "block", marginBottom: "1.25rem" }}>{String(i + 1).padStart(2, "0")}</span>
              <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(1.05rem,1.6vw,1.3rem)", color: "var(--c-ink)", lineHeight: 1.25, marginBottom: "1rem" }}>{s.label}</h3>
              <p style={{ ...BODY, fontSize: "0.84rem", marginBottom: "1.5rem" }}>{s.body}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {s.items.map(item => (
                  <li key={item} style={{ display: "flex", gap: "0.85rem", ...BODY, fontSize: "0.82rem" }}>
                    <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--c-accent)", marginTop: "0.5rem", flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.svc-grid{grid-template-columns:1fr!important}.svc-grid>div{border-left:none!important;border-top:1px solid var(--c-border)!important}}`}</style>
    </section>
  );
}

/* ── Section 2.5: Research ───
   Visual language: warm dusk grid (regentsantamonica) crossed with the
   quiet, gold-on-cream product-card rhythm of Serenity+Jewels — serif
   type set directly onto generated tonal tiles, thin hairline borders,
   small caps metadata beneath each card instead of a price.
*/
type PaperStatus = "current" | "complete";

interface Paper {
  slug: string;          // must match a filename in /private/research/<slug>.pdf
  tag: string;            // short serif overlay word, IG-grid style ("BEYOND", "GOLDEN")
  title: string;
  dates: string;
  status: PaperStatus;
  summary: string;
  tile: { from: string; to: string; ink: string }; // generated tile palette
  span?: "wide" | "normal";
}

const PAPERS: Paper[] = [
  {
    slug: "democratization-decarbonization-ai",
    tag: "GREENER",
    title: "Democratization and Decarbonization of AI Solutions",
    dates: "May 2024 — Present",
    status: "current",
    summary: "Closing the accessibility gap for AI through edge computing, while cutting the environmental cost of the data centres that power it.",
    tile: { from: "#C97B4A", to: "#1A1714", ink: "#F5EFE6" },
    span: "wide",
  },
  {
    slug: "merger-regulation-kenya",
    tag: "MARKETS",
    title: "Merger Regulation & Competition Law Analysis in Kenya",
    dates: "Sep 2025 — Dec 2025",
    status: "complete",
    summary: "Evaluating the factors behind low rates of successful mergers between public limited companies in Kenya's commercial landscape.",
    tile: { from: "#8C8073", to: "#2A2722", ink: "#F0EDE8" },
  },
  {
    slug: "ai-enabled-regulation",
    tag: "SAFETY",
    title: "AI-Enabled Regulation as a Means to Digital Safety",
    dates: "Aug 2023 — Apr 2024",
    status: "complete",
    summary: "Real-time detection and pre-interaction AI strategies for social media regulation, built into a working Chrome extension.",
    tile: { from: "#41566B", to: "#0F1620", ink: "#EDEFF2" },
  },
  {
    slug: "cross-border-data-transfer",
    tag: "TRANSFER",
    title: "Analyzing Inefficiencies in Current Cross-Border Data Transfer Laws",
    dates: "Jan 2022 — Nov 2022",
    status: "complete",
    summary: "Examining GDPR, the DPA, and adjacent frameworks against the realities of AI training data and large-scale collection practices.",
    tile: { from: "#B08D5B", to: "#241D12", ink: "#F5EFE2" },
  },
  {
    slug: "unbiased-hiring-algorithms",
    tag: "HIRING",
    title: "Unbiased Hiring Algorithms",
    dates: "Aug 2021 — Dec 2021",
    status: "complete",
    summary: "Addressing algorithmic discrimination in automated recruitment while preserving the efficiency that drew employers to it.",
    tile: { from: "#5C6B57", to: "#171A14", ink: "#EFF2EC" },
  },
];

function PaperTile({ paper }: { paper: Paper }) {
  return (
    <div style={{
      position: "relative", width: "100%", height: "100%",
      overflow: "hidden",
      background: `linear-gradient(155deg, ${paper.tile.from} 0%, ${paper.tile.to} 100%)`,
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.10), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(0,0,0,0.35), transparent 60%)",
      }} />
      <span style={{
        position: "absolute", left: "1.25rem", bottom: "1.1rem",
        fontFamily: "var(--font-serif)", fontWeight: 400,
        fontSize: "clamp(1.4rem, 2.4vw, 2.1rem)",
        letterSpacing: "0.01em",
        color: paper.tile.ink,
        lineHeight: 1,
        textShadow: "0 2px 18px rgba(0,0,0,0.25)",
      }}>
        {paper.tag}
      </span>
      <span style={{
        position: "absolute", top: "1rem", right: "1.1rem",
        fontFamily: "var(--font-manjari)", fontWeight: 700,
        fontSize: "0.55rem", letterSpacing: "0.18em",
        color: paper.tile.ink, opacity: 0.65,
      }}>
        {paper.dates.split("—")[0].trim().split(" ").pop()}
      </span>
    </div>
  );
}

function PaperViewer({ paper, onClose }: { paper: Paper; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={paper.title}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(10,10,10,0.82)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(1rem,4vw,3.5rem)",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: "62rem", height: "100%",
          maxHeight: "92vh",
          background: "#1A1916",
          borderRadius: "4px",
          overflow: "hidden",
          display: "flex", flexDirection: "column",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1rem 1.5rem",
          borderBottom: "1px solid rgba(240,237,232,0.1)",
          flexShrink: 0,
        }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.95rem", color: "#F0EDE8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {paper.title}
            </p>
            <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(240,237,232,0.45)", marginTop: "0.2rem" }}>
              View only &nbsp;·&nbsp; {paper.dates}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(240,237,232,0.55)",
              fontFamily: "var(--font-manjari)", fontWeight: 700,
              fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase",
              padding: "0.5rem 0.75rem", flexShrink: 0,
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#F0EDE8"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(240,237,232,0.55)"}
          >
            Close ✕
          </button>
        </div>
        <div style={{ flex: 1, background: "#0A0A0A" }}>
          <iframe
            src={`/api/research/${paper.slug}#toolbar=0&navpanes=0`}
            title={paper.title}
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        </div>
      </div>
    </div>
  );
}

function Research() {
  const { ref, vis } = useReveal();
  const [active, setActive] = useState<Paper | null>(null);

  return (
    <section id="research" ref={ref as React.RefObject<HTMLElement>} style={SEC}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>

        {/* Header — echoes the Serenity+Jewels wordmark-over-cream treatment */}
        <div style={{
          marginBottom: "clamp(3rem,5vw,4.5rem)",
          ...fade(vis),
        }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", marginBottom: "1.25rem" }}>
            <p style={LBL}>Research</p>
            <p style={{ ...LBL, color: "var(--c-ink-muted)" }}>{PAPERS.length} papers &nbsp;·&nbsp; 2021 — Present</p>
          </div>
          <h2 style={{
            fontFamily: "var(--font-serif)", fontWeight: 400, fontStyle: "italic",
            fontSize: "clamp(2.1rem,4.2vw,3.4rem)",
            color: "var(--c-ink)", lineHeight: 1.05, letterSpacing: "-0.01em",
            display: "flex", alignItems: "center", gap: "0.85rem", flexWrap: "wrap",
          }}>
            Law, AI &amp;
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "0.55em", height: "0.55em", border: "1px solid var(--c-accent)", borderRadius: "50%", fontSize: "0.4em", color: "var(--c-accent)" }}>+</span>
            <span style={{ color: "var(--c-accent)" }}>Policy.</span>
          </h2>
          <p style={{ ...BODY, maxWidth: "34rem", marginTop: "1.25rem" }}>
            Independent papers written at the intersection of technology, regulation, and the law — view-only, kept here as a record rather than a download.
          </p>
        </div>

        {/* Grid — asymmetric, photo-grid rhythm */}
        <div className="rsc-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.1rem",
        }}>
          {PAPERS.map((paper, i) => (
            <article
              key={paper.slug}
              style={{
                gridColumn: paper.span === "wide" ? "span 2" : "span 1",
                ...fade(vis, 0.08 + i * 0.07),
              }}
            >
              <button
                onClick={() => setActive(paper)}
                aria-label={`View ${paper.title}`}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  background: "none", border: "none", padding: 0, cursor: "pointer",
                  font: "inherit", color: "inherit",
                }}
              >
                <div
                  className="rsc-tile"
                  style={{
                    aspectRatio: paper.span === "wide" ? "16/9" : "4/5",
                    marginBottom: "1rem",
                    border: "1px solid var(--c-border-strong)",
                    transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <PaperTile paper={paper} />
                </div>

                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.5rem" }}>
                  <span style={{
                    fontFamily: "var(--font-manjari)", fontWeight: 700,
                    fontSize: "0.55rem", letterSpacing: "0.16em", textTransform: "uppercase",
                    color: paper.status === "current" ? "var(--c-accent)" : "var(--c-ink-muted)",
                    border: paper.status === "current" ? "1px solid var(--c-accent)" : "none",
                    padding: paper.status === "current" ? "0.2rem 0.55rem" : 0,
                  }}>
                    {paper.status === "current" ? "Current Project" : "Complete"}
                  </span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--c-ink-muted)", whiteSpace: "nowrap" }}>
                    {paper.dates}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: "var(--font-serif)", fontWeight: 400, fontStyle: "italic",
                  fontSize: "clamp(1rem,1.6vw,1.2rem)", color: "var(--c-ink)",
                  lineHeight: 1.3, marginBottom: "0.6rem",
                }}>
                  {paper.title}
                </h3>

                <p style={{ ...BODY, fontSize: "0.8rem", marginBottom: "0.85rem" }}>
                  {paper.summary}
                </p>

                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  fontFamily: "var(--font-manjari)", fontWeight: 700,
                  fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "var(--c-ink)",
                  borderBottom: "1px solid var(--c-ink)", paddingBottom: "2px",
                }}>
                  View paper <ArrowRight size={10} strokeWidth={1.5} />
                </span>
              </button>
            </article>
          ))}
        </div>
      </div>

      {active && <PaperViewer paper={active} onClose={() => setActive(null)} />}

      <style>{`
        .rsc-tile { overflow: hidden; }
        .rsc-tile:hover { transform: translateY(-3px); }
        @media(max-width:900px) {
          .rsc-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media(max-width:600px) {
          .rsc-grid { grid-template-columns: 1fr !important; }
          .rsc-grid > article { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}

const PARTNERS = {
  "Law Firms": ["Hamilton Harrison & Mathews", "Anjarwalla & Khanna", "Kaplan & Stratton", "TripleOKLaw", "IKM Advocates"],
  "Tech Firms": ["Safaricom PLC", "Cellulant", "Onfon Media", "Africa's Talking", "Moringa School"],
  "Individuals": ["Startup founders", "NGO directors", "Tech entrepreneurs", "Policy researchers", "Digital product teams"],
};

function Partners() {
  const { ref, vis } = useReveal();
  const categories = Object.keys(PARTNERS) as (keyof typeof PARTNERS)[];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={SEC}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={fade(vis)}>
          <p style={{ ...LBL, marginBottom: "1.25rem" }}>Partners</p>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(2rem,3.5vw,3rem)", color: "var(--c-ink)", lineHeight: 1.05, letterSpacing: "-0.01em" }}>Who I work with.</h2>
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

        <div className="partners-g" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(2.5rem,5vw,4rem)" }}>
          {categories.map((cat, ci) => (
            <div key={cat} style={fade(vis, 0.08 + ci * 0.08)}>
              <p style={{
                ...LBL, fontSize: "0.58rem", color: "var(--c-accent)",
                marginBottom: "1.1rem", paddingBottom: "0.75rem",
                borderBottom: "1px solid var(--c-border)",
              }}>{cat}</p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {PARTNERS[cat].map((name, i) => (
                  <p key={name} style={{
                    fontFamily: "var(--font-sans)", fontWeight: 400,
                    fontSize: "0.85rem", color: "var(--c-ink-mid)",
                    lineHeight: 1.5, padding: "0.55rem 0",
                    borderBottom: i < PARTNERS[cat].length - 1 ? "1px solid var(--c-border)" : "none",
                  }}>{name}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:760px){.partners-g{grid-template-columns:1fr!important;gap:2.5rem!important}}`}</style>
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
      <The1000 />
      <Research />
      <Partners />
      <Impact />
      <StartBusiness />
    </>
  );
}
