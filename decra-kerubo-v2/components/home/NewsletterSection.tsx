"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, name }) });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch { setError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <section className="section page-x" style={{ background: "var(--c-forest)" }}>
      <div className="inner" style={{ maxWidth: "42rem" }}>
        <span className="t-label" style={{ display: "block", marginBottom: "1.25rem" }}>Free Resource</span>
        <h2 className="t-display t-display-lg" style={{ color: "rgba(248,246,241,0.92)", marginBottom: "1rem" }}>
          The AI Readiness Guide for Startups & NGOs
        </h2>
        <p style={{ fontSize: "0.825rem", color: "rgba(248,246,241,0.5)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
          A practical framework for assessing AI readiness, avoiding common adoption mistakes, and building a responsible AI strategy. Free. No fluff.
        </p>

        {submitted ? (
          <div style={{ background: "rgba(248,246,241,0.06)", border: "1px solid rgba(248,246,241,0.10)", borderRadius: "12px", padding: "2rem" }}>
            <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "1rem", color: "rgba(248,246,241,0.9)", marginBottom: "0.4rem" }}>Your guide is on its way.</p>
            <p style={{ fontSize: "0.75rem", color: "rgba(248,246,241,0.45)" }}>Check your inbox — and your spam folder just in case.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            <input type="text" placeholder="First name" value={name} onChange={e => setName(e.target.value)}
              style={{ flex: "1 1 140px", background: "rgba(248,246,241,0.06)", border: "1px solid rgba(248,246,241,0.12)", borderRadius: "8px", padding: "0.65rem 1rem", fontFamily: "var(--font-manjari)", fontSize: "0.8rem", color: "rgba(248,246,241,0.9)", outline: "none" }}
            />
            <input type="email" required placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
              style={{ flex: "2 1 200px", background: "rgba(248,246,241,0.06)", border: "1px solid rgba(248,246,241,0.12)", borderRadius: "8px", padding: "0.65rem 1rem", fontFamily: "var(--font-manjari)", fontSize: "0.8rem", color: "rgba(248,246,241,0.9)", outline: "none" }}
            />
            <button type="submit" disabled={loading}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", background: "var(--c-gold)", color: "var(--c-forest)", fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.06em", padding: "0.65rem 1.4rem", borderRadius: "8px", border: "none", cursor: "pointer", whiteSpace: "nowrap", opacity: loading ? 0.6 : 1 }}
            >
              {loading ? "Sending..." : <>Get the Guide <ArrowRight size={12} /></>}
            </button>
          </form>
        )}
        {error && <p style={{ fontSize: "0.7rem", color: "#f87171", marginTop: "0.75rem" }}>{error}</p>}
        <p style={{ fontSize: "0.65rem", color: "rgba(248,246,241,0.3)", marginTop: "1rem" }}>No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
