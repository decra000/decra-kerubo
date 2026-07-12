"use client";
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowLeft, Clock, CheckCircle2, ShieldCheck, Smartphone, Landmark, SkipForward } from "lucide-react";
import { CONSULTATION_TYPES } from "@/lib/types";

type Step = 1 | 2 | 3;
type FormState = { name: string; email: string; organization: string; website: string; industry: string; team_size: string; primary_challenge: string; desired_outcome: string };

// Step 1 as a guided conversation, one question at a time instead of an 8-field wall.
// `textarea` fields submit on Enter (Shift+Enter for a newline); others submit on Enter.
const INTAKE_QUESTIONS: { key: keyof FormState; bot: string; placeholder: string; required: boolean; type?: "email" | "textarea"; skippable?: boolean }[] = [
  { key: "name", bot: "Hi, I'm glad you're here. What's your name?", placeholder: "Your full name", required: true },
  { key: "email", bot: "Nice to meet you. What's the best email to send your confirmation to?", placeholder: "your@email.com", type: "email", required: true },
  { key: "organization", bot: "Are you reaching out for a company, NGO, or on your own behalf?", placeholder: "Company / NGO / Personal", required: false, skippable: true },
  { key: "website", bot: "Got a website I should take a look at beforehand?", placeholder: "https://...", required: false, skippable: true },
  { key: "industry", bot: "What industry or sector are you in?", placeholder: "e.g. Legal Tech, NGO, FinTech", required: false, skippable: true },
  { key: "team_size", bot: "Roughly how big is the team?", placeholder: "e.g. 1–5, 10–50, 100+", required: false, skippable: true },
  { key: "primary_challenge", bot: "Let's get into it, what's the main challenge you're facing right now?", placeholder: "Type your answer...", type: "textarea", required: true },
  { key: "desired_outcome", bot: "And what would a successful outcome look like for you?", placeholder: "Type your answer...", type: "textarea", required: true },
];

const TIME_SLOTS: { label: string; value: string }[] = [
  { label: "09:00 AM", value: "09:00" },
  { label: "10:00 AM", value: "10:00" },
  { label: "11:00 AM", value: "11:00" },
  { label: "02:00 PM", value: "14:00" },
  { label: "03:00 PM", value: "15:00" },
  { label: "04:00 PM", value: "16:00" },
];
const timeLabel = (value: string) => TIME_SLOTS.find(s => s.value === value)?.label || value;

// If Paystack isn't configured (no NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY), paid
// bookings fall back to a manual flow, no account signup needed to get the
// site working, but it requires Decra to confirm payments by hand in /admin.
const MPESA_PAYBILL = "542542";
const MPESA_ACCOUNT = "02006312021250";
const BANK_DETAILS = {
  accountName: "Decra Kerubo Mokorah",
  bankName: "I&M Bank",
  accountNumber: "02006312021250",
  swift: "IMBLKENA",
};

declare global {
  interface Window {
    PaystackPop?: { setup: (opts: Record<string, unknown>) => { openIframe: () => void } };
  }
}

const formatKES = (n: number) => `KES ${n.toLocaleString("en-KE")}`;

