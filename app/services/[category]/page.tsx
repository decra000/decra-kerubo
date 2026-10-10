import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICE_GROUPS, type ServiceDef, type ServiceGroup } from "@/lib/services";
import { PAPERS } from "@/lib/papers";
import { SITE_URL } from "@/lib/site";

/* A page per service area.
   The service areas are not the same shape as each other: some are a
   catalogue of work, one is an arrangement, one is scoped by sector, and one
   is published research rather than an offering, so this branches on `kind`
   rather than rendering identical lists. */

export function generateStaticParams() {
  return SERVICE_GROUPS.map((g) => ({ category: g.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const group = SERVICE_GROUPS.find((g) => g.id === category);
  if (!group) return {};

  if (group.id === "embedded-product-counsel") {
    const title = group.searchTitle ?? "Technical Product Counsel in Kenya";
    const description = group.searchDescription ?? group.description;
    return {
      title,
      description,
      alternates: { canonical: `/services/${group.id}` },
      openGraph: { title: `${title} | Decra Kerubo`, description, url: `/services/${group.id}` },
    };
  }

  const named = group.services.slice(0, 4).map((s) => s.label).join(", ");
  const description = group.searchDescription ?? (named
    ? `${group.description} ${named}. Decra Kerubo, Nairobi, Kenya.`
    : `${group.description} Decra Kerubo, Nairobi, Kenya.`);

  return {
    title: group.searchTitle ?? group.label,
    description: description.slice(0, 300),
    alternates: { canonical: `/services/${group.id}` },
    openGraph: { title: `${group.searchTitle ?? group.label} | Decra Kerubo`, description, url: `/services/${group.id}` },
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
        const sectionIndex = group.sections!.findIndex((item) => item.title === sec.title);
        return (
          <div key={sec.title} id={`service-section-${sectionIndex}`} className="catalogue-section" style={{ marginBottom: "1rem" }}>
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
  const catalogueSections = group.sections ?? [];

  const jsonLd = group.kind === "engagement"
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${SITE_URL}/services/${group.id}#service`,
        name: group.id === "embedded-product-counsel" ? "Technical Product Counsel in Kenya" : group.label,
        description: group.description,
        serviceType: group.id === "embedded-product-counsel"
          ? ["Technical Product Counsel", "Product Governance", "Technology and Privacy Advisory"]
          : [group.label],
        provider: { "@id": `${SITE_URL}#decra-kerubo` },
        areaServed: [{ "@type": "Country", name: "Kenya" }, { "@type": "Continent", name: "Africa" }],
        url: `${SITE_URL}/services/${group.id}`,
      }
    : group.services.length
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
      {jsonLd && <script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />}

      {/* ── Header ── */}
      <section className="service-masthead page-x">
        <div className="inner service-masthead-inner">
          <div className="service-masthead-rail" aria-hidden="true"><span>DK</span><i /></div>
          <div className="service-masthead-copy">
            <div className="service-breadcrumb"><span>01 / SERVICES</span><span className="service-breadcrumb-rule" /><Link href="/services">All services</Link></div>
            <p className="service-edition">DECRA KERUBO <span>·</span> TECHNOLOGY &amp; PRODUCT ADVISORY</p>
            <h1 className="t-display service-title">{group.id === "embedded-product-counsel" ? "Technical Product Counsel in Kenya" : group.label}</h1>
            <p className="t-body service-lede">{group.description}</p>
            <div className="service-masthead-foot"><span>NAIROBI, KENYA</span><span>{String(SERVICE_GROUPS.findIndex((item) => item.id === group.id) + 1).padStart(2, "0")} — {String(SERVICE_GROUPS.length).padStart(2, "0")}</span></div>
          </div>
          <div className="service-masthead-aside" aria-hidden="true">
            <span className="service-aside-number">{String(SERVICE_GROUPS.findIndex((item) => item.id === group.id) + 1).padStart(2, "0")}</span>
            <span className="service-aside-caption">A considered<br />approach to<br />technology.</span>
            <span className="service-aside-mark">D<span>.</span>K</span>
          </div>
        </div>
      </section>

      {catalogueSections.length > 0 && (
        <nav className="service-index page-x" aria-label="On this page">
          <div className="inner service-index-inner">
            <span className="service-index-label">IN THIS SECTION</span>
            {catalogueSections.map((section, index) => (
              <a href={`#service-section-${index}`} key={section.title}><span>{String(index + 1).padStart(2, "0")}</span>{section.title}<ArrowRight size={12} /></a>
            ))}
          </div>
        </nav>
      )}

      {group.positioning && (
        <section className="section page-x" aria-labelledby="service-approach-title">
          <div className="inner service-content">
            <div className="service-section-heading"><span>01</span><h2 id="service-approach-title" className="t-display t-display-md">The decision this work supports</h2><i /></div>
            <p className="t-body service-positioning-lede">{group.positioning.decisionPoint}</p>
            <div className="service-positioning-grid">
              <article>
                <h3 className="t-display">How the work is approached</h3>
                <p className="t-body-sm">{group.positioning.approach}</p>
              </article>
              <article>
                <h3 className="t-display">What it can produce</h3>
                <ul className="service-outcomes">
                  {group.positioning.outputs.map((output) => <li key={output}>{output}</li>)}
                </ul>
              </article>
            </div>
            <p className="service-boundary"><strong>Scope and limits.</strong> {group.positioning.boundaries}</p>
          </div>
        </section>
      )}

      {/* ── Engagement: how the retainer works, and what it reaches into ── */}
      {group.kind === "engagement" && (
        <section className="section page-x">
          <div className="inner service-content">
            <div className="service-section-heading"><span>02</span><h2 className="t-display t-display-md">{group.arrangementHeading ?? "How the work is arranged"}</h2><i /></div>
            <div className="working-grid">
              {group.howItWorks?.map((h) => (
                <div className="working-note" key={h.title}>
                  <h3>{h.title}</h3>
                  <p className="t-body-sm">{h.body}</p>
                </div>
              ))}
            </div>

            {group.covers && group.covers.length > 0 && (
              <>
                <div className="service-section-heading"><span>03</span><h2 className="t-display t-display-md">Where the work reaches</h2><i /></div>
                <div className="reach-grid">
                  {group.covers.map((c) => {
                    const target = SERVICE_GROUPS.find((g) => g.id === c.categoryId);
                    if (!target) return null;
                    return (
                      <Link key={c.categoryId} href={`/services/${target.id}`} className="reach-card">
                        <span className="reach-card-index">{String(SERVICE_GROUPS.findIndex((item) => item.id === target.id) + 1).padStart(2, "0")}</span>
                        <h3>{target.label}</h3>
                        <p className="t-body-sm">{c.note}</p>
                        <span className="reach-card-foot">{target.services.length} areas of work <ArrowRight size={13} /></span>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}

          </div>
        </section>
      )}

      {group.relatedWork?.length ? (
        <section className="section page-x" aria-labelledby="related-work-title">
          <div className="inner">
            <h2 id="related-work-title" className="t-display t-display-md" style={{ marginBottom: "1.5rem" }}>Selected research and engineering</h2>
            <ul className="related-work-list">
              {group.relatedWork.map((work) => (
                <li key={work.href}><Link href={work.href}>{work.label}<ArrowRight size={13} /></Link></li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {group.positioning?.faqs.length ? (
        <section className="section page-x" aria-labelledby="service-faq-title">
          <div className="inner" style={{ maxWidth: "52rem" }}>
            <h2 id="service-faq-title" className="t-display t-display-md" style={{ marginBottom: "1.5rem" }}>Questions about {group.label.toLowerCase()}</h2>
            {group.positioning.faqs.map((faq) => (
              <article key={faq.question} style={{ borderTop: "1px solid var(--c-border)", padding: "1.25rem 0" }}>
                <h3 style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.9rem", color: "var(--c-forest)", marginBottom: "0.5rem" }}>{faq.question}</h3>
                <p className="t-body-sm">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {group.positioning && (
        <section className="page-x" style={{ paddingBottom: "var(--space-section)" }}>
          <div className="inner">
            <Link href="/start" className="stage-cta">Discuss this work <ArrowRight size={10} strokeWidth={1.5} /></Link>
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
            {group.kind === "engagement" && <div className="service-section-heading"><span>03</span><h2 className="t-display t-display-md">Further areas of support</h2><i /></div>}
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
        .service-masthead{position:relative;overflow:hidden;padding-top:clamp(3.5rem,7vw,6.5rem);padding-bottom:clamp(3.25rem,6vw,5.75rem);border-bottom:1px solid var(--c-border);background:radial-gradient(ellipse at 80% 20%,rgba(95,169,143,.12),transparent 36%),linear-gradient(115deg,var(--c-surface),var(--c-bg) 64%)}
        .service-masthead-inner{position:relative;display:grid;grid-template-columns:3.25rem minmax(0,1fr) minmax(8rem,14rem);gap:clamp(1.5rem,4vw,3.5rem);align-items:stretch}
        .service-masthead-rail{display:flex;flex-direction:column;align-items:center;gap:1rem;color:var(--c-accent)}
        .service-masthead-rail span{font:400 1rem/1 var(--font-serif);letter-spacing:-.04em}
        .service-masthead-rail i{width:1px;flex:1;min-height:8rem;background:linear-gradient(var(--c-accent),transparent);opacity:.55}
        .service-masthead-copy{max-width:52rem}
        .service-breadcrumb{display:flex;align-items:center;gap:.8rem;margin-bottom:clamp(2.25rem,5vw,4rem);font:700 .59rem/1 var(--font-manjari);letter-spacing:.16em;text-transform:uppercase;color:var(--c-ink-muted)}
        .service-breadcrumb-rule{height:1px;width:2rem;background:var(--c-accent)}
        .service-breadcrumb a{color:inherit;text-decoration:none;transition:color .2s ease}
        .service-breadcrumb a:hover,.service-breadcrumb a:focus-visible{color:var(--c-accent)}
        .service-edition{margin-bottom:1rem;color:var(--c-accent);font:700 .59rem/1.5 var(--font-manjari);letter-spacing:.18em;text-transform:uppercase}
        .service-edition span{padding:0 .35rem;color:var(--c-ink-muted)}
        .service-title{max-width:48rem;margin-bottom:1.25rem;font-size:clamp(2.55rem,6vw,5.65rem);line-height:.98;letter-spacing:-.035em;text-wrap:balance}
        .service-lede{max-width:41rem;font-size:clamp(.9rem,1.2vw,1.02rem);line-height:1.8}
        .service-masthead-foot{display:flex;justify-content:space-between;gap:1rem;max-width:41rem;margin-top:clamp(2rem,4vw,3.5rem);padding-top:.8rem;border-top:1px solid var(--c-border);color:var(--c-ink-muted);font:700 .56rem/1.4 var(--font-manjari);letter-spacing:.16em}
        .service-masthead-aside{display:flex;flex-direction:column;align-items:flex-end;justify-content:space-between;padding:3.5rem 0 .25rem;color:var(--c-forest)}
        .service-aside-number{font:400 clamp(4rem,9vw,8rem)/.8 var(--font-serif);letter-spacing:-.08em;opacity:.2}
        .service-aside-caption{align-self:flex-start;margin-left:auto;color:var(--c-ink-muted);font:italic 400 clamp(.95rem,1.4vw,1.2rem)/1.5 var(--font-serif);text-align:right}
        .service-aside-mark{font:400 1.1rem/1 var(--font-serif);letter-spacing:.1em;color:var(--c-ink)}
        .service-aside-mark span{color:var(--c-accent)}
        .service-index{position:sticky;top:4.2rem;z-index:5;background:color-mix(in srgb,var(--c-bg) 90%,transparent);backdrop-filter:blur(12px);border-bottom:1px solid var(--c-border)}
        .service-index-inner{display:flex;align-items:center;gap:clamp(.8rem,2.2vw,2rem);min-height:3.7rem;overflow-x:auto;scrollbar-width:none}
        .service-index-inner::-webkit-scrollbar{display:none}
        .service-index-label{flex:0 0 auto;color:var(--c-ink-muted);font:700 .53rem/1 var(--font-manjari);letter-spacing:.16em}
        .service-index a{display:inline-flex;align-items:center;gap:.55rem;flex:0 0 auto;color:var(--c-ink-mid);font:500 .68rem/1.3 var(--font-sans);text-decoration:none;transition:color .2s ease}
        .service-index a span{color:var(--c-accent);font:700 .54rem/1 var(--font-manjari)}
        .service-index a svg{opacity:0;transform:translateX(-4px);transition:all .2s ease}
        .service-index a:hover,.service-index a:focus-visible{color:var(--c-accent)}
        .service-index a:hover svg,.service-index a:focus-visible svg{opacity:1;transform:none}
        .service-content{position:relative}
        .service-positioning-lede{max-width:48rem;font-size:clamp(1rem,1.5vw,1.15rem);line-height:1.8}
        .service-positioning-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(17rem,1fr));gap:clamp(2rem,5vw,4rem);margin:2.5rem 0}
        .service-positioning-grid h3{font-size:1.35rem;line-height:1.2;margin-bottom:.8rem}
        .service-outcomes{padding-left:1.15rem;margin:0;color:var(--c-ink-mid);font:400 .9rem/1.75 var(--font-sans)}
        .service-outcomes li{padding:.25rem 0 .25rem .25rem}
        .service-boundary{max-width:50rem;border-top:1px solid var(--c-border);padding-top:1.2rem;color:var(--c-ink-muted);font:400 .78rem/1.75 var(--font-sans)}
        .related-work-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:.75rem;padding:0;list-style:none}
        .related-work-list a{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem 0;border-bottom:1px solid var(--c-border);color:var(--c-ink-mid);font:500 .82rem/1.5 var(--font-sans);text-decoration:none}
        .related-work-list a:hover{color:var(--c-accent)}
        .service-opening-note{max-width:47rem!important;margin-bottom:clamp(3rem,6vw,5rem)!important;padding:1.5rem 0 1.5rem clamp(1.25rem,3vw,2.25rem);border-left:2px solid var(--c-accent);font-size:clamp(.92rem,1.35vw,1.08rem);line-height:1.8}
        .service-section-heading{display:grid;grid-template-columns:2.5rem auto minmax(2rem,1fr);align-items:center;gap:1rem;margin:clamp(2.75rem,6vw,4.5rem) 0 1.5rem}
        .service-section-heading>span{color:var(--c-accent);font:700 .6rem/1 var(--font-manjari);letter-spacing:.14em}
        .service-section-heading h2{margin:0;white-space:nowrap}
        .service-section-heading>i{height:1px;background:var(--c-border-strong)}
        .working-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1px;background:var(--c-border);border:1px solid var(--c-border);margin-bottom:clamp(3rem,6vw,5rem)}
        .working-note{position:relative;min-height:10rem;padding:1.5rem;background:var(--c-bg);transition:background .25s ease,transform .25s ease}
        .working-note::before{content:'';position:absolute;top:0;left:1.5rem;width:2rem;height:2px;background:var(--c-accent);transition:width .25s ease}
        .working-note:hover{position:relative;z-index:1;background:var(--c-surface);transform:translateY(-2px)}
        .working-note:hover::before{width:3.5rem}
        .working-note h3{margin:.4rem 0 .65rem;color:var(--c-ink);font:400 1.12rem/1.25 var(--font-serif)}
        .reach-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem}
        .reach-card{position:relative;display:flex;min-height:14rem;flex-direction:column;padding:1.5rem;border:1px solid var(--c-border);background:linear-gradient(150deg,var(--c-surface),var(--c-bg) 75%);color:inherit;text-decoration:none;transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease}
        .reach-card:hover,.reach-card:focus-visible{transform:translateY(-4px);border-color:var(--c-accent);box-shadow:0 16px 36px rgba(14,61,50,.08)}
        .reach-card-index{margin-bottom:1.5rem;color:var(--c-accent);font:700 .57rem/1 var(--font-manjari);letter-spacing:.13em}
        .reach-card h3{max-width:18rem;margin-bottom:.7rem;color:var(--c-ink);font:400 1.25rem/1.25 var(--font-serif)}
        .reach-card p{flex:1}
        .reach-card-foot{display:flex;align-items:center;justify-content:space-between;gap:.75rem;margin-top:1.2rem;padding-top:.8rem;border-top:1px solid var(--c-border);color:var(--c-ink-muted);font:700 .54rem/1.2 var(--font-manjari);letter-spacing:.1em;text-transform:uppercase}
        .catalogue-section{scroll-margin-top:8rem}
        .stage-service{
          position:relative;border-top: 1px solid var(--c-border);
          padding: clamp(1.6rem,3vw,2.5rem) 1rem clamp(1.6rem,3vw,2.5rem) 1.25rem;
          display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1.4fr);
          gap: clamp(1.5rem, 4vw, 3.5rem); align-items: start;transition:background .25s ease;
        }
        .stage-service::before{content:'';position:absolute;top:0;left:0;width:2px;height:0;background:var(--c-accent);transition:height .3s ease}
        .stage-service:hover{background:color-mix(in srgb,var(--c-accent) 3%,var(--c-bg))}
        .stage-service:hover::before,.stage-service:focus-within::before{height:100%}
        .stage-service h3{transition:color .2s ease}
        .stage-service:hover h3{color:var(--c-accent)!important}
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
        .stage-cta:focus-visible,.service-index a:focus-visible,.reach-card:focus-visible,.service-breadcrumb a:focus-visible{outline:2px solid var(--c-accent);outline-offset:4px}
        @media(prefers-reduced-motion:reduce){.stage-service,.stage-service::before,.working-note,.working-note::before,.reach-card,.service-index a svg{transition:none}}

        @media(max-width:820px){
          .stage-service{ grid-template-columns: 1fr; gap: 1.25rem; }
          .service-masthead-inner{grid-template-columns:2rem minmax(0,1fr)}
          .service-masthead-aside{display:none}
          .service-masthead-rail i{min-height:5rem}
        }
        @media(max-width:560px){
          .stage-items{ grid-template-columns: 1fr; }
          .service-masthead{padding-top:2.5rem;padding-bottom:2.75rem}
          .service-masthead-inner{grid-template-columns:1.25rem minmax(0,1fr);gap:.85rem}
          .service-masthead-rail span{font-size:.8rem}
          .service-breadcrumb{margin-bottom:2.2rem;font-size:.52rem}
          .service-edition{font-size:.52rem;letter-spacing:.12em}
          .service-title{font-size:clamp(2.35rem,11vw,3.45rem)}
          .service-masthead-foot{margin-top:1.75rem}
          .service-index{top:3.55rem}
          .service-index-inner{min-height:3.25rem}
          .service-index-label{display:none}
          .service-section-heading{grid-template-columns:1.7rem auto minmax(1rem,1fr);gap:.65rem}
          .service-section-heading h2{font-size:1.25rem;white-space:normal}
          .working-grid{grid-template-columns:1fr}
          .working-note{min-height:auto;padding:1.25rem}
          .reach-grid{grid-template-columns:1fr}
          .reach-card{min-height:12rem}
          .stage-service{padding-left:.9rem;padding-right:.2rem}
          /* Same reasoning as the homepage list: on a phone this is the only
             route into a service, so it needs a real tap target. */
          .stage-cta{ padding: 0.6rem 0 0.75rem; }
        }
      `}</style>
    </div>
  );
}
