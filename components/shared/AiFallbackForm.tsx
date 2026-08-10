"use client";
import { useState } from "react";

const inputStyle: React.CSSProperties = {
  width: "100%", background: "var(--c-bg)", border: "1px solid var(--c-border-strong)",
  borderRadius: "6px", padding: "0.6rem 0.75rem", fontFamily: "var(--font-sans)",
  fontWeight: 400, fontSize: "0.8rem", color: "var(--c-ink)", outline: "none",
};

/**
 * Drop-in fallback for any spot that normally talks to /api/chat.
 * Shown when the AI assistant is down (missing/expired credentials, repeated
 * errors, etc.) so a visitor's message is never simply lost. Posts straight
 * to /api/intake, the same place a completed AI conversation would land.
 */
export function AiFallbackForm({
  engagement,
  note = "The assistant isn't responding right now. Leave your details and Decra will follow up directly.",
  onSent,
}: {
  engagement?: string;
  note?: string;
  onSent?: () => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const submit = async () => {
    if (!form.name.trim() || !form.email.trim() || sending) return;
    setSending(true);
    setError(false);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          summary: form.message.trim() || "No message provided, the assistant was unavailable when they reached out.",
          engagement: engagement ? `${engagement} (assistant unavailable, submitted via fallback form)` : "assistant-unavailable",
        }),
      });
      if (!res.ok) throw new Error("intake failed");
      setSent(true);
      onSent?.();
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--c-accent)", padding: "0.5rem 0" }}>
        Sent, Decra will follow up by email shortly.
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", background: "var(--c-surface)", border: "1px solid var(--c-border-strong)", borderRadius: "10px", padding: "1rem" }}>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.76rem", color: "var(--c-ink-muted)", lineHeight: 1.6 }}>{note}</p>
      <input placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} />
      <input placeholder="Your email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} />
      <textarea placeholder="What did you need help with? (optional)" rows={2} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{ ...inputStyle, resize: "none" }} />
      <button
        onClick={submit}
        disabled={!form.name.trim() || !form.email.trim() || sending}
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
          background: "var(--c-accent)", color: "var(--c-bg)", border: "none", borderRadius: "999px",
          padding: "0.6rem 1rem", cursor: "pointer",
          opacity: (!form.name.trim() || !form.email.trim() || sending) ? 0.5 : 1,
          fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.06em",
        }}
      >
        {sending ? "Sending..." : "Send to Decra"}
      </button>
      {error && (
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "#c0392b" }}>
          Couldn&apos;t send that, email hello@decrakerubo.com directly instead.
        </p>
      )}
    </div>
  );
}
