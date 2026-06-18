"use client";
import { useState, useRef, useEffect } from "react";
import { Send, ArrowRight } from "lucide-react";
import Link from "next/link";

type Msg = { role: "user" | "assistant"; text: string };

const STARTERS = [
  "I need help with startup incorporation",
  "I have an IP exposure issue",
  "I want to raise capital — where do I start?",
  "I need a data privacy review",
];

export function BookingCTA() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", text: "What are you working on? I'll point you in the right direction." }
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
      setMsgs(prev => [...prev, { role: "assistant", text: "Connection issue — book a call directly below." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{
      background: "var(--c-bg)",
      borderTop: "1px solid var(--c-border)",
      paddingTop: "var(--space-section)",
      paddingBottom: "var(--space-section)",
      paddingLeft: "var(--space-page-x)",
      paddingRight: "var(--space-page-x)",
    }} ref={sectionRef}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>

        {/* Header */}
        <div style={{
          textAlign: "center", marginBottom: "4rem",
          opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(16px)",
          transition: "all 0.7s ease",
        }}>
          <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--c-ink-muted)", marginBottom: "1.25rem" }}>Get Started</p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontStyle: "italic", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "var(--c-ink)", lineHeight: 1.1 }}>
            Not sure where to start?
          </h2>
        </div>

        {/* Chat */}
        <div style={{
          maxWidth: "44rem", margin: "0 auto",
          opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)",
          transition: "all 0.7s ease 0.1s",
        }}>
          {/* Messages */}
          <div style={{
            background: "var(--c-surface)", border: "1px solid var(--c-border)",
            minHeight: "220px", maxHeight: "320px", overflowY: "auto",
            padding: "1.75rem 2rem",
            display: "flex", flexDirection: "column", gap: "0.85rem",
          }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%",
                  padding: "0.65rem 1rem",
                  background: m.role === "user" ? "var(--c-ink)" : "transparent",
                  border: m.role === "assistant" ? "1px solid var(--c-border)" : "none",
                  fontFamily: "var(--font-sans)", fontSize: "0.85rem", lineHeight: 1.7,
                  color: m.role === "user" ? "var(--c-bg)" : "var(--c-ink-mid)",
                }}>
                  {m.role === "assistant" && (
                    <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.7rem", color: "var(--c-accent)", display: "block", marginBottom: "0.3rem" }}>Decra AI</span>
                  )}
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: "4px", padding: "0.5rem 0" }}>
                {[0,1,2].map(j => <span key={j} style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--c-accent)", animation: `pulse-dot 1.2s ease ${j*0.2}s infinite` }} />)}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Starter prompts */}
          {msgs.length <= 1 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", padding: "1rem 0 0.5rem", borderTop: "1px solid var(--c-border)" }}>
              {STARTERS.map(s => (
                <button key={s} onClick={() => send(s)} style={{
                  padding: "0.3rem 0.75rem",
                  border: "1px solid var(--c-border-strong)", background: "none",
                  fontFamily: "var(--font-sans)", fontSize: "0.72rem",
                  color: "var(--c-ink-muted)", cursor: "pointer", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"; (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border-strong)"; (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"; }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ display: "flex", gap: "0", borderTop: "1px solid var(--c-border)", marginTop: msgs.length > 1 ? "0" : "0" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send(input)}
              placeholder="Ask about services, process, or your situation..."
              style={{
                flex: 1, background: "var(--c-surface)", border: "1px solid var(--c-border)", borderTop: "none", borderRight: "none",
                padding: "1rem 1.25rem",
                fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--c-ink)",
                outline: "none",
              }}
              onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"}
              onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"}
            />
            <button onClick={() => send(input)} disabled={loading || !input.trim()} style={{
              width: "3.25rem", background: input.trim() ? "var(--c-accent)" : "var(--c-surface)",
              border: "1px solid var(--c-border)", borderTop: "none", borderLeft: "none",
              cursor: input.trim() ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s", flexShrink: 0,
            }}>
              <Send size={13} color={input.trim() ? "#0C0A08" : "var(--c-ink-muted)"} />
            </button>
          </div>

          {/* CTA */}
          <div style={{
            marginTop: "2.5rem", display: "flex", alignItems: "center",
            justifyContent: "space-between", paddingTop: "2rem",
            borderTop: "1px solid var(--c-border)",
          }}>
            <div>
              <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1rem", color: "var(--c-ink)", marginBottom: "0.25rem" }}>Ready for a real conversation?</p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--c-ink-muted)" }}>Free 15-minute discovery call.</p>
            </div>
            <Link href="/book" style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              fontFamily: "var(--font-manjari)", fontWeight: 700,
              fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--c-accent)", textDecoration: "none", transition: "color 0.2s",
              flexShrink: 0,
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"}>
              Book a Call <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`@keyframes pulse-dot { 0%,100%{opacity:1}50%{opacity:0.25} }`}</style>
    </section>
  );
}
