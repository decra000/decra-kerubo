import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="section page-x" style={{ background: "var(--c-bg)", borderTop: "1px solid var(--c-border)" }}>
      <div className="inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">Ready to begin?</span>
          </div>
          <h2 className="t-display t-display-lg" style={{ marginBottom: "1.25rem" }}>Not sure where to start?<br />Start with a conversation.</h2>
          <p className="t-body" style={{ marginBottom: "2.5rem" }}>
            A 15-minute discovery call costs nothing. We'll identify which track fits your situation — or whether it's a combination of both — and what the right first step looks like.
          </p>
          <Link href="/book" className="btn-primary">Book a Discovery Call <ArrowRight size={13} /></Link>
        </div>

        {/* Decision helper */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            { q: "Do you have a product that handles user data?",    a: "→ Tech Policy & Startup Law" },
            { q: "Are you about to sign a major contract?",         a: "→ Tech Policy & Startup Law" },
            { q: "Are you about to incorporate or raise funding?",  a: "→ Founder Legal" },
            { q: "Have you never formalised your co-founder split?",a: "→ Founder Legal" },
            { q: "Do you need AI built or deployed?",              a: "→ Entrora Systems" },
          ].map(item => (
            <div key={item.q} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", padding: "0.85rem 1rem", borderRadius: "8px", border: "1px solid var(--c-border)", background: "var(--c-surface)" }}>
              <p style={{ fontSize: "0.775rem", color: "var(--c-ink-mid)", lineHeight: 1.5, flex: 1 }}>{item.q}</p>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--c-forest)", whiteSpace: "nowrap" }}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.inner{grid-template-columns:1fr !important; gap:2.5rem !important;}}`}</style>
    </section>
  );
}
