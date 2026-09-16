"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { TIME_SLOTS } from "@/lib/types";

const inputStyle: React.CSSProperties = {
  width: "100%", background: "var(--c-surface)", border: "1px solid var(--c-border)",
  borderRadius: 0, padding: "0.6rem 0.75rem", fontFamily: "var(--font-sans)",
  fontWeight: 400, fontSize: "0.8rem", color: "var(--c-ink)", outline: "none",
};

/** Inline demo-booking form, posts straight to /api/book (a free consultation type, no payment step). */
export function DemoBookingForm({ consultationType, productLabel }: { consultationType: string; productLabel: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const [minDate] = useState(() => new Date(Date.now() + 86400000).toISOString().split("T")[0]);
  const canSubmit = name.trim() && email.trim() && date && time && !sending;

  const submit = async () => {
    if (!canSubmit) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email,
          primary_challenge: `Demo request for ${productLabel}`,
          desired_outcome: `A walkthrough of ${productLabel}`,
          consultation_type: consultationType,
          scheduled_at: `${date}T${time}:00+03:00`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "1rem", border: "1px solid var(--c-border-strong)" }}>
        <CheckCircle2 size={16} color="var(--c-forest)" strokeWidth={2} />
        <p style={{ fontSize: "0.8rem", color: "var(--c-ink)" }}>
          Request sent. Decra will confirm the slot by email.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
      <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
      <input placeholder="Your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
      <input
        type="date"
        min={minDate}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={inputStyle}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
        {TIME_SLOTS.map((slot) => (
          <button
            key={slot.value}
            type="button"
            onClick={() => setTime(slot.value)}
            style={{
              padding: "0.5rem", fontSize: "0.72rem", cursor: "pointer",
              fontFamily: "var(--font-manjari)", borderRadius: 0,
              border: `1px solid ${time === slot.value ? "var(--c-forest)" : "var(--c-border)"}`,
              background: time === slot.value ? "var(--c-forest)" : "transparent",
              color: time === slot.value ? "white" : "var(--c-ink-mid)",
            }}
          >
            {slot.label}
          </button>
        ))}
      </div>
      {error && <p style={{ fontSize: "0.72rem", color: "#c0392b" }}>{error}</p>}
      <button
        type="button"
        onClick={submit}
        disabled={!canSubmit}
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
          width: "100%", background: "var(--c-forest)", color: "rgba(248,246,241,0.95)",
          fontFamily: "var(--font-manjari)", fontWeight: 700,
          fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase",
          padding: "0.85rem 1.5rem", borderRadius: 0, border: "none",
          cursor: canSubmit ? "pointer" : "default", opacity: canSubmit ? 1 : 0.5,
        }}
      >
        {sending ? "Sending…" : "Book a demo"}
      </button>
    </div>
  );
}
