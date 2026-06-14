"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

const services = [
  { value: "tech-law",    label: "Technology Law" },
  { value: "startup-law", label: "Startup / NGO Advisory" },
  { value: "ai-consult",  label: "AI Consulting (via Entrora)" },
  { value: "general",     label: "General Enquiry" },
];

export function BookingCTA() {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle"|"loading"|"done">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, pendingConfirmation: true }) });
    } catch {}
    setStatus("done");
  };

  return (
    <section className="section page-x" style={{ background: "var(--c-ink)", position: "relative", overflow: "hidden" }}>
      {/* Gold ambient light */}
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,162,101,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7rem", alignItems: "start", position: "relative", zIndex: 1 }} id="booking-grid">
        <div>
          <p style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--c-accent)", marginBottom: "1.75rem", fontFamily: "var(--font-sans)" }}>Get started</p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(2.2rem,4vw,3.4rem)", color: "var(--c-bg)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Not sure where<br />to start?
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(245,237,216,0.45)", lineHeight: 1.85, marginBottom: "2.5rem", maxWidth: "22rem", fontFamily: "var(--font-sans)" }}>
            A 15-minute discovery call costs nothing. Tell me what you're working on.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {["Free 15-min discovery call", "Response within 48 hours", "No commitment required", "Confirmed manually — no auto-scheduling"].map(pt => (
              <div key={pt} style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                <CheckCircle size={14} color="var(--c-accent)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: "0.875rem", color: "rgba(245,237,216,0.5)", fontFamily: "var(--font-sans)" }}>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Glass form */}
        <div className="glass" style={{ borderRadius: "4px", padding: "2rem" }}>
          {status === "done" ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <CheckCircle size={32} color="var(--c-accent)" style={{ margin: "0 auto 1rem" }} />
              <h3 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.4rem", color: "var(--c-ink)", marginBottom: "0.5rem" }}>Request received.</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--c-ink-muted)", fontFamily: "var(--font-sans)" }}>I'll confirm within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-ink-muted)", marginBottom: "0.45rem", fontFamily: "var(--font-sans)" }}>Service *</label>
                <select required value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                  style={{ width: "100%", background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: "2px", padding: "0.8rem 1rem", fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: form.service ? "var(--c-ink)" : "var(--c-ink-muted)", outline: "none", cursor: "pointer" }}>
                  <option value="" disabled>Select a service</option>
                  {services.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {[{k:"name",l:"Name",t:"text",p:"Your name"},{k:"email",l:"Email",t:"email",p:"you@email.com"}].map(f => (
                  <div key={f.k}>
                    <label style={{ display: "block", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-ink-muted)", marginBottom: "0.45rem", fontFamily: "var(--font-sans)" }}>{f.l} *</label>
                    <input required type={f.t} placeholder={f.p} value={(form as any)[f.k]} onChange={e => setForm({...form,[f.k]:e.target.value})}
                      style={{ width: "100%", background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: "2px", padding: "0.8rem 1rem", fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--c-ink)", outline: "none" }}
                      onFocus={e => (e.currentTarget as HTMLElement).style.borderColor="var(--c-accent)"}
                      onBlur={e => (e.currentTarget as HTMLElement).style.borderColor="var(--c-border)"} />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-ink-muted)", marginBottom: "0.45rem", fontFamily: "var(--font-sans)" }}>What are you working on?</label>
                <textarea rows={4} placeholder="Brief description..." value={form.message} onChange={e => setForm({...form,message:e.target.value})}
                  style={{ width: "100%", background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: "2px", padding: "0.8rem 1rem", fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--c-ink)", outline: "none", resize: "vertical" }}
                  onFocus={e => (e.currentTarget as HTMLElement).style.borderColor="var(--c-accent)"}
                  onBlur={e => (e.currentTarget as HTMLElement).style.borderColor="var(--c-border)"} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 0.85rem", background: "rgba(196,162,101,0.08)", border: "1px solid rgba(196,162,101,0.18)", borderRadius: "2px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--c-accent)", flexShrink: 0 }} />
                <span style={{ fontSize: "0.75rem", color: "var(--c-ink-muted)", fontFamily: "var(--font-sans)" }}>Confirmed manually within 48h — not auto-scheduled</span>
              </div>
              <button type="submit" disabled={status==="loading"} className="btn btn-accent" style={{ justifyContent: "center", opacity: status==="loading" ? 0.6 : 1 }}>
                {status==="loading" ? "Sending…" : <><span>Send Request</span><ArrowRight size={14}/></>}
              </button>
            </form>
          )}
        </div>
      </div>
      <style>{`@media(max-width:768px){#booking-grid{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
    </section>
  );
}
