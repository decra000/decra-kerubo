"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, ArrowRight, Mail, Send } from "lucide-react";

type Mode = "chat" | "contact";
type Message = { role: "user" | "assistant"; text: string };

export function ContactBubble() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("chat");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi — I can help you figure out if Decra's advisory is the right fit. What are you working on?" }
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

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, aiLoading]);
  useEffect(() => { if (open && mode === "chat") setTimeout(() => inputRef.current?.focus(), 300); }, [open, mode]);

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
      setMessages(prev => [...prev, { role: "assistant", text: data.reply || "Reach Decra at hello@decrakerubo.com" }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Connection issue — email hello@decrakerubo.com directly." }]);
    } finally {
      setAiLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      setSubmitted(true);
    } catch { alert("Please email hello@decrakerubo.com directly."); }
    finally { setFormLoading(false); }
  };

  return (
    <>
      <style>{`
        .cb-panel {
          position:fixed; bottom:5.5rem; right:1.5rem; width:360px;
          background:var(--c-surface); border:1px solid var(--c-border);
          border-radius:4px; box-shadow:var(--shadow-lg); z-index:9000;
          overflow:hidden; transform-origin:bottom right;
          transition:transform 0.25s cubic-bezier(0.34,1.56,0.64,1),opacity 0.2s;
          display:flex; flex-direction:column; max-height:520px;
        }
        .cb-panel.closed{transform:scale(0.88) translateY(8px);opacity:0;pointer-events:none}
        .cb-panel.open{transform:scale(1) translateY(0);opacity:1}
        .cb-btn{position:fixed;bottom:1.5rem;right:1.5rem;width:3.25rem;height:3.25rem;border-radius:50%;background:var(--c-ink);color:var(--c-bg);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:9001;box-shadow:var(--shadow-lg);transition:transform 0.2s}
        .cb-btn:hover{transform:scale(1.08)}
        .cb-tab{flex:1;padding:0.5rem;font-family:var(--font-sans);font-size:0.65rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;border:none;cursor:pointer;transition:background 0.2s,color 0.2s}
        .cb-tab.active{background:var(--c-ink);color:var(--c-bg)}
        .cb-tab.inactive{background:var(--c-surface2);color:var(--c-ink-muted)}
        .cb-tab.inactive:hover{background:var(--c-surface)}
        .msg-user{background:var(--c-ink);color:var(--c-bg);border-radius:12px 12px 3px 12px;padding:0.55rem 0.85rem;font-size:0.82rem;line-height:1.55;max-width:85%;align-self:flex-end;font-family:var(--font-sans)}
        .msg-ai{background:var(--c-surface2);border:1px solid var(--c-border);border-radius:12px 12px 12px 3px;padding:0.55rem 0.85rem;font-size:0.82rem;line-height:1.55;color:var(--c-ink-mid);max-width:85%;align-self:flex-start;font-family:var(--font-sans)}
        @keyframes cb-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-4px)}}
        @media(max-width:420px){.cb-panel{width:calc(100vw - 2rem);right:1rem}}
      `}</style>

      <button className="cb-btn" onClick={() => setOpen(v => !v)} aria-label="Chat">
        {open ? <X size={17} /> : <MessageCircle size={17} />}
      </button>

      <div ref={panelRef} className={`cb-panel ${open ? "open" : "closed"}`}>
        {/* Header */}
        <div style={{ background: "var(--c-ink)", padding: "1rem 1.25rem", flexShrink: 0, display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(247,247,245,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.75rem", color: "var(--c-bg)" }}>D</span>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.9rem", color: "var(--c-bg)" }}>Decra</p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80" }} />
              <span style={{ fontSize: "0.65rem", color: "rgba(247,247,245,0.45)", fontFamily: "var(--font-sans)" }}>AI assistant · replies instantly</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--c-border)", flexShrink: 0 }}>
          <button className={`cb-tab ${mode === "chat" ? "active" : "inactive"}`} onClick={() => setMode("chat")}>Ask a question</button>
          <button className={`cb-tab ${mode === "contact" ? "active" : "inactive"}`} onClick={() => setMode("contact")}>Send a message</button>
        </div>

        {/* Chat */}
        {mode === "chat" && (
          <>
            <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {messages.map((m, i) => <div key={i} className={m.role === "user" ? "msg-user" : "msg-ai"}>{m.text}</div>)}
              {aiLoading && (
                <div className="msg-ai" style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                  {[0,1,2].map(i => <div key={i} style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--c-ink-muted)", animation: `cb-bounce 1.2s ease-in-out ${i*0.2}s infinite` }} />)}
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            <div style={{ padding: "0.7rem 1.1rem", borderTop: "1px solid var(--c-border)", display: "flex", gap: "0.5rem", flexShrink: 0 }}>
              <input ref={inputRef} type="text" value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); sendMessage(); } }}
                placeholder="Ask anything…"
                style={{ flex: 1, background: "var(--c-surface2)", border: "1px solid var(--c-border)", borderRadius: "2px", padding: "0.5rem 0.85rem", fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--c-ink)", outline: "none" }} />
              <button onClick={sendMessage} disabled={aiLoading || !input.trim()}
                style={{ background: "var(--c-ink)", border: "none", borderRadius: "2px", width: "2.25rem", height: "2.25rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: (!input.trim() || aiLoading) ? 0.35 : 1, flexShrink: 0 }}>
                <Send size={13} color="var(--c-bg)" />
              </button>
            </div>
            <div style={{ padding: "0.5rem 1.1rem 0.7rem", display: "flex", gap: "1rem", borderTop: "1px solid var(--c-border)" }}>
              <a href="mailto:hello@decrakerubo.com" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.68rem", color: "var(--c-ink-muted)", textDecoration: "none", fontFamily: "var(--font-sans)" }}>
                <Mail size={10} /> hello@decrakerubo.com
              </a>
              <a href="/book" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.68rem", color: "var(--c-accent)", fontWeight: 600, textDecoration: "none", fontFamily: "var(--font-sans)" }}>
                <ArrowRight size={10} /> Book a call
              </a>
            </div>
          </>
        )}

        {/* Contact form */}
        {mode === "contact" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1.35rem" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1rem", color: "var(--c-ink)", marginBottom: "0.4rem" }}>Message received.</p>
                <p style={{ fontSize: "0.78rem", color: "var(--c-ink-muted)", fontFamily: "var(--font-sans)" }}>I'll be in touch within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                  {[{ k: "name", l: "Name", t: "text", p: "Your name" }, { k: "email", l: "Email", t: "email", p: "you@email.com" }].map(f => (
                    <div key={f.k}>
                      <label style={{ display: "block", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-ink-muted)", marginBottom: "0.35rem", fontFamily: "var(--font-sans)" }}>{f.l}</label>
                      <input required type={f.t} placeholder={f.p} value={(form as any)[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })}
                        style={{ width: "100%", background: "var(--c-surface2)", border: "1px solid var(--c-border)", borderRadius: "2px", padding: "0.5rem 0.75rem", fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--c-ink)", outline: "none" }} />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-ink-muted)", marginBottom: "0.35rem", fontFamily: "var(--font-sans)" }}>Message</label>
                  <textarea required rows={4} placeholder="What are you working on?" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ width: "100%", background: "var(--c-surface2)", border: "1px solid var(--c-border)", borderRadius: "2px", padding: "0.5rem 0.75rem", fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--c-ink)", outline: "none", resize: "none" }} />
                </div>
                <button type="submit" disabled={formLoading}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", background: "var(--c-ink)", color: "var(--c-bg)", border: "none", borderRadius: "2px", padding: "0.7rem", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", opacity: formLoading ? 0.6 : 1 }}>
                  {formLoading ? "Sending…" : <><span>Send</span><ArrowRight size={12} /></>}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </>
  );
}
