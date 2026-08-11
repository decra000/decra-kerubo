import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICE_GROUPS } from "@/lib/services";

/* A page per lifecycle stage.
   Until now every one of these twenty-five services existed only as a tab
   label inside a homepage accordion, which gives a search engine nothing to
   rank against a specific question: there was no URL whose subject was
   "AI governance" or "technical due diligence". Each stage is now a page
   with its own title, description, canonical and heading structure. */

export function generateStaticParams() {
  return SERVICE_GROUPS.map((g) => ({ stage: g.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ stage: string }> }): Promise<Metadata> {
  const { stage } = await params;
  const group = SERVICE_GROUPS.find((g) => g.id === stage);
  if (!group) return {};

  // Lead the description with the services themselves rather than the stage
  // name — the service names are what people actually type.
  const named = group.services.slice(0, 4).map((s) => s.label).join(", ");

  return {
    title: group.label,
    description: `${group.description} ${named} and more, from Decra Kerubo, technology lawyer and product counsel in Nairobi, Kenya.`.slice(0, 300),
    alternates: { canonical: `/services/${group.id}` },
    openGraph: {
      title: `${group.label}, Decra Kerubo`,
      description: group.description,
      url: `/services/${group.id}`,
    },
  };
}

export default async function StagePage({ params }: { params: Promise<{ stage: string }> }) {
  const { stage } = await params;
  const group = SERVICE_GROUPS.find((g) => g.id === stage);
  if (!group) notFound();

  const nonce = (await headers()).get("x-nonce") || undefined;
  const others = SERVICE_GROUPS.filter((g) => g.id !== group.id);

  // Each service is a distinct offering, so the stage is a list of them.
  // This is what lets a result show the individual services rather than only
  // the page title.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: group.label,
    description: group.description,
    itemListElement: group.services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.label,
        description: s.body,
        serviceType: s.label,
        provider: { "@type": "Person", name: "Decra Kerubo" },
        areaServed: [{ "@type": "Country", name: "Kenya" }, { "@type": "Continent", name: "Africa" }],
      },
    })),
  };

  return (
    <div style={{ background: "var(--c-bg)", paddingTop: "6rem" }}>
      <script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Header ── */}
      <section className="section page-x" style={{ borderBottom: "1px solid var(--c-border)" }}>
        <div className="inner">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <Link href="/services" className="t-label" style={{ textDecoration: "none", color: "var(--c-ink-muted)" }}>
              Services
            </Link>
          </div>
          <h1 className="t-display t-display-xl" style={{ marginBottom: "1.75rem" }}>{group.label}</h1>
          <p className="t-body" style={{ maxWidth: "44rem" }}>{group.description}</p>
        </div>
      </section>

      {/* ── The services in this stage ── */}
      <section className="section page-x">
        <div className="inner">
          {group.services.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              style={{
                borderTop: "1px solid var(--c-border)",
                paddingTop: "2.5rem", paddingBottom: "2.5rem",
                display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)",
                gap: "clamp(1.5rem, 4vw, 3.5rem)", alignItems: "start",
              }}
              className="stage-service"
            >
              <div>
                <span className="t-label" style={{ display: "block", marginBottom: "0.75rem", color: "var(--c-ink-muted)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(1.15rem,1.8vw,1.5rem)", lineHeight: 1.25, color: "var(--c-ink)" }}>
                  {s.label}
                </h2>
              </div>
              <div>
                <p className="t-body" style={{ marginBottom: "1.5rem" }}>{s.body}</p>
                <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem 2.5rem", marginBottom: "1.75rem" }} className="stage-items">
                  {s.items.map((item) => (
                    <li key={item} style={{ display: "flex", gap: "0.7rem", alignItems: "baseline", fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--c-ink-mid)", lineHeight: 1.5 }}>
                      <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--c-accent)", flexShrink: 0, transform: "translateY(-0.25em)" }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Opens the intake conversation already primed with this
                    service's own opening line, so someone arriving from a
                    search for one specific thing doesn't land in a generic
                    "how can I help you" and have to re-explain themselves. */}
                <Link
                  href={`/?engage=${s.id}#collaborate`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.4rem",
                    borderBottom: "1px solid var(--c-border)", paddingBottom: "0.3rem",
                    textDecoration: "none",
                    fontFamily: "var(--font-manjari)", fontWeight: 700,
                    fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase",
                    color: "var(--c-ink-muted)",
                  }}
                >
                  Request {s.label} <ArrowRight size={10} strokeWidth={1.5} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── The other stages, so each page is reachable from every other ── */}
      <section className="section page-x" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div className="inner">
          <h2 className="t-label" style={{ marginBottom: "2rem" }}>The rest of the lifecycle</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))", gap: "1.5rem" }}>
            {others.map((g) => (
              <Link
                key={g.id}
                href={`/services/${g.id}`}
                style={{ textDecoration: "none", border: "1px solid var(--c-border)", padding: "1.5rem", display: "block" }}
              >
                <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.05rem", color: "var(--c-ink)", marginBottom: "0.6rem" }}>{g.label}</h3>
                <p className="t-body-sm" style={{ marginBottom: "1rem" }}>{g.description}</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--c-ink-muted)" }}>
                  View <ArrowRight size={10} strokeWidth={1.5} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media(max-width:820px){
          .stage-service{grid-template-columns:1fr !important; gap:1.25rem !important;}
        }
        @media(max-width:560px){
          .stage-items{grid-template-columns:1fr !important;}
        }
      `}</style>
    </div>
  );
}
