"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { Calendar, Mail, TrendingUp, Lock, Loader2, RefreshCw, CalendarPlus, Radio } from "lucide-react";
import { CONSULTATION_TYPES } from "@/lib/types";
import { BroadcastPanel } from "@/components/admin/BroadcastPanel";

type Booking = {
  id: string; name: string; email: string; organization?: string;
  primary_challenge?: string; desired_outcome?: string;
  consultation_type: string; scheduled_at: string; status: string;
  amount_paid?: number; payment_reference?: string; payment_method?: string;
  created_at: string;
};
type Lead = { id: string; name: string; email: string; organization?: string; source: string; created_at: string };
type Subscriber = { id: string; email: string; name?: string; created_at: string };

const PASSWORD_KEY = "decra-admin-password";

const labelStyle = { display: "block", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "var(--c-ink-muted)", marginBottom: "0.5rem" };
const thStyle = { textAlign: "left" as const, padding: "0.6rem 0.85rem", color: "var(--c-ink-muted)", fontWeight: 700, textTransform: "uppercase" as const, fontSize: "0.6rem", letterSpacing: "0.08em", whiteSpace: "nowrap" as const };
const tdStyle = { padding: "0.7rem 0.85rem", fontSize: "0.8rem", color: "var(--c-ink)" };

/** Builds a Google Calendar "add event" link so a booking lands on Decra's
 *  main calendar in one click — duration comes from the consultation type. */
