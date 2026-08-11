import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICE_GROUPS, type ServiceDef, type ServiceGroup } from "@/lib/services";
import { PAPERS } from "@/lib/papers";

/* A page per category.
   The four categories are not the same shape as each other — one is a
   catalogue of work, one is an arrangement, one is scoped by sector, and one
   is published research rather than an offering — so this branches on `kind`
   rather than rendering four identical lists. */

export function generateStaticParams() {
  return SERVICE_GROUPS.map((g) => ({ category: g.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const group = SERVICE_GROUPS.find((g) => g.id === category);
  if (!group) return {};

  const named = group.services.slice(0, 4).map((s) => s.label).join(", ");
  const description = named
    ? `${group.description} ${named} and more, from Decra Kerubo, technology lawyer and product counsel in Nairobi, Kenya.`
    : `${group.description} From Decra Kerubo, technology lawyer and product counsel in Nairobi, Kenya.`;

  return {
    title: group.label,
    description: description.slice(0, 300),
    alternates: { canonical: `/services/${group.id}` },
    openGraph: { title: `${group.label}, Decra Kerubo`, description: group.description, url: `/services/${group.id}` },
  };
}

function ServiceEntry({ s, i }: { s: ServiceDef; i: number }) {
  return (
    <article id={s.id} className="stage-service">
      <div>
        <span className="t-label" style={{ display: "block", marginBottom: "0.75rem", color: "var(--c-ink-muted)" }}>
          {String(i + 1).padStart(2, "0")}
        </span>
        <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(1.1rem,1.7vw,1.4rem)", lineHeight: 1.25, color: "var(--c-ink)" }}>
          {s.label}
        </h3>
      </div>
      <div>
        <p className="t-body" style={{ marginBottom: "1.5rem" }}>{s.body}</p>
        <ul className="stage-items">
          {s.items.map((item) => (
            <li key={item}>
              <span aria-hidden className="dot" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Link href={`/?engage=${s.id}#collaborate`} className="stage-cta">
          Request {s.label} <ArrowRight size={10} strokeWidth={1.5} />
        </Link>
      </div>
    </article>
  );
}

function Catalogue({ group }: { group: ServiceGroup }) {
  // Twenty entries in one run is unreadable, so a catalogue can declare
  // sections. Without them it just lists everything in order.
  if (!group.sections) {
    return (
      <>
        {group.services.map((s, i) => <ServiceEntry key={s.id} s={s} i={i} />)}
      </>
    );
  }

  let n = 0;
  return (
    <>
      {group.sections.map((sec) => {
        const services = sec.serviceIds
          .map((id) => group.services.find((s) => s.id === id))
          .filter((s): s is ServiceDef => Boolean(s));
        return (
          <div key={sec.title} style={{ marginBottom: "1rem" }}>
            <div style={{ paddingTop: "2.5rem", paddingBottom: "0.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(1.3rem,2.2vw,1.8rem)", color: "var(--c-ink)", marginBottom: "0.6rem" }}>
                {sec.title}
              </h2>
              <p className="t-body-sm" style={{ maxWidth: "38rem" }}>{sec.blurb}</p>
            </div>
            {services.map((s) => <ServiceEntry key={s.id} s={s} i={n++} />)}
          </div>
        );
      })}
    </>
  );
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const group = SERVICE_GROUPS.find((g) => g.id === category);
  if (!group) notFound();

  const nonce = (await headers()).get("x-nonce") || undefined;
  const others = SERVICE_GROUPS.filter((g) => g.id !== group.id);

  const jsonLd = group.services.length
    ? {
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
      }
    : null;

  return (
    <div style={{ background: "var(--c-bg)", paddingTop: "6rem" }}>
      {jsonLd && <script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}

      {/* ── Header ── */}
      <section className="section page-x" style={{ borderBottom: "1px solid var(--c-border)" }}>
        <div className="inner">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <Link href="/services" className="t-label" style={{ textDecoration: "none", color: "var(--c-ink-muted)" }}>Services</Link>
          </div>
          <h1 className="t-display t-display-xl" style={{ marginBottom: "1.75rem" }}>{group.label}</h1>
          <p className="t-body" style={{ maxWidth: "46rem" }}>{group.description}</p>
        </div>
      </section>

      {/* ── Engagement: how the retainer works, and what it reaches into ── */}
      {group.kind === "engagement" && (
        <section className="section page-x">
          <div className="inner">
            <h2 className="t-label" style={{ marginBottom: "2rem" }}>How it works</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
              {group.howItWorks?.map((h) => (
                <div key={h.title} style={{ borderTop: "1px solid var(--c-border)", paddingTop: "1.25rem" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.05rem", color: "var(--c-ink)", marginBottom: "0.6rem" }}>{h.title}</h3>
                  <p className="t-body-sm">{h.body}</p>
                </div>
              ))}
            </div>

            <h2 className="t-label" style={{ marginBottom: "2rem" }}>What it reaches into</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))", gap: "1.5rem" }}>
              {group.covers?.map((c) => {
                const target = SERVICE_GROUPS.find((g) => g.id === c.categoryId);
                if (!target) return null;
                return (
                  <Link key={c.categoryId} href={`/services/${target.id}`} style={{ textDecoration: "none", border: "1px solid var(--c-border)", padding: "1.5rem", display: "block" }}>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.05rem", color: "var(--c-ink)", marginBottom: "0.6rem" }}>{target.label}</h3>
                    <p className="t-body-sm" style={{ marginBottom: "1rem" }}>{c.note}</p>
                    <span className="t-label" style={{ color: "var(--c-ink-muted)" }}>{target.services.length} services</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Sectors ── */}
      {group.sectors && (
        <section className="page-x" style={{ paddingTop: "var(--space-section)" }}>
          <div className="inner">
            <h2 className="t-label" style={{ marginBottom: "1.5rem" }}>Sectors</h2>
            <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {group.sectors.map((sec) => (
                <li key={sec} style={{ border: "1px solid var(--c-border)", borderRadius: "999px", padding: "0.5rem 1rem", fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--c-ink-mid)" }}>
                  {sec}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Published research, and the open door ── */}
      {group.kind === "policy" && (
        <section className="section page-x">
          <div className="inner">
            <h2 className="t-label" style={{ marginBottom: "2rem" }}>Published research</h2>
            {PAPERS.map((p) => (
              <article key={p.slug} style={{ borderTop: "1px solid var(--c-border)", paddingTop: "2rem", paddingBottom: "2rem", maxWidth: "48rem" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(1.1rem,1.7vw,1.4rem)", lineHeight: 1.3, color: "var(--c-ink)", marginBottom: "0.5rem" }}>{p.title}</h3>
                <p className="t-label" style={{ color: "var(--c-ink-muted)", marginBottom: "1rem" }}>{p.partner} · {p.dates}</p>
                <p className="t-body-sm">{p.abstract}</p>
              </article>
            ))}

            <div style={{ borderTop: "1px solid var(--c-border)", paddingTop: "2.5rem", marginTop: "1rem" }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(1.3rem,2.2vw,1.8rem)", color: "var(--c-ink)", marginBottom: "0.75rem" }}>
                Working through a policy question?
              </h2>
              <p className="t-body" style={{ maxWidth: "36rem", marginBottom: "1.75rem" }}>
                This is not a retainer and there is nothing to scope. If a regulatory or policy question is in front of you, ask.
              </p>
              <Link href="/?engage=tech-policy#collaborate" className="stage-cta">
                Ask for an opinion <ArrowRight size={10} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── The services themselves ── */}
      {group.services.length > 0 && (
        <section className="section page-x">
          <div className="inner">
            {group.kind === "engagement" && (
              <h2 className="t-label" style={{ marginBottom: "0.5rem" }}>And on top of that</h2>
            )}
            <Catalogue group={group} />
          </div>
        </section>
      )}

      {/* ── The other categories ── */}
      <section className="section page-x" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div className="inner">
          <h2 className="t-label" style={{ marginBottom: "2rem" }}>The rest of the practice</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))", gap: "1.5rem" }}>
            {others.map((g) => (
              <Link key={g.id} href={`/services/${g.id}`} style={{ textDecoration: "none", border: "1px solid var(--c-border)", padding: "1.5rem", display: "block" }}>
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
        .stage-service{
          border-top: 1px solid var(--c-border);
          padding: 2.5rem 0;
          display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1.4fr);
          gap: clamp(1.5rem, 4vw, 3.5rem); align-items: start;
        }
        .stage-items{
          list-style: none; display: grid; grid-template-columns: 1fr 1fr;
          gap: 0.8rem 2.5rem; margin-bottom: 1.75rem;
        }
        .stage-items li{
          display: flex; gap: 0.7rem; align-items: baseline;
          font-family: var(--font-sans); font-size: 0.85rem;
          color: var(--c-ink-mid); line-height: 1.5;
        }
        .stage-items .dot{
          width: 3px; height: 3px; border-radius: 50%;
          background: var(--c-accent); flex-shrink: 0;
          transform: translateY(-0.25em);
        }
        .stage-cta{
          display: inline-flex; align-items: center; gap: 0.4rem;
          border-bottom: 1px solid var(--c-border); padding-bottom: 0.3rem;
          text-decoration: none;
          font-family: var(--font-manjari); font-weight: 700;
          font-size: 0.62rem; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--c-ink-muted);
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .stage-cta:hover{ color: var(--c-accent); border-color: var(--c-accent); }

        @media(max-width:820px){
          .stage-service{ grid-template-columns: 1fr; gap: 1.25rem; }
        }
        @media(max-width:560px){
          .stage-items{ grid-template-columns: 1fr; }
          /* Same reasoning as the homepage list: on a phone this is the only
             route into a service, so it needs a real tap target. */
          .stage-cta{ padding: 0.6rem 0 0.75rem; }
        }
      `}</style>
    </div>
  );
}
