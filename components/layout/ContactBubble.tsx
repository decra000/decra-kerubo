"use client";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Msg = { role: "user" | "assistant"; text: string };

export function ContactBubble() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "assistant", text: "What are you working on?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const inp = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => { if (open && panel.current && !panel.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [open]);

  useEffect(() => { bottom.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);
  useEffect(() => { if (open) setTimeout(() => inp.current?.focus(), 250); }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setMsgs(prev => [...prev, { role: "user", text }]);
    setInput(""); setLoading(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text, history: msgs }) });
      const d = await res.json();
      setMsgs(prev => [...prev, { role: "assistant", text: d.reply || "Email hello@decrakerubo.com" }]);
    } catch { setMsgs(prev => [...prev, { role: "assistant", text: "Email hello@decrakerubo.com directly." }]); }
    finally { setLoading(false); }
  };

  return (
    <>
      <style>{`
        .cb{position:fixed;bottom:5rem;right:1.5rem;width:320px;background:var(--c-bg);border:1px solid var(--c-border-strong);z-index:9000;display:flex;flex-direction:column;max-height:420px;transform-origin:bottom right;transition:transform 0.25s cubic-bezier(0.34,1.3,0.64,1),opacity 0.2s}
        .cb.off{transform:scale(0.9) translateY(8px);opacity:0;pointer-events:none}
        .cb.on{transform:scale(1);opacity:1}
        .fab{position:fixed;bottom:1.5rem;right:1.5rem;width:2.5rem;height:2.5rem;border-radius:50%;background:var(--c-ink);color:var(--c-bg);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:9001;transition:transform 0.2s}
        .fab:hover{transform:scale(1.08)}
        @keyframes bd2{0%,100%{opacity:0.3}50%{opacity:1}}
      `}</style>

      <button className="fab" onClick={() => setOpen(v => !v)}>
        {open ? <X size={14} strokeWidth={1.5} /> : <MessageCircle size={14} strokeWidth={1.5} />}
      </button>

      <div ref={panel} className={`cb ${open ? "on" : "off"}`}>
        <div style={{ padding: "1.1rem 1.25rem", borderBottom: "1px solid var(--c-border)" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.85rem", color: "var(--c-ink)" }}>Decra AI</p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "2px" }}>
            <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.6rem", color: "var(--c-ink-muted)" }}>Online</span>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "1.1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {msgs.map((m, i) => (
            <div key={i}>
              {m.role === "assistant" && <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.6rem", color: "var(--c-accent)", marginBottom: "0.2rem" }}>Decra AI</p>}
              <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.82rem", lineHeight: 1.7, color: m.role === "user" ? "var(--c-ink)" : "var(--c-ink-mid)", alignSelf: m.role === "user" ? "flex-end" : "flex-start" }}>{m.text}</p>
            </div>
          ))}
          {loading && <div style={{ display: "flex", gap: "3px" }}>{[0,1,2].map(j => <span key={j} style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--c-ink-muted)", animation: `bd2 1.2s ease ${j*0.2}s infinite` }} />)}</div>}
          <div ref={bottom} />
        </div>

        <div style={{ display: "flex", borderTop: "1px solid var(--c-border)", alignItems: "center" }}>
          <input ref={inp} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Ask anything..."
            style={{ flex: 1, background: "none", border: "none", padding: "0.8rem 1.1rem", fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.82rem", color: "var(--c-ink)", outline: "none" }} />
          <button onClick={send} disabled={!input.trim() || loading} style={{ background: "none", border: "none", cursor: input.trim() ? "pointer" : "default", color: input.trim() ? "var(--c-accent)" : "var(--c-ink-muted)", padding: "0 1rem", transition: "color 0.2s", lineHeight: 0 }}>
            <Send size={12} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </>
  );
}