function googleCalendarUrl(b: Booking) {
  const type = CONSULTATION_TYPES.find(t => t.id === b.consultation_type);
  const durationMin = type?.duration || 30;
  const start = new Date(b.scheduled_at);
  const end = new Date(start.getTime() + durationMin * 60_000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const details = [
    `Booked via decrakerubo.com`,
    `Email: ${b.email}`,
    b.organization ? `Organization: ${b.organization}` : "",
    b.primary_challenge ? `Challenge: ${b.primary_challenge}` : "",
    b.desired_outcome ? `Desired outcome: ${b.desired_outcome}` : "",
  ].filter(Boolean).join("\n");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${type?.label || b.consultation_type}, ${b.name}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const TABS = [
  { id: "bookings", label: "Bookings" },
  { id: "leads", label: "Leads" },
  { id: "subscribers", label: "Subscribers" },
  { id: "broadcast", label: "Broadcast" },
] as const;
type TabId = (typeof TABS)[number]["id"];

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [tab, setTab] = useState<TabId>("bookings");
  const [marking, setMarking] = useState<string | null>(null);

  async function load(pw: string) {
    setLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/admin/data", { headers: { "x-admin-password": pw } });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || "Couldn't load data.");
        setUnlocked(false);
        sessionStorage.removeItem(PASSWORD_KEY);
        return;
      }
      setBookings(data.bookings || []);
      setLeads(data.leads || []);
      setSubscribers(data.subscribers || []);
      setUnlocked(true);
      sessionStorage.setItem(PASSWORD_KEY, pw);
    } catch {
      setAuthError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  // Survive a refresh within the same browser session.
  useEffect(() => {
    const saved = sessionStorage.getItem(PASSWORD_KEY);
    if (saved) { setPassword(saved); load(saved); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Confirms a booking and emails the client. Serves both the "Confirm"
  // button on a pending meeting request and "Mark paid" on a manual payment —
  // both are the same transition to confirmed.
  async function confirmBooking(id: string) {
    setMarking(id);
    try {
      const res = await fetch("/api/admin/mark-paid", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({ id }),
      });
      if (res.ok) setBookings(prev => prev.map(x => x.id === id ? { ...x, status: "confirmed" } : x));
    } finally {
      setMarking(null);
    }
  }

  const now = Date.now();
  const upcoming = bookings.filter(b => new Date(b.scheduled_at).getTime() >= now)
    .sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime());
  const past = bookings.filter(b => new Date(b.scheduled_at).getTime() < now);

  if (!unlocked) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", background: "var(--c-bg)" }}>
        <div className="card" style={{ maxWidth: "22rem", width: "100%", textAlign: "center" }}>
          <Lock size={22} style={{ color: "var(--c-ink-muted)", marginBottom: "1rem" }} />
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", color: "var(--c-ink)", marginBottom: "0.4rem" }}>Private, Admin</p>
          <p style={{ fontSize: "0.75rem", color: "var(--c-ink-muted)", marginBottom: "1.5rem" }}>Bookings, leads, subscribers &amp; broadcast</p>
          <input
            type="password"
            className="field"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && load(password)}
            style={{ marginBottom: "1rem" }}
          />
          {authError && <p style={{ color: "#B3524A", fontSize: "0.8rem", marginBottom: "1rem" }}>{authError}</p>}
          <button className="btn-primary" style={{ border: "none", width: "100%" }} onClick={() => load(password)} disabled={loading || !password}>
            {loading ? "Checking…" : "Unlock"}
          </button>
        </div>
      </div>
    );
  }

  const metrics = [
    { label: "Upcoming", value: upcoming.length, icon: Calendar },
    { label: "Total bookings", value: bookings.length, icon: TrendingUp },
    { label: "Leads", value: leads.length, icon: TrendingUp },
    { label: "Subscribers", value: subscribers.length, icon: Mail },
  ];

  const bookingHead = (
    <tr style={{ background: "var(--c-surface)" }}>
      {["Client", "Type", "When", "Status", "Payment", ""].map((h, i) => (
        <th key={i} style={thStyle}>{h}</th>
      ))}
    </tr>
  );

  const bookingRow = (b: Booking) => (
    <tr key={b.id} style={{ borderTop: "1px solid var(--c-border)" }}>
      <td style={tdStyle}>
        <span style={{ display: "block", fontWeight: 600 }}>{b.name}</span>
        <a href={`mailto:${b.email}`} style={{ fontSize: "0.72rem", color: "var(--c-ink-muted)", textDecoration: "none" }}>{b.email}</a>
      </td>
      <td style={tdStyle}>{CONSULTATION_TYPES.find(t => t.id === b.consultation_type)?.label || b.consultation_type}</td>
      <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>
        {new Date(b.scheduled_at).toLocaleString("en-KE", { dateStyle: "medium", timeStyle: "short" })}
      </td>
      <td style={tdStyle}>
        <span style={{
          display: "block", marginBottom: b.status === "pending" ? "0.4rem" : 0,
          fontSize: "0.66rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap",
          color: b.status === "pending_payment" || b.status === "pending" ? "#8A6D2B" : b.status === "cancelled" ? "#B3524A" : "#2F5D50",
        }}>
          {b.status === "pending" ? "Awaiting you" : b.status.replace("_", " ")}
        </span>
        {/* A pending request has been acknowledged to the client but not
            confirmed, this button is what actually sends them the
            confirmation email. */}
        {b.status === "pending" && (
          <button
            onClick={() => confirmBooking(b.id)}
            disabled={marking === b.id}
            style={{
              fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
              background: "var(--c-forest)", color: "#fff", border: "none", borderRadius: "999px",
              padding: "0.35rem 0.8rem", cursor: "pointer", opacity: marking === b.id ? 0.6 : 1, whiteSpace: "nowrap",
            }}
          >
            {marking === b.id ? "…" : "Confirm"}
          </button>
        )}
      </td>
      <td style={tdStyle}>
        {b.payment_method === "manual" && b.status === "pending_payment" ? (
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", whiteSpace: "nowrap" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--c-ink-muted)" }}>{b.payment_reference ? `ref: ${b.payment_reference}` : "no ref"}</span>
            <button
              onClick={() => confirmBooking(b.id)}
              disabled={marking === b.id}
              style={{
                fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
                background: "var(--c-ink)", color: "var(--c-bg)", border: "none", borderRadius: "999px",
                padding: "0.35rem 0.8rem", cursor: "pointer", opacity: marking === b.id ? 0.6 : 1,
              }}
            >
              {marking === b.id ? "…" : "Mark paid"}
            </button>
          </span>
        ) : (b.amount_paid || 0) > 0 ? (
          <span style={{ fontSize: "0.75rem" }}>KES {Number(b.amount_paid).toLocaleString("en-KE")}</span>
        ) : (
          <span style={{ fontSize: "0.75rem", color: "var(--c-ink-muted)" }}>Free</span>
        )}
      </td>
      <td style={{ ...tdStyle, textAlign: "right" }}>
        <a
          href={googleCalendarUrl(b)}
          target="_blank"
          rel="noopener noreferrer"
          title="Add to Google Calendar"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.35rem", whiteSpace: "nowrap",
            fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
            color: "var(--c-accent)", border: "1px solid var(--c-border-strong)", borderRadius: "999px",
            padding: "0.35rem 0.8rem", textDecoration: "none",
          }}
        >
          <CalendarPlus size={12} /> Calendar
        </a>
      </td>
    </tr>
  );

  const bookingsTable = (rows: Booking[], emptyText: string) => (
    <div style={{ border: "1px solid var(--c-border)", borderRadius: "10px", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>{bookingHead}</thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={6} style={{ ...tdStyle, textAlign: "center", color: "var(--c-ink-muted)", padding: "1.75rem" }}>{emptyText}</td></tr>
            )}
            {rows.map(bookingRow)}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--c-bg)", padding: "7rem var(--space-x) 5rem" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2.5rem" }}>
          <div>
            <p style={labelStyle}>Private, do not share this URL</p>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem,3vw,2.1rem)", color: "var(--c-ink)" }}>
              Admin
            </h1>
          </div>
          <button
            onClick={() => load(password)}
            disabled={loading}
            style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              background: "none", border: "1px solid var(--c-border-strong)", borderRadius: "999px",
              padding: "0.4rem 0.85rem", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "var(--c-ink-muted)", cursor: "pointer",
            }}
          >
            <RefreshCw size={12} className={loading ? "spin" : ""} /> Refresh
          </button>
        </div>

        {/* Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(9rem, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="card" style={{ padding: "1.1rem 1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
                  <Icon size={13} style={{ color: "var(--c-accent)" }} />
                  <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-ink-muted)" }}>{m.label}</span>
                </div>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.9rem", color: "var(--c-ink)", lineHeight: 1 }}>{m.value}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "1.75rem", marginBottom: "2rem", borderBottom: "1px solid var(--c-border)" }}>
          {TABS.map((t) => {
            const on = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  background: "none", border: "none", cursor: "pointer",
                  padding: "0 0 0.8rem", marginBottom: "-1px",
                  fontFamily: "var(--font-manjari)", fontWeight: 700,
                  fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase",
                  color: on ? "var(--c-accent)" : "var(--c-ink-muted)",
                  borderBottom: on ? "1px solid var(--c-accent)" : "1px solid transparent",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                {t.id === "broadcast" && <Radio size={11} />}
                {t.label}
              </button>
            );
          })}
        </div>

        {tab === "bookings" && (
          <>
            <p style={labelStyle}>Upcoming ({upcoming.length})</p>
            <div style={{ marginBottom: "2.5rem" }}>
              {bookingsTable(upcoming, "No upcoming bookings.")}
            </div>
            <p style={labelStyle}>Past ({past.length})</p>
            {bookingsTable(past, "No past bookings.")}
          </>
        )}

        {tab === "leads" && (
          <div style={{ border: "1px solid var(--c-border)", borderRadius: "10px", overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "var(--c-surface)" }}>
                    {["Name", "Email", "Organization", "Source", "Date"].map((h) => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.length === 0 && (
                    <tr><td colSpan={5} style={{ ...tdStyle, textAlign: "center", color: "var(--c-ink-muted)", padding: "1.75rem" }}>No leads yet.</td></tr>
                  )}
                  {leads.map((l) => (
                    <tr key={l.id} style={{ borderTop: "1px solid var(--c-border)" }}>
                      <td style={{ ...tdStyle, fontWeight: 600 }}>{l.name}</td>
                      <td style={tdStyle}>{l.email}</td>
                      <td style={tdStyle}>{l.organization || "-"}</td>
                      <td style={tdStyle}>{l.source}</td>
                      <td style={{ ...tdStyle, color: "var(--c-ink-muted)", whiteSpace: "nowrap" }}>{new Date(l.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "subscribers" && (
          <div style={{ border: "1px solid var(--c-border)", borderRadius: "10px", overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "var(--c-surface)" }}>
                    {["Email", "Name", "Date"].map((h) => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {subscribers.length === 0 && (
                    <tr><td colSpan={3} style={{ ...tdStyle, textAlign: "center", color: "var(--c-ink-muted)", padding: "1.75rem" }}>No subscribers yet.</td></tr>
                  )}
                  {subscribers.map((s) => (
                    <tr key={s.id} style={{ borderTop: "1px solid var(--c-border)" }}>
                      <td style={tdStyle}>{s.email}</td>
                      <td style={tdStyle}>{s.name || "-"}</td>
                      <td style={{ ...tdStyle, color: "var(--c-ink-muted)", whiteSpace: "nowrap" }}>{new Date(s.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "broadcast" && <BroadcastPanel password={password} />}
      </div>
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
