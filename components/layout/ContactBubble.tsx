"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Message = { role: "user" | "assistant"; text: string };

export function ContactBubble() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi — what are you working on? I can point you in the right direction." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (open && panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 300); }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const newMessages: Message[] = [...messages, { role: "user", text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", text: data.reply || "Reach Decra at hello@decrakerubo.com" }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Connection issue — email hello@decrakerubo.com directly." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .cb-panel {
          position:fixed; bottom:5rem; right:1.5rem; width:340px;
          background:var(--c-surface); border:1px solid var(--c-border);
          box-shadow:var(--shadow-lg); z-index:9000;
          overflow:hidden; transform-origin:bottom right;
          transition:transform 0.28s cubic-bezier(0.34,1.3,0.64,1),opacity 0.2s;
          display:flex; flex-direction:column; max-height:460px;
        }
        .cb-panel.closed{transform:scale(0.9) translateY(8px);opacity:0;pointer-events:none}
        .cb-panel.open{transform:scale(1);opacity:1}
        .cb-btn{
          position:fixed;bottom:1.5rem;right:1.5rem;
          width:2.75rem;height:2.75rem;border-radius:50%;
          background:var(--c-ink);color:var(--c-bg);
          border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;
          z-index:9001;box-shadow:var(--shadow-md);transition:transform 0.2s,background 0.2s;
        }
        .cb-btn:hover{transform:scale(1.08);background:var(--c-accent)}
        .msg-user{
          background:var(--c-ink);color:var(--c-bg);
          padding:0.6rem 0.9rem;font-family:var(--font-sans);font-size:0.82rem;line-height:1.55;
          max-width:85%;align-self:flex-end;
        }
        .msg-ai{
          background:transparent;border:1px solid var(--c-border);
          padding:0.6rem 0.9rem;font-family:var(--font-sans);font-size:0.82rem;line-height:1.55;
          color:var(--c-ink-mid);max-width:85%;align-self:flex-start;
        }
        @keyframes cb-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-3px)}}
        @media(max-width:420px){.cb-panel{width:calc(100vw - 2rem);right:1rem}}
      `}</style>

      <button className="cb-btn" onClick={() => setOpen(v => !v)}>
        {open ? <X size={15} /> : <MessageCircle size={15} />}
      </button>

      <div ref={panelRef} className={`cb-panel ${open ? "open" : "closed"}`}>
        {/* Header */}
        <div style={{ background: "var(--c-ink)", padding: "1rem 1.25rem", flexShrink: 0, borderBottom: "1px solid rgba(245,237,216,0.06)" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.9rem", color: "var(--c-bg)", marginBottom: "0.1rem" }}>Decra AI</p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.62rem", color: "rgba(245,237,216,0.35)" }}>Online · replies instantly</span>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {messages.map((m, i) => <div key={i} className={m.role === "user" ? "msg-user" : "msg-ai"}>{m.text}</div>)}
          {loading && (
            <div className="msg-ai" style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              {[0,1,2].map(i => <div key={i} style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--c-ink-muted)", animation: `cb-bounce 1.2s ease-in-out ${i*0.2}s infinite` }} />)}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ display: "flex", borderTop: "1px solid var(--c-border)", flexShrink: 0 }}>
          <input ref={inputRef} type="text" value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); sendMessage(); } }}
            placeholder="Ask anything..."
            style={{ flex: 1, background: "var(--c-surface)", border: "none", padding: "0.75rem 1rem", fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--c-ink)", outline: "none" }} />
          <button onClick={sendMessage} disabled={loading || !input.trim()} style={{
            background: input.trim() ? "var(--c-accent)" : "var(--c-surface)",
            border: "none", borderLeft: "1px solid var(--c-border)",
            width: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: input.trim() ? "pointer" : "default", transition: "background 0.2s",
          }}>
            <Send size={12} color={input.trim() ? "#0C0A08" : "var(--c-ink-muted)"} />
          </button>
        </div>

        <div style={{ padding: "0.5rem 1rem 0.65rem", borderTop: "1px solid var(--c-border)", display: "flex", gap: "1.25rem" }}>
          <a href="mailto:hello@decrakerubo.com" style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", color: "var(--c-ink-muted)", textDecoration: "none" }}>hello@decrakerubo.com</a>
          <a href="/book" style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-accent)", textDecoration: "none" }}>Book a Call</a>
        </div>
      </div>
    </>
  );
}
