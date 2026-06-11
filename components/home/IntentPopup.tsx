"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

type Intent = "legal" | "founder" | "exploring" | null;

export function IntentPopup({ onSelect }: { onSelect: (i: Intent) => void }) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("intent");
    if (!seen) setTimeout(() => setVisible(true), 900);
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
      background: "rgba(0,0,0,0.35)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1.5rem",
      opacity: closing ? 0 : 1, transition: "opacity 0.35s ease",
    }}>
      <div style={{
        background: "var(--c-surface)", border: "1px solid var(--c-border)",
        borderRadius: "4px", padding: "2.5rem 2.75rem",
        maxWidth: "420px", width: "100%",
        boxShadow: "var(--shadow-lg)",
        transform: closing ? "translateY(8px) scale(0.97)" : "translateY(0) scale(1)",
        transition: "transform 0.35s ease",
        position: "relative",
      }}>
        <button onClick={() => choose("exploring")} style={{ position: "absolute", top: "1.1rem", right: "1.1rem", background: "none", border: "none", cursor: "pointer", color: "var(--c-ink-muted)" }}>
          <X size={16} />
        </button>

        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--c-ink-muted)", marginBottom: "1.25rem" }}>Welcome</p>

        <h2 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.6rem", color: "var(--c-ink)", lineHeight: 1.2, marginBottom: "0.75rem" }}>
          What brings you here?
        </h2>
        <p style={{ fontSize: "0.875rem", color: "var(--c-ink-muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
          One click — I'll show you what's most relevant.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          {[
            { intent: "legal" as Intent,     label: "I need legal help",          sub: "Startup, NGO, or tech compliance" },
            { intent: "founder" as Intent,   label: "I'm a founder or builder",   sub: "Company structure, fundraising, growth" },
            { intent: "exploring" as Intent, label: "Just exploring your work",   sub: "Get the full picture" },
          ].map(opt => (
            <button key={opt.intent} onClick={() => choose(opt.intent)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "flex-start",
                padding: "1rem 1.15rem", background: "var(--c-bg)",
                border: "1px solid var(--c-border)", borderRadius: "3px",
                cursor: "pointer", textAlign: "left", width: "100%",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"; (e.currentTarget as HTMLElement).style.background = "var(--c-surface2)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"; (e.currentTarget as HTMLElement).style.background = "var(--c-bg)"; }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 600, color: "var(--c-ink)", marginBottom: "0.2rem" }}>{opt.label}</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--c-ink-muted)" }}>{opt.sub}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
