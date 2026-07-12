import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "How I Can Help — Technology Lawyer & Technical Product Counsel",
  description: "Embedded legal, technical, and regulatory counsel across the technology lifecycle, from Decra Kerubo.",
  keywords: [
    "technology lawyer Kenya services",
    "product counsel Kenya",
    "technical product counsel Africa",
    "startup legal services Kenya",
    "tech policy advisory Kenya",
    "founder legal advisory Africa",
    "data protection compliance Kenya",
    "AI governance lawyer Kenya",
    "technical due diligence Africa",
  ],
  alternates: { canonical: "https://decrakerubo.com/services" },
};

const capabilities = [
  {
    id: "build",
    number: "01",
    label: "Build",
    tagline: "Launch your product without avoidable regulatory surprises.",
    description: "Most legal advisors review a product after it's built. I sit inside the build — advising engineering and product teams in real time on AI governance, data protection, and privacy by design, so regulation shapes product decisions before code ships, not after an incident.",
    tags: ["AI Governance", "Product & Technical Counsel", "Privacy by Design"],
  },
  {
    id: "commercialize",
    number: "02",
    label: "Commercialize",
    tagline: "Turn what you've built into something you can sell, license, or scale.",
    description: "A product isn't commercial until its ownership, contracts, and structure hold up under scrutiny — from a customer's procurement team, an investor's diligence process, or an acquirer's legal review. I structure the contracts, IP, and transactions that let technology move from built to bought, licensed, or scaled.",
    tags: ["Technology Contracts", "IP Strategy", "Technology Transactions"],
  },
  {
    id: "evaluate",
    number: "03",
    label: "Evaluate",
    tagline: "Know exactly what you're taking on before you commit.",
    description: "Investors, acquirers, and procurement teams need to know what they're actually taking on. I run technical due diligence that surfaces real architecture, data, and compliance risk — not just a paperwork review — so the decision is made with full information.",
    tags: ["Technical Due Diligence", "Investment & Acquisition Review", "Procurement Risk Review"],
  },
  {
    id: "govern",
    number: "04",
    label: "Govern",
    tagline: "Pass the audit, procurement review, or diligence call the first time.",
    description: "Enterprises and governments increasingly require technology providers to demonstrate governance — against ISO, NIST, and OWASP frameworks, and against regulation that's still being written. I help organizations build governance that satisfies procurement teams, regulators, and boards, and I conduct independent research on technology law and policy to stay ahead of where it's heading.",
    tags: ["ISO & NIST Frameworks", "Data Protection Governance", "Regulatory & Policy Strategy"],
  },
];

const faqs = [
  { q: "Who is this for?", a: "Developers, founders, product and engineering teams, investors, governments, procurement teams, and enterprises working with or on technology — anywhere in the lifecycle from first build to regulatory review." },
  { q: "What's the difference between the four capabilities?", a: "Build covers how legal judgment gets applied inside your product's development. Commercialize covers how technology becomes a contract, a deal, or an asset. Evaluate covers assessing technology before you invest in, acquire, or procure it. Govern covers how it holds up against standards and regulation over time. Most engagements draw from more than one." },
  { q: "Do you work across Africa and internationally?", a: "Yes. Based in Nairobi, I work with clients across Africa and internationally. Most engagements are remote." },
  { q: "What does an engagement look like?", a: "It starts with a discovery call, followed by a scoped engagement matched to what you need — a single strategy session, a technical due diligence sprint, or ongoing embedded advisory." },
  { q: "Do you handle formal legal representation or court filings?", a: "My practice is strategic and advisory — embedded product, technical, and governance counsel, not litigation. For formal representation, filings, or admission-specific work, I coordinate with a vetted network of practising advocates, so you're never without coverage." },
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
              <span className="t-label">How I Can Help</span>
            </div>
            <h1 className="t-display t-display-xl">Embedded counsel for technology that has to work.</h1>
          </div>
          <div>
            <p className="t-body" style={{ marginBottom: "1rem", fontStyle: "italic" }}>
              I don&apos;t sell legal documents. I don&apos;t sell compliance. I embed legal, regulatory, and technical judgment into how technology gets built, sold, and governed.
            </p>
            <p className="t-body" style={{ marginBottom: "1.5rem" }}>
              I provide embedded legal, technical, and regulatory counsel across the technology lifecycle. Choose where you are, and I&apos;ll guide you from there.
            </p>
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="page-x" style={{ paddingBottom: "var(--space-section)" }}>
        <div className="inner">
          {capabilities.map((c) => (
            <div key={c.id} id={c.id} style={{ scrollMarginTop: "6rem", paddingTop: "3rem", paddingBottom: "3rem", borderBottom: "1px solid var(--c-border)" }}>
              <div className="cap-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "3rem", alignItems: "start" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.68rem", color: "var(--c-gold)", marginBottom: "0.6rem" }}>{c.number}</p>
                  <h2 className="t-display t-display-md" style={{ marginBottom: "0.5rem" }}>{c.label}</h2>
                  <p style={{ fontSize: "0.8rem", color: "var(--c-ink-muted)", lineHeight: 1.6 }}>{c.tagline}</p>
                </div>
                <div>
                  <p className="t-body" style={{ marginBottom: "1.25rem" }}>{c.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
                    {c.tags.map(tag => (
                      <span key={tag} style={{ fontSize: "0.62rem", padding: "0.22rem 0.6rem", borderRadius: "100px", border: "1px solid rgba(14,61,50,0.16)", color: "var(--c-forest)" }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "center" }}>
                    <Link href="/book" className="btn-primary">Book a Consultation <ArrowRight size={13} /></Link>
                    <Link href={`/#services`} style={{
                      fontFamily: "var(--font-manjari)", fontWeight: 700,
                      fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase",
                      color: "var(--c-ink-muted)", textDecoration: "none",
                      borderBottom: "1px solid var(--c-border)", paddingBottom: "0.2rem",
                    }}>
                      Explore with AI instead →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
        @media(max-width:768px){
          .cap-grid{grid-template-columns:1fr !important; gap:1.5rem !important;}
        }
      `}</style>
    </div>
  );
}
