"use client";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, Send, Sparkles } from "lucide-react";
import Link from "next/link";

type Msg = { role: "user" | "assistant"; text: string };

const STARTERS = [
  "I need help with startup incorporation",
  "My IP wasn't protected properly",
  "I want to raise capital — where do I start?",
  "I need a data privacy compliance review",
];

export function BookingCTA() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", text: "Hi — I'm Decra's AI. Tell me what you're working on and I'll point you in the right direction." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [vis, setVis] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (sectionRef.current) o.observe(sectionRef.current);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { role: "user", text };
    setMsgs(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: msgs }),
      });
      const data = await res.json();
      setMsgs(prev => [...prev, { role: "assistant", text: data.reply || "Let me connect you with Decra directly — use the booking button below." }]);
    } catch {
      setMsgs(prev => [...prev, { role: "assistant", text: "Something went wrong on my end. Please book a call directly and Decra will be in touch." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-x" style={{ background: "var(--c-bg)", borderTop: "1px solid var(--c-border)", paddingTop: "var(--space-section)", paddingBottom: "var(--space-section)", position: "relative", overflow: "hidden" }} ref={sectionRef}>

      {/* Ambient glow */}
      <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: "60vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(196,162,101,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="inner" style={{ position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "end", marginBottom: "3.5rem", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "all 0.6s ease" }} id="cta-header-grid">
          <div>
            <p className="t-label" style={{ marginBottom: "1rem" }}>Get started</p>
            <h2 className="t-display t-display-lg">Not sure<br /><em style={{ fontStyle: "italic", color: "var(--c-accent)" }}>where to start?</em></h2>
          </div>
          <p style={{ fontSize: "0.9rem", color: "var(--c-ink-muted)", lineHeight: 1.8, fontFamily: "var(--font-sans)" }}>
            Ask Decra's AI anything — it knows her practice areas and can guide you to the right track. A real call is one click away.
          </p>
        </div>

        {/* AI Chat panel */}
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(32px)", transition: "all 0.7s ease 0.15s" }}>
          <div className="glass-dark" style={{ borderRadius: "12px", overflow: "hidden" }}>

            {/* Chat header */}
            <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid rgba(196,162,101,0.12)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, var(--c-accent) 0%, rgba(196,162,101,0.4) 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Sparkles size={14} color="#0C0A08" />
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.08em", color: "rgba(245,237,216,0.9)" }}>Decra AI</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#5A9A5A", animation: "pulse-dot 2.2s infinite", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.65rem", color: "rgba(245,237,216,0.35)", fontFamily: "var(--font-sans)" }}>Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ padding: "1.5rem", minHeight: "260px", maxHeight: "360px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {msgs.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "78%",
                    padding: "0.75rem 1rem",
                    borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                    background: m.role === "user"
                      ? "var(--c-accent)"
                      : "rgba(245,237,216,0.07)",
                    border: m.role === "assistant" ? "1px solid rgba(196,162,101,0.12)" : "none",
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                    color: m.role === "user" ? "#0C0A08" : "rgba(245,237,216,0.8)",
                    fontFamily: "var(--font-sans)",
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{ padding: "0.75rem 1rem", borderRadius: "12px 12px 12px 2px", background: "rgba(245,237,216,0.07)", border: "1px solid rgba(196,162,101,0.12)", display: "flex", gap: "4px", alignItems: "center" }}>
                    {[0,1,2].map(j => <span key={j} style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--c-accent)", animation: `pulse-dot 1.2s ease ${j * 0.2}s infinite` }} />)}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Starter prompts */}
            {msgs.length <= 1 && (
              <div style={{ padding: "0 1.5rem 1rem", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {STARTERS.map(s => (
                  <button key={s} onClick={() => send(s)} style={{ padding: "0.35rem 0.8rem", borderRadius: "100px", border: "1px solid rgba(196,162,101,0.2)", background: "rgba(196,162,101,0.05)", color: "rgba(245,237,216,0.55)", fontSize: "0.72rem", fontFamily: "var(--font-sans)", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"; (e.currentTarget as HTMLElement).style.color = "rgba(245,237,216,0.85)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,162,101,0.2)"; (e.currentTarget as HTMLElement).style.color = "rgba(245,237,216,0.55)"; }}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid rgba(196,162,101,0.10)", display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && send(input)}
                placeholder="Ask about services, process, or your situation..."
                style={{ flex: 1, background: "rgba(245,237,216,0.05)", border: "1px solid rgba(196,162,101,0.14)", borderRadius: "8px", padding: "0.7rem 1rem", fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "rgba(245,237,216,0.85)", outline: "none", transition: "border-color 0.2s" }}
                onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"}
                onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,162,101,0.14)"}
              />
              <button onClick={() => send(input)} disabled={loading || !input.trim()} style={{ width: "38px", height: "38px", borderRadius: "8px", background: input.trim() ? "var(--c-accent)" : "rgba(196,162,101,0.1)", border: "none", cursor: input.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                <Send size={14} color={input.trim() ? "#0C0A08" : "rgba(196,162,101,0.3)"} />
              </button>
            </div>
          </div>

          {/* CTA strip below chat */}
          <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.75rem", background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: "6px" }} id="cta-strip">
            <div>
              <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.08em", color: "var(--c-ink)", marginBottom: "0.2rem" }}>Ready for a real conversation?</p>
              <p style={{ fontSize: "0.75rem", color: "var(--c-ink-muted)", fontFamily: "var(--font-sans)" }}>Free 15-minute discovery call — no commitment.</p>
            </div>
            <Link href="/book" className="btn btn-accent" style={{ flexShrink: 0 }}>Book a Call <ArrowRight size={13} /></Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1}50%{opacity:0.3} }
        @media(max-width:768px) {
          #cta-header-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          #cta-strip { flex-direction: column !important; align-items: flex-start !important; gap: 1rem !important; }
        }
      `}</style>
    </section>
  );
}
