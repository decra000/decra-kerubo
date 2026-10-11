"use client";

import { FormEvent, useEffect, useState } from "react";
import { X } from "lucide-react";

type RSVP = { name: string; email: string; phone: string; dietary: string };

const emptyRSVP: RSVP = { name: "", email: "", phone: "", dietary: "" };

export function FestiveLunchPopup() {
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyRSVP);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("festive-lunch-seen")) return;
    const timer = window.setTimeout(() => setOpen(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("festive-lunch-seen", "1");
    setOpen(false);
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: "Festive lunch RSVP",
          message: `I'd love to join you for festive lunch with four other friends!\nPhone: ${form.phone.trim()}\nDietary notes: ${form.dietary.trim() || "None shared"}`,
        }),
      });
      if (!response.ok) throw new Error("Please try again in a moment.");
      setSent(true);
      sessionStorage.setItem("festive-lunch-seen", "1");
    } catch {
      setError("Your RSVP didn’t go through. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (!open) return null;

  const inputStyle: React.CSSProperties = {
    width: "100%", boxSizing: "border-box", padding: "0.8rem 0.9rem",
    border: "1px solid #d6c8a5", background: "#fffdf7",
    color: "#20392d", font: "inherit", fontSize: "0.85rem", outlineColor: "#b7892f",
  };

  return (
    <div
      role="presentation"
      onMouseDown={event => { if (event.target === event.currentTarget) dismiss(); }}
      style={{ position: "fixed", inset: 0, zIndex: 10000, display: "grid", placeItems: "center", padding: "1rem", background: "rgba(8,28,20,0.78)", backdropFilter: "blur(8px)" }}
    >
      <section role="dialog" aria-modal="true" aria-labelledby="festive-lunch-title" style={{ position: "relative", width: "min(100%, 470px)", maxHeight: "min(90vh, 760px)", overflowY: "auto", background: "#fff8e9", color: "#20392d", border: "3px solid #c94d3e", outline: "1px solid #d4aa4c", outlineOffset: "-9px", boxShadow: "0 24px 80px rgba(0,0,0,0.45)", padding: "clamp(1.7rem, 6vw, 2.9rem)" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: "0 0 auto", height: "8px", background: "linear-gradient(90deg,#1f704e 0 33%,#d4aa4c 33% 66%,#c94d3e 66%)" }} />
        <button type="button" onClick={dismiss} aria-label="Close invitation" style={{ position: "absolute", top: "1.1rem", right: "1.1rem", border: 0, background: "transparent", color: "#52675b", cursor: "pointer", padding: "0.35rem" }}><X size={18} /></button>
        <p style={{ margin: "0 2rem 1.1rem 0", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#a87920", fontWeight: 700 }}>✦ A little festive get-together ✦</p>
        <h2 id="festive-lunch-title" style={{ margin: "0 0 0.85rem", fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 7vw, 2.45rem)", lineHeight: 1.08, fontWeight: 400, color: "#214c38" }}>Hey, want to have lunch with me this festive season?</h2>
        <p style={{ margin: "0 0 1.5rem", color: "#52675b", fontSize: "0.92rem", lineHeight: 1.75 }}>I’m hosting a cosy lunch at my place with four other friends. Good food, easy conversation, and no pressure at all. I’d love to see you there!</p>

        {sent ? (
          <div role="status" style={{ padding: "1.1rem", background: "#e7f1e7", borderLeft: "3px solid #1f704e" }}>
            <p style={{ margin: "0 0 0.35rem", fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "#214c38" }}>Yay, I got your RSVP! 💛</p>
            <p style={{ margin: 0, color: "#52675b", fontSize: "0.82rem", lineHeight: 1.6 }}>I’ll be in touch with the details soon. Can’t wait!</p>
            <button type="button" onClick={dismiss} style={{ marginTop: "1rem", padding: 0, border: 0, background: "none", color: "#1f704e", cursor: "pointer", fontWeight: 700 }}>Close</button>
          </div>
        ) : showForm ? (
          <form onSubmit={submit} style={{ display: "grid", gap: "0.85rem" }}>
            <label style={{ display: "grid", gap: "0.35rem", fontSize: "0.75rem", color: "#52675b" }}>Your name<input required autoComplete="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} /></label>
            <label style={{ display: "grid", gap: "0.35rem", fontSize: "0.75rem", color: "#52675b" }}>Email address<input required type="email" autoComplete="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} /></label>
            <label style={{ display: "grid", gap: "0.35rem", fontSize: "0.75rem", color: "#52675b" }}>Phone number<input required type="tel" autoComplete="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} /></label>
            <label style={{ display: "grid", gap: "0.35rem", fontSize: "0.75rem", color: "#52675b" }}>Any dietary needs? <span style={{ fontWeight: 400 }}>(optional)</span><input value={form.dietary} onChange={e => setForm({ ...form, dietary: e.target.value })} style={inputStyle} /></label>
            {error && <p role="alert" style={{ margin: 0, color: "#b4473c", fontSize: "0.82rem" }}>{error}</p>}
            <button disabled={sending} type="submit" style={{ marginTop: "0.25rem", padding: "0.95rem 1rem", border: 0, background: "#1f704e", color: "#fff8e9", cursor: sending ? "wait" : "pointer", fontWeight: 700 }}>{sending ? "Sending your RSVP…" : "Send my RSVP ✨"}</button>
            <button type="button" onClick={() => setShowForm(false)} style={{ padding: "0.5rem", border: 0, background: "transparent", color: "#52675b", cursor: "pointer" }}>Back to invitation</button>
          </form>
        ) : (
          <div style={{ display: "grid", gap: "0.7rem" }}>
            <button type="button" onClick={() => setShowForm(true)} style={{ padding: "1rem", border: 0, background: "#1f704e", color: "#fff8e9", cursor: "pointer", fontWeight: 700, fontSize: "0.9rem" }}>I’m in! Save me a seat</button>
            <button type="button" onClick={dismiss} style={{ padding: "0.75rem", border: "1px solid #c94d3e", background: "#fff8e9", color: "#a53c32", cursor: "pointer" }}>Maybe another time</button>
            <p style={{ margin: "0.25rem 0 0", textAlign: "center", color: "#52675b", fontSize: "0.7rem" }}>Your details are only used to follow up about lunch.</p>
          </div>
        )}
      </section>
    </div>
  );
}
