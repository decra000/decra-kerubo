"use client";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Clock, CheckCircle2 } from "lucide-react";
import { CONSULTATION_TYPES } from "@/lib/types";

type Step = 1 | 2 | 3;

const TIME_SLOTS = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

export default function BookPage() {
  const [step, setStep] = useState<Step>(1);
  const [selectedType, setSelectedType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [meetLink, setMeetLink] = useState("");
  const [form, setForm] = useState({ name: "", email: "", organization: "", website: "", industry: "", team_size: "", primary_challenge: "", desired_outcome: "" });

  const selectedConsultation = CONSULTATION_TYPES.find(t => t.id === selectedType);

  const handleBooking = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/book", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, consultation_type: selectedType, scheduled_at: `${selectedDate}T${selectedTime}` }) });
      const data = await res.json();
      if (data.meet_link) setMeetLink(data.meet_link);
      setConfirmed(true);
    } catch { alert("Booking failed. Please try again or email hello@decrakero.com"); }
    finally { setLoading(false); }
  };

  const labelStyle = { display: "block", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "var(--c-ink-muted)", marginBottom: "0.5rem" };

  if (confirmed) {
    return (
      <div style={{ background: "var(--c-bg)", minHeight: "100svh", paddingTop: "6rem", display: "flex", alignItems: "center", justifyContent: "center", padding: "6rem var(--space-page-x)" }}>
        <div style={{ maxWidth: "32rem", width: "100%", textAlign: "center" }}>
          <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%", background: "rgba(14,61,50,0.07)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem" }}>
            <CheckCircle2 size={24} style={{ color: "var(--c-forest)" }} />
          </div>
          <h1 className="t-display t-display-lg" style={{ marginBottom: "0.75rem" }}>Booking confirmed.</h1>
          <p className="t-body" style={{ marginBottom: "2rem" }}>A confirmation email has been sent to <strong>{form.email}</strong>.</p>
          {meetLink && (
            <a href={meetLink} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ marginBottom: "2rem", display: "inline-flex" }}>
              Join Google Meet <ArrowRight size={13} />
            </a>
          )}
          <div className="card" style={{ textAlign: "left" }}>
            {[["Type", selectedConsultation?.label], ["Date", selectedDate], ["Time", `${selectedTime} EAT`]].map(([k, v]) => (
              <div key={k as string} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", padding: "0.65rem 0", borderBottom: "1px solid var(--c-border)" }}>
                <span style={{ color: "var(--c-ink-muted)" }}>{k as string}</span>
                <span style={{ color: "var(--c-forest)", fontWeight: 700 }}>{v as string}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100svh", paddingTop: "6rem", paddingBottom: "5rem", paddingLeft: "var(--space-page-x)", paddingRight: "var(--space-page-x)" }}>
      <div style={{ maxWidth: "40rem", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
          <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
          <span className="t-label">Book a Consultation</span>
        </div>
        <h1 className="t-display t-display-lg" style={{ marginBottom: "3rem" }}>Let's talk.</h1>

        {/* Progress */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "3rem" }}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{ width: "1.75rem", height: "1.75rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, background: step >= s ? "var(--c-forest)" : "transparent", color: step >= s ? "white" : "var(--c-ink-muted)", border: step >= s ? "none" : "1px solid var(--c-border)", flexShrink: 0 }}>{s}</div>
              {s < 3 && <div style={{ flex: 1, height: "1px", background: step > s ? "var(--c-forest)" : "var(--c-border)", margin: "0 0.5rem" }} />}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "1.05rem", color: "var(--c-forest)", marginBottom: "1.5rem" }}>What kind of consultation do you need?</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "2rem" }}>
              {CONSULTATION_TYPES.map((type) => (
                <button key={type.id} onClick={() => setSelectedType(type.id)}
                  style={{ textAlign: "left", padding: "1.25rem", borderRadius: "12px", border: `1.5px solid ${selectedType === type.id ? "var(--c-forest)" : "var(--c-border)"}`, background: selectedType === type.id ? "rgba(14,61,50,0.04)" : "transparent", cursor: "pointer", transition: "border-color 0.2s" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.4rem" }}>
                    <Clock size={11} style={{ color: "var(--c-gold)" }} />
                    <span style={{ fontSize: "0.65rem", color: "var(--c-gold)" }}>{type.duration} min</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.825rem", color: "var(--c-forest)", marginBottom: "0.3rem" }}>{type.label}</p>
                  <p style={{ fontSize: "0.7rem", color: "var(--c-ink-muted)", lineHeight: 1.5 }}>{type.description}</p>
                </button>
              ))}
            </div>
            <button disabled={!selectedType} onClick={() => setStep(2)} className="btn-primary" style={{ border: "none", opacity: !selectedType ? 0.4 : 1 }}>
              Continue <ArrowRight size={13} />
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "1.05rem", color: "var(--c-forest)", marginBottom: "0.35rem" }}>Tell me about yourself.</h2>
            <p style={{ fontSize: "0.75rem", color: "var(--c-ink-muted)", marginBottom: "2rem" }}>This helps me prepare for our conversation.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", marginBottom: "2rem" }}>
              {[{ key: "name", label: "Full Name *", required: true, placeholder: "Your full name" }, { key: "email", label: "Email *", required: true, placeholder: "your@email.com", type: "email" }, { key: "organization", label: "Organization", placeholder: "Company / NGO / Personal" }, { key: "website", label: "Website", placeholder: "https://..." }, { key: "industry", label: "Industry / Sector", placeholder: "e.g. Legal Tech, NGO, FinTech" }, { key: "team_size", label: "Team Size", placeholder: "e.g. 1–5, 10–50, 100+" }].map(field => (
                <div key={field.key}>
                  <label style={labelStyle}>{field.label}</label>
                  <input required={field.required} type={field.type || "text"} value={form[field.key as keyof typeof form]} onChange={e => setForm({ ...form, [field.key]: e.target.value })} placeholder={field.placeholder} className="field" />
                </div>
              ))}
              {[{ key: "primary_challenge", label: "Primary Challenge *", placeholder: "What's the main challenge you're facing?" }, { key: "desired_outcome", label: "Desired Outcome *", placeholder: "What would a successful outcome look like?" }].map(field => (
                <div key={field.key}>
                  <label style={labelStyle}>{field.label}</label>
                  <textarea required rows={3} value={form[field.key as keyof typeof form]} onChange={e => setForm({ ...form, [field.key]: e.target.value })} placeholder={field.placeholder} className="field" style={{ resize: "none" }} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={() => setStep(1)} className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}><ArrowLeft size={13} /> Back</button>
              <button disabled={!form.name || !form.email || !form.primary_challenge || !form.desired_outcome} onClick={() => setStep(3)} className="btn-primary" style={{ border: "none", opacity: (!form.name || !form.email || !form.primary_challenge || !form.desired_outcome) ? 0.4 : 1 }}>
                Continue <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <h2 style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "1.05rem", color: "var(--c-forest)", marginBottom: "0.35rem" }}>Pick a date and time.</h2>
            <p style={{ fontSize: "0.75rem", color: "var(--c-ink-muted)", marginBottom: "2rem" }}>All times are East Africa Time (EAT, UTC+3).</p>
            <div style={{ marginBottom: "1.75rem" }}>
              <label style={labelStyle}>Select Date</label>
              <input type="date" min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="field" />
            </div>
            {selectedDate && (
              <div style={{ marginBottom: "1.75rem" }}>
                <label style={labelStyle}>Select Time</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.6rem" }}>
                  {TIME_SLOTS.map(slot => (
                    <button key={slot} onClick={() => setSelectedTime(slot)}
                      style={{ padding: "0.65rem", borderRadius: "8px", border: `1px solid ${selectedTime === slot ? "var(--c-forest)" : "var(--c-border)"}`, background: selectedTime === slot ? "var(--c-forest)" : "transparent", color: selectedTime === slot ? "white" : "var(--c-ink-mid)", fontSize: "0.775rem", cursor: "pointer", fontFamily: "var(--font-manjari)", transition: "all 0.2s" }}
                    >{slot}</button>
                  ))}
                </div>
              </div>
            )}
            {selectedDate && selectedTime && (
              <div style={{ background: "var(--c-forest)", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem" }}>
                <p className="t-label" style={{ marginBottom: "1rem" }}>Booking Summary</p>
                {[["Type", selectedConsultation?.label], ["Duration", `${selectedConsultation?.duration} minutes`], ["Date", selectedDate], ["Time", `${selectedTime} EAT`]].map(([k, v]) => (
                  <div key={k as string} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.775rem", color: "rgba(248,246,241,0.7)", padding: "0.4rem 0" }}>
                    <span style={{ color: "rgba(248,246,241,0.4)" }}>{k as string}</span>
                    <span>{v as string}</span>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={() => setStep(2)} className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}><ArrowLeft size={13} /> Back</button>
              <button disabled={!selectedDate || !selectedTime || loading} onClick={handleBooking} className="btn-primary" style={{ border: "none", opacity: (!selectedDate || !selectedTime || loading) ? 0.4 : 1 }}>
                {loading ? "Confirming..." : <>Confirm Booking <ArrowRight size={13} /></>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
