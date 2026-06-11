"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

const services = [
  { value: "tech-law",     label: "Technology Law" },
  { value: "startup-law",  label: "Startup / NGO Advisory" },
  { value: "ai-consult",   label: "AI Consulting (via Entrora)" },
  { value: "general",      label: "General Enquiry" },
];

export function BookingCTA() {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, status: "pending" }) });
      setStatus("done");
    } catch {
      setStatus("done");
    }
  };

  return (
    <section className="section page-x" style={{ background: "var(--c-ink)" }}>
      <div className="inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7rem", alignItems: "start" }} id="booking-grid">

        {/* Left */}
        <div>
          <p style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--c-accent)", marginBottom: "1.75rem" }}>Get started</p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(2.2rem,4vw,3.4rem)", color: "var(--c-bg)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Not sure where to start?
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(247,247,245,0.50)", lineHeight: 1.85, marginBottom: "2.5rem", maxWidth: "22rem" }}>
            A 15-minute discovery call costs nothing. Tell me what you're working on — I'll tell you if and how I can help.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {["Free 15-min discovery call", "Response within 48 hours", "No commitment required", "Booking confirmed manually — no auto-scheduling"].map(pt => (
              <div key={pt} style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                <CheckCircle size={14} color="var(--c-accent)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: "0.875rem", color: "rgba(247,247,245,0.55)" }}>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div>
          {status === "done" ? (
            <div style={{ padding: "3rem 2rem", border: "1px solid rgba(247,247,245,0.10)", borderRadius: "4px", textAlign: "center" }}>
              <CheckCircle size={32} color="var(--c-accent)" style={{ margin: "0 auto 1rem" }} />
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--c-bg)", marginBottom: "0.5rem" }}>Request received.</h3>
              <p style={{ fontSize: "0.875rem", color: "rgba(247,247,245,0.45)" }}>I'll review and confirm within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Service selector */}
              <div>
                <label style={{ display: "block", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(247,247,245,0.35)", marginBottom: "0.5rem" }}>Service *</label>
                <select required value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                  style={{ width: "100%", background: "rgba(247,247,245,0.05)", border: "1px solid rgba(247,247,245,0.12)", borderRadius: "2px", padding: "0.8rem 1rem", fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: form.service ? "var(--c-bg)" : "rgba(247,247,245,0.35)", outline: "none", cursor: "pointer" }}>
                  <option value="" disabled>Select a service</option>
                  {services.map(s => <option key={s.value} value={s.value} style={{ background: "#1A1A1A", color: "#F7F7F5" }}>{s.label}</option>)}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {[
                  { key: "name",  label: "Name *",  type: "text",  placeholder: "Your name" },
                  { key: "email", label: "Email *", type: "email", placeholder: "you@email.com" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: "block", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(247,247,245,0.35)", marginBottom: "0.5rem" }}>{f.label}</label>
                    <input required type={f.type} placeholder={f.placeholder} value={(form as any)[f.key]}
                      onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      style={{ width: "100%", background: "rgba(247,247,245,0.05)", border: "1px solid rgba(247,247,245,0.12)", borderRadius: "2px", padding: "0.8rem 1rem", fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--c-bg)", outline: "none" }}
                      onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"}
                      onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(247,247,245,0.12)"} />
                  </div>
                ))}
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(247,247,245,0.35)", marginBottom: "0.5rem" }}>What are you working on?</label>
                <textarea rows={4} placeholder="Brief description of your situation..." value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ width: "100%", background: "rgba(247,247,245,0.05)", border: "1px solid rgba(247,247,245,0.12)", borderRadius: "2px", padding: "0.8rem 1rem", fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--c-bg)", outline: "none", resize: "vertical" }}
                  onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"}
                  onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(247,247,245,0.12)"} />
              </div>

              {/* Status pill */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 0.85rem", background: "rgba(193,127,62,0.10)", border: "1px solid rgba(193,127,62,0.20)", borderRadius: "2px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--c-accent)", flexShrink: 0 }} />
                <span style={{ fontSize: "0.75rem", color: "rgba(247,247,245,0.5)" }}>Bookings are confirmed manually within 48h</span>
              </div>

              <button type="submit" disabled={status === "loading"} className="btn btn-accent" style={{ justifyContent: "center", opacity: status === "loading" ? 0.6 : 1 }}>
                {status === "loading" ? "Sending…" : <><span>Send Request</span><ArrowRight size={14} /></>}
              </button>
            </form>
          )}
        </div>
      </div>
      <style>{`@media(max-width:768px){#booking-grid{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
    </section>
  );
}
