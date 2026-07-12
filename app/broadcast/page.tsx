"use client";
export const dynamic = "force-dynamic";
import { useMemo, useState } from "react";
import Papa from "papaparse";
import { Upload, Send, Lock, CheckCircle2, XCircle, MinusCircle, Loader2, Trash2, History, RefreshCw } from "lucide-react";

type Recipient = { company: string; email: string; contact?: string };
type SendResult = { email: string; company: string; ok: boolean; skipped?: boolean; error?: string };
type HistoryRow = { email: string; company: string | null; subject: string | null; status: "sent" | "failed" | "skipped"; created_at: string };

const DEFAULT_SUBJECT = "Product counsel for {{company}}";
const DEFAULT_BODY = `Hi {{contact}},

I'm Decra Kerubo, a technology lawyer working with founders and product teams as embedded product counsel, the legal partner who sits close enough to the roadmap to catch issues before they become expensive ones.

I came across {{company}} and thought there could be a fit for ongoing or project-based counsel: terms & privacy, data protection, commercial contracts, IP, and the day-to-day legal calls that come with shipping product.

Open to a short call if it's useful, happy to work around your schedule.

Best,
Decra`;

const labelStyle = { display: "block", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "var(--c-ink-muted)", marginBottom: "0.5rem" };

// Loosely matches common spreadsheet header spellings so people don't have
// to rename their columns to match exactly.
function pickColumn(headers: string[], candidates: string[]) {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");
  const normed = headers.map(norm);
  for (const c of candidates) {
    const idx = normed.indexOf(norm(c));
    if (idx !== -1) return headers[idx];
  }
  return null;
}

