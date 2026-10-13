"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { ATPRC_DIVISIONS, ATPRC_STAGES } from "@/lib/atprc";

const LBL: React.CSSProperties = {
  fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.58rem",
  letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--c-accent)",
};
const FIELD_LBL: React.CSSProperties = {
  display: "block", marginBottom: "0.4rem", fontFamily: "var(--font-manjari)", fontWeight: 700,
  fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--c-ink-muted)",
};

const STEPS = [
  { title: "Apply to join", text: "Tell me about your startup and choose the division you would like reviewed." },
  { title: "Two startups are admitted each quarter", text: "I read every application and select who joins the clinic." },
  { title: "I review what you share", text: "Once you have joined, you show me your product and I evaluate it in your chosen division." },
];

export default function AtprcPage() {
  const [open, setOpen] = useState(false);
  const [division, setDivision] = useState("");
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  function openForm(preselect?: string) {
    openerRef.current = document.activeElement as HTMLElement | null;
    if (preselect) setDivision(preselect);
    setDone(false);
    setError("");
    setOpen(true);
  }
  function closeForm() {
    setOpen(false);
    openerRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeForm(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!division) { setError("Please choose a division."); return; }
    if (!consent) { setError("Please confirm the consent statement to submit."); return; }
    const fd = new FormData(e.currentTarget);
    setSending(true);
    try {
      const res = await fetch("/api/atprc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(fd.entries()), division, consent }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main style={{ background: "var(--c-bg)", color: "var(--c-ink)" }}>
      <section className="atprc-hero">
        <div className="atprc-wrap">
          <p style={{ ...LBL, marginBottom: "2rem" }}>ATPRC Initiative</p>
          <h1 className="atprc-title">African Tech Product Risk Clinic</h1>
          <p className="atprc-lede">A free product review for technology startups.</p>
        </div>
      </section>

      <section className="atprc-body">
        <div className="atprc-wrap atprc-cols">
          <div>
            <p className="atprc-copy">
              The clinic is open to technology startups that want a second, independent look at what they are building. Startups that join share their product with me, and I review it in the division they choose.
            </p>
            <button type="button" className="atprc-apply" onClick={() => openForm()}>
              Join the clinic <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
            </button>
          </div>
          <ol className="atprc-steps">
            {STEPS.map(({ title, text }, i) => (
              <li key={title}>
                <span className="atprc-num" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Form dialog */}
      {open && (
        <div className="atprc-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) closeForm(); }}>
          <div ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="atprc-form-title" className="atprc-dialog">
            <button type="button" className="atprc-close" onClick={closeForm} aria-label="Close application form"><X size={18} aria-hidden /></button>

            {done ? (
              <div role="status" style={{ padding: "1rem 0 0.5rem" }}>
                <p id="atprc-form-title" style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBottom: "0.75rem" }}>
                  <Check size={20} aria-hidden /> Application received
                </p>
                <p className="t-body">A confirmation has been sent to your email. I will be in touch once this quarter&rsquo;s applications have been considered.</p>
                <button type="button" className="btn-outline" style={{ marginTop: "1.5rem" }} onClick={closeForm}>Close</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} style={{ display: "grid", gap: "1.4rem" }}>
                <div>
                  <p style={{ ...LBL, marginBottom: "0.5rem" }}>African Tech Product Risk Clinic</p>
                  <h2 id="atprc-form-title" className="t-display t-display-md">Apply to join the clinic</h2>
                </div>

                <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                  <legend style={{ ...FIELD_LBL, marginBottom: "0.75rem" }}>Division you would like reviewed *</legend>
                  <div style={{ display: "grid", gap: "0.5rem" }}>
                    {ATPRC_DIVISIONS.map((d) => {
                      const on = division === d.id;
                      return (
                        <label key={d.id} className="atprc-div" style={{
                          display: "flex", gap: "0.8rem", alignItems: "flex-start", cursor: "pointer",
                          padding: "0.75rem 0.9rem", border: `1px solid ${on ? "var(--c-accent)" : "var(--c-border)"}`,
                          borderRadius: "8px", background: on ? "var(--c-surface)" : "transparent",
                        }}>
                          <input type="radio" name="division" value={d.id} checked={on} onChange={() => setDivision(d.id)} style={{ marginTop: "0.22rem", accentColor: "var(--c-accent)" }} />
                          <span style={{ fontFamily: "var(--font-serif)", fontSize: "0.98rem" }}>{d.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="atprc-grid">
                  <div>
                    <label htmlFor="name" style={FIELD_LBL}>Your name *</label>
                    <input id="name" name="name" className="field" required maxLength={120} autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="email" style={FIELD_LBL}>Email *</label>
                    <input id="email" name="email" type="email" className="field" required maxLength={200} autoComplete="email" />
                  </div>
                  <div>
                    <label htmlFor="startup" style={FIELD_LBL}>Startup name *</label>
                    <input id="startup" name="startup" className="field" required maxLength={160} autoComplete="organization" />
                  </div>
                  <div>
                    <label htmlFor="website" style={FIELD_LBL}>Website or product link</label>
                    <input id="website" name="website" className="field" maxLength={300} inputMode="url" placeholder="https://" />
                  </div>
                  <div>
                    <label htmlFor="country" style={FIELD_LBL}>Country of operation</label>
                    <input id="country" name="country" className="field" maxLength={80} />
                  </div>
                  <div>
                    <label htmlFor="stage" style={FIELD_LBL}>Stage</label>
                    <select id="stage" name="stage" className="field" defaultValue="">
                      <option value="" disabled>Select a stage</option>
                      {ATPRC_STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="product" style={FIELD_LBL}>What does the product do? *</label>
                  <textarea id="product" name="product" className="field" required rows={3} maxLength={2000} />
                </div>
                <div>
                  <label htmlFor="question" style={FIELD_LBL}>What would you like reviewed in this division? *</label>
                  <textarea id="question" name="question" className="field" required rows={4} maxLength={3000} />
                </div>

                {/* Honeypot, hidden from people and assistive tech. */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
                  <label>Company URL<input name="company_url" tabIndex={-1} autoComplete="off" /></label>
                </div>

                <label style={{ display: "flex", gap: "0.7rem", alignItems: "flex-start", cursor: "pointer" }}>
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} style={{ marginTop: "0.25rem", accentColor: "var(--c-accent)" }} />
                  <span className="t-body-sm">
                    I agree that the information I have shared may be used to assess my application to the ATPRC Initiative and to contact me about it. I have not included anything I am not entitled to share.
                  </span>
                </label>

                {error && <p role="alert" style={{ color: "#b3402f", fontSize: "0.85rem", margin: 0 }}>{error}</p>}

                <div>
                  <button type="submit" className="btn-primary" disabled={sending} style={{ opacity: sending ? 0.6 : 1 }}>
                    {sending ? "Sending…" : <>Submit application <ArrowRight size={13} strokeWidth={1.5} aria-hidden /></>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <style>{`
        .atprc-wrap{ max-width:var(--max-w); margin:0 auto; }
        .atprc-hero{ padding:clamp(8rem,16vw,13rem) var(--space-x) clamp(3rem,6vw,5rem); }
        .atprc-title{
          font-family:var(--font-serif); font-weight:400; letter-spacing:-0.015em; line-height:1.02;
          font-size:clamp(2.8rem,8vw,6.4rem); max-width:12ch; margin:0 0 2rem;
        }
        .atprc-lede{ font-family:var(--font-serif); font-size:clamp(1.25rem,2.2vw,1.8rem); line-height:1.4; margin:0; color:var(--c-ink-muted); }
        .atprc-body{ padding:clamp(2.5rem,5vw,4rem) var(--space-x) clamp(4rem,8vw,7rem); border-top:1px solid var(--c-border); }
        .atprc-cols{ display:grid; grid-template-columns:1fr 1fr; gap:clamp(2.5rem,7vw,7rem); align-items:start; }
        .atprc-copy{ font-size:1.02rem; line-height:1.85; color:var(--c-ink); max-width:30rem; margin:0 0 2.25rem; }
        .atprc-apply{
          display:inline-flex; align-items:center; gap:.7rem; padding:.95rem 1.6rem; cursor:pointer;
          border:1px solid var(--c-ink); background:var(--c-ink); color:var(--c-bg);
          font:700 .64rem var(--font-manjari); letter-spacing:.18em; text-transform:uppercase;
          transition:opacity .2s, transform .2s;
        }
        .atprc-apply:hover{ opacity:.85; transform:translateY(-1px); }
        .atprc-apply:focus-visible{ outline:2px solid var(--c-accent); outline-offset:3px; }
        .atprc-steps{ list-style:none; margin:0; padding:0; border-top:1px solid var(--c-border); }
        .atprc-steps li{ display:flex; gap:1.5rem; align-items:baseline; padding:1.5rem 0; border-bottom:1px solid var(--c-border); }
        .atprc-num{ flex:none; font-family:var(--font-manjari); font-weight:700; font-size:.62rem; letter-spacing:.2em; color:var(--c-accent); }
        .atprc-steps li > span:last-child{ display:flex; flex-direction:column; gap:.35rem; font-size:.9rem; line-height:1.7; color:var(--c-ink-muted); }
        .atprc-steps strong{ font-family:var(--font-serif); font-weight:400; font-size:1.2rem; line-height:1.3; color:var(--c-ink); }

        .atprc-overlay{
          position:fixed; inset:0; z-index:200; display:flex; align-items:flex-start; justify-content:center;
          overflow-y:auto; padding:clamp(1rem,4vw,3rem) 1rem; background:rgba(8,9,9,.55);
        }
        .atprc-dialog{
          position:relative; width:100%; max-width:42rem; padding:clamp(1.5rem,4vw,2.5rem);
          background:var(--c-bg); color:var(--c-ink); border:1px solid var(--c-border); border-radius:12px; outline:none;
        }
        .atprc-close{ position:absolute; top:.9rem; right:.9rem; display:inline-flex; padding:.4rem; background:none; border:none; cursor:pointer; color:var(--c-ink-muted); }
        .atprc-close:hover{ color:var(--c-ink); }
        .atprc-grid{ display:grid; grid-template-columns:1fr 1fr; gap:1.1rem; }
        .atprc-div:hover{ border-color:var(--c-accent) !important; }

        @media (max-width: 860px){ .atprc-cols{ grid-template-columns:1fr; } }
        @media (max-width: 640px){ .atprc-grid{ grid-template-columns:1fr; } .atprc-apply{ width:100%; justify-content:center; } }
      `}</style>
    </main>
  );
}
