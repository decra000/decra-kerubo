"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

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
  fontFamily: "var(--font-serif)", fontWeight: 400,
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

/* Shared AI-intake modal trigger — used by Hero, Services, and Who I Work With */
const OPEN_PARTNER_MODAL_EVENT = "decra:open-partner-modal";
const PRODUCT_COUNSEL_GROUP = {
  key: "product-counsel",
  label: "Technical Product Counsel",
  opening: "Hi, I'd like to retain Decra as embedded Technical Product Counsel for my product and engineering team.",
};
const SPOTIFY_GROUP = {
  key: "the-1000",
  label: "The 1000 — Podcast",
  opening: "Hi, I'd like to be notified when The 1000 launches on Spotify.",
};

/* Shared "line button" style — outline only, no fill, used for every CTA on the page */
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
    <section style={{ height: "100svh", position: "relative", overflow: "hidden", background: "#0A0A0A" }}>
      <div style={{
        position: "absolute", inset: 0,
        opacity: vis ? 1 : 0,
        transition: "opacity 1.4s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <img src="/decra-cover.jpg" alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 38%", display: "block" }} />
      </div>
      <div style={{
        position: "absolute", inset: 0,
        background: `
          linear-gradient(to top, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.4) 32%, rgba(10,10,10,0.05) 55%, transparent 72%),
          linear-gradient(to right, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.3) 40%, transparent 65%)
        `,
      }} />
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        display: "flex", alignItems: "center",
        padding: "0 var(--space-x)",
        maxWidth: "calc(var(--max-w) + (var(--space-x) * 2))", margin: "0 auto",
        pointerEvents: "none",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(14px)",
        transition: "opacity 1.1s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.3s",
      }}>
        <div style={{ maxWidth: "22rem", pointerEvents: "auto" }}>
          <h1 style={{
            fontFamily: "var(--font-serif)", fontWeight: 400,
            fontSize: "clamp(1.75rem,3vw,2.5rem)", color: "#F0EEE9",
            lineHeight: 1.15, letterSpacing: "-0.01em", marginBottom: "1.75rem",
          }}>
            Technology Lawyer &amp; Product Counsel.
          </h1>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent(OPEN_PARTNER_MODAL_EVENT, { detail: PRODUCT_COUNSEL_GROUP }))}
            style={lineBtn({ light: true })}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#C4A06A"; (e.currentTarget as HTMLElement).style.color = "#C4A06A"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)"; }}
          >
            Retain as Technical Product Counsel
          </button>
        </div>
      </div>
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "3.5rem var(--space-x) 5rem",
        maxWidth: "calc(var(--max-w) + (var(--space-x) * 2))", margin: "0 auto",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(22px)",
        transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.45s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.45s",
      }}>
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
          <Link href="/#collaborate" style={{
            fontFamily: "var(--font-manjari)", fontWeight: 700,
            fontSize: "0.52rem", letterSpacing: "0.24em", textTransform: "uppercase",
            color: "rgba(196,160,106,0.8)", textDecoration: "none", transition: "color 0.25s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#C4A06A"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(196,160,106,0.8)"}>
            Collaborate
          </Link>
        </div>
      </div>
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
          ...fade(vis),
        }}>
          I am a technology lawyer and product counsel with a dual degree in Computer Science (AI) and Law. I help founders, startups, and technology companies navigate regulation while building products that scale safely.
        </p>
      </div>
    </section>
  );
}

/* ── Section 2: Services ── */
const SERVICES = [
  {
    id: "regulatory",
    label: "Technology & Regulatory Law",
    body: "The legal architecture technology companies operate inside — Kenyan and pan-African regulation, translated into clear positions.",
    items: ["Data protection & ODPC compliance", "Cybersecurity law", "Digital commerce & platform regulation", "Licensing & policy engagement"],
    opening: "Hi, I need help with technology & regulatory law — data protection, cybersecurity, or digital commerce compliance.",
  },
  {
    id: "product-counsel",
    label: "Product Counsel",
    body: "Embedded legal partnership with your product and engineering team — in the room as things get built, not called in after they ship.",
    items: ["Pre-launch legal review", "Privacy-by-design & data flow review", "Terms of service & policy drafting", "Ongoing embedded advisory"],
    opening: PRODUCT_COUNSEL_GROUP.opening,
  },
  {
    id: "founder-advisory",
    label: "Founder & Startup Advisory",
    body: "Practical legal guidance for founders and builders making fast decisions with real, lasting consequences.",
    items: ["Company incorporation & structure", "Founder & co-founder agreements", "Equity, vesting & cap table", "Tax structuring (eTIMS, VAT, PAYE)", "Fundraising legal readiness", "Foreign branches & PBO registration"],
    opening: "Hi, I'm a founder looking for legal advisory — incorporation, equity, tax structuring, fundraising readiness, or setting up a foreign branch or PBO.",
  },
];

