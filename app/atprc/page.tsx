"use client";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { ATPRC_DIVISIONS, ATPRC_STAGES } from "@/lib/atprc";

const LBL: React.CSSProperties = {
  fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.58rem",
  letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--c-accent)",
};
const FIELD_LBL: React.CSSProperties = {
  display: "block", marginBottom: "0.4rem", fontFamily: "var(--font-manjari)", fontWeight: 700,
  fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--c-ink-muted)",
};

export default function AtprcPage() {
  const [division, setDivision] = useState("");
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

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
    <main style={{ background: "var(--c-bg)", color: "var(--c-ink)", padding: "clamp(7rem,12vw,10rem) var(--space-x) 5rem" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <p style={{ ...LBL, marginBottom: "1.25rem" }}>ATPRC Initiative</p>
        <h1 className="t-display t-display-xl" style={{ maxWidth: "16ch", marginBottom: "1.5rem" }}>
          African Tech Product Risk Clinic
        </h1>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.15rem,1.6vw,1.4rem)", lineHeight: 1.6, maxWidth: "46rem", marginBottom: "1rem" }}>
          Two technology startups receive a free product review every quarter.
        </p>
        <p className="t-body" style={{ maxWidth: "46rem", marginBottom: "3rem" }}>
          Tell us about your product and choose the division you want reviewed. Applications are read by Decra personally, and the startups for each quarter are selected from them.
        </p>

        {done ? (
          <div className="card" style={{ maxWidth: "46rem", padding: "2.25rem" }} role="status">
            <p style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-serif)", fontSize: "1.4rem", marginBottom: "0.75rem" }}>
              <Check size={20} aria-hidden /> Application received
            </p>
            <p className="t-body">A confirmation has been sent to your email. You will hear from Decra once this quarter&rsquo;s applications have been considered.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} style={{ maxWidth: "46rem", display: "grid", gap: "1.6rem" }}>
            <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
              <legend style={{ ...FIELD_LBL, marginBottom: "0.75rem" }}>Division to be reviewed *</legend>
              <div style={{ display: "grid", gap: "0.6rem" }}>
                {ATPRC_DIVISIONS.map((d) => {
                  const on = division === d.id;
                  return (
                    <label
                      key={d.id}
                      className="atprc-div"
                      style={{
                        display: "flex", gap: "0.85rem", alignItems: "flex-start", cursor: "pointer",
                        padding: "0.9rem 1rem", border: `1px solid ${on ? "var(--c-accent)" : "var(--c-border)"}`,
                        borderRadius: "8px", background: on ? "var(--c-surface)" : "transparent",
                      }}
                    >
                      <input
                        type="radio" name="division" value={d.id} checked={on}
                        onChange={() => setDivision(d.id)}
                        style={{ marginTop: "0.25rem", accentColor: "var(--c-accent)" }}
                      />
                      <span>
                        <span style={{ display: "block", fontFamily: "var(--font-serif)", fontSize: "1.02rem" }}>{d.label}</span>
                        <span className="t-body-sm" style={{ display: "block", marginTop: "0.15rem" }}>{d.blurb}</span>
                      </span>
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
              <textarea id="product" name="product" className="field" required rows={4} maxLength={2000} />
            </div>
            <div>
              <label htmlFor="question" style={FIELD_LBL}>What would you like reviewed in this division? *</label>
              <textarea id="question" name="question" className="field" required rows={5} maxLength={3000} />
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
                {sending ? "Sending…" : <>Submit application <ArrowRight size={13} strokeWidth={1.5} /></>}
              </button>
            </div>
          </form>
        )}
      </div>
      <style>{`
        .atprc-grid{ display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; }
        .atprc-div:hover{ border-color: var(--c-accent) !important; }
        @media (max-width: 640px){ .atprc-grid{ grid-template-columns:1fr; } }
      `}</style>
    </main>
  );
}
