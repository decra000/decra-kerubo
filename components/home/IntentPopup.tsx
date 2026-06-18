"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

type Intent = "legal" | "founder" | "exploring" | null;

export function IntentPopup({ onSelect }: { onSelect: (i: Intent) => void }) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("intent");
    if (!seen) setTimeout(() => setVisible(true), 1200);
    else onSelect(seen as Intent);
  }, []);

  const choose = (intent: Intent) => {
    sessionStorage.setItem("intent", intent || "exploring");
    setClosing(true);
    setTimeout(() => { setVisible(false); onSelect(intent); }, 350);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999,
      background: "rgba(12,10,8,0.6)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1.5rem",
      opacity: closing ? 0 : 1, transition: "opacity 0.35s ease",
    }}>
      <div style={{
        background: "var(--c-surface)", border: "1px solid var(--c-border)",
        padding: "3rem 3.5rem", maxWidth: "380px", width: "100%",
        transform: closing ? "translateY(8px) scale(0.97)" : "none",
        transition: "transform 0.35s ease", position: "relative",
      }}>
        <button onClick={() => choose("exploring")} style={{
          position: "absolute", top: "1.25rem", right: "1.25rem",
          background: "none", border: "none", cursor: "pointer",
          color: "var(--c-ink-muted)", lineHeight: 0,
        }}>
          <X size={14} />
        </button>

        <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--c-ink-muted)", marginBottom: "1.5rem" }}>Welcome</p>

        <h2 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.6rem", color: "var(--c-ink)", lineHeight: 1.15, marginBottom: "0.5rem" }}>
          What brings you here?
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--c-ink-muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
          One click — I'll show you what's most relevant.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--c-border)" }}>
          {[
            { intent: "legal" as Intent,     label: "I need legal help",        sub: "Startup, NGO, or tech compliance" },
            { intent: "founder" as Intent,   label: "I'm a founder or builder", sub: "Structure, fundraising, growth" },
            { intent: "exploring" as Intent, label: "Just exploring your work",  sub: "Get the full picture" },
          ].map(opt => (
            <button key={opt.intent} onClick={() => choose(opt.intent)} style={{
              display: "flex", flexDirection: "column", alignItems: "flex-start",
              padding: "1.1rem 1.25rem",
              background: "var(--c-bg)", border: "none", cursor: "pointer",
              textAlign: "left", width: "100%", transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--c-surface2)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--c-bg)"}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 500, color: "var(--c-ink)", marginBottom: "0.15rem" }}>{opt.label}</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--c-ink-muted)" }}>{opt.sub}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