export default function BroadcastPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authing, setAuthing] = useState(false);

  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [fileName, setFileName] = useState("");
  const [parseError, setParseError] = useState("");

  const [subject, setSubject] = useState(DEFAULT_SUBJECT);
  const [bodyText, setBodyText] = useState(DEFAULT_BODY);

  const [sending, setSending] = useState(false);
  const [results, setResults] = useState<SendResult[]>([]);
  const [progress, setProgress] = useState(0);
  const [skipContacted, setSkipContacted] = useState(true);

  const [showHistory, setShowHistory] = useState(false);
  const [historyRows, setHistoryRows] = useState<HistoryRow[]>([]);
  const [historySummary, setHistorySummary] = useState<{ totalSent: number; totalFailed: number; totalSkipped: number; uniqueRecipientsContacted: number } | null>(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");
  const [historySearch, setHistorySearch] = useState("");

  const preview = recipients[0];

  function personalizePreview(template: string, r?: Recipient) {
    if (!r) return template;
    return template
      .replace(/\{\{\s*company\s*\}\}/gi, r.company || "")
      .replace(/\{\{\s*contact\s*\}\}/gi, r.contact || "there")
      .replace(/\{\{\s*email\s*\}\}/gi, r.email || "");
  }

  const previewSubject = useMemo(() => personalizePreview(subject, preview), [subject, preview]);
  const previewBody = useMemo(() => personalizePreview(bodyText, preview), [bodyText, preview]);

  async function handleUnlock() {
    setAuthing(true);
    setAuthError("");
    try {
      const res = await fetch("/api/broadcast/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const data = await res.json();
      if (!res.ok) { setAuthError(data.error || "Incorrect password."); return; }
      setUnlocked(true);
    } catch {
      setAuthError("Something went wrong. Try again.");
    } finally {
      setAuthing(false);
    }
  }

  function handleFile(file: File) {
    setParseError("");
    setFileName(file.name);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const headers = result.meta.fields || [];
        const companyCol = pickColumn(headers, ["company", "companyname", "organization", "org", "business"]);
        const emailCol = pickColumn(headers, ["email", "emailaddress", "e-mail"]);
        const contactCol = pickColumn(headers, ["contact", "contactname", "name", "recipient"]);

        if (!emailCol) {
          setParseError("Couldn't find an email column. Make sure your spreadsheet has a column named something like 'Email'.");
          setRecipients([]);
          return;
        }
        const rows: Recipient[] = (result.data as Record<string, string>[])
          .map(row => ({
            company: (companyCol ? row[companyCol] : "")?.trim() || "",
            email: (row[emailCol] || "").trim(),
            contact: (contactCol ? row[contactCol] : "")?.trim() || "",
          }))
          .filter(r => r.email);
        setRecipients(rows);
      },
      error: (err) => setParseError(err.message || "Couldn't parse that file."),
    });
  }

  function removeRow(idx: number) {
    setRecipients(prev => prev.filter((_, i) => i !== idx));
  }

  async function handleSend() {
    if (recipients.length === 0) return;
    setSending(true);
    setResults([]);
    setProgress(0);

    const bodyHtml = `<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; color: #222; white-space: pre-wrap; line-height: 1.6;">${bodyText.replace(/\n/g, "<br/>")}</div>`;
    const BATCH_SIZE = 5;
    const allResults: SendResult[] = [];

    for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
      const batch = recipients.slice(i, i + BATCH_SIZE);
      try {
        const res = await fetch("/api/broadcast/send", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-broadcast-password": password },
          body: JSON.stringify({ subject, bodyHtml, recipients: batch, forceResend: !skipContacted }),
        });
        const data = await res.json();
        if (res.ok) {
          allResults.push(...data.results);
        } else {
          batch.forEach(r => allResults.push({ email: r.email, company: r.company, ok: false, error: data.error || "Failed" }));
        }
      } catch {
        batch.forEach(r => allResults.push({ email: r.email, company: r.company, ok: false, error: "Network error" }));
      }
      setResults([...allResults]);
      setProgress(Math.min(i + BATCH_SIZE, recipients.length));
      // A brief pause between batches, easier on Gmail's sending limits than firing everything at once.
      if (i + BATCH_SIZE < recipients.length) await new Promise(r => setTimeout(r, 1200));
    }
    setSending(false);
  }

  async function loadHistory() {
    setHistoryLoading(true);
    setHistoryError("");
    try {
      const res = await fetch("/api/broadcast/history", { headers: { "x-broadcast-password": password } });
      const data = await res.json();
      if (!res.ok) { setHistoryError(data.error || "Couldn't load history."); return; }
      setHistoryRows(data.rows || []);
      setHistorySummary(data.summary || null);
    } catch {
      setHistoryError("Network error loading history.");
    } finally {
      setHistoryLoading(false);
    }
  }

  function toggleHistory() {
    const next = !showHistory;
    setShowHistory(next);
    if (next && historyRows.length === 0) loadHistory();
  }

  const filteredHistory = useMemo(() => {
    const q = historySearch.trim().toLowerCase();
    if (!q) return historyRows;
    return historyRows.filter(r => r.email.toLowerCase().includes(q) || (r.company || "").toLowerCase().includes(q));
  }, [historyRows, historySearch]);

  if (!unlocked) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", background: "var(--c-bg)" }}>
        <div className="card" style={{ maxWidth: "22rem", width: "100%", textAlign: "center" }}>
          <Lock size={22} style={{ color: "var(--c-ink-muted)", marginBottom: "1rem" }} />
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", color: "var(--c-ink)", marginBottom: "1.5rem" }}>Private, Broadcast Tool</p>
          <input
            type="password"
            className="field"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleUnlock()}
            style={{ marginBottom: "1rem" }}
          />
          {authError && <p style={{ color: "#B3524A", fontSize: "0.8rem", marginBottom: "1rem" }}>{authError}</p>}
          <button className="btn-primary" style={{ border: "none", width: "100%" }} onClick={handleUnlock} disabled={authing || !password}>
            {authing ? "Checking…" : "Unlock"}
          </button>
        </div>
      </div>
    );
  }

  const sentCount = results.filter(r => r.ok).length;
  const skippedCount = results.filter(r => r.skipped).length;
  const failedCount = results.filter(r => !r.ok && !r.skipped).length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--c-bg)", padding: "7rem var(--space-page-x) 5rem" }}>
      <div style={{ maxWidth: "46rem", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "0.5rem" }}>
          <p style={labelStyle}>Private, do not share this URL</p>
          <button
            onClick={toggleHistory}
            style={{
              display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0,
              background: "none", border: "1px solid var(--c-border-strong)", borderRadius: "999px",
              padding: "0.4rem 0.85rem", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "var(--c-ink-muted)", cursor: "pointer",
            }}
          >
            <History size={12} /> {showHistory ? "Hide" : "View"} history
          </button>
        </div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem,3vw,2.1rem)", color: "var(--c-ink)", marginBottom: "0.5rem" }}>
          Product Counsel, Outreach Broadcast
        </h1>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--c-ink-muted)", marginBottom: "2.5rem", lineHeight: 1.6 }}>
          Upload a CSV of companies you&apos;re considering, write one email, and send a personalized copy to each, {"{{company}}"}, {"{{contact}}"} and {"{{email}}"} get swapped in automatically. Sent in small batches to stay within Gmail&apos;s sending limits.
        </p>

        {/* History dashboard, everyone this tool has ever emailed, so you can see at a glance who's already been contacted */}
        {showHistory && (
          <div className="card" style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <p style={labelStyle}>Send history</p>
              <button onClick={loadHistory} disabled={historyLoading} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--c-ink-muted)", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.7rem" }}>
                <RefreshCw size={12} className={historyLoading ? "spin" : ""} /> Refresh
              </button>
            </div>

            {historyError && <p style={{ color: "#B3524A", fontSize: "0.8rem", marginBottom: "1rem" }}>{historyError}</p>}

            {historySummary && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "1.25rem", fontSize: "0.78rem" }}>
                <span style={{ color: "var(--c-ink)" }}><strong>{historySummary.uniqueRecipientsContacted}</strong> unique people contacted</span>
                <span style={{ color: "#2F5D50" }}>{historySummary.totalSent} sent</span>
                {historySummary.totalSkipped > 0 && <span style={{ color: "var(--c-ink-muted)" }}>{historySummary.totalSkipped} skipped (dupes avoided)</span>}
                {historySummary.totalFailed > 0 && <span style={{ color: "#B3524A" }}>{historySummary.totalFailed} failed</span>}
              </div>
            )}

            <input
              className="field"
              placeholder="Search by email or company…"
              value={historySearch}
              onChange={e => setHistorySearch(e.target.value)}
              style={{ marginBottom: "1rem" }}
            />

            {historyLoading && historyRows.length === 0 ? (
              <p style={{ fontSize: "0.8rem", color: "var(--c-ink-muted)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Loader2 size={13} className="spin" /> Loading…
              </p>
            ) : filteredHistory.length === 0 ? (
              <p style={{ fontSize: "0.8rem", color: "var(--c-ink-muted)" }}>No sends recorded yet.</p>
            ) : (
              <div style={{ maxHeight: "320px", overflowY: "auto", border: "1px solid var(--c-border)", borderRadius: "8px" }}>
                <table style={{ width: "100%", fontSize: "0.76rem", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "var(--c-surface)" }}>
                      {["Date", "Company", "Email", "Status"].map(h => (
                        <th key={h} style={{ position: "sticky", top: 0, background: "var(--c-surface)", textAlign: "left", padding: "0.5rem 0.75rem", color: "var(--c-ink-muted)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.6rem", letterSpacing: "0.08em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHistory.map((r, i) => (
                      <tr key={i} style={{ borderTop: "1px solid var(--c-border)" }}>
                        <td style={{ padding: "0.5rem 0.75rem", color: "var(--c-ink-muted)", whiteSpace: "nowrap" }}>{new Date(r.created_at).toLocaleDateString()}</td>
                        <td style={{ padding: "0.5rem 0.75rem", color: "var(--c-ink)" }}>{r.company || "N/A"}</td>
                        <td style={{ padding: "0.5rem 0.75rem", color: "var(--c-ink)" }}>{r.email}</td>
                        <td style={{ padding: "0.5rem 0.75rem" }}>
                          <span style={{
                            color: r.status === "sent" ? "#2F5D50" : r.status === "failed" ? "#B3524A" : "var(--c-ink-muted)",
                            fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em",
                          }}>{r.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Step 1, Upload */}
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <p style={labelStyle}>1. Upload spreadsheet (CSV)</p>
          <label style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
            border: "1px dashed var(--c-border-strong)", borderRadius: "8px", padding: "1.5rem",
            cursor: "pointer", fontSize: "0.8rem", color: "var(--c-ink-muted)",
          }}>
            <Upload size={16} />
            {fileName ? `${fileName}, ${recipients.length} valid recipient${recipients.length === 1 ? "" : "s"}` : "Click to choose a .csv file"}
            <input type="file" accept=".csv,text/csv" style={{ display: "none" }}
              onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
          </label>
          {parseError && <p style={{ color: "#B3524A", fontSize: "0.8rem", marginTop: "0.75rem" }}>{parseError}</p>}
          <p style={{ fontSize: "0.72rem", color: "var(--c-ink-muted)", marginTop: "0.75rem" }}>
            Expected columns (any order, flexible naming): <strong>company</strong>, <strong>contact</strong> (person&apos;s name), <strong>email</strong>. If your file is .xlsx, export it as CSV first (File → Download → CSV in Sheets/Excel).
          </p>

          {recipients.length > 0 && (
            <div style={{ marginTop: "1.25rem", maxHeight: "220px", overflowY: "auto", border: "1px solid var(--c-border)", borderRadius: "8px" }}>
              <table style={{ width: "100%", fontSize: "0.78rem", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "var(--c-surface)" }}>
                    {["Company", "Contact", "Email", ""].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "0.5rem 0.75rem", color: "var(--c-ink-muted)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.62rem", letterSpacing: "0.08em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recipients.map((r, i) => (
                    <tr key={i} style={{ borderTop: "1px solid var(--c-border)" }}>
                      <td style={{ padding: "0.5rem 0.75rem", color: "var(--c-ink)" }}>{r.company || "N/A"}</td>
                      <td style={{ padding: "0.5rem 0.75rem", color: "var(--c-ink)" }}>{r.contact || "N/A"}</td>
                      <td style={{ padding: "0.5rem 0.75rem", color: "var(--c-ink)" }}>{r.email}</td>
                      <td style={{ padding: "0.5rem 0.75rem", textAlign: "right" }}>
                        <button onClick={() => removeRow(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--c-ink-muted)" }} aria-label="Remove">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Step 2, Compose */}
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <p style={labelStyle}>2. Write the email</p>
          <label style={{ ...labelStyle, marginTop: 0 }}>Subject</label>
          <input className="field" style={{ marginBottom: "1rem" }} value={subject} onChange={e => setSubject(e.target.value)} />
          <label style={labelStyle}>Body</label>
          <textarea className="field" style={{ minHeight: "220px", fontFamily: "var(--font-sans)", resize: "vertical" }}
            value={bodyText} onChange={e => setBodyText(e.target.value)} />

          {preview && (
            <div style={{ marginTop: "1.25rem", padding: "1rem", background: "var(--c-surface)", borderRadius: "8px", border: "1px solid var(--c-border)" }}>
              <p style={{ ...labelStyle, marginBottom: "0.75rem" }}>Preview, {preview.company || preview.email}</p>
              <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--c-ink)", marginBottom: "0.5rem" }}>{previewSubject}</p>
              <p style={{ fontSize: "0.8rem", color: "var(--c-ink-muted)", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{previewBody}</p>
            </div>
          )}
        </div>

        {/* Step 3, Send */}
        <div className="card">
          <p style={labelStyle}>3. Send</p>
          <p style={{ fontSize: "0.78rem", color: "var(--c-ink-muted)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Sends in batches of 5, with a short pause in between. For large lists, consider spreading sends across a few days, Gmail may flag an account that sends too many near-identical emails at once.
          </p>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", color: "var(--c-ink)", marginBottom: "1.25rem", cursor: "pointer" }}>
            <input type="checkbox" checked={skipContacted} onChange={e => setSkipContacted(e.target.checked)} />
            Skip anyone already contacted in a previous send
          </label>

          <button className="btn-primary" style={{ border: "none", width: "100%" }}
            onClick={handleSend} disabled={sending || recipients.length === 0}>
            {sending
              ? <><Loader2 size={14} className="spin" /> Sending {progress}/{recipients.length}…</>
              : <><Send size={14} /> Send to {recipients.length} recipient{recipients.length === 1 ? "" : "s"}</>}
          </button>

          {results.length > 0 && (
            <div style={{ marginTop: "1.25rem" }}>
              <p style={{ fontSize: "0.8rem", color: "var(--c-ink)", marginBottom: "0.75rem" }}>
                <span style={{ color: "#2F5D50" }}>{sentCount} sent</span>
                {skippedCount > 0 && <span style={{ color: "var(--c-ink-muted)" }}> · {skippedCount} skipped (already contacted)</span>}
                {failedCount > 0 && <span style={{ color: "#B3524A" }}> · {failedCount} failed</span>}
              </p>
              <div style={{ maxHeight: "180px", overflowY: "auto" }}>
                {results.map((r, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", padding: "0.35rem 0",
                    color: r.ok ? "var(--c-ink)" : r.skipped ? "var(--c-ink-muted)" : "#B3524A",
                  }}>
                    {r.ok ? <CheckCircle2 size={13} /> : r.skipped ? <MinusCircle size={13} /> : <XCircle size={13} />}
                    {r.company || r.email} {!r.ok && `: ${r.error}`}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
