"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Send } from "lucide-react";
import Link from "next/link";

type Msg = { role: "user" | "assistant"; text: string };

const STARTERS = [
  "I need help with startup incorporation",
  "I have an IP exposure issue",
  "I want to fundraise — where do I start?",
  "I need a data privacy review",
];

export function BookingCTA() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", text: "What are you working on?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [vis, setVis] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    setMsgs(prev => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: msgs }),
      });
      const data = await res.json();
      setMsgs(prev => [...prev, { role: "assistant", text: data.reply || "Book a call and Decra will be in touch." }]);
    } catch {
      setMsgs(prev => [...prev, { role: "assistant", text: "Connection issue — book a call directly." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={ref} style={{
      borderTop: "1px solid var(--c-border)",
      padding: `var(--space-section) var(--space-x)`,
    }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "8rem", alignItems: "start",
          opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(16px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
        }} id="cta-g">

          {/* Left: heading */}
          <div>
            <p className="label" style={{ marginBottom: "1.5rem" }}>Get started</p>
            <h2 style={{
              fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
              fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--c-ink)",
              lineHeight: 1.05, marginBottom: "1.5rem",
            }}>Not sure<br />where to start?</h2>
            <p style={{
              fontFamily: "var(--font-sans)", fontWeight: 300,
              fontSize: "0.85rem", color: "var(--c-ink-muted)", lineHeight: 1.85,
              maxWidth: "20rem", marginBottom: "2.5rem",
            }}>
              Ask the AI — it knows Decra's practice areas and can guide you to the right track.
            </p>
            <Link href="/book" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontFamily: "var(--font-manjari)", fontWeight: 700,
              fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--c-ink)", textDecoration: "none",
              borderBottom: "1px solid var(--c-ink)", paddingBottom: "2px",
              transition: "color 0.2s, border-color 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-accent)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--c-accent)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-ink)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--c-ink)"; }}>
              Or book directly <ArrowRight size={10} strokeWidth={1.5} />
            </Link>
          </div>

          {/* Right: chat */}
          <div>
            {/* Messages */}
            <div style={{
              minHeight: "180px", maxHeight: "280px", overflowY: "auto",
              display: "flex", flexDirection: "column", gap: "1rem",
              paddingBottom: "1rem",
              borderBottom: "1px solid var(--c-border)",
              marginBottom: "0",
            }}>
              {msgs.map((m, i) => (
                <div key={i} style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                }}>
                  {m.role === "assistant" && (
                    <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.65rem", color: "var(--c-accent)", marginBottom: "0.25rem" }}>Decra AI</p>
                  )}
                  <p style={{
                    fontFamily: "var(--font-sans)", fontWeight: 300,
                    fontSize: "0.875rem", lineHeight: 1.75,
                    color: m.role === "user" ? "var(--c-ink)" : "var(--c-ink-mid)",
                  }}>{m.text}</p>
                </div>
              ))}
              {loading && (
                <div style={{ alignSelf: "flex-start" }}>
                  <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.65rem", color: "var(--c-accent)", marginBottom: "0.25rem" }}>Decra AI</p>
                  <div style={{ display: "flex", gap: "3px" }}>
                    {[0,1,2].map(j => <span key={j} style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--c-ink-muted)", animation: `bd 1.2s ease ${j*0.2}s infinite` }} />)}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Starters */}
            {msgs.length <= 1 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", padding: "1rem 0" }}>
                {STARTERS.map(s => (
                  <button key={s} onClick={() => send(s)} style={{
                    fontFamily: "var(--font-sans)", fontWeight: 300,
                    fontSize: "0.72rem", color: "var(--c-ink-muted)",
                    background: "none", border: "1px solid var(--c-border)",
                    padding: "0.3rem 0.7rem", cursor: "pointer", transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--c-ink-muted)"; (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"; (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"; }}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid var(--c-border-strong)", paddingTop: msgs.length > 1 ? "1rem" : "0" }}>
              <input ref={inputRef} value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send(input)}
                placeholder="Ask anything..."
                style={{
                  flex: 1, background: "none", border: "none",
                  fontFamily: "var(--font-sans)", fontWeight: 300,
                  fontSize: "0.875rem", color: "var(--c-ink)",
                  padding: "0.85rem 0", outline: "none",
                }} />
              <button onClick={() => send(input)} disabled={loading || !input.trim()} style={{
                background: "none", border: "none", cursor: input.trim() ? "pointer" : "default",
                color: input.trim() ? "var(--c-accent)" : "var(--c-ink-muted)",
                transition: "color 0.2s", lineHeight: 0, padding: "0 0 0 0.5rem",
              }}>
                <Send size={13} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes bd { 0%,100%{opacity:0.3}50%{opacity:1} }
        @media(max-width:700px){#cta-g{grid-template-columns:1fr!important;gap:3rem!important}}
      `}</style>
    </section>
  );
}
