"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, X, Mic, Volume2, VolumeX } from "lucide-react";
import { useSpeech } from "@/hooks/useSpeech";

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
  opening: "Hi, I'm interested in The 1000 podcast and would like to explore how I can be involved.",
};
const PACK_GROUP = {
  key: "startup-pack",
  label: "Full Startup Advisory Pack",
  opening: "Hi, tell me about the Full Startup Advisory Pack — what's included and how it works.",
};
const POST_LAUNCH_REVIEW_GROUP = {
  key: "post-launch-review",
  label: "Post-Launch Review",
  opening: "Hi, tell me about the Post-Launch Review — I already have a product live and want it looked at.",
};
const EVENTS_GROUP = {
  key: "events-conferences",
  label: "Events & Conferences",
  opening: "Hi, I'm organizing or partnering on an event or conference and would like to discuss having Decra speak, participate, or partner.",
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
    <section id="hero" className="hero-sec" style={{ position: "relative", overflow: "hidden", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Background photo — wide studio shot on larger screens, portrait selfie on small screens */}
      <div aria-hidden className="hero-bg" style={{
        position: "absolute", inset: 0, backgroundSize: "cover", backgroundRepeat: "no-repeat", zIndex: 0,
      }} />
      {/* Dark overlay so text stays legible — deeper on mobile where the portrait shot needs more contrast */}
      <div aria-hidden className="hero-overlay" style={{ position: "absolute", inset: 0, zIndex: 1 }} />

      {/* Corner glows in brand teal + cream, echoing the reference mood boards but on-palette */}
      <div aria-hidden style={{
        position: "absolute", top: "-18%", left: "-14%", width: "min(60vw,620px)", height: "min(60vw,620px)",
        borderRadius: "50%", pointerEvents: "none", zIndex: 1,
        background: "radial-gradient(circle, #5FA98F 0%, transparent 70%)",
        opacity: 0.35, filter: "blur(40px)",
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: "-22%", right: "-16%", width: "min(65vw,680px)", height: "min(65vw,680px)",
        borderRadius: "50%", pointerEvents: "none", zIndex: 1,
        background: "radial-gradient(circle, #F0EEE9 0%, transparent 68%)",
        opacity: 0.12, filter: "blur(50px)",
      }} />

      <div id="hero-content" style={{
        position: "relative", zIndex: 2, width: "100%",
        display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center",
        padding: "0 var(--space-x)",
        paddingTop: "16vh",
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
            Technology Lawyer &amp; Product Counsel.
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

        /* Wide studio shot for larger screens — subject sits right-of-centre, copy hugs the left edge */
        .hero-bg { background-image: url('/decra-hero-wide.jpg'); background-position: 68% 22%; }
        /* No darkening over the face — the wash only picks up a little below it, on the right/lower two-thirds */
        .hero-overlay {
          background:
            linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0) 42%, rgba(10,10,10,0.5) 62%, rgba(10,10,10,0.75) 100%),
            linear-gradient(90deg, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.25) 38%, rgba(10,10,10,0) 55%);
        }

        /* Portrait selfie for smaller screens */
        @media (max-width: 640px) {
          #hero-content { align-items: center !important; justify-content: flex-end !important; padding-top: 0 !important; padding-bottom: 0.5rem; }
          .hero-copy { text-align: center !important; }
          .hero-bg { background-image: url('/decra-hero-mobile.jpg'); background-position: center 18%; }
          /* Overlay stays clear over the face, then goes a lot darker starting just past halfway down */
          .hero-overlay { background: linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0) 52%, rgba(10,10,10,0.92) 64%, rgba(10,10,10,0.97) 100%); }
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
    items: ["Data protection & ODPC compliance", "Data controller & processor licensing", "Cybersecurity law", "Digital commerce & platform regulation", "Licensing & policy engagement"],
    opening: "Hi, I need help with technology & regulatory law — data protection, data controller/processor licensing, cybersecurity, or digital commerce compliance.",
  },
  {
    id: "product-counsel",
    label: "Product Counsel",
    body: "Embedded legal partnership with your product and engineering team — in the room as things get built, not called in after they ship.",
    items: ["Pre-launch legal review", "Privacy-by-design & data flow review", "Intellectual property protection & licensing", "Terms of service & policy drafting", "Ongoing embedded advisory"],
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
              {s.id === "founder-advisory" && (
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent(OPEN_PARTNER_MODAL_EVENT, { detail: PACK_GROUP }))}
                  style={{
                    display: "block", background: "none", border: "none",
                    padding: 0, marginBottom: "1.5rem", cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
                    fontSize: "0.82rem", color: "var(--c-accent)",
                    textDecoration: "underline", textUnderlineOffset: "3px",
                    textDecorationColor: "var(--c-border)",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.textDecorationColor = "var(--c-accent)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.textDecorationColor = "var(--c-border)"}
                >
                  See the full Startup Advisory Pack →
                </button>
              )}
              {s.id === "product-counsel" && (
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent(OPEN_PARTNER_MODAL_EVENT, { detail: POST_LAUNCH_REVIEW_GROUP }))}
                  style={{
                    display: "block", background: "none", border: "none",
                    padding: 0, marginBottom: "1.5rem", cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
                    fontSize: "0.82rem", color: "var(--c-accent)",
                    textDecoration: "underline", textUnderlineOffset: "3px",
                    textDecorationColor: "var(--c-border)",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.textDecorationColor = "var(--c-accent)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.textDecorationColor = "var(--c-border)"}
                >
                  Already built? See Post-Launch Review →
                </button>
              )}
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

/* Full set offered inside the Partner modal picker — includes Events & Conferences,
   which is intentionally left off the "Who I work with" pill row on the homepage. */
const PARTNER_GROUPS = [...ENGAGE_GROUPS, EVENTS_GROUP];

const ENGAGE_SYSTEM = `You are Decra Kerubo's AI intake advisor on decrakerubo.com.
Decra is a Nairobi-based lawyer and computer scientist specialising in technology law and startup legal advisory in Kenya and East Africa.
She works with: startup founders needing incorporation, equity, co-founder agreements, eTIMS/KRA tax, fundraising, foreign branches, PBO registration; technology companies needing ODPC/data protection, product legal review, tech contracts; law firms needing tech law support or compliance; innovation ecosystem players — investors, incubators, and accelerators — seeking legal support or partnership; and event/conference organizers seeking Decra as a speaker, panelist, or partner.

The Full Startup Advisory Pack is a bundled engagement covering: company incorporation & structure, founder & co-founder agreements, equity/vesting/cap table setup, tax structuring (eTIMS, VAT, PAYE), fundraising legal readiness, and foreign branch/PBO registration — the complete legal foundation from formation through fundraising. If someone asks about "the pack" or the Full Startup Advisory Pack, briefly explain what's included in 2-3 sentences FIRST, before moving into intake questions.

Post-Launch Review is for products already live, not still being built — a one-time legal review covering compliance exposure, liability, privacy-by-design, terms of service, third-party/API integrations, and regulatory gaps, versus Product Counsel which is ongoing embedded support during the build itself. If someone asks about Post-Launch Review, briefly explain this distinction in 2-3 sentences FIRST, before moving into intake questions.

The 1000 is Decra's upcoming podcast on technology law in Africa, launching soon on Spotify — not yet live. If someone expresses interest in The 1000, first find out how they'd like to be involved (e.g. featured guest, topic suggestion, sponsor/partner, or just notified when it launches), then continue normal intake gathering name and email.

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
  const [voiceOn, setVoiceOn] = useState(false);
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

  const startGroup = async (groupKey: string, opening: string) => {
    setActive(groupKey); setMsgs([]); setDone(false); setInput(""); setLoading(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: opening, history: [], system: ENGAGE_SYSTEM }) });
      const data = await res.json();
      const reply = data.reply || "Something went wrong. Email hello@decrakerubo.com.";
      setMsgs([{ role: "assistant", text: reply }]);
      if (voiceOn) speak(reply);
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

  const closeModal = () => { setModalOpen(false); setActive(null); setMsgs([]); setDone(false); setInput(""); stopSpeaking(); };

  const send = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading || done) return;
    const userText = text; setInput("");
    const next = [...msgs, { role: "user" as const, text: userText }];
    setMsgs(next); setLoading(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, history: msgs, system: ENGAGE_SYSTEM }) });
      const data = await res.json();
      let reply: string = data.reply || "";
      if (reply.includes("<intake_complete>")) {
        const m = reply.match(/<intake_complete>([\s\S]*?)<\/intake_complete>/);
        if (m) { try { const p = JSON.parse(m[1].trim()); const ir = await fetch("/api/intake", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...p, engagement: active }) }); if (!ir.ok) console.error("Intake submission failed:", ir.status); } catch (err) { console.error("Intake submission error:", err); } }
        reply = reply.replace(/<intake_complete>[\s\S]*?<\/intake_complete>/, "").trim();
        setDone(true);
      }
      setMsgs([...next, { role: "assistant", text: reply }]);
      if (voiceOn) speak(reply);
    } catch { setMsgs([...next, { role: "assistant", text: "Something went wrong. Email hello@decrakerubo.com." }]); }
    setLoading(false);
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
                    {[...PARTNER_GROUPS, PRODUCT_COUNSEL_GROUP, SPOTIFY_GROUP, PACK_GROUP, POST_LAUNCH_REVIEW_GROUP].find(g => g.key === active)?.label}
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

/* ── Section 5: The 1000 ── */
const SpotifyLogo = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="#1DB954">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

function The1000() {
  const { ref, vis } = useReveal();
  return (
    <section id="spotify" ref={ref as React.RefObject<HTMLElement>} style={{
      minHeight: "clamp(560px,82vh,880px)",
      position: "relative", overflow: "hidden",
      display: "flex", alignItems: "flex-end",
    }}>
      <img src="/decra-spotify-portrait.png" alt="" className="spotify-img" style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover", objectPosition: "50% 22%", display: "block",
      }} />
      {/* Uniform dark wash over the whole photo, plus a stronger gradient pooling at the bottom behind the copy */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(10,10,10,0.4)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.55) 28%, rgba(10,10,10,0.08) 55%, transparent 72%)`,
      }} />


      <div className="spotify-content" style={{
        position: "relative", zIndex: 1, width: "100%",
        maxWidth: "var(--max-w)", margin: "0 auto",
        padding: "clamp(2.5rem,5vw,4.5rem) var(--space-x) clamp(4.5rem,8vw,7rem)",
        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
        ...fade(vis),
      }}>
        <div style={{ maxWidth: "26rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
            <SpotifyLogo />
            <p style={{
              fontFamily: "var(--font-manjari)", fontWeight: 700,
              fontSize: "0.55rem", letterSpacing: "0.24em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}>Podcast</p>
          </div>

          <p style={{
            fontFamily: "var(--font-sans)", fontWeight: 400,
            fontSize: "0.84rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.8,
            marginBottom: "2.25rem",
          }}>
            Technology Law in Africa
          </p>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent(OPEN_PARTNER_MODAL_EVENT, { detail: SPOTIFY_GROUP }))}
            style={lineBtn({ light: true })}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#5FA98F"; (e.currentTarget as HTMLElement).style.color = "#5FA98F"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)"; }}
          >
            Express Interest
          </button>
        </div>
      </div>

      {/* Coming soon — sits over the open photo, no card/background of its own */}
      <p style={{
        position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: "clamp(1.25rem,2.75vw,2rem)",
        zIndex: 1, margin: 0, textAlign: "center",
        fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300,
        fontSize: "clamp(1.35rem,2.6vw,1.9rem)", letterSpacing: "0.14em",
        color: "rgba(255,255,255,0.75)",
      }}>Coming soon</p>
      <style>{`
        @media(max-width:640px){
          #spotify p[style*="position: absolute"]{position:static!important;transform:none!important;margin-top:1.5rem!important;color:rgba(255,255,255,0.55)!important;}
          .spotify-img{ object-position: 50% 14% !important; }
          #spotify .spotify-content{ padding-left: 1.5rem !important; padding-right: 1.5rem !important; padding-bottom: clamp(3rem,10vw,4rem) !important; }
        }
      `}</style>
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
    partner: "In association with the Bevisioneers Mercedes-Benz Program",
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
    </>
  );
}
