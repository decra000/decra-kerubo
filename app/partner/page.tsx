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

function InquiryForm({ subject, bg = false }: { subject: string; bg?: boolean }) {
  const [form, setForm] = useState({ name: "", email: "", org: "", message: "" });
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
        body: JSON.stringify({ ...form, subject }),
      });
    } catch {}
    setSent(true);
    setLoading(false);
  };

  if (sent) return (
    <div>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1rem", color: "var(--c-accent)", marginBottom: "0.4rem" }}>Message received.</p>
      <p style={{ ...BODY, fontSize: "0.85rem" }}>Decra will be in touch within 48 hours.</p>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {[
        { key: "name", ph: "Your name" },
        { key: "email", ph: "Email address" },
        { key: "org", ph: "Organisation (optional)" },
      ].map(({ key, ph }) => (
        <input key={key} placeholder={ph}
          value={form[key as keyof typeof form]}
          onChange={e => setForm({ ...form, [key]: e.target.value })}
          style={inp}
          onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-ink)"}
          onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"} />
      ))}
      <textarea placeholder="Briefly describe what you need..." value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })}
        rows={3} style={{ ...inp, resize: "none" }}
        onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-ink)"}
        onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"} />
      <div style={{ paddingTop: "1.5rem" }}>
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
          {loading ? "Sending..." : <>{subject} <Send size={9} strokeWidth={1.5} /></>}
        </button>
      </div>
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
          <p style={{ ...LBL, marginBottom: "1.25rem" }}>Partner & Talk</p>
          <h1 style={{ ...SERIF("clamp(2.5rem,5vw,4.5rem)"), maxWidth: "28rem", marginBottom: "2.5rem" }}>
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
  id, num, title, description, items, formSubject, alt = false,
}: {
  id: string; num: string; title: string; description: string;
  items: string[]; formSubject: string; alt?: boolean;
}) {
  const { ref, vis } = useReveal();
  return (
    <section id={id} ref={ref as React.RefObject<HTMLElement>}
      style={{ ...SEC, background: alt ? "var(--c-surface)" : "var(--c-bg)" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7rem" }} className="eg-g">
          <div style={fade(vis)}>
            <p style={{ ...LBL, marginBottom: "1.25rem" }}>{num}</p>
            <h2 style={{ ...SERIF("clamp(1.6rem,2.8vw,2.2rem)"), marginBottom: "1.5rem" }}>{title}</h2>
            <p style={{ ...BODY, fontSize: "0.875rem", maxWidth: "24rem", marginBottom: "2rem" }}>{description}</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {items.map((item, i) => (
                <div key={i} style={{
                  display: "flex", gap: "1rem", padding: "0.75rem 0",
                  borderBottom: "1px solid var(--c-border)",
                  opacity: vis ? 1 : 0,
                  transition: `opacity 0.5s ease ${0.1 + i * 0.07}s`,
                }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.7rem", color: "var(--c-accent)", flexShrink: 0, paddingTop: "0.1rem" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.85rem", color: "var(--c-ink-mid)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={fade(vis, 0.1)}>
            <p style={{ ...LBL, marginBottom: "2rem" }}>Get in touch</p>
            <InquiryForm subject={formSubject} />
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
            <h2 style={{ ...SERIF("clamp(1.8rem,3.2vw,2.6rem)"), marginBottom: "1.5rem" }}>
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
        alt={false}
      />
      <EngagementSection
        id="compliance" num="02"
        title="Have me review for tech law compliance."
        description="A systematic legal review of your technology product, platform, or company. Delivered as a written report with prioritised findings."
        items={["Pre-launch compliance audit", "Product liability assessment", "Privacy-by-design review", "Terms of service & privacy policy", "API & third-party integration review", "Regulatory gap analysis"]}
        formSubject="Compliance review"
        alt={true}
      />
      <EngagementSection
        id="startup" num="03"
        title="Start your business with me."
        description="From incorporation to fundraising readiness. Full-spectrum startup advisory for founders building companies that hold up."
        items={["Company incorporation & structure", "Founder equity & vesting", "Co-founder agreements", "Tax registration & eTIMS", "Regulatory approvals", "Fundraising legal readiness"]}
        formSubject="Start my business"
        alt={false}
      />
      <EngagementSection
        id="entrora" num="04"
        title="Get quality compliant tech development."
        description="Through Entrora Systems — AI engineering and software development with legal compliance built in. The lawyer and engineer are the same person."
        items={["AI document systems", "Legal tech development", "Compliant AI products", "AI adoption advisory", "Regulatory sandbox navigation", "AI governance frameworks"]}
        formSubject="Tech development — Entrora"
        alt={true}
      />
      <Talk />
    </>
  );
}
