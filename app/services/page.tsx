import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
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

const faqs = [
  { q: "Who is this for?", a: "Developers, founders, investors, regulators, and technology procurers who need integrated technical and legal support, whether building a product, governing one, transacting on one, or assessing one." },
  { q: "Do you work with clients outside Kenya?", a: "Yes. Based in Nairobi, I work across East Africa and internationally. Most sessions are via Google Meet." },
  { q: "What does a typical engagement look like?", a: "It starts with a discovery call, followed by a scoped engagement based on your specific needs. Some clients engage for a single strategy session; others retain ongoing support." },
  { q: "Are you a practising advocate?", a: "I hold a Bachelor of Laws and advise at a strategic level. For formal legal representation or filing, I refer to practising advocates within my network." },
  { q: "I'm not sure which service I need.", a: "Book a discovery call. In 15 minutes we'll identify the right starting point, no pressure, no obligation." },
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
            <h1 className="t-display t-display-xl">Four stages. One integrated practice.</h1>
          </div>
          <div>
            <p className="t-body" style={{ marginBottom: "1.5rem" }}>
              Product Counsel, providing integrated technical and legal support across the whole technology product lifecycle: designing and engineering it, testing and assuring it, governing and protecting it, then commercializing and transacting on it.
            </p>
          </div>
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