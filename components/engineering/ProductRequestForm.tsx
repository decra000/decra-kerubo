"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function ProductRequestForm({ product }: { product: "Teresya Extension" | "Cyberbullying Detection" }) {
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submit(formData: FormData) {
    setBusy(true);
    setError("");
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const org = String(formData.get("organization") || "").trim();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, org,
          subject: `Product access request: ${product}`,
          message: `Please contact me about requesting access to ${product}.${org ? ` Organisation: ${org}.` : ""}`,
        }),
      });
      if (!response.ok) throw new Error("Request could not be sent. Please try again or use the Talk page.");
      setSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request could not be sent. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) return (
    <div role="status" style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "1rem 1.2rem", border: "1px solid var(--c-border-strong)", color: "var(--c-forest)" }}>
      <Check size={16} /> <span className="t-body-sm">Request received. Decra will follow up by email.</span>
    </div>
  );

  return (
    <form action={submit} className="product-request-form" style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "0.8rem", width: "100%" }}>
      <label className="t-body-sm" style={{ display: "grid", gap: "0.35rem" }}>Name
        <input name="name" required maxLength={120} autoComplete="name" placeholder="Your name" style={inputStyle} />
      </label>
      <label className="t-body-sm" style={{ display: "grid", gap: "0.35rem" }}>Email
        <input name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@example.com" style={inputStyle} />
      </label>
      <label className="t-body-sm" style={{ display: "grid", gap: "0.35rem", gridColumn: "1 / -1" }}>Organisation <span style={{ color: "var(--c-ink-muted)" }}>(optional)</span>
        <input name="organization" maxLength={160} autoComplete="organization" placeholder="Company or institution" style={inputStyle} />
      </label>
      {error && <p role="alert" className="t-body-sm" style={{ color: "#a33131", gridColumn: "1 / -1" }}>{error}</p>}
      <button type="submit" disabled={busy} className="btn-primary" style={{ gridColumn: "1 / -1", justifySelf: "start", opacity: busy ? 0.65 : 1 }}>
        {busy ? "Sending…" : "Request access"} <ArrowRight size={13} />
      </button>
      <p className="t-body-sm" style={{ gridColumn: "1 / -1", margin: 0, color: "var(--c-ink-muted)" }}>We’ll use your details only to respond to this request.</p>
      <style>{`@media(max-width:560px){.product-request-form{grid-template-columns:1fr!important}}`}</style>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", border: "1px solid var(--c-border-strong)", background: "var(--c-bg)",
  color: "var(--c-ink)", padding: "0.7rem 0.8rem", borderRadius: 0, outlineColor: "var(--c-accent)",
};
