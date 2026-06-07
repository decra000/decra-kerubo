"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, ArrowRight, Mail, ExternalLink, Send } from "lucide-react";

type Mode = "chat" | "contact";
type Message = { role: "user" | "assistant"; text: string };

export function ContactBubble() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("chat");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi — I can help you figure out whether Decra's advisory is the right fit for your situation. What are you working on?" }
  ]);
  const [input, setInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (open && panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiLoading]);

  useEffect(() => {
    if (open && mode === "chat") setTimeout(() => inputRef.current?.focus(), 300);
  }, [open, mode]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || aiLoading) return;
    const newMessages: Message[] = [...messages, { role: "user", text }];
    setMessages(newMessages);
    setInput("");
    setAiLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      const reply = data.reply || "Something went wrong — you can reach Decra at hello@decrakero.com.";
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Connection issue — reach Decra at hello@decrakero.com or book a call directly." }]);
    } finally {
      setAiLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please email hello@decrakero.com directly.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .bubble-panel {
          position: fixed; bottom: 5.5rem; right: 1.5rem; width: 360px;
          background: #fff; border-radius: 20px; border: 1px solid var(--c-border);
          box-shadow: 0 24px 60px rgba(90,116,60,0.14), 0 4px 16px rgba(90,116,60,0.06);
          z-index: 9000; overflow: hidden; transform-origin: bottom right;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease;
          display: flex; flex-direction: column; max-height: 520px;
        }
        .bubble-panel.closed { transform: scale(0.88) translateY(8px); opacity: 0; pointer-events: none; }
        .bubble-panel.open { transform: scale(1) translateY(0); opacity: 1; }
        .bubble-btn {
          position: fixed; bottom: 1.5rem; right: 1.5rem;
          width: 3.25rem; height: 3.25rem; border-radius: 50%;
          background: var(--c-forest); color: white; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          z-index: 9001; box-shadow: 0 8px 24px rgba(90,116,60,0.30);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .bubble-btn:hover { transform: scale(1.08); box-shadow: 0 12px 32px rgba(90,116,60,0.38); }
        .bubble-field {
          width: 100%; background: var(--c-bg); border: 1px solid var(--c-border);
          border-radius: 8px; padding: 0.55rem 0.85rem;
          font-family: var(--font-manjari); font-size: 0.8rem; color: var(--c-ink);
          outline: none; transition: border-color 0.2s; resize: none;
        }
        .bubble-field:focus { border-color: var(--c-forest); }
        .bubble-label { display: block; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--c-ink-muted); margin-bottom: 0.35rem; }
        .chat-msg-user { background: var(--c-forest); color: rgba(248,246,241,0.92); border-radius: 14px 14px 4px 14px; padding: 0.55rem 0.85rem; font-size: 0.78rem; line-height: 1.55; max-width: 85%; align-self: flex-end; }
        .chat-msg-ai { background: var(--c-bg); border: 1px solid var(--c-border); border-radius: 14px 14px 14px 4px; padding: 0.55rem 0.85rem; font-size: 0.78rem; line-height: 1.55; color: var(--c-ink-mid); max-width: 85%; align-self: flex-start; }
        .mode-tab { flex: 1; padding: 0.5rem; font-family: var(--font-manjari); font-size: 0.65rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.2s, color 0.2s; }
        .mode-tab.active { background: var(--c-forest); color: rgba(248,246,241,0.9); }
        .mode-tab.inactive { background: rgba(90,116,60,0.04); color: var(--c-ink-muted); }
        .mode-tab.inactive:hover { background: rgba(90,116,60,0.08); }
        @keyframes bounce { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-5px); } }
        @media(max-width:420px) { .bubble-panel { width: calc(100vw - 2rem); right: 1rem; } }
      `}</style>

      <button className="bubble-btn" onClick={() => setOpen(v => !v)} aria-label="Chat with Decra's assistant">
        {open ? <X size={18} /> : <MessageCircle size={18} />}
      </button>

      <div ref={panelRef} className={`bubble-panel ${open ? "open" : "closed"}`}>
        {/* Header */}
        <div style={{ background: "var(--c-forest)", padding: "1.1rem 1.4rem", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(248,246,241,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.65rem", color: "var(--c-bg)" }}>DK</span>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.85rem", color: "var(--c-bg)" }}>Decra</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
                <span style={{ fontSize: "0.63rem", color: "rgba(248,246,241,0.5)" }}>AI assistant · replies instantly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mode tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--c-border)", flexShrink: 0 }}>
          <button className={`mode-tab ${mode === "chat" ? "active" : "inactive"}`} onClick={() => setMode("chat")}>Ask a question</button>
          <button className={`mode-tab ${mode === "contact" ? "active" : "inactive"}`} onClick={() => setMode("contact")}>Send a message</button>
        </div>

        {/* Chat mode */}
        {mode === "chat" && (
          <>
            <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "chat-msg-user" : "chat-msg-ai"}>{m.text}</div>
              ))}
              {aiLoading && (
                <div className="chat-msg-ai" style={{ display: "flex", gap: "4px", alignItems: "center", padding: "0.65rem 0.85rem" }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--c-ink-muted)", animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            <div style={{ padding: "0.75rem 1.25rem", borderTop: "1px solid var(--c-border)", display: "flex", gap: "0.5rem", flexShrink: 0 }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                placeholder="Ask anything…"
                style={{ flex: 1, background: "var(--c-bg)", border: "1px solid var(--c-border)", borderRadius: "8px", padding: "0.5rem 0.85rem", fontFamily: "var(--font-manjari)", fontSize: "0.78rem", color: "var(--c-ink)", outline: "none" }}
              />
              <button onClick={sendMessage} disabled={aiLoading || !input.trim()}
                style={{ background: "var(--c-forest)", border: "none", borderRadius: "8px", width: "2.25rem", height: "2.25rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: (!input.trim() || aiLoading) ? 0.4 : 1, transition: "opacity 0.2s", flexShrink: 0 }}>
                <Send size={13} color="white" />
              </button>
            </div>
            <div style={{ padding: "0.5rem 1.25rem 0.75rem", display: "flex", gap: "1rem", borderTop: "1px solid var(--c-border)" }}>
              <a href="mailto:hello@decrakero.com" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.65rem", color: "var(--c-ink-muted)", textDecoration: "none" }}>
                <Mail size={10} /> hello@decrakero.com
              </a>
              <a href="/book" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.65rem", color: "var(--c-forest)", fontWeight: 700, textDecoration: "none" }}>
                <ArrowRight size={10} /> Book a call
              </a>
            </div>
          </>
        )}

        {/* Contact form mode */}
        {mode === "contact" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1.5rem" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: "rgba(90,116,60,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.75rem" }}>
                  <span style={{ fontSize: "1.1rem" }}>✓</span>
                </div>
                <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.9rem", color: "var(--c-forest)", marginBottom: "0.3rem" }}>Message received.</p>
                <p style={{ fontSize: "0.72rem", color: "var(--c-ink-muted)" }}>I'll be in touch within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
                  <div>
                    <label className="bubble-label">Name</label>
                    <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="bubble-field" />
                  </div>
                  <div>
                    <label className="bubble-label">Email</label>
                    <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" className="bubble-field" />
                  </div>
                </div>
                <div>
                  <label className="bubble-label">Message</label>
                  <textarea required rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="What are you working on?" className="bubble-field" />
                </div>
                <button type="submit" disabled={formLoading}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", background: "var(--c-forest)", color: "white", border: "none", borderRadius: "8px", padding: "0.65rem", fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.06em", cursor: "pointer", opacity: formLoading ? 0.6 : 1, transition: "opacity 0.2s" }}>
                  {formLoading ? "Sending…" : <><span>Send Message</span><ArrowRight size={13} /></>}
                </button>
                <div style={{ display: "flex", gap: "1rem", paddingTop: "0.25rem" }}>
                  <a href="mailto:hello@decrakero.com" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.68rem", color: "var(--c-ink-muted)", textDecoration: "none" }}>
                    <Mail size={11} /> hello@decrakero.com
                  </a>
                  <a href="https://linkedin.com/in/decra-kerubo" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.68rem", color: "var(--c-ink-muted)", textDecoration: "none" }}>
                    <ExternalLink size={11} /> LinkedIn
                  </a>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </>
  );
}
