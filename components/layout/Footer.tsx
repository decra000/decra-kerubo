import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ background: "var(--c-sage-deep)", color: "var(--c-bg)", paddingTop: "var(--space-section)", paddingBottom: "3rem", paddingLeft: "var(--space-page-x)", paddingRight: "var(--space-page-x)" }}>
      <style>{`.footer-link { font-size: 0.825rem; color: rgba(244,245,240,0.45); text-decoration: none; transition: color 0.2s; } .footer-link:hover { color: rgba(244,245,240,0.88); }`}</style>
      <div className="inner">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "3rem", paddingBottom: "3rem", borderBottom: "1px solid rgba(244,245,240,0.08)" }}>
          <div style={{ gridColumn: "span 2" }}>
            <p style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.1rem", marginBottom: "0.85rem", color: "rgba(244,245,240,0.9)" }}>Decra</p>
            <p style={{ fontSize: "0.875rem", color: "rgba(244,245,240,0.45)", lineHeight: 1.8, maxWidth: "22rem", marginBottom: "1.5rem" }}>
              Technology law and entrepreneurial advisory for startups, NGOs, and founders. Based in Nairobi.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <a href="mailto:hello@decrakero.com" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "var(--c-gold)", textDecoration: "none" }}>
                <Mail size={13} /> hello@decrakero.com
              </a>
              <a href="https://linkedin.com/in/decra-kerubo" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "var(--c-gold)", textDecoration: "none" }}>
                LinkedIn <ArrowUpRight size={11} />
              </a>
              <a href="https://entrorasystems.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "var(--c-gold)", textDecoration: "none" }}>
                Entrora Systems <ArrowUpRight size={11} />
              </a>
            </div>
          </div>

          <div>
            <p className="t-label" style={{ color: "var(--c-gold)", marginBottom: "1rem" }}>Services</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {[["Technology Law", "/services#tech-law"], ["Entrepreneurial Law", "/services#entrepreneurial-law"], ["The 1000", "/the-1000"]].map(([l, h]) => (
                <Link key={h} href={h} className="footer-link">{l}</Link>
              ))}
            </div>
          </div>

          <div>
            <p className="t-label" style={{ color: "var(--c-gold)", marginBottom: "1rem" }}>Navigate</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {[["About", "/about"], ["Book a Call", "/book"]].map(([l, h]) => (
                <Link key={h} href={h} className="footer-link">{l}</Link>
              ))}
              <a href="https://entrorasystems.com" target="_blank" rel="noopener noreferrer" className="footer-link">AI Engineering ↗</a>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: "1.75rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <p style={{ fontSize: "0.7rem", color: "rgba(244,245,240,0.25)" }}>© {new Date().getFullYear()} Decra. All rights reserved.</p>
          <p style={{ fontSize: "0.7rem", color: "rgba(244,245,240,0.25)" }}>Nairobi, Kenya</p>
        </div>
      </div>
    </footer>
  );
}
