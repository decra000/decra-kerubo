"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Send } from "lucide-react";

/* ── Types ── */
type Stage = "intro" | "chat" | "done";
type Msg = { role: "user" | "assistant"; text: string };

/* ── Shared styles ── */
const LBL: React.CSSProperties = {
  fontFamily: "var(--font-manjari)", fontWeight: 700,
  fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase",
  color: "var(--c-ink-muted)",
};
const SERIF = (sz = "clamp(2rem,3.5vw,3rem)"): React.CSSProperties => ({
  fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
  fontSize: sz, color: "var(--c-ink)", lineHeight: 1.05,
});

const SYSTEM_PROMPT = `You are Decra Kerubo's business advisory AI on her website.
Your sole purpose: understand where a potential client is in their startup journey and what they need, then collect enough structured information to send Decra a useful briefing email.

You must:
1. Greet warmly, ask ONE question at a time — never list multiple questions at once.
2. Learn: what stage they're at (idea / incorporated / operating / fundraising), what the business does, what their main legal/compliance need is, their name and email.
3. Once you have enough context (usually 4-6 exchanges), tell them: "I have everything I need. Decra will be in touch within 48 hours." and include a JSON block at the very end of your response in this exact format (invisible to user, parsed by the app):
<intake_complete>
{
  "name": "...",
  "email": "...",
  "stage": "...",
  "business": "...",
  "need": "...",
  "summary": "2-3 sentence summary for Decra"
}
</intake_complete>

Keep responses concise (2-3 sentences max). Warm but professional. Never mention Anthropic, Claude, or AI models.`;

