import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { CapabilityTabs } from "@/components/services/CapabilityTabs";
import { SERVICE_GROUPS } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Product Counsel, providing integrated technical and legal support throughout the technology product lifecycle, from Decra Kerubo.",
  // Without its own entry this inherited the root layout's canonical of "/",
  // so the page told Google it was a duplicate of the homepage and asked not
  // to be indexed — on the one page most likely to be searched for.
  alternates: { canonical: "/services" },
};

const capabilities = [
  {
    id: "product-strategy-advisory",
    number: "01",
    label: "Product Strategy & Advisory",
    body: "Developing technology products with integrated technical and legal guidance.",
    detail:
      "This spans product strategy and architecture reviews, feature and roadmap advisory, go-to-market readiness, startup incorporation, and lifecycle planning, so decisions are sound from both a build and a business standpoint from day one.",
    items: [
      "Product strategy",
      "Product architecture reviews",
      "Feature & roadmap advisory",
      "Go-to-market readiness",
      "Startup incorporation",
      "Product lifecycle planning",
    ],
  },
  {
    id: "product-governance",
    number: "02",
    label: "Product Governance & Standards",
    body: "Establishing governance frameworks for responsible, compliant, and scalable products.",
    detail:
      "It covers AI governance, data and digital governance, and regulatory compliance, together with the internal policies and ISO readiness that keep a growing product accountable as it scales.",
    items: [
      "AI governance",
      "Data governance",
      "Digital governance",
      "Regulatory compliance",
      "Governance frameworks",
      "Internal policies",
      "ISO readiness and implementation",
    ],
  },
  {
    id: "product-safety-privacy",
    number: "03",
    label: "Product Safety & Privacy",
    body: "Embedding safety, trust, and privacy into products from the outset.",
    detail:
      "It brings privacy by design and safety by design into the build process itself, from data protection and responsible AI practices through to security governance and structured product design reviews.",
    items: [
      "Privacy by Design",
      "Safety by Design",
      "Data protection",
      "Responsible AI",
      "Security governance",
      "Product design reviews",
    ],
  },
  {
    id: "risk-assurance",
    number: "04",
    label: "Risk & Assurance",
    body: "Evaluating products for technical, legal, and regulatory resilience.",
    detail:
      "It includes product stress testing and audits, privacy and AI impact assessments, and the risk assessments and launch readiness checks that catch exposure before it becomes a liability.",
    items: [
      "Product stress testing",
      "Product audits",
      "Privacy impact assessments",
      "AI impact assessments",
      "Risk assessments",
      "Launch readiness",
    ],
  },
  {
    id: "intellectual-property",
    number: "05",
    label: "Intellectual Property",
    body: "Protecting innovation, software, and digital assets.",
    detail:
      "It covers IP strategy, software licensing, and open-source governance and compliance, addressing the broader question of who owns what as a product and its underlying technology take shape.",
    items: [
      "IP strategy",
      "Software licensing",
      "Open-source governance",
      "Open-source compliance",
      "Technology ownership",
    ],
  },
  {
    id: "technology-transactions",
    number: "06",
    label: "Technology Transactions",
    body: "Structuring agreements that enable technology development and commercialization.",
    detail:
      "It includes SaaS and platform agreements, technology procurement, software licensing, and the vendor and commercial partnership agreements that keep technology relationships clear and enforceable.",
    items: [
      "SaaS agreements",
      "Platform agreements",
      "Technology procurement",
      "Software licensing",
      "Vendor agreements",
      "Commercial partnerships",
    ],
  },
  {
    id: "technical-due-diligence",
    number: "07",
    label: "Technical Due Diligence",
    body: "Assessing technology products for investment, acquisition, and strategic growth.",
    detail:
      "It spans technology, product, AI, and IP due diligence, alongside technology audits and the investment readiness work that gives investors, acquirers, and partners confidence in what they're evaluating.",
    items: [
      "Technology due diligence",
      "Product due diligence",
      "AI due diligence",
      "IP due diligence",
      "Technology audits",
      "Investment readiness",
    ],
  },
];

const faqs = [
  { q: "Who is this for?", a: "Developers, founders, investors, regulators, and technology procurers who need integrated technical and legal support, whether building a product, governing one, transacting on one, or assessing one." },
  { q: "Do you work with clients outside Kenya?", a: "Yes. Based in Nairobi, I work across East Africa and internationally. Most sessions are via Google Meet." },
  { q: "What does a typical engagement look like?", a: "It starts with a discovery call, followed by a scoped engagement based on your specific needs. Some clients engage for a single strategy session; others retain ongoing support." },
  { q: "Are you a practising advocate?", a: "I hold a Bachelor of Laws and advise at a strategic level. For formal legal representation or filing, I refer to practising advocates within my network." },
  { q: "I'm not sure which capability I need.", a: "Book a discovery call. In 15 minutes we'll identify the right starting point, no pressure, no obligation." },
];

// Mirrors the FAQ block rendered below. Google reads this to build the
// "People also ask"-style expandable results, which is the cheapest way onto
// a results page already crowded with established firms.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default async function ServicesPage() {
  // Same nonce plumbing as the root layout: CSP sets script-src with a
  // per-request nonce, so an inline JSON-LD tag without it is blocked.
  const nonce = (await headers()).get("x-nonce") || undefined;

  return (
    <div style={{ background: "var(--c-bg)", paddingTop: "6rem" }}>
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── Header ── */}
      <section className="section page-x" style={{ borderBottom: "1px solid var(--c-border)" }}>
        <div className="inner header-grid" style={{ alignItems: "end" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
              <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
              <span className="t-label">Advisory Services</span>
            </div>
            <h1 className="t-display t-display-xl">Seven capabilities. One integrated practice.</h1>
          </div>
          <div>
            <p className="t-body" style={{ marginBottom: "1.5rem" }}>
              Product Counsel, providing integrated technical and legal support throughout the technology product lifecycle, from first strategy conversation through governance, safety, risk, IP, transactions, and diligence.
            </p>
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="page-x" style={{ paddingBottom: "var(--space-section)" }}>
        <div className="inner" style={{ borderTop: "1px solid var(--c-border)" }}>
          <CapabilityTabs capabilities={capabilities} />
        </div>
      </section>

      {/* ── The lifecycle stages ──
          Every stage page is reachable from here. A page nothing links to is
          a page search engines treat as unimportant, however good it is. */}
      <section className="section page-x" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div className="inner">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">By lifecycle stage</span>
          </div>
          <h2 className="t-display t-display-md" style={{ marginBottom: "2.5rem" }}>Where your product is right now.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))", gap: "1.5rem" }}>
            {SERVICE_GROUPS.map((g) => (
              <Link key={g.id} href={`/services/${g.id}`} style={{ textDecoration: "none", border: "1px solid var(--c-border)", padding: "1.5rem", display: "block" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.05rem", color: "var(--c-ink)", marginBottom: "0.6rem" }}>{g.label}</h3>
                <p className="t-body-sm" style={{ marginBottom: "0.75rem" }}>{g.description}</p>
                <span className="t-label" style={{ color: "var(--c-ink-muted)" }}>{g.services.length} services</span>
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