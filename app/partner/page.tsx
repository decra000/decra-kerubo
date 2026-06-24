"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Send } from "lucide-react";

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

/* ── Shared inquiry form ── */
function InquiryForm({ subject }: { subject: string }) {
  const [form, setForm] = useState({ name: "", email: "", org: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setSent(true);
    setLoading(false);
  };

  if (sent) return (
    <div style={{ paddingTop: "1.5rem" }}>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1rem", color: "var(--c-accent)", marginBottom: "0.35rem" }}>Message received.</p>
      <p style={{ ...BODY }}>Decra will be in touch within 48 hours.</p>
    </div>
  );

  const inp: React.CSSProperties = {
    width: "100%", background: "none", border: "none",
    borderBottom: "1px solid var(--c-border)",
    padding: "0.75rem 0", fontFamily: "var(--font-sans)", fontWeight: 300,
    fontSize: "0.875rem", color: "var(--c-ink)", outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
      <input placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
        style={inp}
        onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-ink)"}
        onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"} />
      <input placeholder="Email address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
        style={inp}
        onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-ink)"}
        onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"} />
      <input placeholder="Organisation (optional)" value={form.org} onChange={e => setForm({ ...form, org: e.target.value })}
        style={inp}
        onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-ink)"}
        onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"} />
      <textarea placeholder="Briefly describe what you need..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
        rows={3} style={{ ...inp, resize: "none" }}
        onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-ink)"}
        onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"} />
      <div style={{ paddingTop: "1.5rem" }}>
        <button onClick={submit} disabled={loading || !form.name || !form.email || !form.message} style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem",
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "var(--c-ink)", background: "none", border: "none",
          borderBottom: "1px solid var(--c-ink)", paddingBottom: "2px",
          cursor: "pointer", opacity: (!form.name || !form.email || !form.message) ? 0.35 : 1,
          transition: "color 0.2s, border-color 0.2s",
        }}
          onMouseEnter={e => { if (form.name && form.email && form.message) { (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"; } }}
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
  return (
    <section style={{ minHeight: "60svh", background: "var(--c-bg)", display: "flex", alignItems: "flex-end", padding: "0 var(--space-x) 5rem", paddingTop: "10rem" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", width: "100%" }}>
        <div style={fade(vis)}>
          <p style={{ ...LBL, marginBottom: "1.25rem" }}>Partner</p>
          <h1 style={{ ...SERIF("clamp(2.5rem,5vw,4.5rem)"), maxWidth: "26rem", marginBottom: "1.5rem" }}>How to work with Decra.</h1>
          <p style={{ ...BODY, maxWidth: "28rem" }}>Four engagement paths. Each designed for a specific kind of collaboration. Choose the one that fits.</p>
        </div>
      </div>
    </section>
  );
}

/* ── S1: Speaking ── */
function Speaking() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={SEC}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7rem" }} className="pg">
          <div style={fade(vis)}>
            <p style={{ ...LBL, marginBottom: "1.25rem" }}>01</p>
            <h2 style={{ ...SERIF("clamp(1.6rem,3vw,2.4rem)"), marginBottom: "1.5rem" }}>Book me to speak on technology law.</h2>
            <p style={{ ...BODY, marginBottom: "1.25rem" }}>
              Keynotes, panels, workshops, and masterclasses on technology law in Africa — from data privacy to AI regulation to startup compliance.
            </p>
            <p style={{ ...BODY, marginBottom: "2.5rem" }}>
              Past speaking engagements include legal tech conferences, accelerator programmes, university sessions, and corporate training days.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0", marginBottom: "2.5rem" }}>
              {["Keynote addresses", "Panel discussions", "Workshop facilitation", "Corporate training", "University lectures", "Podcast appearances"].map((item, i) => (
                <div key={i} style={{ padding: "0.75rem 0", borderBottom: "1px solid var(--c-border)", fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.82rem", color: "var(--c-ink-mid)", display: "flex", gap: "1rem" }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.7rem", color: "var(--c-accent)" }}>{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div style={fade(vis, 0.1)}>
            <p style={{ ...LBL, marginBottom: "2rem" }}>Book a speaking engagement</p>
            <InquiryForm subject="Request speaking" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── S2: Compliance review ── */
function ComplianceReview() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ ...SEC, background: "var(--c-surface)" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7rem" }} className="pg">
          <div style={fade(vis)}>
            <p style={{ ...LBL, marginBottom: "1.25rem" }}>02</p>
            <h2 style={{ ...SERIF("clamp(1.6rem,3vw,2.4rem)"), marginBottom: "1.5rem" }}>Technology law compliance review.</h2>
            <p style={{ ...BODY, marginBottom: "1.25rem" }}>
              A systematic legal review of your technology product, platform, or company against applicable Kenyan and regional law.
            </p>
            <p style={{ ...BODY, marginBottom: "2.5rem" }}>
              Delivered as a written report with prioritised findings and actionable recommendations. Suitable for pre-launch, pre-fundraise, or ongoing compliance cycles.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0", marginBottom: "2.5rem" }}>
              {[
                ["Scope", "Product, platform, or company-wide"],
                ["Delivery", "Written report + debrief call"],
                ["Timeline", "5–10 business days"],
                ["Outcome", "Prioritised findings & action plan"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: "2rem", padding: "0.85rem 0", borderBottom: "1px solid var(--c-border)" }}>
                  <span style={{ ...LBL, fontSize: "0.5rem", minWidth: "5rem", paddingTop: "0.15rem" }}>{k}</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.82rem", color: "var(--c-ink-mid)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={fade(vis, 0.1)}>
            <p style={{ ...LBL, marginBottom: "2rem" }}>Request a compliance review</p>
            <InquiryForm subject="Request compliance review" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── S3: Start your business ── */
function StartBusiness() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={SEC}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7rem" }} className="pg">
          <div style={fade(vis)}>
            <p style={{ ...LBL, marginBottom: "1.25rem" }}>03</p>
            <h2 style={{ ...SERIF("clamp(1.6rem,3vw,2.4rem)"), marginBottom: "1.5rem" }}>Start your business with me.</h2>
            <p style={{ ...BODY, marginBottom: "1.25rem" }}>
              From idea to operational — full-spectrum startup advisory covering legal structure, tax, equity, governance, and regulatory compliance.
            </p>
            <p style={{ ...BODY, marginBottom: "2.5rem" }}>
              Not just paperwork. Strategic advisory on the decisions that shape what your company becomes — and what you keep from it.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0", marginBottom: "2.5rem" }}>
              {[
                "Company incorporation & constitutional documents",
                "Shareholding structure & equity design",
                "Co-founder agreements & vesting schedules",
                "Tax registration & eTIMS compliance",
                "Regulatory licensing & approvals",
                "Investor readiness & fundraising legal prep",
              ].map((item, i) => (
                <div key={i} style={{ padding: "0.75rem 0", borderBottom: "1px solid var(--c-border)", fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.82rem", color: "var(--c-ink-mid)", display: "flex", gap: "1rem" }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.7rem", color: "var(--c-accent)" }}>{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div style={fade(vis, 0.1)}>
            <p style={{ ...LBL, marginBottom: "2rem" }}>Start the conversation</p>
            <InquiryForm subject="Start my business" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── S4: Entrora ── */
function EntroraSection() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ ...SEC, background: "var(--c-surface)" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7rem", alignItems: "center" }} className="pg">
          <div style={fade(vis)}>
            <p style={{ ...LBL, marginBottom: "1.25rem" }}>04 · In partnership with Entrora Systems</p>
            <h2 style={{ ...SERIF("clamp(1.6rem,3vw,2.4rem)"), marginBottom: "1.5rem" }}>Quality, compliant tech development.</h2>
            <p style={{ ...BODY, marginBottom: "1.25rem" }}>
              Through Entrora Systems, get AI engineering and software development services that are built with the legal layer from day one — not bolted on after.
            </p>
            <p style={{ ...BODY, marginBottom: "2.5rem" }}>
              The only technology advisory practice in Kenya where the lawyer and the engineer are the same person.
            </p>
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              <Link href="/entrora" style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--c-ink)", textDecoration: "none",
                borderBottom: "1px solid var(--c-ink)", paddingBottom: "2px",
                transition: "color 0.2s, border-color 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-ink)"; }}>
                Learn about Entrora <ArrowRight size={10} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
          <div style={fade(vis, 0.1)}>
            {[
              ["AI Document Systems", "Classification, extraction, and review at scale"],
              ["Legal Tech Development", "Software built for legal workflows"],
              ["Compliant AI Products", "Built with data governance from the start"],
              ["AI Adoption Advisory", "Scoping and implementation for any budget"],
            ].map(([title, body], i) => (
              <div key={title} style={{ padding: "1.5rem 0", borderBottom: "1px solid var(--c-border)", opacity: vis ? 1 : 0, transition: `opacity 0.5s ease ${0.08 * i}s` }}>
                <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.95rem", color: "var(--c-ink)", marginBottom: "0.35rem" }}>{title}</p>
                <p style={{ ...BODY, fontSize: "0.8rem" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PartnerPage() {
  return (
    <>
      <Hero />
      <Speaking />
      <ComplianceReview />
      <StartBusiness />
      <EntroraSection />
    </>
  );
}
