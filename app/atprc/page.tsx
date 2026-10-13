"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, X, CalendarDays, Users, Target, ClipboardList } from "lucide-react";
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
  { Icon: ClipboardList, title: "How it works", text: "Apply with a short introduction to your startup and choose the division you want reviewed." },
  { Icon: Target, title: "What you get", text: "A complimentary 45–60 minute consultation in your chosen division, ending in practical next steps." },
  { Icon: Users, title: "Who it is for", text: "Early-stage founders working through questions about technology, product, AI, and law." },
  { Icon: CalendarDays, title: "Every quarter", text: "Two startups are selected each quarter from the applications received." },
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

  const apply = (
    <button type="button" className="atprc-apply" onClick={() => openForm()}>
      Apply to the clinic <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
    </button>
  );

  return (
    <main style={{ background: "var(--c-bg)", color: "var(--c-ink)" }}>
      {/* Hero */}
      <section style={{ padding: "clamp(7rem,12vw,10rem) var(--space-x) clamp(3rem,6vw,5rem)" }}>
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
          <p style={{ ...LBL, marginBottom: "1.25rem" }}>Technology / Risk / Africa</p>
          <h1 className="t-display t-display-xl" style={{ maxWidth: "15ch", marginBottom: "1.5rem" }}>
            African Tech Product Risk Clinic
          </h1>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.15rem,1.6vw,1.4rem)", lineHeight: 1.6, maxWidth: "40rem", marginBottom: "2rem" }}>
            A free product review for technology startups: two every quarter, across the technical and legal questions that decide whether a product is safe to build on.
          </p>
          {apply}
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--c-ink-muted)", marginTop: "2.25rem", fontSize: "1.05rem" }}>
            Better decisions. Stronger foundations.
          </p>
        </div>
      </section>

      {/* Initiative panel */}
      <section className="atprc-panel" style={{ padding: "clamp(3rem,6vw,5rem) var(--space-x)" }}>
        <div className="atprc-panel-grid" style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
          <div>
            <span className="atprc-pill">A complimentary initiative</span>
            <h2 className="t-display t-display-lg" style={{ margin: "1.1rem 0 1.25rem", maxWidth: "16ch" }}>
              Good ideas deserve a stronger foundation.
            </h2>
            <p className="t-body" style={{ maxWidth: "32rem", marginBottom: "1rem" }}>
              I offer two complimentary consultations each quarter to early-stage founders working through important questions about technology, product, AI, and law.
            </p>
            <p className="t-body" style={{ maxWidth: "32rem", marginBottom: "2rem" }}>
              Bring a challenge you&rsquo;re facing. We&rsquo;ll work through it together and identify practical next steps.
            </p>
            <button type="button" className="atprc-apply" onClick={() => openForm()}>
              Apply for a consultation <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
            </button>
            <p className="t-body-sm" style={{ marginTop: "1.25rem" }}>Two startups per quarter &middot; 45&ndash;60 minutes</p>
          </div>
          <ul className="atprc-steps">
            {STEPS.map(({ Icon, title, text }) => (
              <li key={title}>
                <span className="atprc-ico atprc-ico-sm"><Icon size={18} strokeWidth={1.5} aria-hidden /></span>
                <span>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </span>
              </li>
            ))}
          </ul>
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
                <p className="t-body">A confirmation has been sent to your email. You will hear from Decra once this quarter&rsquo;s applications have been considered.</p>
                <button type="button" className="btn-outline" style={{ marginTop: "1.5rem" }} onClick={closeForm}>Close</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} style={{ display: "grid", gap: "1.4rem" }}>
                <div>
                  <p style={{ ...LBL, marginBottom: "0.5rem" }}>ATPRC application</p>
                  <h2 id="atprc-form-title" className="t-display t-display-md">Apply for a free review</h2>
                </div>

                <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                  <legend style={{ ...FIELD_LBL, marginBottom: "0.75rem" }}>Division to be reviewed *</legend>
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
        .atprc-apply{
          display:inline-flex; align-items:center; gap:.7rem; padding:.95rem 1.6rem; cursor:pointer;
          border:1px solid var(--c-accent); background:var(--c-accent); color:var(--c-bg);
          font:700 .64rem var(--font-manjari); letter-spacing:.18em; text-transform:uppercase;
          transition:filter .2s, transform .2s;
        }
        .atprc-apply:hover{ filter:brightness(1.12); transform:translateY(-1px); }
        .atprc-apply:focus-visible{ outline:2px solid var(--c-accent); outline-offset:3px; }

        .atprc-ico{
          display:inline-flex; align-items:center; justify-content:center; width:46px; height:46px; border-radius:50%;
          color:var(--c-accent); background:color-mix(in srgb, var(--c-accent) 14%, transparent);
        }
        .atprc-ico-sm{ width:38px; height:38px; flex:none; }

        .atprc-panel{ background:color-mix(in srgb, var(--c-accent) 9%, var(--c-bg)); border-top:1px solid var(--c-border); }
        .atprc-panel-grid{ display:grid; grid-template-columns:1fr 1fr; gap:clamp(2rem,6vw,5rem); align-items:center; }
        .atprc-pill{
          display:inline-block; padding:.35rem .8rem; border-radius:999px; font:700 .58rem var(--font-manjari);
          letter-spacing:.16em; text-transform:uppercase; color:var(--c-accent);
          background:color-mix(in srgb, var(--c-accent) 16%, transparent);
        }
        .atprc-steps{ list-style:none; margin:0; padding:0 0 0 clamp(1rem,3vw,2.5rem); display:grid; gap:1.5rem; border-left:1px solid var(--c-border); }
        .atprc-steps li{ display:flex; gap:1rem; align-items:flex-start; }
        .atprc-steps li > span:last-child{ display:flex; flex-direction:column; gap:.2rem; font-size:.88rem; line-height:1.6; color:var(--c-ink-muted); }
        .atprc-steps strong{ font-family:var(--font-sans); font-weight:600; color:var(--c-ink); }

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

        @media (max-width: 860px){ .atprc-panel-grid{ grid-template-columns:1fr; } .atprc-steps{ padding-left:0; border-left:none; } }
        @media (max-width: 640px){ .atprc-grid{ grid-template-columns:1fr; } .atprc-apply{ width:100%; justify-content:center; } }
      `}</style>
    </main>
  );
}
