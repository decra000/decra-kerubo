"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Send } from "lucide-react";

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
  fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase",
  color: "var(--c-ink-muted)",
};
const SERIF = (sz = "clamp(2rem,3.5vw,3rem)"): React.CSSProperties => ({
  fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
  fontSize: sz, color: "var(--c-ink)", lineHeight: 1.05,
});
const BODY: React.CSSProperties = {
  fontFamily: "var(--font-sans)", fontWeight: 400,
  fontSize: "0.9rem", color: "var(--c-ink-mid)", lineHeight: 1.85,
};
const SEC: React.CSSProperties = {
  borderTop: "1px solid var(--c-border)",
  padding: "var(--space-section) var(--space-x)",
};

const inp: React.CSSProperties = {
  width: "100%", background: "none", border: "none",
  borderBottom: "1px solid var(--c-border)",
  padding: "0.8rem 0", fontFamily: "var(--font-sans)", fontWeight: 400,
  fontSize: "0.9rem", color: "var(--c-ink)", outline: "none",
  transition: "border-color 0.2s",
};

/* ── AI Intake Chat ───
   Same pattern as /app/start: a short, AI-led conversation that asks one
   question at a time, gathers only what's needed for THIS engagement type,
   then summarises and posts to Decra — no long static form up front.
*/
type ChatStage = "intro" | "chat" | "confirm" | "done";
type Msg = { role: "user" | "assistant"; text: string };

function buildSystemPrompt(engagement: string, focusFields: string, openingContext: string) {
  return `You are Decra Kerubo's intake advisor on decrakerubo.com/partner, helping with a "${engagement}" inquiry.

${openingContext}

Your sole purpose: ask a small number of well-targeted questions — never an overwhelming list — to gather exactly what Decra needs to follow up well, then hand it to her.

Rules:
1. Ask ONE question at a time — never list multiple at once.
2. Gather over 3-5 natural exchanges: ${focusFields}, plus their name and email at the end.
3. Keep it tight — skip anything you can reasonably infer, and never ask more than necessary.
4. Once you have enough, say exactly: "Got it — here's what I'll send Decra:" then on a new line write a short 2-4 sentence plain-language summary (no headers, no bullet points) of what you learned, ending with their name and email. Then on a new line add this block:
<intake_complete>
{
  "name": "...",
  "email": "...",
  "summary": "2-4 sentence briefing for Decra, written in plain prose"
}
</intake_complete>

Style: 1-2 sentences per reply. Warm, direct, professional. Never mention Anthropic, Claude, or any AI company.`;
}

const ENGAGEMENT_CONFIG: Record<string, { greeting: string; system: string }> = {
  speak: {
    greeting: "Hi, I'd like to book Decra to speak.",
    system: buildSystemPrompt(
      "speaking engagement",
      "what the event/format is (keynote, panel, workshop, lecture, podcast), the topic or theme they have in mind, the audience size and type, and the date or timeframe",
      "Decra speaks on technology law in Africa — data privacy, AI regulation, startup compliance, and related topics — at keynotes, panels, workshops, corporate trainings, university lectures, and podcasts."
    ),
  },
  compliance: {
    greeting: "Hi, I need a tech law compliance review.",
    system: buildSystemPrompt(
      "compliance review",
      "what kind of product or platform it is, what specifically they're worried about (e.g. privacy, terms of service, third-party integrations, a pre-launch audit), and roughly how large/mature the company or product is",
      "Decra performs systematic legal reviews of technology products and platforms — pre-launch audits, product liability, privacy-by-design, ToS/privacy policy drafting, API/third-party integration review, and regulatory gap analysis — delivered as a written report."
    ),
  },
  startup: {
    greeting: "Hi, I want to start my business with Decra.",
    system: `You are Decra Kerubo's business advisory AI on decrakerubo.com/partner.
Decra is a Nairobi-based lawyer and computer scientist specialising in technology law and startup advisory in Kenya and East Africa.

She helps with: company incorporation and structure, equity/vesting/co-founder agreements, tax compliance (eTIMS, KRA, VAT, PAYE), foreign company branch registration in Kenya, Public Benefit Organization (PBO) registration, international expansion into East Africa, and fundraising readiness.

Your sole purpose: understand where a potential client is in their journey and what they need, then collect enough information to send Decra a clear briefing.

Rules:
1. Ask ONE question at a time — never list multiple at once.
2. Gather over 3-5 natural exchanges: what they're building, what country they're in, what stage (idea / pre-incorporation / incorporated / fundraising / expanding), their main need, their name, their email.
3. If they mention NGO, nonprofit, foundation, or international branch — clarify whether they need a PBO (local Kenyan entity) or a foreign branch registration.
4. Once you have enough, say exactly: "Got it — here's what I'll send Decra:" then a short 2-4 sentence plain-language summary, then on a new line:
<intake_complete>
{"name": "...", "email": "...", "stage": "...", "summary": "2-4 sentence briefing for Decra"}
</intake_complete>

Style: 1-2 sentences per reply. Warm, direct, professional. Never mention Anthropic, Claude, or any AI company.`,
  },
  entrora: {
    greeting: "Hi, I'm interested in tech development through Entrora.",
    system: buildSystemPrompt(
      "tech development inquiry (Entrora Systems)",
      "what they want built or fixed (AI document systems, legal-tech product, compliant AI feature, AI governance advisory), what stage it's at (idea, in progress, needs an audit), and any compliance constraints they already know about",
      "Entrora Systems is Decra's AI engineering practice — AI document systems, legal-tech development, compliant AI products, AI adoption advisory, regulatory sandbox navigation, and AI governance frameworks. The lawyer and the engineer are the same person, so legal compliance is built into the build itself."
    ),
  },
};

