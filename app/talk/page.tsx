"use client";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

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

const LBL: React.CSSProperties = { fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--c-ink-muted)" };
const SERIF = (sz = "clamp(2rem,3.5vw,3rem)"): React.CSSProperties => ({ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: sz, color: "var(--c-ink)", lineHeight: 1.05 });
const BODY: React.CSSProperties = { fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.875rem", color: "var(--c-ink-mid)", lineHeight: 1.85 };

const inp: React.CSSProperties = {
  width: "100%", background: "none", border: "none",
  borderBottom: "1px solid var(--c-border)",
  padding: "0.85rem 0", fontFamily: "var(--font-sans)", fontWeight: 400,
  fontSize: "0.95rem", color: "var(--c-ink)", outline: "none",
  transition: "border-color 0.2s",
};

type F = { name: string; email: string; org: string; subject: string; message: string };

export default function TalkPage() {
  const { ref, vis } = useReveal();
  const [form, setForm] = useState<F>({ name: "", email: "", org: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const canSubmit = form.name && form.email && form.message;

  const submit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  };

  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ minHeight: "100svh", padding: "clamp(7rem,12vw,11rem) var(--space-x) 6rem" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "8rem", alignItems: "start" }} className="talk-g">

          {/* Left */}
          <div style={fade(vis)}>
            <p style={{ ...LBL, marginBottom: "1.5rem" }}>Talk</p>
            <h1 style={{ ...SERIF("clamp(2rem,4vw,3.5rem)"), marginBottom: "1.5rem" }}>Let's have a real conversation.</h1>
            <p style={{ ...BODY, maxWidth: "22rem", marginBottom: "3rem" }}>
              Whether you're a founder, a firm, or an organisation — if you're serious about technology law, reach out.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                ["Email", "hello@decrakerubo.com"],
                ["Location", "Nairobi, Kenya"],
                ["Response", "Within 48 hours"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: "2rem", padding: "1rem 0", borderBottom: "1px solid var(--c-border)" }}>
                  <span style={{ ...LBL, fontSize: "0.5rem", minWidth: "5rem", paddingTop: "0.15rem" }}>{k}</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.82rem", color: "var(--c-ink-mid)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div style={fade(vis, 0.1)}>
            {sent ? (
              <div>
                <p style={{ ...SERIF("1.6rem"), marginBottom: "0.75rem" }}>Message received.</p>
                <p style={{ ...BODY }}>Decra will be in touch within 48 hours at {form.email}.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {[
                  { key: "name", ph: "Your name" },
                  { key: "email", ph: "Email address" },
                  { key: "org", ph: "Organisation (optional)" },
                  { key: "subject", ph: "Subject" },
                ].map(({ key, ph }) => (
                  <input key={key} placeholder={ph} value={form[key as keyof F]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                    style={inp}
                    onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-ink)"}
                    onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"} />
                ))}
                <textarea placeholder="Your message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  rows={5} style={{ ...inp, resize: "none" }}
                  onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-ink)"}
                  onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"} />
                <div style={{ paddingTop: "2rem" }}>
                  <button onClick={submit} disabled={loading || !canSubmit} style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem",
                    letterSpacing: "0.2em", textTransform: "uppercase",
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
