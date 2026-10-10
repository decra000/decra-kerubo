import type { Metadata } from "next";
import Link from "next/link";
import { SERVICE_GROUPS } from "@/lib/services";

export const metadata: Metadata = {
  title: "Technology, Product & Legal Advisory Services in Kenya",
  description:
    "Technical product development, AI and systems engineering, product counsel, technology transactions, compliance advisory and subcontract support from Decra Kerubo in Nairobi, Kenya.",
  // Without its own entry this inherited the root layout's canonical of "/",
  // so the page told Google it was a duplicate of the homepage and asked not
  // to be indexed — on the one page most likely to be searched for.
  alternates: { canonical: "/services" },
};

const faqs = [
  { q: "Who is this practice designed for?", a: "Founders, product and engineering leaders, investors, procurers, and professional firms working on technology products. The right starting point depends on whether the decision concerns building, reviewing, governing, commercializing or embedding support around a product." },
  { q: "How do you decide which service is appropriate?", a: "Begin with the decision, deadline and evidence available. A defined product or transaction issue may call for a review; a continuing stream of product decisions may justify embedded counsel; a build or systems problem may call for engineering support." },
  { q: "Can technical and legal work be combined?", a: "They can be scoped together where the work requires both, or separately where a team needs a defined technical or advisory deliverable. The engagement sets responsibilities, access, outputs and boundaries." },
  { q: "Does this practice provide court representation or formal filings?", a: "No. The practice focuses on product, technology and engineering advisory. Formal legal representation and filings are referred to a practising advocate." },
  { q: "Can a firm retain Decra for subcontracted support?", a: "Yes. A law firm, consultancy or project lead can request a defined technical and product-risk workstream, subject to agreement on supervision, conflicts, confidentiality, client contact and deliverables." },
];

export default function ServicesPage() {
  return (
    <div style={{ background: "var(--c-bg)", paddingTop: "6rem" }}>
      {/* ── Header ── */}
      <section className="section page-x" style={{ borderBottom: "1px solid var(--c-border)" }}>
        <div className="inner header-grid" style={{ alignItems: "end" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
              <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
              <span className="t-label">Advisory Services</span>
            </div>
            <h1 className="t-display t-display-xl">One practice, distinct ways to move a technology decision forward.</h1>
          </div>
          <div>
            <p className="t-body" style={{ marginBottom: "1.5rem" }}>
              Based in Nairobi, Decra Kerubo works across product engineering and technology advisory. Engagements are organized around the decision at hand: developing or assessing a system, reviewing product and transaction risk, translating obligations into controls, providing continuing counsel, or contributing specialist capacity to another firm’s work.
            </p>
          </div>
        </div>
      </section>

      {/* ── The service areas ──
          Every category page is reachable from here. A page nothing links to
          is a page search engines treat as unimportant, however good it is. */}
      <section className="section page-x" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div className="inner">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">How to engage</span>
          </div>
          <h2 className="t-display t-display-md" style={{ marginBottom: "2.5rem" }}>Start with the decision in front of you.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))", gap: "1.5rem" }}>
            {SERVICE_GROUPS.map((g) => (
              <Link key={g.id} href={`/services/${g.id}`} style={{ textDecoration: "none", border: "1px solid var(--c-border)", padding: "1.5rem", display: "block" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.05rem", color: "var(--c-ink)", marginBottom: "0.6rem" }}>{g.label}</h3>
                <p className="t-body-sm" style={{ marginBottom: "0.75rem" }}>{g.description}</p>
                <span className="t-label" style={{ color: "var(--c-ink-muted)" }}>{g.kind === "policy" ? "Research & opinion" : g.id === "embedded-product-counsel" ? "Ongoing advisory" : g.id === "technical-legal-subcontractor" ? "Project-based collaboration" : g.id === "ai-and-systems-engineering" ? "Engineering engagement" : `${g.services.length} areas of work`}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="section page-x" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div className="inner" style={{ maxWidth: "44rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "3rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">FAQs</span>
          </div>
          <h2 className="t-display t-display-md" style={{ marginBottom: "2.5rem" }}>Common questions.</h2>
          {faqs.map(f => (
            <div key={f.q} style={{ borderBottom: "1px solid var(--c-border)", paddingBottom: "1.75rem", marginBottom: "1.75rem" }}>
              <h3 style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.875rem", color: "var(--c-forest)", marginBottom: "0.5rem" }}>{f.q}</h3>
              <p className="t-body-sm">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media(max-width:900px){
          .header-grid{grid-template-columns:1fr !important; gap:2.5rem !important;}
        }
      `}</style>
    </div>
  );
}