export default function StartPage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [vis, setVis] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);
  useEffect(() => { if (stage === "chat") setTimeout(() => inputRef.current?.focus(), 200); }, [stage]);

  const startChat = async () => {
    setStage("chat");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Hello, I want to start my business with Decra.",
          history: [],
          system: SYSTEM_PROMPT,
        }),
      });
      const d = await res.json();
      const reply = d.reply || "Hi — tell me a bit about what you're building and where you are right now.";
      setMsgs([{ role: "assistant", text: cleanReply(reply) }]);
      checkForCompletion(reply);
    } catch {
      setMsgs([{ role: "assistant", text: "Hi — tell me a bit about what you're building and where you are right now." }]);
    } finally { setLoading(false); }
  };

  const cleanReply = (text: string) => text.replace(/<intake_complete>[\s\S]*?<\/intake_complete>/g, "").trim();

  const checkForCompletion = async (reply: string) => {
    const match = reply.match(/<intake_complete>([\s\S]*?)<\/intake_complete>/);
    if (!match) return;
    try {
      const data = JSON.parse(match[1].trim());
      // Send to email API
      await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
      setTimeout(() => setStage("done"), 400);
    } catch (e) {
      console.error("intake parse error", e);
    }
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
        body: JSON.stringify({
          message: text,
          history: msgs,
          system: SYSTEM_PROMPT,
        }),
      });
      const d = await res.json();
      const reply = d.reply || "Could you tell me a bit more about that?";
      setMsgs([...newMsgs, { role: "assistant", text: cleanReply(reply) }]);
      checkForCompletion(reply);
    } catch {
      setMsgs([...newMsgs, { role: "assistant", text: "Something went wrong — email hello@decrakerubo.com directly." }]);
    } finally { setLoading(false); }
  };

  return (
    <section style={{
      minHeight: "100svh",
      background: "var(--c-bg)",
      padding: "clamp(7rem,12vw,11rem) var(--space-x) 5rem",
    }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.1fr",
          gap: "clamp(3rem,6vw,7rem)", alignItems: "start",
        }} id="start-grid">

          {/* Left — static context */}
          <div style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(18px)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <p style={{ ...LBL, marginBottom: "1.5rem" }}>Start Your Business</p>
            <h1 style={{ ...SERIF("clamp(2rem,3.8vw,3.2rem)"), marginBottom: "1.5rem" }}>
              Let&apos;s build something<br />
              <em style={{ color: "var(--c-accent)" }}>legally sound.</em>
            </h1>
            <p style={{
              fontFamily: "var(--font-sans)", fontWeight: 400,
              fontSize: "0.9rem", color: "var(--c-ink-mid)", lineHeight: 1.85,
              maxWidth: "26rem", marginBottom: "3rem",
            }}>
              Answer a few questions about your business and where you are. Decra will review your situation and reach out within 48 hours.
            </p>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                ["01", "You tell the AI about your business"],
                ["02", "Decra gets a full briefing"],
                ["03", "She reaches out within 48 hours"],
              ].map(([n, text]) => (
                <div key={n} style={{
                  display: "flex", gap: "1.25rem", padding: "0.9rem 0",
                  borderBottom: "1px solid var(--c-border)",
                }}>
                  <span style={{
                    fontFamily: "var(--font-serif)", fontStyle: "italic",
                    fontSize: "0.78rem", color: "var(--c-accent)", flexShrink: 0,
                  }}>{n}</span>
                  <span style={{
                    fontFamily: "var(--font-sans)", fontWeight: 400,
                    fontSize: "0.875rem", color: "var(--c-ink-mid)",
                  }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — chat */}
          <div style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(18px)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}>
            {stage === "intro" && (
              <div style={{
                background: "var(--c-surface)",
                border: "1px solid var(--c-border)",
                padding: "3rem",
              }}>
                <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1rem", color: "var(--c-ink)", marginBottom: "0.5rem" }}>Ready?</p>
                <p style={{
                  fontFamily: "var(--font-sans)", fontWeight: 400,
                  fontSize: "0.875rem", color: "var(--c-ink-muted)",
                  lineHeight: 1.75, marginBottom: "2rem",
                }}>
                  Takes about 3 minutes. Decra will review personally.
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
                  Start <ArrowRight size={11} strokeWidth={1.5} />
                </button>
              </div>
            )}

            {stage === "done" && (
              <div style={{
                background: "var(--c-surface)",
                border: "1px solid var(--c-border)",
                padding: "3rem",
              }}>
                <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.3rem", color: "var(--c-ink)", marginBottom: "0.75rem" }}>Message received.</p>
                <p style={{
                  fontFamily: "var(--font-sans)", fontWeight: 400,
                  fontSize: "0.875rem", color: "var(--c-ink-muted)", lineHeight: 1.75,
                }}>
                  Decra has your briefing and will be in touch within 48 hours.
                </p>
              </div>
            )}

            {stage === "chat" && (
              <div style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
                {/* Header */}
                <div style={{
                  padding: "1.1rem 1.5rem",
                  borderBottom: "1px solid var(--c-border)",
                  display: "flex", alignItems: "center", gap: "0.75rem",
                }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
                  <p style={{
                    fontFamily: "var(--font-serif)", fontStyle: "italic",
                    fontSize: "0.875rem", color: "var(--c-ink)",
                  }}>Decra's advisor</p>
                </div>

                {/* Messages */}
                <div style={{
                  minHeight: "260px", maxHeight: "380px", overflowY: "auto",
                  padding: "1.5rem",
                  display: "flex", flexDirection: "column", gap: "1.25rem",
                }}>
                  {msgs.map((m, i) => (
                    <div key={i} style={{
                      alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                      maxWidth: "82%",
                    }}>
                      {m.role === "assistant" && (
                        <p style={{
                          fontFamily: "var(--font-serif)", fontStyle: "italic",
                          fontSize: "0.6rem", color: "var(--c-accent)", marginBottom: "0.3rem",
                        }}>Advisor</p>
                      )}
                      <p style={{
                        fontFamily: "var(--font-sans)", fontWeight: 400,
                        fontSize: "0.875rem", lineHeight: 1.75,
                        color: m.role === "user" ? "var(--c-ink)" : "var(--c-ink-mid)",
                        fontStyle: m.role === "user" ? "normal" : "normal",
                      }}>{m.text}</p>
                    </div>
                  ))}
                  {loading && (
                    <div style={{ alignSelf: "flex-start" }}>
                      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.6rem", color: "var(--c-accent)", marginBottom: "0.3rem" }}>Advisor</p>
                      <div style={{ display: "flex", gap: "4px" }}>
                        {[0,1,2].map(j => <span key={j} style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--c-ink-muted)", animation: `bd 1.2s ease ${j*0.2}s infinite` }} />)}
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div style={{ display: "flex", borderTop: "1px solid var(--c-border)" }}>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
                    placeholder="Type your reply..."
                    style={{
                      flex: 1, background: "none", border: "none",
                      padding: "1rem 1.25rem",
                      fontFamily: "var(--font-sans)", fontWeight: 400,
                      fontSize: "0.875rem", color: "var(--c-ink)",
                      outline: "none",
                    }}
                  />
                  <button onClick={send} disabled={loading || !input.trim()} style={{
                    background: "none", border: "none",
                    borderLeft: "1px solid var(--c-border)",
                    cursor: input.trim() ? "pointer" : "default",
                    color: input.trim() ? "var(--c-accent)" : "var(--c-ink-muted)",
                    padding: "0 1.25rem", lineHeight: 0,
                    transition: "color 0.2s",
                  }}>
                    <Send size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bd { 0%,100%{opacity:0.25}50%{opacity:1} }
        @media(max-width:700px){#start-grid{grid-template-columns:1fr!important;gap:3rem!important}}
      `}</style>
    </section>
  );
}
