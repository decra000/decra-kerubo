"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { Calendar, Mail, TrendingUp, Lock, Loader2, RefreshCw, CalendarPlus } from "lucide-react";
import { CONSULTATION_TYPES } from "@/lib/types";

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
    text: `${type?.label || b.consultation_type} — ${b.name}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [tab, setTab] = useState<"bookings" | "leads" | "subscribers">("bookings");
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

  async function markPaid(id: string) {
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

  const metrics = [
    { label: "Upcoming", value: upcoming.length, icon: Calendar, color: "#0F4D3F" },
    { label: "Total Bookings", value: bookings.length, icon: TrendingUp, color: "#C8A95B" },
    { label: "Leads", value: leads.length, icon: TrendingUp, color: "#8EA89B" },
    { label: "Subscribers", value: subscribers.length, icon: Mail, color: "#8EA89B" },
  ];

  if (!unlocked) {
    return (
      <div className="bg-[#FAF8F3] min-h-screen flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl border border-[#8EA89B]/15 p-8 w-full max-w-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#0F4D3F]/10 flex items-center justify-center">
              <Lock size={16} className="text-[#0F4D3F]" />
            </div>
            <div>
              <h1 className="font-display text-lg font-semibold text-[#0F4D3F]">Admin</h1>
              <p className="text-xs text-[#8EA89B]">Bookings, leads &amp; subscribers</p>
            </div>
          </div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") load(password); }}
            placeholder="Password"
            className="w-full border border-[#8EA89B]/30 rounded-xl px-4 py-3 text-sm mb-3 outline-none focus:border-[#0F4D3F]"
          />
          <button
            onClick={() => load(password)}
            disabled={loading || !password}
            className="w-full bg-[#0F4D3F] text-white rounded-xl py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : null}
            Unlock
          </button>
          {authError && <p className="text-xs text-red-600 mt-3">{authError}</p>}
        </div>
      </div>
    );
  }

  const bookingRow = (b: Booking) => (
    <tr key={b.id} className="border-b border-[#8EA89B]/10 hover:bg-[#FAF8F3] transition-colors">
      <td className="px-6 py-4">
        <p className="text-[#222] font-medium">{b.name}</p>
        <a href={`mailto:${b.email}`} className="text-xs text-[#8EA89B] hover:text-[#0F4D3F]">{b.email}</a>
      </td>
      <td className="px-6 py-4 text-[#666]">{CONSULTATION_TYPES.find(t => t.id === b.consultation_type)?.label || b.consultation_type}</td>
      <td className="px-6 py-4 text-[#666] whitespace-nowrap">
        {new Date(b.scheduled_at).toLocaleString("en-KE", { dateStyle: "medium", timeStyle: "short" })}
      </td>
      <td className="px-6 py-4">
        <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${b.status === "pending_payment" ? "bg-[#C8A95B]/15 text-[#8A6D2B]" : b.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-[#0F4D3F]/10 text-[#0F4D3F]"}`}>
          {b.status.replace("_", " ")}
        </span>
      </td>
      <td className="px-6 py-4 text-[#666]">
        {b.payment_method === "manual" && b.status === "pending_payment" ? (
          <div className="flex items-center gap-2">
            <span className="text-xs">{b.payment_reference ? `ref: ${b.payment_reference}` : "no ref given"}</span>
            <button
              onClick={() => markPaid(b.id)}
              disabled={marking === b.id}
              className="text-xs px-2 py-1 rounded-full bg-[#0F4D3F] text-white hover:opacity-85 transition-opacity disabled:opacity-50"
            >
              {marking === b.id ? "…" : "Mark Paid"}
            </button>
          </div>
        ) : (b.amount_paid || 0) > 0 ? (
          <span className="text-xs">KES {Number(b.amount_paid).toLocaleString("en-KE")}</span>
        ) : (
          <span className="text-xs text-[#8EA89B]">Free</span>
        )}
      </td>
      <td className="px-6 py-4">
        <a
          href={googleCalendarUrl(b)}
          target="_blank"
          rel="noopener noreferrer"
          title="Add to Google Calendar"
          className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full border border-[#0F4D3F]/25 text-[#0F4D3F] hover:bg-[#0F4D3F] hover:text-white transition-colors whitespace-nowrap"
        >
          <CalendarPlus size={12} /> Calendar
        </a>
      </td>
    </tr>
  );

  const bookingHead = (
    <tr className="border-b border-[#8EA89B]/15">
      {["Client", "Type", "When", "Status", "Payment", ""].map((h, i) => (
        <th key={i} className="text-left text-xs uppercase tracking-widest text-[#8EA89B] px-6 py-4">{h}</th>
      ))}
    </tr>
  );

  return (
    <div className="bg-[#FAF8F3] min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <h1 className="font-display text-4xl font-semibold text-[#0F4D3F] mb-2">Admin Dashboard</h1>
            <p className="text-sm text-[#8EA89B]">Private, do not share this URL.</p>
          </div>
          <button
            onClick={() => load(password)}
            disabled={loading}
            className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-[#8EA89B]/30 text-[#0F4D3F] hover:bg-white transition-colors disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        {/* Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="bg-white rounded-2xl p-6 border border-[#8EA89B]/15">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${m.color}15` }}>
                    <Icon size={18} style={{ color: m.color }} />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[#8EA89B]">{m.label}</span>
                </div>
                <p className="font-display text-4xl font-semibold text-[#0F4D3F]">{m.value}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-[#8EA89B]/20">
          {(["bookings", "leads", "subscribers"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                tab === t ? "border-[#0F4D3F] text-[#0F4D3F]" : "border-transparent text-[#8EA89B] hover:text-[#444]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "bookings" && (
          <>
            <h2 className="text-xs uppercase tracking-widest text-[#8EA89B] mb-4">Upcoming ({upcoming.length})</h2>
            <div className="bg-white rounded-2xl border border-[#8EA89B]/15 overflow-hidden mb-10">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>{bookingHead}</thead>
                  <tbody>
                    {upcoming.length === 0 && (
                      <tr><td colSpan={6} className="px-6 py-8 text-center text-sm text-[#8EA89B]">No upcoming bookings.</td></tr>
                    )}
                    {upcoming.map(bookingRow)}
                  </tbody>
                </table>
              </div>
            </div>

            <h2 className="text-xs uppercase tracking-widest text-[#8EA89B] mb-4">Past ({past.length})</h2>
            <div className="bg-white rounded-2xl border border-[#8EA89B]/15 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>{bookingHead}</thead>
                  <tbody>
                    {past.length === 0 && (
                      <tr><td colSpan={6} className="px-6 py-8 text-center text-sm text-[#8EA89B]">No past bookings.</td></tr>
                    )}
                    {past.map(bookingRow)}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {tab === "leads" && (
          <div className="bg-white rounded-2xl border border-[#8EA89B]/15 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#8EA89B]/15">
                    {["Name", "Email", "Organization", "Source", "Date"].map((h) => (
                      <th key={h} className="text-left text-xs uppercase tracking-widest text-[#8EA89B] px-6 py-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} className="border-b border-[#8EA89B]/10 hover:bg-[#FAF8F3] transition-colors">
                      <td className="px-6 py-4 text-[#222] font-medium">{l.name}</td>
                      <td className="px-6 py-4 text-[#666]">{l.email}</td>
                      <td className="px-6 py-4 text-[#666]">{l.organization || "—"}</td>
                      <td className="px-6 py-4 text-[#666]">{l.source}</td>
                      <td className="px-6 py-4 text-[#666]">{new Date(l.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "subscribers" && (
          <div className="bg-white rounded-2xl border border-[#8EA89B]/15 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#8EA89B]/15">
                    {["Email", "Name", "Date"].map((h) => (
                      <th key={h} className="text-left text-xs uppercase tracking-widest text-[#8EA89B] px-6 py-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((s) => (
                    <tr key={s.id} className="border-b border-[#8EA89B]/10 hover:bg-[#FAF8F3] transition-colors">
                      <td className="px-6 py-4 text-[#222]">{s.email}</td>
                      <td className="px-6 py-4 text-[#666]">{s.name || "—"}</td>
                      <td className="px-6 py-4 text-[#666]">{new Date(s.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
