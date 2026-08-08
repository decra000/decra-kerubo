import Link from "next/link";

export type RolePageData = {
  slug: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: { heading: string; body: string }[];
  relatedCapabilities: { label: string; href: string }[];
  faqs: { q: string; a: string }[];
  occupationName: string;
  occupationDescription: string;
};

const SITE_URL = "https://decrakerubo.com";

export function RolePage({ data }: { data: RolePageData }) {
  const { eyebrow, h1, intro, sections, relatedCapabilities, faqs, occupationName, occupationDescription, slug } = data;

  const occupationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: new Date().toISOString().slice(0, 10),
    mainEntity: {
      "@type": "Person",
      name: "Decra Kerubo",
      url: `${SITE_URL}/${slug}`,
      hasOccupation: {
        "@type": "Occupation",
        name: occupationName,
        description: occupationDescription,
        occupationLocation: { "@type": "City", name: "Nairobi" },
      },
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div style={{ background: "var(--c-bg)", paddingTop: "6rem" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(occupationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ── Header ── */}
      <section className="section page-x" style={{ borderBottom: "1px solid var(--c-border)" }}>
        <div className="inner" style={{ maxWidth: "44rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">{eyebrow}</span>
          </div>
          <h1 className="t-display t-display-xl" style={{ marginBottom: "1.5rem" }}>{h1}</h1>
          <p className="t-body">{intro}</p>
          <div style={{ display: "flex", gap: "0.85rem", marginTop: "2rem", flexWrap: "wrap" }}>
            <Link href="/book" className="btn-primary">Book a call</Link>
            <Link href="/services" className="btn-outline">See all capabilities</Link>
          </div>
        </div>
      </section>

      {/* ── Body sections ── */}
      <section className="page-x" style={{ paddingTop: "var(--space-section)", paddingBottom: "var(--space-section)" }}>
        <div className="inner" style={{ maxWidth: "44rem" }}>
          {sections.map((s, i) => (
            <div key={s.heading} style={{ marginBottom: i === sections.length - 1 ? 0 : "3rem" }}>
              <h2 className="t-display t-display-md" style={{ marginBottom: "1rem" }}>{s.heading}</h2>
              <p className="t-body">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Related capabilities ── */}
      <section className="page-x" style={{ paddingBottom: "var(--space-section)" }}>
        <div className="inner" style={{ borderTop: "1px solid var(--c-border)", paddingTop: "3rem" }}>
          <span className="t-label" style={{ marginBottom: "1.5rem", display: "block" }}>Related capabilities</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {relatedCapabilities.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="card"
                style={{
                  fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.68rem",
                  letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--c-ink-mid)",
                  textDecoration: "none", padding: "0.7rem 1.1rem",
                }}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="section page-x" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div className="inner" style={{ maxWidth: "44rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "2.5rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">FAQs</span>
          </div>
          {faqs.map((f) => (
            <div key={f.q} style={{ borderBottom: "1px solid var(--c-border)", paddingBottom: "1.75rem", marginBottom: "1.75rem" }}>
              <h3 style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.875rem", color: "var(--c-forest)", marginBottom: "0.5rem" }}>{f.q}</h3>
              <p className="t-body-sm">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