export default function BookPage() {
  const [step, setStep] = useState<Step>(1);
  const [selectedType, setSelectedType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [paying, setPaying] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<"confirmed" | "pending_payment">("confirmed");
  const [meetLink, setMeetLink] = useState("");
  const [paidRef, setPaidRef] = useState("");
  const [payError, setPayError] = useState("");
  const [manualRef, setManualRef] = useState("");
  const [manualChannel, setManualChannel] = useState<"mpesa" | "bank">("mpesa");
  const [preferBankTransfer, setPreferBankTransfer] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", email: "", organization: "", website: "", industry: "", team_size: "", primary_challenge: "", desired_outcome: "" });

  // Chat-style intake state
  const [qIndex, setQIndex] = useState(0);
  const [botTyping, setBotTyping] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const [chatDone, setChatDone] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);

  const currentQuestion = INTAKE_QUESTIONS[qIndex];

  // Simulate the bot "typing" before each question appears, keeps the pacing
  // conversational instead of every question dumping in instantly.
  useEffect(() => {
    if (chatDone) return;
    setBotTyping(true);
    const t = setTimeout(() => { setBotTyping(false); chatInputRef.current?.focus(); }, qIndex === 0 ? 350 : 500 + Math.random() * 350);
    return () => clearTimeout(t);
  }, [qIndex, chatDone]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [qIndex, botTyping, chatDone]);

  const submitAnswer = (skip?: boolean) => {
    const value = skip ? "" : chatInput.trim();
    if (currentQuestion.required && !value) return;
    setForm(f => ({ ...f, [currentQuestion.key]: value }));
    setChatInput("");
    if (qIndex < INTAKE_QUESTIONS.length - 1) {
      setQIndex(i => i + 1);
    } else {
      setChatDone(true);
    }
  };

  const selectedConsultation = CONSULTATION_TYPES.find(t => t.id === selectedType);
  const isPaid = (selectedConsultation?.price ?? 0) > 0;
  const paystackConfigured = !!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  // Paystack Inline is a free client-side script, no SDK install needed.
  useEffect(() => {
    if (!paystackConfigured || document.getElementById("paystack-inline-js")) return;
    const s = document.createElement("script");
    s.id = "paystack-inline-js";
    s.src = "https://js.paystack.co/v1/inline.js";
    s.async = true;
    document.body.appendChild(s);
  }, [paystackConfigured]);

  const handleBooking = async (reference?: string, method?: "paystack" | "manual") => {
    setLoading(true);
    try {
      const res = await fetch("/api/book", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        ...form, consultation_type: selectedType, scheduled_at: `${selectedDate}T${selectedTime}:00+03:00`,
        amount: selectedConsultation?.price ?? 0, payment_reference: reference || null, payment_method: method || null,
      }) });
      const data = await res.json();
      if (data.error) { setPayError(data.error); return; }
      if (data.meet_link) setMeetLink(data.meet_link);
      if (reference) setPaidRef(reference);
      if (data.status) setBookingStatus(data.status);
      setConfirmed(true);
    } catch { setPayError("Booking failed. Please try again or email hello@decrakerubo.com."); }
    finally { setLoading(false); setPaying(false); }
  };

  const handleConfirm = () => {
    setPayError("");
    if (!isPaid) { handleBooking(); return; }

    // No Paystack account connected, OR the person explicitly prefers bank transfer
    // (e.g. to avoid Paystack's M-Pesa channel fees), use the manual fallback.
    if (!paystackConfigured || preferBankTransfer) {
      if (!manualRef.trim()) {
        setPayError(manualChannel === "mpesa" ? "Enter the M-Pesa confirmation code from your payment SMS." : "Enter the bank transfer reference/receipt number.");
        return;
      }
      handleBooking(`[${manualChannel === "mpesa" ? "M-Pesa" : "Bank Transfer"}] ${manualRef.trim()}`, "manual");
      return;
    }

    if (!window.PaystackPop) { setPayError("Payment is still loading, please try again in a moment."); return; }
    setPaying(true);
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!;

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: form.email,
      amount: Math.round((selectedConsultation?.price ?? 0) * 100), // Paystack expects the lowest currency unit
      currency: "KES",
      channels: ["mobile_money", "card"],
      metadata: { consultation_type: selectedType, name: form.name },
      callback: (response: { reference: string }) => { handleBooking(response.reference, "paystack"); },
      onClose: () => { setPaying(false); },
    });
    handler.openIframe();
  };

  const labelStyle = { display: "block", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "var(--c-ink-muted)", marginBottom: "0.5rem" };

  if (confirmed) {
    const pending = bookingStatus === "pending_payment";
    return (
      <div style={{ background: "var(--c-bg)", minHeight: "100svh", paddingTop: "6rem", display: "flex", alignItems: "center", justifyContent: "center", padding: "6rem var(--space-page-x)" }}>
        <div style={{ maxWidth: "32rem", width: "100%", textAlign: "center" }}>
          <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%", background: "rgba(14,61,50,0.07)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem" }}>
            <CheckCircle2 size={24} style={{ color: "var(--c-forest)" }} />
          </div>
          <h1 className="t-display t-display-lg" style={{ marginBottom: "0.75rem" }}>{pending ? "Booking received." : "Booking confirmed."}</h1>
          <p className="t-body" style={{ marginBottom: "2rem" }}>
            {pending
              ? <>Your slot is held while we confirm your M-Pesa payment. A confirmation email is on its way to <strong>{form.email}</strong>.</>
              : <>A confirmation email has been sent to <strong>{form.email}</strong>.</>}
          </p>
          {meetLink && (
            <a href={meetLink} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ marginBottom: "2rem", display: "inline-flex" }}>
              Join Google Meet <ArrowRight size={13} />
            </a>
          )}
          <div className="card" style={{ textAlign: "left" }}>
            {[["Type", selectedConsultation?.label], ["Date", selectedDate], ["Time", `${timeLabel(selectedTime)} EAT`], ...(isPaid ? [[pending ? "Amount due" : "Amount paid", formatKES(selectedConsultation?.price ?? 0)], ["Reference", paidRef || "N/A"]] : [])].map(([k, v]) => (
              <div key={k as string} style={{ display: "flex", justifyContent: "space-between", gap: "1rem", fontSize: "0.8rem", padding: "0.65rem 0", borderBottom: "1px solid var(--c-border)" }}>
                <span style={{ color: "var(--c-ink-muted)", flexShrink: 0 }}>{k as string}</span>
                <span style={{ color: "var(--c-forest)", fontWeight: 700, textAlign: "right", wordBreak: "break-all" }}>{v as string}</span>
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

        {/* Step 1, conversational intake */}
        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "1.05rem", color: "var(--c-forest)", marginBottom: "0.35rem" }}>Tell me about yourself.</h2>
            <p style={{ fontSize: "0.75rem", color: "var(--c-ink-muted)", marginBottom: "1.5rem" }}>A few quick questions, answer at your own pace.</p>

            <div className="chat-thread" style={{ display: "flex", flexDirection: "column", gap: "0.9rem", maxHeight: "min(52vh, 420px)", overflowY: "auto", marginBottom: "1.5rem", paddingRight: "0.25rem" }}>
              {INTAKE_QUESTIONS.slice(0, qIndex).map((q, i) => (
                <div key={q.key} className="chat-bubble-in">
                  <div className="chat-bubble chat-bubble-bot">{q.bot}</div>
                  <div className="chat-bubble chat-bubble-user">{form[q.key] ? form[q.key] : <span style={{ opacity: 0.6, fontStyle: "italic" }}>Skipped</span>}</div>
                </div>
              ))}

              {!chatDone && (
                <div className="chat-bubble-in">
                  {botTyping ? (
                    <div className="chat-bubble chat-bubble-bot chat-typing"><span /><span /><span /></div>
                  ) : (
                    <div className="chat-bubble chat-bubble-bot">{currentQuestion.bot}</div>
                  )}
                </div>
              )}

              {chatDone && (
                <div className="chat-bubble-in">
                  <div className="chat-bubble chat-bubble-bot">Perfect, that's everything I need for now. Ready to pick a call type?</div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {!chatDone && !botTyping && (
              <div className="chat-bubble-in" style={{ marginBottom: "1.5rem" }}>
                {currentQuestion.type === "textarea" ? (
                  <textarea
                    ref={chatInputRef}
                    rows={2}
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submitAnswer(); } }}
                    placeholder={currentQuestion.placeholder}
                    className="field"
                    style={{ resize: "none" }}
                  />
                ) : (
                  <input
                    ref={chatInputRef as unknown as React.RefObject<HTMLInputElement>}
                    type={currentQuestion.type === "email" ? "email" : "text"}
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); submitAnswer(); } }}
                    placeholder={currentQuestion.placeholder}
                    className="field"
                  />
                )}
                <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.75rem" }}>
                  <button
                    disabled={currentQuestion.required && !chatInput.trim()}
                    onClick={() => submitAnswer()}
                    className="btn-primary"
                    style={{ border: "none", opacity: (currentQuestion.required && !chatInput.trim()) ? 0.4 : 1, padding: "0.65rem 1.5rem" }}
                  >
                    Send <ArrowRight size={13} />
                  </button>
                  {currentQuestion.skippable && (
                    <button onClick={() => submitAnswer(true)} className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.65rem 1.1rem" }}>
                      Skip <SkipForward size={12} />
                    </button>
                  )}
                </div>
              </div>
            )}

            {chatDone && (
              <button onClick={() => setStep(2)} className="btn-primary" style={{ border: "none" }}>
                Continue <ArrowRight size={13} />
              </button>
            )}
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "1.05rem", color: "var(--c-forest)", marginBottom: "1.5rem" }}>Which call do you need?</h2>
            <div className="consult-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "2rem" }}>
              {CONSULTATION_TYPES.map((type) => (
                <button key={type.id} onClick={() => setSelectedType(type.id)}
                  style={{ textAlign: "left", padding: "1.25rem", borderRadius: "12px", border: `1.5px solid ${selectedType === type.id ? "var(--c-forest)" : "var(--c-border)"}`, background: selectedType === type.id ? "rgba(14,61,50,0.04)" : "transparent", cursor: "pointer", transition: "border-color 0.2s" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.4rem" }}>
                    <Clock size={11} style={{ color: "var(--c-gold)" }} />
                    <span style={{ fontSize: "0.65rem", color: "var(--c-gold)" }}>{type.duration} min</span>
                    <span style={{ fontSize: "0.65rem", color: "var(--c-ink-muted)" }}>·</span>
                    <span style={{ fontSize: "0.65rem", color: "var(--c-ink-muted)", fontWeight: 700 }}>{type.price > 0 ? formatKES(type.price) : "Free"}</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.825rem", color: "var(--c-forest)", marginBottom: "0.3rem" }}>{type.label}</p>
                  <p style={{ fontSize: "0.7rem", color: "var(--c-ink-muted)", lineHeight: 1.5 }}>{type.description}</p>
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={() => setStep(1)} className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}><ArrowLeft size={13} /> Back</button>
              <button disabled={!selectedType} onClick={() => setStep(3)} className="btn-primary" style={{ border: "none", opacity: !selectedType ? 0.4 : 1 }}>
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
                <div className="time-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.6rem" }}>
                  {TIME_SLOTS.map(slot => (
                    <button key={slot.value} onClick={() => setSelectedTime(slot.value)}
                      style={{ padding: "0.65rem", borderRadius: "8px", border: `1px solid ${selectedTime === slot.value ? "var(--c-forest)" : "var(--c-border)"}`, background: selectedTime === slot.value ? "var(--c-forest)" : "transparent", color: selectedTime === slot.value ? "white" : "var(--c-ink-mid)", fontSize: "0.775rem", cursor: "pointer", fontFamily: "var(--font-manjari)", transition: "all 0.2s" }}
                    >{slot.label}</button>
                  ))}
                </div>
              </div>
            )}
            {selectedDate && selectedTime && (
              <div style={{ background: "var(--c-forest)", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem" }}>
                <p className="t-label" style={{ marginBottom: "1rem" }}>Booking Summary</p>
                {[["Type", selectedConsultation?.label], ["Duration", `${selectedConsultation?.duration} minutes`], ["Date", selectedDate], ["Time", `${timeLabel(selectedTime)} EAT`], ["Amount", isPaid ? formatKES(selectedConsultation?.price ?? 0) : "Free"]].map(([k, v]) => (
                  <div key={k as string} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.775rem", color: "rgba(248,246,241,0.7)", padding: "0.4rem 0" }}>
                    <span style={{ color: "rgba(248,246,241,0.4)" }}>{k as string}</span>
                    <span>{v as string}</span>
                  </div>
                ))}
              </div>
            )}
            {isPaid && (!paystackConfigured || preferBankTransfer) && (
              <div className="card" style={{ marginBottom: "2rem" }}>
                {paystackConfigured && (
                  <button onClick={() => setPreferBankTransfer(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--c-ink-muted)", fontSize: "0.7rem", display: "flex", alignItems: "center", gap: "0.3rem", marginBottom: "1rem" }}>
                    <ArrowLeft size={11} /> Back to card / Paystack payment
                  </button>
                )}
                <p className="t-label" style={{ marginBottom: "0.75rem" }}>How would you like to pay?</p>
                <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1.25rem" }}>
                  <button onClick={() => { setManualChannel("mpesa"); setManualRef(""); setPayError(""); }}
                    style={{ flex: 1, padding: "0.6rem", borderRadius: "8px", border: `1.5px solid ${manualChannel === "mpesa" ? "var(--c-forest)" : "var(--c-border)"}`, background: manualChannel === "mpesa" ? "rgba(14,61,50,0.04)" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontFamily: "var(--font-manjari)", fontSize: "0.75rem", fontWeight: 700, color: "var(--c-forest)" }}>
                    <Smartphone size={12} /> M-Pesa
                  </button>
                  <button onClick={() => { setManualChannel("bank"); setManualRef(""); setPayError(""); }}
                    style={{ flex: 1, padding: "0.6rem", borderRadius: "8px", border: `1.5px solid ${manualChannel === "bank" ? "var(--c-forest)" : "var(--c-border)"}`, background: manualChannel === "bank" ? "rgba(14,61,50,0.04)" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontFamily: "var(--font-manjari)", fontSize: "0.75rem", fontWeight: 700, color: "var(--c-forest)" }}>
                    <Landmark size={12} /> Bank Transfer
                  </button>
                </div>

                {manualChannel === "mpesa" ? (
                  <>
                    <p style={{ fontSize: "0.78rem", color: "var(--c-ink-mid)", lineHeight: 1.7, marginBottom: "1rem" }}>
                      Go to M-Pesa &rarr; Lipa na M-Pesa &rarr; Paybill. Use business number <strong>{MPESA_PAYBILL}</strong>, account <strong>{MPESA_ACCOUNT}</strong>, amount <strong>{formatKES(selectedConsultation?.price ?? 0)}</strong>. Then enter the confirmation code from the SMS below.
                    </p>
                    <label style={labelStyle}>M-Pesa Confirmation Code</label>
                    <input value={manualRef} onChange={e => setManualRef(e.target.value)} placeholder="e.g. QGH7XYZ123" className="field" />
                  </>
                ) : (
                  <>
                    <p style={{ fontSize: "0.78rem", color: "var(--c-ink-mid)", lineHeight: 1.7, marginBottom: "1rem" }}>
                      For international or USD transfers, wire to the account below, then enter your transfer reference or receipt number.
                    </p>
                    <div style={{ background: "var(--c-forest)", borderRadius: "10px", padding: "1rem 1.25rem", marginBottom: "1rem" }}>
                      {[["Account Name", BANK_DETAILS.accountName], ["Bank", BANK_DETAILS.bankName], ["Account Number", BANK_DETAILS.accountNumber], ["SWIFT / IBAN", BANK_DETAILS.swift]].map(([k, v]) => (
                        <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "rgba(248,246,241,0.7)", padding: "0.3rem 0" }}>
                          <span style={{ color: "rgba(248,246,241,0.4)" }}>{k}</span>
                          <span style={{ fontWeight: 600 }}>{v}</span>
                        </div>
                      ))}
                    </div>
                    <label style={labelStyle}>Transfer Reference / Receipt Number</label>
                    <input value={manualRef} onChange={e => setManualRef(e.target.value)} placeholder="e.g. bank transaction ID" className="field" />
                  </>
                )}
                <p style={{ fontSize: "0.68rem", color: "var(--c-ink-muted)", marginTop: "0.75rem" }}>
                  Your slot is held as soon as you submit, Decra confirms the payment by hand, usually within a few hours.
                </p>
              </div>
            )}
            {payError && (
              <p style={{ fontSize: "0.75rem", color: "#B4453A", marginBottom: "1.25rem" }}>{payError}</p>
            )}
            {isPaid && paystackConfigured && !preferBankTransfer && (
              <button onClick={() => { setPreferBankTransfer(true); setManualChannel("bank"); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--c-ink-muted)", fontSize: "0.72rem", textDecoration: "underline", marginBottom: "1.25rem", display: "block" }}>
                Prefer to pay by bank transfer instead? (avoids card/mobile money fees)
              </button>
            )}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={() => setStep(2)} className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}><ArrowLeft size={13} /> Back</button>
              <button disabled={!selectedDate || !selectedTime || loading || paying} onClick={handleConfirm} className="btn-primary" style={{ border: "none", opacity: (!selectedDate || !selectedTime || loading || paying) ? 0.4 : 1 }}>
                {loading || paying
                  ? (paying ? "Redirecting to payment..." : "Confirming...")
                  : isPaid
                    ? ((paystackConfigured && !preferBankTransfer)
                        ? <>Pay {formatKES(selectedConsultation?.price ?? 0)} &amp; Confirm <ShieldCheck size={13} /></>
                        : <>I've Paid, Submit Booking <ArrowRight size={13} /></>)
                    : <>Confirm Booking <ArrowRight size={13} /></>}
              </button>
            </div>
            {isPaid && (
              <p style={{ fontSize: "0.68rem", color: "var(--c-ink-muted)", marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <ShieldCheck size={12} />
                {(paystackConfigured && !preferBankTransfer) ? "Secure payment via Paystack, cards & M-Pesa accepted." : "Manual confirmation, payment is verified by hand, not automatically."}
              </p>
            )}
          </div>
        )}
      </div>
      <style>{`
        @media(max-width:480px){.consult-grid{grid-template-columns:1fr!important}}

        .chat-bubble-in { animation: chatIn 0.35s cubic-bezier(0.16,1,0.3,1); display: flex; flex-direction: column; gap: 0.4rem; }
        @keyframes chatIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

        .chat-bubble { font-size: 0.8rem; line-height: 1.55; padding: 0.7rem 1rem; border-radius: 14px; max-width: 84%; word-break: break-word; white-space: pre-wrap; }
        .chat-bubble-bot { align-self: flex-start; background: rgba(14,61,50,0.06); color: var(--c-forest); border-bottom-left-radius: 4px; }
        .chat-bubble-user { align-self: flex-end; background: var(--c-forest); color: white; border-bottom-right-radius: 4px; }

        .chat-typing { display: flex; align-items: center; gap: 0.3rem; padding: 0.85rem 1.1rem; }
        .chat-typing span { width: 5px; height: 5px; border-radius: 50%; background: var(--c-forest); opacity: 0.5; animation: chatDot 1.1s infinite ease-in-out; }
        .chat-typing span:nth-child(2) { animation-delay: 0.15s; }
        .chat-typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes chatDot { 0%, 60%, 100% { transform: translateY(0); opacity: 0.35; } 30% { transform: translateY(-3px); opacity: 0.9; } }

        .chat-thread::-webkit-scrollbar { width: 5px; }
        .chat-thread::-webkit-scrollbar-thumb { background: var(--c-border); border-radius: 4px; }
      `}</style>
    </div>
  );
}
