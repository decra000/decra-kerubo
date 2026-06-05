"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Users, Calendar, Mail, TrendingUp } from "lucide-react";

export default function AdminPage() {
  const [stats, setStats] = useState({ bookings: 0, leads: 0, subscribers: 0 });
  const [bookings, setBookings] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [tab, setTab] = useState<"bookings" | "leads" | "subscribers">("bookings");

  useEffect(() => {
    const load = async () => {
      const [b, l, s] = await Promise.all([
        supabase.from("bookings").select("*").order("created_at", { ascending: false }),
        supabase.from("leads").select("*").order("created_at", { ascending: false }),
        supabase.from("subscribers").select("*").order("created_at", { ascending: false }),
      ]);
      setBookings(b.data || []);
      setLeads(l.data || []);
      setStats({ bookings: b.data?.length || 0, leads: l.data?.length || 0, subscribers: s.data?.length || 0 });
    };
    load();
  }, []);

  const metrics = [
    { label: "Total Bookings", value: stats.bookings, icon: Calendar, color: "#0F4D3F" },
    { label: "Total Leads", value: stats.leads, icon: TrendingUp, color: "#C8A95B" },
    { label: "Subscribers", value: stats.subscribers, icon: Mail, color: "#8EA89B" },
  ];

  return (
    <div className="bg-[#FAF8F3] min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-4xl font-semibold text-[#0F4D3F] mb-2">Admin Dashboard</h1>
        <p className="text-sm text-[#8EA89B] mb-12">Private — do not share this URL.</p>

        {/* Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
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

        {/* Table */}
        <div className="bg-white rounded-2xl border border-[#8EA89B]/15 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#8EA89B]/15">
                  {tab === "bookings" && ["Name", "Email", "Type", "Date", "Status"].map((h) => (
                    <th key={h} className="text-left text-xs uppercase tracking-widest text-[#8EA89B] px-6 py-4">{h}</th>
                  ))}
                  {tab === "leads" && ["Name", "Email", "Organization", "Source", "Date"].map((h) => (
                    <th key={h} className="text-left text-xs uppercase tracking-widest text-[#8EA89B] px-6 py-4">{h}</th>
                  ))}
                  {tab === "subscribers" && ["Email", "Name", "Date"].map((h) => (
                    <th key={h} className="text-left text-xs uppercase tracking-widest text-[#8EA89B] px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tab === "bookings" && bookings.map((b) => (
                  <tr key={b.id} className="border-b border-[#8EA89B]/10 hover:bg-[#FAF8F3] transition-colors">
                    <td className="px-6 py-4 text-[#222] font-medium">{b.name}</td>
                    <td className="px-6 py-4 text-[#666]">{b.email}</td>
                    <td className="px-6 py-4 text-[#666]">{b.consultation_type}</td>
                    <td className="px-6 py-4 text-[#666]">{new Date(b.scheduled_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 bg-[#0F4D3F]/10 text-[#0F4D3F] rounded-full">{b.status}</span>
                    </td>
                  </tr>
                ))}
                {tab === "leads" && leads.map((l) => (
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
      </div>
    </div>
  );
}
