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
      <div style={{
        position: "absolute", inset: 0,
        opacity: vis ? 1 : 0,
        transition: "opacity 1.4s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <img src="/decra-hero.jpg" alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "72% 28%", display: "block" }} />
      </div>
      <div style={{
        position: "absolute", inset: 0,
        background: `
          linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.2) 35%, transparent 55%),
          linear-gradient(to right, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.5) 38%, rgba(8,8,8,0.1) 62%, transparent 75%)
        `,
      }} />
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

/* ── Section 2.5: Research — minimal grid, no text beneath tiles ── */
type PaperStatus = "current" | "complete";

interface Paper {
  slug: string;
  tag: string;
  title: string;
  dates: string;
  status: PaperStatus;
  tile: { from: string; to: string; ink: string };
  span?: "wide" | "normal";
}

const PAPERS: Paper[] = [
  {
    slug: "democratization-decarbonization-ai",
    tag: "GREENER",
    title: "Democratization and Decarbonization of AI Solutions",
    dates: "May 2024 — Present",
    status: "current",
    tile: { from: "#C97B4A", to: "#1A1714", ink: "#F5EFE6" },
    span: "wide",
  },
  {
    slug: "merger-regulation-kenya",
    tag: "MARKETS",
    title: "Merger Regulation & Competition Law",
    dates: "Sep — Dec 2025",
    status: "complete",
    tile: { from: "#8C8073", to: "#2A2722", ink: "#F0EDE8" },
  },
  {
    slug: "ai-enabled-regulation",
    tag: "SAFETY",
    title: "AI-Enabled Regulation & Digital Safety",
    dates: "Aug 2023 — Apr 2024",
    status: "complete",
    tile: { from: "#41566B", to: "#0F1620", ink: "#EDEFF2" },
  },
  {
    slug: "cross-border-data-transfer",
    tag: "TRANSFER",
    title: "Cross-Border Data Transfer Laws",
    dates: "Jan — Nov 2022",
    status: "complete",
    tile: { from: "#B08D5B", to: "#241D12", ink: "#F5EFE2" },
  },
  {
    slug: "unbiased-hiring-algorithms",
    tag: "HIRING",
    title: "Unbiased Hiring Algorithms",
    dates: "Aug — Dec 2021",
    status: "complete",
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
        color: paper.tile.ink, lineHeight: 1,
        textShadow: "0 2px 18px rgba(0,0,0,0.25)",
      }}>
        {paper.tag}
      </span>
      {paper.status === "current" && (
        <span style={{
          position: "absolute", top: "1rem", left: "1.25rem",
          fontFamily: "var(--font-manjari)", fontWeight: 700,
          fontSize: "0.48rem", letterSpacing: "0.18em", textTransform: "uppercase",
          color: paper.tile.ink,
          border: `1px solid ${paper.tile.ink}`,
          padding: "0.2rem 0.5rem", opacity: 0.8,
        }}>
          Current
        </span>
      )}
      {/* Hover: show title */}
      <div className="paper-hover-title" style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex", alignItems: "flex-end",
        padding: "1.25rem",
        opacity: 0,
        transition: "opacity 0.3s",
      }}>
        <p style={{
          fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
          fontSize: "clamp(0.85rem,1.3vw,1rem)", color: "#F0EDE8", lineHeight: 1.35,
        }}>{paper.title}</p>
      </div>
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
      role="dialog" aria-modal="true" aria-label={paper.title}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(10,10,10,0.82)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(1rem,4vw,3.5rem)",
      }}
    >
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: "62rem", height: "100%", maxHeight: "92vh",
        background: "#1A1916", borderRadius: "4px", overflow: "hidden",
        display: "flex", flexDirection: "column",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1rem 1.5rem", borderBottom: "1px solid rgba(240,237,232,0.1)", flexShrink: 0,
        }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.95rem", color: "#F0EDE8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {paper.title}
            </p>
            <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(240,237,232,0.45)", marginTop: "0.2rem" }}>
              View only &nbsp;·&nbsp; {paper.dates}
            </p>
          </div>
          <button onClick={onClose} aria-label="Close" style={{
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(240,237,232,0.55)",
            fontFamily: "var(--font-manjari)", fontWeight: 700,
            fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase",
            padding: "0.5rem 0.75rem", flexShrink: 0, transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#F0EDE8"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(240,237,232,0.55)"}>
            Close ✕
          </button>
        </div>
        <div style={{ flex: 1, background: "#0A0A0A" }}>
          <iframe src={`/api/research/${paper.slug}#toolbar=0&navpanes=0`} title={paper.title}
            style={{ width: "100%", height: "100%", border: "none" }} />
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
        <div style={{ marginBottom: "clamp(2.5rem,4vw,3.5rem)", ...fade(vis) }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
            <p style={LBL}>Research</p>
            <p style={{ ...LBL, color: "var(--c-ink-muted)" }}>{PAPERS.length} papers &nbsp;·&nbsp; 2021 — Present</p>
          </div>
          <h2 style={{
            fontFamily: "var(--font-serif)", fontWeight: 400, fontStyle: "italic",
            fontSize: "clamp(2rem,4vw,3.2rem)",
            color: "var(--c-ink)", lineHeight: 1.05, letterSpacing: "-0.01em",
            marginTop: "1rem",
          }}>
            Law, AI & <span style={{ color: "var(--c-accent)" }}>Policy.</span>
          </h2>
        </div>

        {/* Pure image grid — hover reveals title */}
        <div className="rsc-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0.75rem",
        }}>
          {PAPERS.map((paper, i) => (
            <article key={paper.slug} style={{
              gridColumn: paper.span === "wide" ? "span 2" : "span 1",
              ...fade(vis, 0.06 + i * 0.06),
            }}>
              <button
                onClick={() => setActive(paper)}
                aria-label={`View ${paper.title}`}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  background: "none", border: "none", padding: 0, cursor: "pointer",
                  font: "inherit", color: "inherit",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget.querySelector(".paper-hover-title") as HTMLElement;
                  if (el) el.style.opacity = "1";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget.querySelector(".paper-hover-title") as HTMLElement;
                  if (el) el.style.opacity = "0";
                }}
              >
                <div className="rsc-tile" style={{
                  aspectRatio: paper.span === "wide" ? "21/9" : "3/4",
                  border: "1px solid var(--c-border-strong)",
                  transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                  overflow: "hidden",
                }}>
                  <PaperTile paper={paper} />
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>

      {active && <PaperViewer paper={active} onClose={() => setActive(null)} />}

      <style>{`
        .rsc-tile:hover { transform: translateY(-2px); }
        @media(max-width:900px) { .rsc-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media(max-width:600px) {
          .rsc-grid { grid-template-columns: 1fr !important; }
          .rsc-grid > article { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}


/* ── Section 3+7: Who I work with & How to work with Decra — unified ── */
type ChatMsg = { role: "user" | "assistant"; text: string };

const ENGAGE_GROUPS = [
  { key: "law-firms", label: "Law Firms", opening: "Hi, I represent a law firm interested in working with Decra on technology law advisory or compliance." },
  { key: "tech-firms", label: "Tech Firms", opening: "Hi, I work at a tech company and need support with regulatory compliance, data protection, or product legal review." },
  { key: "techpreneurs", label: "Techpreneurs", opening: "Hi, I'm a founder or builder looking for help with incorporation, equity, fundraising, or startup advisory." },
];

const ENGAGE_SYSTEM = `You are Decra Kerubo's AI intake advisor on decrakerubo.com.
Decra is a Nairobi-based lawyer and computer scientist specialising in technology law and startup legal advisory in Kenya and East Africa.
She works with: law firms needing tech law support or compliance; tech companies needing ODPC/data protection, product legal review, tech contracts; founders needing incorporation, equity, co-founder agreements, eTIMS/KRA tax, fundraising, foreign branches, PBO registration.
Your job: warm natural conversation, ONE question at a time. Gather over 4-6 exchanges: what they need, their context/stage, name, email.
If they mention NGO, nonprofit, or international branch, ask: PBO (local Kenyan entity) or foreign company branch?
Once done say exactly: "Perfect — I have everything Decra needs. She'll be in touch within 48 hours." Then on a new line:
<intake_complete>
{"name":"...","email":"...","summary":"2-3 sentence briefing for Decra"}
</intake_complete>
Style: 2 sentences per reply. Warm and direct. Never mention Anthropic, Claude, GitHub, or any AI company.`;

function WorkWithDecra() {
  const { ref, vis } = useReveal();
  const [active, setActive] = useState<string | null>(null);
  const [msgs, setMsgs] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  const startGroup = async (groupKey: string, opening: string) => {
    setActive(groupKey); setMsgs([]); setDone(false); setInput(""); setLoading(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: opening, history: [], system: ENGAGE_SYSTEM }) });
      const data = await res.json();
      setMsgs([{ role: "assistant", text: data.reply || "Something went wrong. Email hello@decrakerubo.com." }]);
    } catch { setMsgs([{ role: "assistant", text: "Something went wrong. Email hello@decrakerubo.com." }]); }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  const send = async () => {
    if (!input.trim() || loading || done) return;
    const userText = input.trim(); setInput("");
    const next = [...msgs, { role: "user" as const, text: userText }];
    setMsgs(next); setLoading(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, history: msgs, system: ENGAGE_SYSTEM }) });
      const data = await res.json();
      let reply: string = data.reply || "";
      if (reply.includes("<intake_complete>")) {
        const m = reply.match(/<intake_complete>([\s\S]*?)<\/intake_complete>/);
        if (m) { try { const p = JSON.parse(m[1].trim()); await fetch("/api/intake", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...p, engagement: active }) }); } catch {} }
        reply = reply.replace(/<intake_complete>[\s\S]*?<\/intake_complete>/, "").trim();
        setDone(true);
      }
      setMsgs([...next, { role: "assistant", text: reply }]);
    } catch { setMsgs([...next, { role: "assistant", text: "Something went wrong. Email hello@decrakerubo.com." }]); }
    setLoading(false);
  };

  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={SEC}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{ ...fade(vis), marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
          <p style={{ ...LBL, marginBottom: "1.25rem" }}>Collaborate</p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(2rem,3.5vw,3rem)", color: "var(--c-ink)", lineHeight: 1.05, letterSpacing: "-0.01em" }}>Who I work with.</h2>
        </div>
        <div className="wwd-g" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "clamp(3rem,6vw,6rem)", alignItems: "start" }}>
          <div style={fade(vis, 0.06)}>
            {ENGAGE_GROUPS.map((g, i) => {
              const isActive = active === g.key;
              return (
                <button key={g.key} onClick={() => startGroup(g.key, g.opening)} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", background: "none", border: "none",
                  borderBottom: "1px solid var(--c-border)", padding: "1.25rem 0",
                  cursor: "pointer", textAlign: "left",
                  opacity: vis ? 1 : 0, transition: `opacity 0.6s ease ${0.08 + i * 0.08}s`,
                }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.2rem,2vw,1.5rem)", color: isActive ? "var(--c-ink)" : "var(--c-ink-mid)", transition: "color 0.2s" }}>{g.label}</span>
                  <ArrowRight size={14} strokeWidth={1.5} style={{ color: isActive ? "var(--c-accent)" : "var(--c-ink-muted)", transform: isActive ? "rotate(-45deg)" : "none", transition: "transform 0.3s, color 0.2s", flexShrink: 0 } as React.CSSProperties} />
                </button>
              );
            })}
            <p style={{ ...BODY, fontSize: "0.78rem", marginTop: "1.5rem" }}>Select your group — the AI will ask a few questions so Decra can reach out with exactly what you need.</p>
          </div>
          <div style={{ ...fade(vis, 0.12), border: "1px solid var(--c-border)", minHeight: "22rem", display: "flex", flexDirection: "column" }}>
            {!active ? (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 2rem", textAlign: "center" }}>
                <p style={{ ...LBL, marginBottom: "0.75rem" }}>How to work with Decra</p>
                <p style={{ ...BODY, fontSize: "0.82rem", maxWidth: "20rem" }}>Select a group on the left — the AI will guide you through a short conversation so Decra can reach out with exactly what you need.</p>
              </div>
            ) : (
              <>
                <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", maxHeight: "28rem" }}>
                  {msgs.map((m, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                      <div style={{ maxWidth: "80%", padding: "0.7rem 1rem", background: m.role === "user" ? "var(--c-accent)" : "var(--c-surface)", color: m.role === "user" ? "#0A0A0A" : "var(--c-ink)", fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.84rem", lineHeight: 1.7 }}>{m.text}</div>
                    </div>
                  ))}
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
                    <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }}} placeholder="Type your reply…" style={{ flex: 1, background: "none", border: "none", outline: "none", fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.875rem", color: "var(--c-ink)" }} />
                    <button onClick={send} disabled={!input.trim() || loading} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.25rem", opacity: input.trim() ? 1 : 0.3, transition: "opacity 0.2s", color: "var(--c-ink)", display: "flex", alignItems: "center" }}>
                      <ArrowRight size={15} strokeWidth={1.5} />
                    </button>
                  </div>
                ) : (
                  <div style={{ borderTop: "1px solid var(--c-border)", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ ...LBL, color: "var(--c-accent)", fontSize: "0.52rem" }}>Message sent to Decra</p>
                    <button onClick={() => { setActive(null); setMsgs([]); setDone(false); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.52rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--c-ink-muted)", transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"}>Start over</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:760px){.wwd-g{grid-template-columns:1fr!important;gap:2rem!important}}@keyframes dot-pulse{0%,100%{opacity:0.3;transform:translateY(0)}50%{opacity:1;transform:translateY(-3px)}}`}</style>
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
      position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center",
    }}>
      <img src="/decra-spotify-bg.jpg" alt="" style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover", objectPosition: "center 22%",
        opacity: 1, zIndex: 0, pointerEvents: "none", display: "block",
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: `radial-gradient(ellipse 72% 88% at 50% 42%, transparent 0%, rgba(15,51,32,0.55) 52%, rgba(15,51,32,0.92) 72%, #0F3320 90%)`,
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: `linear-gradient(to bottom, #0F3320 0%, transparent 14%, transparent 86%, #0F3320 100%)`,
      }} />
      <div style={{
        maxWidth: "var(--max-w)", margin: "0 auto", width: "100%",
        padding: "clamp(5rem,9vw,9rem) var(--space-x)",
        position: "relative", zIndex: 3,
        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
        opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)",
        transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: "1.5rem", textDecoration: "none", transition: "filter 0.25s", filter: "none",
        }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.filter = "opacity(0.7)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter = "none"}>
          <SpotifyLogo />
          <p style={{
            fontFamily: "'Circular Std', 'Circular', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 700, fontSize: "clamp(2.5rem,5vw,4.5rem)",
            color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1,
          }}>The 1000</p>
          <p style={{
            fontFamily: "var(--font-sans)", fontWeight: 400,
            fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em",
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }} className="sb-g">
          <div style={{ padding: "3.5rem", background: "#0D0D0D", ...fade(vis) }}>
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
              padding: "0.8rem 1.6rem", textDecoration: "none", transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#D4B87A"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--c-accent)"}>
              Start here <ArrowRight size={11} strokeWidth={1.5} />
            </Link>
          </div>

          <div style={{ padding: "3.5rem", background: "#0F3320", ...fade(vis, 0.12) }}>
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
      <WorkWithDecra />
      <Impact />
      <StartBusiness />
    </>
  );
}
