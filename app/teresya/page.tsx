"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, AlertCircle } from "lucide-react";

type Msg = { role: "user" | "assistant"; text: string; citations?: string[]; outOfTokens?: boolean; down?: boolean };

const STARTERS = [
  "What business structure fits a two-founder startup in Kenya?",
  "What should a co-founder agreement cover?",
  "Do I need to register for eTIMS before I have revenue?",
  "What does ODPC compliance actually require for a new app?",
];

export default function TeresyaPage() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [outOfTokens, setOutOfTokens] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, loading]);

  const send = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading || outOfTokens) return;
    const next: Msg[] = [...msgs, { role: "user", text }];
    setMsgs(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/teresya", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.map((m) => ({ role: m.role, content: m.text })) }),
      });
      const data = await res.json();
      if (data.outOfTokens) {
        setOutOfTokens(true);
        setMsgs([...next, { role: "assistant", text: data.reply, outOfTokens: true }]);
        return;
      }
      setMsgs([...next, { role: "assistant", text: data.reply || "Sorry, something went wrong.", citations: data.citations, down: !!data.down }]);
    } catch {
      setMsgs([...next, { role: "assistant", text: "Connection issue, please try again.", down: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100svh", paddingTop: "6rem", paddingBottom: "5rem", paddingLeft: "var(--space-page-x)", paddingRight: "var(--space-page-x)" }}>
      <div style={{ maxWidth: "42rem", margin: "0 auto" }}>
        <Link href="/engineering" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--c-ink-muted)", textDecoration: "none", marginBottom: "2rem" }}>
          <ArrowLeft size={13} /> Engineering
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
          <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
          <span className="t-label">AI Chatbot · For Entrepreneurs</span>
        </div>
        <h1 className="t-display t-display-lg" style={{ marginBottom: "0.75rem" }}>Teresya.</h1>
        <p className="t-body" style={{ marginBottom: "2rem", maxWidth: "36rem" }}>
          An AI legal-research assistant scoped to one thing: the early-stage legal decisions founders face in Kenya, structuring, co-founder agreements, contracts, IP, tax/regulatory basics, data protection, and fundraising readiness. Grounded in kenyalaw.org, with citations. General legal information, not legal advice, not a substitute for an advocate.
        </p>

        {outOfTokens && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", background: "rgba(180,69,58,0.06)", border: "1px solid rgba(180,69,58,0.25)", borderRadius: "10px", padding: "1rem 1.1rem", marginBottom: "1.5rem" }}>
            <AlertCircle size={15} style={{ color: "#B4453A", flexShrink: 0, marginTop: "0.1rem" }} />
            <div>
              <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.8rem", color: "#B4453A", marginBottom: "0.25rem" }}>Out of tokens.</p>
              <p style={{ fontSize: "0.78rem", color: "var(--c-ink-mid)", lineHeight: 1.6, marginBottom: "0.5rem" }}>
                Teresya's free-tier budget is used up for now. Check back later, or if this is time-sensitive, <Link href="/book" style={{ color: "var(--c-forest)", fontWeight: 700 }}>book time with Decra directly</Link>.
              </p>
            </div>
          </div>
        )}

        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", minHeight: "24rem", maxHeight: "34rem", overflowY: "auto", padding: "1.5rem" }}>
            {msgs.length === 0 && (
              <div>
                <p className="t-body-sm" style={{ marginBottom: "0.85rem" }}>Try asking:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {STARTERS.map((s) => (
                    <button key={s} onClick={() => send(s)} style={{
                      textAlign: "left", background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: "8px",
                      padding: "0.65rem 0.9rem", fontSize: "0.78rem", color: "var(--c-ink-mid)", cursor: "pointer",
                    }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {msgs.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "88%" }}>
                {m.role === "assistant" && (
                  <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.65rem", color: m.outOfTokens || m.down ? "#B4453A" : "var(--c-accent)", marginBottom: "0.25rem" }}>
                    Teresya
                  </p>
                )}
                <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.85rem", lineHeight: 1.7, color: m.role === "user" ? "var(--c-ink)" : "var(--c-ink-mid)", whiteSpace: "pre-wrap" }}>
                  {m.text}
                </p>
                {m.citations && m.citations.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", marginTop: "0.6rem" }}>
                    {m.citations.map((c) => (
                      <a key={c} href={c} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.68rem", color: "var(--c-forest)", textDecoration: "none" }}>
                        <ArrowUpRight size={11} /> {c.replace(/^https?:\/\//, "")}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start" }}>
                <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.65rem", color: "var(--c-accent)", marginBottom: "0.25rem" }}>Teresya</p>
                <p style={{ fontSize: "0.8rem", color: "var(--c-ink-muted)" }}>Researching kenyalaw.org...</p>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div style={{ borderTop: "1px solid var(--c-border)", padding: "1rem 1.25rem", display: "flex", gap: "0.6rem" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); send(); } }}
              placeholder={outOfTokens ? "Teresya is out of tokens right now" : "Ask about structuring, contracts, IP, tax, fundraising..."}
              disabled={loading || outOfTokens}
              className="field"
              style={{ flex: 1, opacity: outOfTokens ? 0.5 : 1 }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading || outOfTokens}
              className="btn-primary"
              style={{ border: "none", opacity: (!input.trim() || loading || outOfTokens) ? 0.4 : 1, flexShrink: 0 }}
            >
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <p className="t-body-sm" style={{ marginTop: "1.5rem" }}>
          Have a real, active matter? <Link href="/book" style={{ color: "var(--c-forest)", fontWeight: 700 }}>Book a Discovery call with Decra</Link> instead of relying on Teresya alone.
        </p>
      </div>
    </div>
  );
}