function IntakeChat({ engagement, formSubject }: { engagement: string; formSubject: string }) {
  const [stage, setStage] = useState<ChatStage>("intro");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const config = ENGAGEMENT_CONFIG[engagement];

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);
  useEffect(() => { if (stage === "chat") setTimeout(() => inputRef.current?.focus(), 200); }, [stage]);

  const cleanReply = (text: string) => text.replace(/<intake_complete>[\s\S]*?<\/intake_complete>/g, "").trim();

  const checkForCompletion = async (reply: string) => {
    const match = reply.match(/<intake_complete>([\s\S]*?)<\/intake_complete>/);
    if (!match) return;
    try {
      const data = JSON.parse(match[1].trim());
      await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, engagement }),
      });
      setStage("done");
    } catch (e) {
      console.error("intake parse error", e);
    }
  };

  const startChat = async () => {
    setStage("chat");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: config.greeting, history: [], system: config.system }),
      });
      const d = await res.json();
      const reply = d.reply || "Hi — tell me a bit more about what you need.";
      setMsgs([{ role: "assistant", text: cleanReply(reply) }]);
      checkForCompletion(reply);
    } catch {
      setMsgs([{ role: "assistant", text: "Hi — tell me a bit more about what you need." }]);
    } finally { setLoading(false); }
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const newMsgs: Msg[] = [...msgs, { role: "user", text }];
    setMsgs(newMsgs);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: msgs, system: config.system }),
      });
      const d = await res.json();
      const reply = d.reply || "Could you say a bit more about that?";
      setMsgs([...newMsgs, { role: "assistant", text: cleanReply(reply) }]);
      checkForCompletion(reply);
    } catch {
      setMsgs([...newMsgs, { role: "assistant", text: "Something went wrong — email hello@decrakerubo.com directly." }]);
    } finally { setLoading(false); }
  };

  if (stage === "intro") {
    return (
      <div style={{ border: "1px solid var(--c-border)", padding: "2.5rem" }}>
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1rem", color: "var(--c-ink)", marginBottom: "0.5rem" }}>Ready?</p>
        <p style={{ ...BODY, fontSize: "0.85rem", marginBottom: "2rem" }}>
          A couple of quick questions — Decra reviews every inquiry personally.
        </p>
        <button onClick={startChat} style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          fontFamily: "var(--font-manjari)", fontWeight: 700,
          fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
          color: "var(--c-bg)", background: "var(--c-ink)",
          padding: "0.85rem 1.75rem", border: "none", cursor: "pointer",
          transition: "background 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--c-accent)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--c-ink)"}>
          {formSubject} <Send size={11} strokeWidth={1.5} />
        </button>
      </div>
    );
  }

  if (stage === "done") {
    return (
      <div style={{ border: "1px solid var(--c-border)", padding: "2.5rem" }}>
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.2rem", color: "var(--c-accent)", marginBottom: "0.6rem" }}>Message received.</p>
        <p style={{ ...BODY, fontSize: "0.85rem" }}>Decra has your briefing and will be in touch within 48 hours.</p>
      </div>
    );
  }

  return (
    <div style={{ border: "1px solid var(--c-border)" }}>
      <div style={{
        padding: "1rem 1.4rem", borderBottom: "1px solid var(--c-border)",
        display: "flex", alignItems: "center", gap: "0.75rem",
      }}>
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.85rem", color: "var(--c-ink)" }}>Decra's advisor</p>
      </div>

      <div style={{ minHeight: "220px", maxHeight: "340px", overflowY: "auto", padding: "1.4rem", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%" }}>
            {m.role === "assistant" && (
              <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.58rem", color: "var(--c-accent)", marginBottom: "0.25rem" }}>Advisor</p>
            )}
            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.84rem", lineHeight: 1.7, color: m.role === "user" ? "var(--c-ink)" : "var(--c-ink-mid)" }}>{m.text}</p>
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: "flex-start" }}>
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.58rem", color: "var(--c-accent)", marginBottom: "0.25rem" }}>Advisor</p>
            <div style={{ display: "flex", gap: "4px" }}>
              {[0, 1, 2].map(j => <span key={j} style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--c-ink-muted)", animation: `bd 1.2s ease ${j * 0.2}s infinite` }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: "flex", borderTop: "1px solid var(--c-border)" }}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Type your reply..."
          style={{ flex: 1, background: "none", border: "none", padding: "0.9rem 1.1rem", fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.84rem", color: "var(--c-ink)", outline: "none" }}
        />
        <button onClick={send} disabled={loading || !input.trim()} style={{
          background: "none", border: "none", borderLeft: "1px solid var(--c-border)",
          cursor: input.trim() ? "pointer" : "default",
          color: input.trim() ? "var(--c-accent)" : "var(--c-ink-muted)",
          padding: "0 1.1rem", lineHeight: 0, transition: "color 0.2s",
        }}>
          <Send size={13} strokeWidth={1.5} />
        </button>
      </div>
      <style>{`@keyframes bd { 0%,100%{opacity:0.25}50%{opacity:1} }`}</style>
    </div>
  );
}

/* ── Hero ── */
function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);

  const anchors = [
    { label: "Speak", href: "#speak" },
    { label: "Compliance review", href: "#compliance" },
    { label: "Start a business", href: "#startup" },
    { label: "Tech development", href: "#entrora" },
    { label: "Get in touch", href: "#talk" },
  ];

  return (
    <section style={{
      minHeight: "55svh", background: "var(--c-bg)",
      display: "flex", alignItems: "flex-end",
      padding: "0 var(--space-x) 5rem", paddingTop: "10rem",
    }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", width: "100%" }}>
        <div style={fade(vis)}>
          <p style={{ ...LBL, marginBottom: "1.25rem" }}>Collaborate</p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(2.5rem,5vw,4.5rem)", color: "var(--c-ink)", lineHeight: 1.05, letterSpacing: "-0.01em", maxWidth: "28rem", marginBottom: "2.5rem" }}>
            How to work with Decra.
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0" }}>
            {anchors.map(({ label, href }, i) => (
              <a key={href} href={href} style={{
                fontFamily: "var(--font-sans)", fontWeight: 400,
                fontSize: "0.85rem", color: "var(--c-ink-muted)",
                textDecoration: "none", padding: "0.5rem 0",
                paddingRight: i < anchors.length - 1 ? "2rem" : 0,
                marginRight: i < anchors.length - 1 ? "2rem" : 0,
                borderRight: i < anchors.length - 1 ? "1px solid var(--c-border)" : "none",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Engagement sections ── */
function EngagementSection({
  id, num, title, description, items, formSubject, engagement, alt = false,
}: {
  id: string; num: string; title: string; description: string;
  items: string[]; formSubject: string; engagement: string; alt?: boolean;
}) {
  const { ref, vis } = useReveal();
  return (
    <section id={id} ref={ref as React.RefObject<HTMLElement>}
      style={{ ...SEC, background: alt ? "var(--c-surface)" : "var(--c-bg)" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7rem" }} className="eg-g">
          <div style={fade(vis)}>
            <p style={{ ...LBL, marginBottom: "1.25rem" }}>{num}</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(1.6rem,2.8vw,2.2rem)", color: "var(--c-ink)", lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: "1.5rem" }}>{title}</h2>
            <p style={{ ...BODY, fontSize: "0.875rem", maxWidth: "24rem", marginBottom: "2rem" }}>{description}</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {items.map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: "1rem", padding: "0.75rem 0",
                  borderBottom: "1px solid var(--c-border)",
                  opacity: vis ? 1 : 0,
                  transition: `opacity 0.5s ease ${0.1 + i * 0.07}s`,
                }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.7rem", color: "var(--c-accent)", flexShrink: 0, width: "1.4rem", lineHeight: 1.6 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.85rem", color: "var(--c-ink-mid)", lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={fade(vis, 0.1)}>
            <p style={{ ...LBL, marginBottom: "2rem" }}>Get in touch</p>
            <IntakeChat engagement={engagement} formSubject={formSubject} />
          </div>
        </div>
      </div>
      <style>{`@media(max-width:700px){.eg-g{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
    </section>
  );
}

/* ── Talk section (contact) ── */
function Talk() {
  const { ref, vis } = useReveal();
  const [form, setForm] = useState({ name: "", email: "", org: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const canSubmit = !!(form.name && form.email && form.message);

  const submit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {}
    setSent(true);
    setLoading(false);
  };

  return (
    <section id="talk" ref={ref as React.RefObject<HTMLElement>} style={{ ...SEC, background: "var(--c-bg)" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "7rem", alignItems: "start" }} className="talk-g">

          <div style={fade(vis)}>
            <p style={{ ...LBL, marginBottom: "1.5rem" }}>Talk</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(1.8rem,3.2vw,2.6rem)", color: "var(--c-ink)", lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: "1.5rem" }}>
              Let&apos;s have a real conversation.
            </h2>
            <p style={{ ...BODY, fontSize: "0.875rem", maxWidth: "22rem", marginBottom: "3rem" }}>
              Whether you&apos;re a founder, a firm, or an organisation — if you&apos;re serious about technology law, reach out.
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                ["Email", "hello@decrakerubo.com"],
                ["Location", "Nairobi, Kenya"],
                ["Response", "Within 48 hours"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: "2rem", padding: "0.9rem 0", borderBottom: "1px solid var(--c-border)" }}>
                  <span style={{ ...LBL, fontSize: "0.52rem", minWidth: "5rem", paddingTop: "0.15rem" }}>{k}</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.85rem", color: "var(--c-ink-mid)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={fade(vis, 0.1)}>
            {sent ? (
              <div>
                <p style={{ ...SERIF("1.5rem"), marginBottom: "0.75rem" }}>Message received.</p>
                <p style={{ ...BODY, fontSize: "0.875rem" }}>Decra will be in touch within 48 hours at {form.email}.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  { key: "name", ph: "Your name" },
                  { key: "email", ph: "Email address" },
                  { key: "org", ph: "Organisation (optional)" },
                  { key: "subject", ph: "Subject" },
                ].map(({ key, ph }) => (
                  <input key={key} placeholder={ph}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    style={inp}
                    onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-ink)"}
                    onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"} />
                ))}
                <textarea placeholder="Your message" value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  rows={5} style={{ ...inp, resize: "none" }}
                  onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-ink)"}
                  onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"} />
                <div style={{ paddingTop: "2rem" }}>
                  <button onClick={submit} disabled={loading || !canSubmit} style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    fontFamily: "var(--font-manjari)", fontWeight: 700,
                    fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "var(--c-ink)", background: "none", border: "none",
                    borderBottom: "1px solid var(--c-ink)", paddingBottom: "2px",
                    cursor: canSubmit ? "pointer" : "default",
                    opacity: canSubmit ? 1 : 0.3,
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                    onMouseEnter={e => { if (canSubmit) { (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"; } }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-ink)"; }}>
                    {loading ? "Sending..." : <>Send message <Send size={9} strokeWidth={1.5} /></>}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:700px){.talk-g{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
    </section>
  );
}

export default function PartnerTalkPage() {
  return (
    <>
      <Hero />
      <EngagementSection
        id="speak" num="01"
        title="Book me to speak on technology law."
        description="Keynotes, panels, workshops, and masterclasses on technology law in Africa — data privacy, AI regulation, startup compliance, and more."
        items={["Keynote addresses", "Panel discussions", "Workshop facilitation", "Corporate training days", "University lectures", "Podcast appearances"]}
        formSubject="Speaking engagement"
        engagement="speak"
        alt={false}
      />
      <EngagementSection
        id="compliance" num="02"
        title="Have me review for tech law compliance."
        description="A systematic legal review of your technology product, platform, or company. Delivered as a written report with prioritised findings."
        items={["Pre-launch compliance audit", "Product liability assessment", "Privacy-by-design review", "Terms of service & privacy policy", "API & third-party integration review", "Regulatory gap analysis"]}
        formSubject="Compliance review"
        engagement="compliance"
        alt={true}
      />
      <EngagementSection
        id="startup" num="03"
        title="Start your business with me."
        description="From incorporation to fundraising readiness. Full-spectrum startup advisory for founders building companies that hold up."
        items={["Company incorporation & structure", "Founder equity & vesting", "Co-founder agreements", "Tax registration & eTIMS", "Regulatory approvals", "Fundraising legal readiness"]}
        formSubject="Start my business"
        engagement="startup"
        alt={false}
      />
      <EngagementSection
        id="entrora" num="04"
        title="Get quality compliant tech development."
        description="Through Entrora Systems — AI engineering and software development with legal compliance built in. The lawyer and engineer are the same person."
        items={["AI document systems", "Legal tech development", "Compliant AI products", "AI adoption advisory", "Regulatory sandbox navigation", "AI governance frameworks"]}
        formSubject="Tech development — Entrora"
        engagement="entrora"
        alt={true}
      />
      <Talk />
    </>
  );
}