function Services() {
  const { ref, vis } = useReveal();

  return (
    <section id="services" ref={ref as React.RefObject<HTMLElement>} style={{ ...SEC, borderTop: "none" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <p style={{ ...LBL, marginBottom: "1.5rem", ...fade(vis) }}>Services</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0" }} className="svc-grid">
          {SERVICES.map((s, i) => (
            <div key={s.id} style={{
              padding: "2.25rem 2rem",
              borderTop: "1px solid var(--c-border)",
              borderLeft: i > 0 ? "1px solid var(--c-border)" : "none",
              ...fade(vis, 0.06 * i),
            }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(1.05rem,1.6vw,1.3rem)", color: "var(--c-ink)", lineHeight: 1.25, marginBottom: "1rem" }}>{s.label}</h3>
              <p style={{ ...BODY, fontSize: "0.84rem", marginBottom: "1.5rem" }}>{s.body}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
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
                  fontSize: "0.58rem", letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "var(--c-ink-muted)", transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"; }}
              >
                Discuss this <ArrowRight size={10} strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.svc-grid{grid-template-columns:1fr!important}.svc-grid>div{border-left:none!important;border-top:1px solid var(--c-border)!important}}`}</style>
    </section>
  );
}

/* ── Section 3+7: Who I work with & How to work with Decra — unified ── */
type ChatMsg = { role: "user" | "assistant"; text: string };

const ENGAGE_GROUPS = [
  { key: "startup-founders", label: "Startup Founders", opening: "Hi, I'm a founder or builder looking for help with incorporation, equity, fundraising, or startup advisory." },
  { key: "technology-companies", label: "Technology Companies", opening: "Hi, I work at a tech company and need support with regulatory compliance, data protection, or product legal review." },
  { key: "law-firms", label: "Law Firms", opening: "Hi, I represent a law firm interested in working with Decra on technology law advisory or compliance." },
  { key: "innovation-ecosystems", label: "Innovation Ecosystems", opening: "Hi, I'm with an investor, incubator, accelerator, or ecosystem body and would like to discuss legal support or partnership opportunities." },
];

const ENGAGE_SYSTEM = `You are Decra Kerubo's AI intake advisor on decrakerubo.com.
Decra is a Nairobi-based lawyer and computer scientist specialising in technology law and startup legal advisory in Kenya and East Africa.
She works with: startup founders needing incorporation, equity, co-founder agreements, eTIMS/KRA tax, fundraising, foreign branches, PBO registration; technology companies needing ODPC/data protection, product legal review, tech contracts; law firms needing tech law support or compliance; and innovation ecosystem players — investors, incubators, accelerators, and event organizers — seeking legal support, partnership, or speaking engagements.
Your job: warm natural conversation, ONE question at a time. Gather over 4-6 exchanges: what they need, their context/stage, name, email.
If they mention NGO, nonprofit, or international branch, ask: PBO (local Kenyan entity) or foreign company branch?
Once done say exactly: "Perfect — I have everything Decra needs. She'll be in touch within 48 hours." Then on a new line:
<intake_complete>
{"name":"...","email":"...","summary":"2-3 sentence briefing for Decra"}
</intake_complete>
Style: 2 sentences per reply. Warm and direct. Never mention Anthropic, Claude, GitHub, or any AI company.`;

function WorkWithDecra() {
  const { ref, vis } = useReveal();
  const [selected, setSelected] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [msgs, setMsgs] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prevOverflow; };
  }, [modalOpen]);

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

  const closeModal = () => { setModalOpen(false); setActive(null); setMsgs([]); setDone(false); setInput(""); };

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
          <button
            onClick={openPartnerModal}
            style={lineBtn()}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"}
          >
            Partner
            <ArrowRight size={12} strokeWidth={1.5} />
          </button>
        </div>
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
                    {[...ENGAGE_GROUPS, PRODUCT_COUNSEL_GROUP].find(g => g.key === active)?.label}
                  </p>
                )}
              </div>
              <button onClick={closeModal} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--c-ink-muted)", display: "flex", padding: "0.25rem" }}>
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {!active ? (
              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <p style={{ ...BODY, fontSize: "0.82rem", marginBottom: "0.5rem" }}>Tell me a bit about who you are, so I can point you the right way:</p>
                {ENGAGE_GROUPS.map(g => (
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
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(5rem,12vw,11rem)", color: "var(--c-ink)", lineHeight: 1 }}>
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
      <img src="/decra-spotify-portrait.png" alt="" style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover", objectPosition: "50% 30%",
        opacity: 1, zIndex: 0, pointerEvents: "none", display: "block",
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: `radial-gradient(ellipse 72% 88% at 50% 42%, transparent 0%, rgba(15,51,32,0.45) 55%, rgba(15,51,32,0.88) 75%, #0F3320 92%)`,
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.75rem" }}>
          <SpotifyLogo />
          <div>
            <p style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 400, fontSize: "clamp(2.5rem,4.6vw,4rem)",
              color: "#FFFFFF", letterSpacing: "-0.01em", lineHeight: 1,
              fontStyle: "italic",
            }}>The 1000</p>
          </div>
          <p style={{
            fontFamily: "var(--font-manjari)", fontWeight: 700,
            fontSize: "0.68rem", letterSpacing: "0.24em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)",
          }}>Technology law in Africa &nbsp;&middot;&nbsp; on Spotify</p>

          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginTop: "0.75rem" }}>
            <span style={{ width: "2.25rem", height: "1px", background: "rgba(196,160,106,0.5)", display: "block" }} />
            <span style={{
              fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
              fontSize: "0.95rem", letterSpacing: "0.03em",
              color: "#C4A06A",
            }}>Coming soon</span>
            <span style={{ width: "2.25rem", height: "1px", background: "rgba(196,160,106,0.5)", display: "block" }} />
          </div>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent(OPEN_PARTNER_MODAL_EVENT, { detail: SPOTIFY_GROUP }))}
            style={{ ...lineBtn({ light: true }), marginTop: "1.5rem" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#C4A06A"; (e.currentTarget as HTMLElement).style.color = "#C4A06A"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)"; }}
          >
            Express Interest
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── Section 7: Research ── */
type PaperStatus = "current" | "complete";
interface Paper {
  slug: string;
  title: string;
  partner: string;
  dates: string;
  status: PaperStatus;
}

const PAPERS: Paper[] = [
  {
    slug: "democratization-decarbonization-ai",
    title: "Democratization and Decarbonization of AI Solutions",
    partner: "In association with the Visionaries Mercedes-Benz Program",
    dates: "May 2024 — Present",
    status: "current",
  },
  {
    slug: "merger-regulation-kenya",
    title: "Merger Regulation & Competition Law",
    partner: "In association with the Kenya School of Law",
    dates: "Sep — Dec 2025",
    status: "complete",
  },
  {
    slug: "ai-enabled-regulation",
    title: "AI-Enabled Regulation & Digital Safety",
    partner: "In association with the African Leadership University",
    dates: "Aug 2023 — Apr 2024",
    status: "complete",
  },
  {
    slug: "cross-border-data-transfer",
    title: "Cross-Border Data Transfer Laws",
    partner: "In association with Africa Nazarene University",
    dates: "Jan — Nov 2022",
    status: "complete",
  },
  {
    slug: "unbiased-hiring-algorithms",
    title: "Unbiased Hiring Algorithms",
    partner: "In association with the United Nations Academic Impact",
    dates: "Aug — Dec 2021",
    status: "complete",
  },
];

function PaperViewer({ paper, onClose }: { paper: Paper; onClose: () => void }) {
  const [status, setStatus] = useState<"checking" | "ready" | "missing">("checking");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  useEffect(() => {
    let cancelled = false;
    setStatus("checking");
    fetch(`/api/research/${paper.slug}`, { method: "HEAD" })
      .then(res => { if (!cancelled) setStatus(res.ok ? "ready" : "missing"); })
      .catch(() => { if (!cancelled) setStatus("missing"); });
    return () => { cancelled = true; };
  }, [paper.slug]);

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
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.95rem", color: "#F0EDE8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
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
          {status === "ready" && (
            <iframe src={`/api/research/${paper.slug}#toolbar=0&navpanes=0`} title={paper.title}
              style={{ width: "100%", height: "100%", border: "none" }} />
          )}
          {status === "missing" && (
            <div style={{
              width: "100%", height: "100%",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              textAlign: "center", padding: "2rem",
            }}>
              <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.15rem", color: "#F0EDE8", marginBottom: "0.75rem" }}>
                Check back soon.
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.8rem", color: "rgba(240,237,232,0.5)", lineHeight: 1.7, maxWidth: "26rem" }}>
                This paper is being prepared for publication and isn&apos;t available to view just yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResearchSection() {
  const { ref, vis } = useReveal();
  const [active, setActive] = useState<Paper | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <section id="research" ref={ref as React.RefObject<HTMLElement>} style={{ ...SEC, textAlign: "center" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", ...fade(vis) }}>
        <button
          onClick={() => setOpen(o => !o)}
          style={{ ...lineBtn(), padding: "1rem 2.25rem" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"}
        >
          Explore Research <ArrowRight size={12} strokeWidth={1.5} style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform 0.25s ease" }} />
        </button>

        <div style={{
          maxHeight: open ? "90rem" : "0px",
          opacity: open ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.45s ease",
          marginTop: open ? "2.5rem" : "0px",
        }}>
          <p style={{ ...LBL, textAlign: "left", marginBottom: "1.5rem" }}>Research</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0" }} className="rsc-grid">
            {PAPERS.map((paper, i) => (
              <button
                key={paper.slug}
                onClick={() => setActive(paper)}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  background: "none", border: "none", cursor: "pointer",
                  padding: "1.75rem 1.25rem",
                  borderTop: "1px solid var(--c-border)",
                  borderLeft: i > 0 ? "1px solid var(--c-border)" : "none",
                }}
              >
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.65rem", color: "var(--c-ink-muted)", display: "block", marginBottom: "1rem" }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 style={{
                  fontFamily: "var(--font-serif)", fontWeight: 400,
                  fontSize: "0.85rem", color: "var(--c-ink)", lineHeight: 1.3,
                  marginBottom: "0.6rem",
                }}>{paper.title}</h3>
                <p style={{
                  fontFamily: "var(--font-sans)", fontWeight: 400,
                  fontSize: "0.66rem", color: "var(--c-ink-muted)", lineHeight: 1.5,
                }}>{paper.partner}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {active && <PaperViewer paper={active} onClose={() => setActive(null)} />}
      <style>{`@media(max-width:900px){.rsc-grid{grid-template-columns:repeat(2,1fr)!important}.rsc-grid>button:nth-child(odd){border-left:none!important}.rsc-grid>button:nth-child(n+3){border-top:1px solid var(--c-border)!important}}@media(max-width:560px){.rsc-grid{grid-template-columns:1fr!important}.rsc-grid>button{border-left:none!important;border-top:1px solid var(--c-border)!important}}`}</style>
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
    detail: "Bachelor of Laws (LLB) / Juris Doctor",
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
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(12px)",
        transition: `opacity 0.6s ease ${0.05 + i * 0.06}s, transform 0.6s ease ${0.05 + i * 0.06}s`,
      }}>
      <div style={{
        height: logoHeight,
        display: "flex", alignItems: "center",
        marginBottom: "1rem",
        position: "relative",
      }}>
        <img
          src={c.src}
          alt={c.name}
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
  );
}

function Accreditations() {
  const { ref, vis } = useReveal();
  // Two rows of four — the two degree-granting institutions lead each row, rest follow by tier.
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
        @media(max-width:480px){.cred-grid{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}

/* ── Section 9+10: Editorial break with social icons overlaid ── */
function EditorialBreak() {
  const { ref, vis } = useReveal();

  const socials = [
    {
      label: "Instagram",
      url: "https://instagram.com/decrakerubo",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/decra/",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
    },
    {
      label: "Spotify",
      url: "https://open.spotify.com",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      ),
    },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{
      height: "clamp(280px, 40vh, 480px)",
      position: "relative", overflow: "hidden", background: "#0A0A0A",
    }}>
      <img src="/decra-texture.jpg" alt="" style={{
        width: "100%", height: "100%",
        objectFit: "cover", objectPosition: "center 40%",
        display: "block",
        filter: "saturate(0.75)",
        opacity: vis ? 0.85 : 0,
        transform: vis ? "scale(1)" : "scale(1.04)",
        transition: "opacity 1.4s cubic-bezier(0.16,1,0.3,1), transform 1.6s cubic-bezier(0.16,1,0.3,1)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(10,10,10,0.15) 0%, transparent 25%, transparent 75%, rgba(10,10,10,0.25) 100%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center",
        justifyContent: "center", gap: "2rem", flexWrap: "wrap",
      }}>
        {socials.map(({ label, url, icon }, i) => (
          <a key={label} href={url} target="_blank" rel="noopener noreferrer"
            aria-label={label}
            style={{
              color: "rgba(240,238,233,0.75)",
              textDecoration: "none",
              lineHeight: 0, display: "block",
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(14px)",
              transition: `opacity 0.6s ease ${0.15 + i * 0.08}s, transform 0.6s ease ${0.15 + i * 0.08}s, color 0.2s`,
            } as React.CSSProperties}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#F0EEE9"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(240,238,233,0.75)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
            {icon}
          </a>
        ))}
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
      <Accreditations />
      <The1000 />
      <WorkWithDecra />
      <Impact />
      <EditorialBreak />
    </>
  );
}
