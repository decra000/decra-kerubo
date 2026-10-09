"use client";
import { useEffect, useState } from "react";

type Intent = "legal" | "founder" | "exploring" | null;

export function IntentPopup({ onSelect }: { onSelect: (i: Intent) => void }) {
  const [vis, setVis] = useState(false);
  const [out, setOut] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("intent");
    if (!seen) setTimeout(() => setVis(true), 1000);
    else onSelect(seen as Intent);
  }, []);

  const choose = (intent: Intent) => {
    sessionStorage.setItem("intent", intent || "exploring");
    setOut(true);
    setTimeout(() => { setVis(false); onSelect(intent); }, 300);
  };

  if (!vis) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999,
      background: "rgba(8,8,8,0.7)", backdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem",
      opacity: out ? 0 : 1, transition: "opacity 0.3s",
    }} onClick={() => choose("exploring")}>
      <div style={{
        background: "var(--c-bg)", border: "1px solid var(--c-border)",
        padding: "3rem", maxWidth: "360px", width: "100%",
        transform: out ? "translateY(10px)" : "none", transition: "transform 0.3s",
      }} onClick={e => e.stopPropagation()}>

        <p className="label" style={{ marginBottom: "1.5rem" }}>Welcome</p>
        <h2 style={{
          fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
          fontSize: "1.5rem", color: "var(--c-ink)", lineHeight: 1.15, marginBottom: "2rem",
        }}>What brings you here?</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          {[
            { v: "legal"    as Intent, l: "I need legal help",        s: "Startup, NGO, or tech compliance" },
            { v: "founder"  as Intent, l: "I'm a founder or builder", s: "Structure, fundraising, growth" },
            { v: "exploring"as Intent, l: "Just exploring",            s: "Get the full picture" },
          ].map(opt => (
            <button key={opt.v} onClick={() => choose(opt.v)} style={{
              display: "flex", flexDirection: "column", alignItems: "flex-start",
              padding: "1.1rem 0", background: "none", border: "none",
              borderBottom: "1px solid var(--c-border)",
              cursor: "pointer", textAlign: "left",
              transition: "padding-left 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.paddingLeft = "0.5rem"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.paddingLeft = "0"}>
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.875rem", color: "var(--c-ink)", marginBottom: "0.15rem" }}>{opt.l}</span>
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.72rem", color: "var(--c-ink-muted)" }}>{opt.s}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
