import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="section page-x" style={{ background: "var(--c-sage-deep)" }}>
      <div className="inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} id="cta-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.75rem" }}>
            <span style={{ display: "inline-block", width: "1.75rem", height: "1px", background: "var(--c-gold)" }} />
            <span style={{ fontSize: "0.675rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--c-sage-light)", opacity: 0.7 }}>Get started</span>
          </div>
          <h2 className="t-display t-display-lg" style={{ color: "rgba(244,245,240,0.93)", marginBottom: "1.35rem" }}>
            Not sure where to start?
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(244,245,240,0.55)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "26rem" }}>
            A 15-minute discovery call costs nothing. We'll work out which track fits your situation and what the right next step looks like.
          </p>
          <Link href="/book" style={{
            display: "inline-flex", alignItems: "center", gap: "0.45rem",
            background: "var(--c-gold)", color: "#fff", fontFamily: "var(--font-manjari)",
            fontWeight: 700, fontSize: "0.825rem", letterSpacing: "0.07em",
            padding: "0.85rem 1.85rem", borderRadius: "100px", textDecoration: "none",
            transition: "opacity 0.2s",
          }}>
            Book a Discovery Call <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {[
            { q: "Do you have a digital product handling user data?",       a: "Technology Law" },
            { q: "About to sign a major contract or license IP?",          a: "Technology Law" },
            { q: "Expanding operations into another country?",             a: "Technology Law" },
            { q: "Incorporating a company or formalising your structure?", a: "Entrepreneurial Law" },
            { q: "Raising funding or bringing in investors?",              a: "Entrepreneurial Law" },
            { q: "Co-founders with no written agreement?",                 a: "Entrepreneurial Law" },
          ].map(item => (
            <div key={item.q} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              gap: "1.25rem", padding: "0.9rem 1.1rem", borderRadius: "8px",
              border: "1px solid rgba(244,245,240,0.08)", background: "rgba(244,245,240,0.04)",
            }}>
              <p style={{ fontSize: "0.875rem", color: "rgba(244,245,240,0.6)", lineHeight: 1.55, flex: 1 }}>{item.q}</p>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--c-gold)", whiteSpace: "nowrap" }}>{item.a}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){ #cta-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }`}</style>
    </section>
  );
}
