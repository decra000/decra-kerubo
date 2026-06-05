import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ background: "var(--c-forest)", color: "var(--c-bg)", paddingTop: "var(--space-section)", paddingBottom: "3rem", paddingLeft: "var(--space-page-x)", paddingRight: "var(--space-page-x)" }}>
      <style>{`
        .footer-link { font-size: 0.775rem; color: rgba(248,246,241,0.5); text-decoration: none; transition: color 0.2s; }
        .footer-link:hover { color: rgba(248,246,241,0.9); }
      `}</style>
      <div className="inner">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "3rem", paddingBottom: "3rem", borderBottom: "1px solid rgba(248,246,241,0.08)" }}>
          <div style={{ gridColumn: "span 2" }}>
            <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "1rem", marginBottom: "0.75rem" }}>Decra</p>
            <p style={{ fontSize: "0.775rem", color: "rgba(248,246,241,0.5)", lineHeight: 1.7, maxWidth: "22rem", marginBottom: "1.5rem" }}>
              Lawyer. Computer Scientist. AI Engineer. Entrepreneur.
              Helping organizations navigate law, technology, and growth.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <a href="mailto:hello@decrakero.com" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--c-gold)", textDecoration: "none" }}>
                <Mail size={13} /> hello@decrakero.com
              </a>
              <a href="https://linkedin.com/in/decra-kerubo" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--c-gold)", textDecoration: "none" }}>
                LinkedIn <ArrowUpRight size={11} />
              </a>
              <a href="https://entrorasystems.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--c-gold)", textDecoration: "none" }}>
                Entrora Systems <ArrowUpRight size={11} />
              </a>
            </div>
          </div>

          <div>
            <p className="t-label" style={{ color: "var(--c-gold)", marginBottom: "1rem" }}>Advisory</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[["Tech Policy & Startup Law", "/services#tech-law"], ["Founder Legal", "/services#founder-legal"], ["The 1000 — Tech Harm Index", "/the-1000"]].map(([l, h]) => (
                <Link key={h} href={h} className="footer-link">{l}</Link>
              ))}
            </div>
          </div>

          <div>
            <p className="t-label" style={{ color: "var(--c-gold)", marginBottom: "1rem" }}>Navigate</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[["About & Work", "/about"], ["Book a Call", "/book"]].map(([l, h]) => (
                <Link key={h} href={h} className="footer-link">{l}</Link>
              ))}
              <a href="https://entrorasystems.com" target="_blank" rel="noopener noreferrer" className="footer-link">AI & Tech Services ↗</a>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: "1.75rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <p style={{ fontSize: "0.65rem", color: "rgba(248,246,241,0.3)" }}>© {new Date().getFullYear()} Decra. All rights reserved.</p>
          <p style={{ fontSize: "0.65rem", color: "rgba(248,246,241,0.3)" }}>Nairobi, Kenya</p>
        </div>
      </div>
    </footer>
  );
}
