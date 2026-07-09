"use client";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Mic, Volume2, VolumeX } from "lucide-react";
import { useSpeech } from "@/hooks/useSpeech";

type Msg = { role: "user" | "assistant"; text: string };

export function ContactBubble() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "assistant", text: "What are you working on?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const inp = useRef<HTMLInputElement>(null);
  const { listen, stopListening, listening, supported, speak, stopSpeaking, speaking, synthSupported } = useSpeech();

  useEffect(() => {
    const fn = (e: MouseEvent) => { if (open && panel.current && !panel.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [open]);
  useEffect(() => { bottom.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);
  useEffect(() => { if (open) setTimeout(() => inp.current?.focus(), 200); }, [open]);
  useEffect(() => { if (!open) stopSpeaking(); }, [open, stopSpeaking]);

  const send = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;
    setMsgs(prev => [...prev, { role: "user", text }]);
    setInput(""); setLoading(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text, history: msgs }) });
      const d = await res.json();
      const reply = d.reply || "Email hello@decrakerubo.com";
      setMsgs(prev => [...prev, { role: "assistant", text: reply }]);
      if (voiceOn) speak(reply);
    } catch {
      const reply = "Email hello@decrakerubo.com directly.";
      setMsgs(prev => [...prev, { role: "assistant", text: reply }]);
      if (voiceOn) speak(reply);
    } finally { setLoading(false); }
  };

  const handleMic = () => {
    if (listening) { stopListening(); return; }
    listen((text) => { setInput(text); send(text); });
  };

  return (
    <>
      <style>{`
        .cb{position:fixed;bottom:5rem;right:1.5rem;width:310px;max-width:calc(100vw - 2rem);background:var(--c-bg);border:1px solid var(--c-border-strong);z-index:9000;display:flex;flex-direction:column;max-height:400px;transform-origin:bottom right;transition:transform 0.25s cubic-bezier(0.34,1.3,0.64,1),opacity 0.2s}
        @media(max-width:400px){.cb{right:1rem;left:1rem;width:auto;max-width:none}}
        .cb.off{transform:scale(0.9) translateY(8px);opacity:0;pointer-events:none}
        .cb.on{transform:scale(1);opacity:1}
        .fab{position:fixed;bottom:1.5rem;right:1.5rem;width:2.5rem;height:2.5rem;border-radius:50%;background:var(--c-ink);color:var(--c-bg);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:9001;transition:transform 0.4s cubic-bezier(0.34,1.3,0.64,1),opacity 0.3s ease,background 0.2s}
        .fab:hover{background:var(--c-accent);transform:scale(1.06)}
        .fab.open{transform:translateY(-3.4rem) scale(0.4);opacity:0;pointer-events:none}
        .wa-fab{position:fixed;bottom:4.5rem;right:1.5rem;width:2.5rem;height:2.5rem;border-radius:50%;background:#25D366;color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:9001;transition:transform 0.4s cubic-bezier(0.34,1.3,0.64,1),opacity 0.3s ease}
        .wa-fab:hover{transform:scale(1.06)}
        .wa-fab.hide{transform:translateY(-3.4rem) scale(0.4);opacity:0;pointer-events:none}
        .wa-tip{position:absolute;right:calc(100% + 0.7rem);top:50%;transform:translateY(-50%) translateX(4px);white-space:nowrap;background:var(--c-ink);color:var(--c-bg);font-family:var(--font-manjari);font-weight:700;font-size:0.6rem;letter-spacing:0.06em;padding:0.45rem 0.7rem;border-radius:3px;opacity:0;pointer-events:none;transition:opacity 0.2s ease,transform 0.2s ease}
        .wa-fab:hover .wa-tip{opacity:1;transform:translateY(-50%) translateX(0)}
        @keyframes bd3{0%,100%{opacity:0.3}50%{opacity:1}}
      `}</style>

      <a
        href="https://wa.me/qr/A2UFLHLZDAPJM1"
        target="_blank"
        rel="noopener noreferrer"
        className={`wa-fab ${open ? "hide" : ""}`}
        aria-label="Send Decra a direct message on WhatsApp"
      >
        <span className="wa-tip">Send direct message</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.44.79 3.06 1.2 4.72 1.2h.02c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2zm0 18.13h-.02c-1.47 0-2.92-.4-4.19-1.14l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.17 8.17 0 0 1 2.41 5.83c0 4.55-3.7 8.21-8.24 8.21zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.2 3.71.59.25 1.04.4 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29z"/>
        </svg>
      </a>

      <button className={`fab ${open ? "open" : ""}`} onClick={() => setOpen(v => !v)} aria-label="Chat with Decra AI">
        {open ? <X size={14} strokeWidth={1.5} /> : <MessageCircle size={14} strokeWidth={1.5} />}
      </button>

      <div ref={panel} className={`cb ${open ? "on" : "off"}`}>
        <div style={{ padding: "1rem 1.2rem", borderBottom: "1px solid var(--c-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.85rem", color: "var(--c-ink)" }}>Decra AI</p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "2px" }}>
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#4ade80" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.58rem", color: "var(--c-ink-muted)" }}>Online</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {synthSupported && (
              <button onClick={() => { if (voiceOn) stopSpeaking(); setVoiceOn(v => !v); }}
                aria-label={voiceOn ? "Turn off spoken replies" : "Turn on spoken replies"}
                title={voiceOn ? "Spoken replies on" : "Spoken replies off"}
                style={{ background: "none", border: "none", cursor: "pointer", color: voiceOn ? "var(--c-accent)" : "var(--c-ink-muted)", lineHeight: 0, transition: "color 0.2s", animation: speaking ? "bd3 1s ease infinite" : "none" }}>
                {voiceOn ? <Volume2 size={13} strokeWidth={1.5} /> : <VolumeX size={13} strokeWidth={1.5} />}
              </button>
            )}
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--c-ink-muted)", lineHeight: 0 }}>
              <X size={12} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "1.1rem 1.2rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {msgs.map((m, i) => (
            <div key={i}>
              {m.role === "assistant" && <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.6rem", color: "var(--c-accent)", marginBottom: "0.2rem" }}>Decra AI</p>}
              <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.82rem", lineHeight: 1.7, color: m.role === "user" ? "var(--c-ink)" : "var(--c-ink-mid)" }}>{m.text}</p>
            </div>
          ))}
          {loading && <div style={{ display: "flex", gap: "3px" }}>{[0,1,2].map(j => <span key={j} style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--c-ink-muted)", animation: `bd3 1.2s ease ${j*0.2}s infinite` }} />)}</div>}
          <div ref={bottom} />
        </div>

        <div style={{ display: "flex", borderTop: "1px solid var(--c-border)", alignItems: "center" }}>
          <input ref={inp} value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder={listening ? "Listening…" : "Ask anything..."}
            style={{ flex: 1, background: "none", border: "none", padding: "0.8rem 1.1rem", fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.82rem", color: "var(--c-ink)", outline: "none" }} />
          {supported && (
            <button onClick={handleMic} aria-label={listening ? "Stop listening" : "Speak your message"}
              style={{ background: "none", border: "none", cursor: "pointer", color: listening ? "#e05252" : "var(--c-ink-muted)", padding: "0 0.5rem", lineHeight: 0, animation: listening ? "bd3 1s ease infinite" : "none" }}>
              <Mic size={13} strokeWidth={1.5} />
            </button>
          )}
          <button onClick={() => send()} disabled={!input.trim() || loading} style={{ background: "none", border: "none", cursor: input.trim() ? "pointer" : "default", color: input.trim() ? "var(--c-accent)" : "var(--c-ink-muted)", padding: "0 1rem", transition: "color 0.2s", lineHeight: 0 }}>
            <Send size={12} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </>
  );
}
