import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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

function ServiceCard({ s, i }: { s: ServiceDef; i: number }) {
  return (
    <article id={s.id} className="svc-card">
      <header className="svc-card-header">
        <span className="svc-card-index">{String(i + 1).padStart(2, "0")}</span>
        <h3 className="svc-card-title">{s.label}</h3>
      </header>
      <p className="svc-card-body">{s.body}</p>
      <div className="svc-card-tags" aria-label="Capabilities covered">
        {s.items.map((item) => (
          <span key={item} className="svc-tag">{item}</span>
        ))}
      </div>
      <Link href={`/?engage=${s.id}#collaborate`} className="svc-card-cta">
        Request this service <ArrowRight size={11} strokeWidth={1.5} />
      </Link>
    </article>
  );
}

function Catalogue({ group }: { group: ServiceGroup }) {
  if (!group.sections) {
    return (
      <div className="svc-grid">
        {group.services.map((s, i) => <ServiceCard key={s.id} s={s} i={i} />)}
      </div>
    );
  }

  let n = 0;
  return (
    <>
      {group.sections.map((sec, sectionIndex) => {
        const services = sec.serviceIds
          .map((id) => group.services.find((s) => s.id === id))
          .filter((s): s is ServiceDef => Boolean(s));
        return (
          <div key={sec.title} id={`service-section-${sectionIndex}`} className="catalogue-section">
            <div className="catalogue-section-header">
              <div className="catalogue-section-label">
                <span className="svc-index-num">{String(sectionIndex + 1).padStart(2, "0")}</span>
                <h2 className="catalogue-section-title">{sec.title}</h2>
              </div>
              <p className="catalogue-section-blurb">{sec.blurb}</p>
            </div>
            <div className="svc-grid">
              {services.map((s) => <ServiceCard key={s.id} s={s} i={n++} />)}
            </div>
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

      {/* ── Hero masthead ── */}
      <section className="svc-masthead page-x">
        <div className="inner svc-masthead-inner">
          {/* Vertical rail */}
          <div className="svc-rail" aria-hidden="true">
            <span>DK</span>
            <i />
          </div>

          {/* Main copy */}
          <div className="svc-masthead-copy">
            <nav className="svc-breadcrumb" aria-label="Breadcrumb">
              <span>Services</span>
              <span className="svc-breadcrumb-sep" aria-hidden="true" />
              <Link href="/services">All areas</Link>
            </nav>
            <p className="svc-kicker">DECRA KERUBO · NAIROBI, KENYA</p>
            <h1 className="svc-hero-title">
              {group.id === "embedded-product-counsel" ? "Technical Product Counsel in Kenya" : group.label}
            </h1>
            <p className="svc-hero-lede">{group.description}</p>
            <div className="svc-hero-foot">
              <span>AREA {String(SERVICE_GROUPS.findIndex((item) => item.id === group.id) + 1).padStart(2, "0")} OF {String(SERVICE_GROUPS.length).padStart(2, "0")}</span>
              {group.sectors && <span>{group.sectors.length} SECTORS</span>}
              {group.services.length > 0 && <span>{group.services.length} SERVICES</span>}
            </div>
          </div>

          {/* Decorative aside */}
          <div className="svc-masthead-aside" aria-hidden="true">
            <span className="svc-aside-num">{String(SERVICE_GROUPS.findIndex((item) => item.id === group.id) + 1).padStart(2, "0")}</span>
            <span className="svc-aside-caption">A considered<br />approach to<br />technology.</span>
            <span className="svc-aside-mark">D<span>.</span>K</span>
          </div>
        </div>
      </section>

      {/* ── Sticky section index ── */}
      {catalogueSections.length > 0 && (
        <nav className="svc-index page-x" aria-label="Jump to section">
          <div className="inner svc-index-inner">
            <span className="svc-index-label">IN THIS PAGE</span>
            {catalogueSections.map((section, index) => (
              <a href={`#service-section-${index}`} key={section.title} className="svc-index-link">
                <span className="svc-index-num">{String(index + 1).padStart(2, "0")}</span>
                {section.title}
                <ArrowRight size={11} />
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* ── Positioning: the decision this work supports ── */}
      {group.positioning && (
        <section className="section page-x svc-positioning-section" aria-labelledby="svc-positioning-title">
          <div className="inner">
            <div className="svc-positioning-layout">
              <div className="svc-positioning-left">
                <span className="svc-section-eyebrow">01 — APPROACH</span>
                <h2 id="svc-positioning-title" className="svc-section-heading">The decision this work supports</h2>
              </div>
              <div className="svc-positioning-right">
                <p className="svc-positioning-lead">{group.positioning.decisionPoint}</p>
                <div className="svc-positioning-cards">
                  <div className="svc-pos-card svc-pos-card--approach">
                    <span className="svc-pos-card-label">How the work is approached</span>
                    <p>{group.positioning.approach}</p>
                  </div>
                  <div className="svc-pos-card svc-pos-card--outputs">
                    <span className="svc-pos-card-label">What it can produce</span>
                    <ul className="svc-outputs-list">
                      {group.positioning.outputs.map((output) => (
                        <li key={output}>
                          <span className="svc-output-dot" aria-hidden="true" />
                          {output}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="svc-boundary">
                  <strong>Scope and limits.</strong> {group.positioning.boundaries}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Engagement: how the retainer works ── */}
      {group.kind === "engagement" && (
        <section className="section page-x">
          <div className="inner">
            <div className="svc-section-eyebrow-row">
              <span className="svc-section-eyebrow">02 — ARRANGEMENT</span>
              <h2 className="svc-section-heading">{group.arrangementHeading ?? "How the work is arranged"}</h2>
            </div>
            <div className="working-grid">
              {group.howItWorks?.map((h, hi) => (
                <div className="working-note" key={h.title}>
                  <span className="working-note-index">{String(hi + 1).padStart(2, "0")}</span>
                  <h3>{h.title}</h3>
                  <p className="t-body-sm">{h.body}</p>
                </div>
              ))}
            </div>

            {group.covers && group.covers.length > 0 && (
              <>
                <div className="svc-section-eyebrow-row" style={{ marginTop: "clamp(3rem,6vw,5rem)" }}>
                  <span className="svc-section-eyebrow">03 — REACH</span>
                  <h2 className="svc-section-heading">Where the work reaches</h2>
                </div>
                <div className="reach-grid">
                  {group.covers.map((c) => {
                    const target = SERVICE_GROUPS.find((g) => g.id === c.categoryId);
                    if (!target) return null;
                    return (
                      <Link key={c.categoryId} href={`/services/${target.id}`} className="reach-card">
                        <span className="reach-card-index">{String(SERVICE_GROUPS.findIndex((item) => item.id === target.id) + 1).padStart(2, "0")}</span>
                        <h3>{target.label}</h3>
                        <p className="t-body-sm">{c.note}</p>
                        <span className="reach-card-foot">
                          {target.services.length > 0 ? `${target.services.length} areas` : "Explore"} <ArrowRight size={13} />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* ── Related work ── */}
      {group.relatedWork?.length ? (
        <section className="section page-x" aria-labelledby="related-work-title">
          <div className="inner">
            <div className="svc-section-eyebrow-row">
              <span className="svc-section-eyebrow">SELECTED WORK</span>
              <h2 id="related-work-title" className="svc-section-heading">Research &amp; engineering</h2>
            </div>
            <ul className="related-work-list">
              {group.relatedWork.map((work) => (
                <li key={work.href}>
                  <Link href={work.href}>
                    {work.label}
                    <ArrowUpRight size={14} strokeWidth={1.5} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* ── Sectors ── */}
      {group.sectors && (
        <section className="page-x svc-sectors-section">
          <div className="inner">
            <span className="svc-section-eyebrow" style={{ marginBottom: "1.25rem" }}>SECTORS SERVED</span>
            <div className="svc-sectors-tags">
              {group.sectors.map((sec) => (
                <span key={sec} className="svc-sector-tag">{sec}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── The services themselves (catalogue kind) ── */}
      {group.services.length > 0 && (
        <section className="section page-x">
          <div className="inner">
            {group.kind === "engagement" && (
              <div className="svc-section-eyebrow-row">
                <span className="svc-section-eyebrow">04 — SERVICES</span>
                <h2 className="svc-section-heading">Further areas of support</h2>
              </div>
            )}
            <Catalogue group={group} />
          </div>
        </section>
      )}

      {/* ── Published research (policy kind) ── */}
      {group.kind === "policy" && (
        <section className="section page-x">
          <div className="inner">
            <div className="svc-section-eyebrow-row">
              <span className="svc-section-eyebrow">PUBLISHED RESEARCH</span>
              <h2 className="svc-section-heading">Research papers</h2>
            </div>
            <div className="svc-papers-grid">
              {PAPERS.map((p) => (
                <article key={p.slug} className="svc-paper-card">
                  <p className="svc-paper-meta">{p.partner} · {p.dates}</p>
                  <h3 className="svc-paper-title">{p.title}</h3>
                  <p className="t-body-sm">{p.abstract}</p>
                </article>
              ))}
            </div>

            <div className="svc-policy-cta-block">
              <h2 className="svc-policy-cta-heading">Working through a policy question?</h2>
              <p className="t-body" style={{ maxWidth: "36rem", marginBottom: "1.75rem" }}>
                This is not a retainer and there is nothing to scope. If a regulatory or policy question is in front of you, ask.
              </p>
              <Link href="/?engage=tech-policy#collaborate" className="svc-card-cta">
                Ask for an opinion <ArrowRight size={10} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQs ── */}
      {group.positioning?.faqs.length ? (
        <section className="section page-x svc-faq-section" aria-labelledby="svc-faq-title">
          <div className="inner svc-faq-layout">
            <div className="svc-faq-left">
              <span className="svc-section-eyebrow">COMMON QUESTIONS</span>
              <h2 id="svc-faq-title" className="svc-section-heading">Questions about {group.label.toLowerCase()}</h2>
            </div>
            <div className="svc-faq-right">
              {group.positioning.faqs.map((faq, fi) => (
                <details key={faq.question} className="svc-faq-item">
                  <summary className="svc-faq-question">
                    <span className="svc-faq-q-num">{String(fi + 1).padStart(2, "0")}</span>
                    {faq.question}
                    <span className="svc-faq-chevron" aria-hidden="true" />
                  </summary>
                  <p className="svc-faq-answer">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── CTA band ── */}
      {group.positioning && (
        <section className="svc-cta-band page-x">
          <div className="inner svc-cta-band-inner">
            <div>
              <p className="svc-cta-band-label">Ready to move forward?</p>
              <h2 className="svc-cta-band-heading">Discuss this work with Decra.</h2>
            </div>
            <Link href="/start" className="svc-cta-band-btn">
              Start a conversation <ArrowRight size={13} strokeWidth={1.5} />
            </Link>
          </div>
        </section>
      )}

      {/* ── The other categories ── */}
      <section className="section page-x svc-other-section">
        <div className="inner">
          <div className="svc-section-eyebrow-row">
            <span className="svc-section-eyebrow">MORE FROM THE PRACTICE</span>
            <h2 className="svc-section-heading">Other service areas</h2>
          </div>
          <div className="svc-other-grid">
            {others.map((g) => (
              <Link key={g.id} href={`/services/${g.id}`} className="svc-other-card">
                <span className="svc-other-index">{String(SERVICE_GROUPS.findIndex((item) => item.id === g.id) + 1).padStart(2, "0")}</span>
                <div className="svc-other-body">
                  <h3>{g.label}</h3>
                  <p className="t-body-sm">{g.description}</p>
                </div>
                <span className="svc-other-arrow"><ArrowRight size={14} strokeWidth={1.5} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        /* ─────────────────────────────────────────────
           MASTHEAD
        ───────────────────────────────────────────── */
        .svc-masthead{
          position:relative;overflow:hidden;
          padding-top:clamp(3.5rem,7vw,6.5rem);
          padding-bottom:clamp(3.25rem,6vw,5.75rem);
          border-bottom:1px solid var(--c-border);
          background:
            radial-gradient(ellipse at 85% 10%, rgba(95,169,143,.14), transparent 40%),
            linear-gradient(120deg,var(--c-surface),var(--c-bg) 70%);
        }
        .svc-masthead-inner{
          position:relative;display:grid;
          grid-template-columns:3.25rem minmax(0,1fr) minmax(8rem,14rem);
          gap:clamp(1.5rem,4vw,3.5rem);align-items:stretch;
        }
        .svc-rail{display:flex;flex-direction:column;align-items:center;gap:1rem;color:var(--c-accent)}
        .svc-rail span{font:400 1rem/1 var(--font-serif);letter-spacing:-.04em}
        .svc-rail i{width:1px;flex:1;min-height:8rem;background:linear-gradient(var(--c-accent),transparent);opacity:.55}
        .svc-masthead-copy{max-width:52rem}
        .svc-breadcrumb{
          display:flex;align-items:center;gap:.65rem;
          margin-bottom:clamp(2rem,5vw,4rem);
          font:700 .58rem/1 var(--font-manjari);letter-spacing:.16em;
          text-transform:uppercase;color:var(--c-ink-muted);
        }
        .svc-breadcrumb-sep{display:inline-block;width:1.5rem;height:1px;background:var(--c-accent)}
        .svc-breadcrumb a{color:inherit;text-decoration:none;transition:color .2s}
        .svc-breadcrumb a:hover,.svc-breadcrumb a:focus-visible{color:var(--c-accent)}
        .svc-kicker{
          margin-bottom:1rem;
          color:var(--c-accent);
          font:700 .58rem/1.5 var(--font-manjari);
          letter-spacing:.18em;text-transform:uppercase;
        }
        .svc-hero-title{
          font-family:var(--font-serif);font-weight:400;
          font-size:clamp(2.4rem,6vw,5.4rem);
          line-height:.97;letter-spacing:-.035em;
          color:var(--c-ink);max-width:48rem;
          margin-bottom:1.25rem;text-wrap:balance;
        }
        .svc-hero-lede{
          max-width:41rem;
          font-family:var(--font-sans);font-size:clamp(.9rem,1.2vw,1.02rem);
          color:var(--c-ink-muted);line-height:1.8;
        }
        .svc-hero-foot{
          display:flex;gap:1.5rem;flex-wrap:wrap;
          margin-top:clamp(2rem,4vw,3.5rem);
          padding-top:.75rem;border-top:1px solid var(--c-border);
          font:700 .54rem/1 var(--font-manjari);letter-spacing:.16em;
          text-transform:uppercase;color:var(--c-ink-muted);
        }
        .svc-masthead-aside{
          display:flex;flex-direction:column;align-items:flex-end;
          justify-content:space-between;padding:3.5rem 0 .25rem;
          color:var(--c-forest);
        }
        .svc-aside-num{
          font:400 clamp(4rem,9vw,8rem)/.8 var(--font-serif);
          letter-spacing:-.08em;opacity:.18;
        }
        .svc-aside-caption{
          align-self:flex-start;margin-left:auto;
          color:var(--c-ink-muted);
          font:italic 400 clamp(.9rem,1.4vw,1.15rem)/1.55 var(--font-serif);
          text-align:right;
        }
        .svc-aside-mark{font:400 1.1rem/1 var(--font-serif);letter-spacing:.1em;color:var(--c-ink)}
        .svc-aside-mark span{color:var(--c-accent)}

        /* ─────────────────────────────────────────────
           STICKY SECTION INDEX
        ───────────────────────────────────────────── */
        .svc-index{
          position:sticky;top:4.2rem;z-index:5;
          background:color-mix(in srgb,var(--c-bg) 88%,transparent);
          backdrop-filter:blur(14px);
          border-bottom:1px solid var(--c-border);
        }
        .svc-index-inner{
          display:flex;align-items:center;gap:clamp(.75rem,2vw,2rem);
          min-height:3.6rem;overflow-x:auto;scrollbar-width:none;
        }
        .svc-index-inner::-webkit-scrollbar{display:none}
        .svc-index-label{
          flex:0 0 auto;
          font:700 .52rem/1 var(--font-manjari);letter-spacing:.16em;
          color:var(--c-ink-muted);
        }
        .svc-index-link{
          display:inline-flex;align-items:center;gap:.5rem;flex:0 0 auto;
          color:var(--c-ink-mid);text-decoration:none;
          font:500 .68rem/1.3 var(--font-sans);
          transition:color .2s;
        }
        .svc-index-link svg{opacity:0;transform:translateX(-4px);transition:all .2s}
        .svc-index-link:hover,.svc-index-link:focus-visible{color:var(--c-accent)}
        .svc-index-link:hover svg,.svc-index-link:focus-visible svg{opacity:1;transform:none}
        .svc-index-num{color:var(--c-accent);font:700 .54rem/1 var(--font-manjari)}

        /* ─────────────────────────────────────────────
           SHARED SECTION TYPOGRAPHY
        ───────────────────────────────────────────── */
        .svc-section-eyebrow{
          display:block;
          font:700 .56rem/1 var(--font-manjari);letter-spacing:.18em;
          text-transform:uppercase;color:var(--c-accent);
          margin-bottom:.75rem;
        }
        .svc-section-eyebrow-row{margin-bottom:clamp(2rem,4vw,3.25rem)}
        .svc-section-heading{
          font-family:var(--font-serif);font-weight:400;
          font-size:clamp(1.45rem,2.8vw,2.1rem);
          line-height:1.1;letter-spacing:-.02em;color:var(--c-ink);
          margin:0;
        }

        /* ─────────────────────────────────────────────
           POSITIONING SECTION
        ───────────────────────────────────────────── */
        .svc-positioning-section{
          border-bottom:1px solid var(--c-border);
        }
        .svc-positioning-layout{
          display:grid;grid-template-columns:minmax(0,.38fr) minmax(0,.62fr);
          gap:clamp(2rem,5vw,5rem);align-items:start;
        }
        .svc-positioning-left{position:sticky;top:7rem;padding-top:.25rem}
        .svc-positioning-lead{
          font-family:var(--font-sans);
          font-size:clamp(1rem,1.5vw,1.12rem);
          color:var(--c-ink-mid);line-height:1.75;
          margin-bottom:2rem;max-width:46rem;
        }
        .svc-positioning-cards{
          display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));
          gap:1px;background:var(--c-border);border:1px solid var(--c-border);
          margin-bottom:1.5rem;
        }
        .svc-pos-card{
          padding:1.5rem;background:var(--c-bg);
          font-family:var(--font-sans);font-size:.85rem;
          color:var(--c-ink-muted);line-height:1.7;
        }
        .svc-pos-card-label{
          display:block;margin-bottom:.75rem;
          font:700 .56rem/1 var(--font-manjari);letter-spacing:.14em;
          text-transform:uppercase;color:var(--c-ink);
        }
        .svc-pos-card--approach{border-top:2px solid var(--c-accent)}
        .svc-pos-card--outputs{border-top:2px solid var(--c-border-strong)}
        .svc-outputs-list{list-style:none;display:flex;flex-direction:column;gap:.55rem}
        .svc-outputs-list li{display:flex;gap:.65rem;align-items:baseline}
        .svc-output-dot{
          flex-shrink:0;width:4px;height:4px;border-radius:50%;
          background:var(--c-accent);transform:translateY(-.15em);
        }
        .svc-boundary{
          font-family:var(--font-sans);font-size:.8rem;
          color:var(--c-ink-muted);line-height:1.75;
          padding-top:1.1rem;border-top:1px solid var(--c-border);
        }
        .svc-boundary strong{color:var(--c-ink-mid)}

        /* ─────────────────────────────────────────────
           ENGAGEMENT: HOW IT WORKS
        ───────────────────────────────────────────── */
        .working-grid{
          display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));
          gap:1px;background:var(--c-border);border:1px solid var(--c-border);
          margin-bottom:clamp(2rem,5vw,4rem);
        }
        .working-note{
          position:relative;padding:1.75rem 1.5rem 1.5rem;
          background:var(--c-bg);
          transition:background .25s ease,transform .25s ease;
        }
        .working-note::after{
          content:'';position:absolute;top:0;left:0;
          width:0;height:2px;background:var(--c-accent);
          transition:width .3s ease;
        }
        .working-note:hover{background:var(--c-surface);transform:translateY(-2px)}
        .working-note:hover::after{width:100%}
        .working-note-index{
          display:block;margin-bottom:.85rem;
          font:700 .54rem/1 var(--font-manjari);letter-spacing:.14em;
          color:var(--c-accent);
        }
        .working-note h3{
          margin-bottom:.6rem;
          font:400 1.1rem/1.25 var(--font-serif);color:var(--c-ink);
        }

        /* ─────────────────────────────────────────────
           REACH CARDS
        ───────────────────────────────────────────── */
        .reach-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(17rem,1fr));gap:1rem}
        .reach-card{
          position:relative;display:flex;flex-direction:column;
          min-height:14rem;padding:1.5rem;
          border:1px solid var(--c-border);
          background:linear-gradient(145deg,var(--c-surface),var(--c-bg) 75%);
          color:inherit;text-decoration:none;
          transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease;
        }
        .reach-card:hover,.reach-card:focus-visible{
          transform:translateY(-4px);border-color:var(--c-accent);
          box-shadow:0 16px 40px rgba(14,61,50,.09);
        }
        .reach-card-index{
          margin-bottom:1.5rem;
          font:700 .57rem/1 var(--font-manjari);letter-spacing:.13em;color:var(--c-accent);
        }
        .reach-card h3{
          max-width:18rem;margin-bottom:.6rem;
          font:400 1.25rem/1.25 var(--font-serif);color:var(--c-ink);
        }
        .reach-card p{flex:1}
        .reach-card-foot{
          display:flex;align-items:center;justify-content:space-between;
          gap:.75rem;margin-top:1.2rem;padding-top:.75rem;
          border-top:1px solid var(--c-border);
          font:700 .54rem/1.2 var(--font-manjari);letter-spacing:.1em;
          text-transform:uppercase;color:var(--c-ink-muted);
        }

        /* ─────────────────────────────────────────────
           SERVICE CARDS (main catalogue)
        ───────────────────────────────────────────── */
        .svc-grid{
          display:grid;
          grid-template-columns:repeat(auto-fill,minmax(min(100%,22rem),1fr));
          gap:1px;background:var(--c-border);border:1px solid var(--c-border);
        }
        .svc-card{
          position:relative;
          display:flex;flex-direction:column;
          padding:1.75rem 1.5rem 1.5rem;
          background:var(--c-bg);
          transition:background .25s ease;
          overflow:hidden;
        }
        .svc-card::before{
          content:'';position:absolute;
          bottom:0;left:0;right:0;height:2px;
          background:linear-gradient(90deg,var(--c-accent),transparent);
          transform:scaleX(0);transform-origin:left;
          transition:transform .35s ease;
        }
        .svc-card:hover{background:var(--c-surface)}
        .svc-card:hover::before{transform:scaleX(1)}
        .svc-card-header{
          display:flex;align-items:baseline;gap:.85rem;
          margin-bottom:1rem;
        }
        .svc-card-index{
          flex-shrink:0;
          font:700 .54rem/1 var(--font-manjari);letter-spacing:.14em;
          color:var(--c-accent);
        }
        .svc-card-title{
          font:400 clamp(1rem,1.5vw,1.25rem)/1.25 var(--font-serif);
          color:var(--c-ink);
          transition:color .2s;
        }
        .svc-card:hover .svc-card-title{color:var(--c-accent)}
        .svc-card-body{
          font-family:var(--font-sans);font-size:.85rem;
          color:var(--c-ink-muted);line-height:1.7;
          margin-bottom:1.25rem;
        }
        .svc-card-tags{
          display:flex;flex-wrap:wrap;gap:.4rem .5rem;
          margin-bottom:1.5rem;flex:1;align-content:flex-start;
        }
        .svc-tag{
          padding:.28rem .65rem;
          border:1px solid var(--c-border);
          border-radius:999px;
          font-family:var(--font-sans);font-size:.72rem;
          color:var(--c-ink-muted);
          transition:border-color .2s,color .2s,background .2s;
          white-space:nowrap;
        }
        .svc-card:hover .svc-tag{border-color:rgba(47,93,80,.3)}
        .svc-card-cta{
          display:inline-flex;align-items:center;gap:.45rem;
          margin-top:auto;
          font:700 .6rem/1 var(--font-manjari);letter-spacing:.15em;
          text-transform:uppercase;color:var(--c-ink-muted);text-decoration:none;
          border-bottom:1px solid var(--c-border);padding-bottom:.3rem;
          transition:color .2s,border-color .2s;width:fit-content;
        }
        .svc-card-cta:hover{color:var(--c-accent);border-color:var(--c-accent)}

        /* ─────────────────────────────────────────────
           CATALOGUE SECTIONS (when there are sub-headers)
        ───────────────────────────────────────────── */
        .catalogue-section{
          scroll-margin-top:8rem;
          margin-bottom:clamp(3rem,6vw,5rem);
        }
        .catalogue-section-header{
          display:grid;
          grid-template-columns:minmax(0,.38fr) minmax(0,.62fr);
          gap:clamp(1.5rem,3vw,3rem);
          align-items:start;
          margin-bottom:1.25rem;
          padding-bottom:1.25rem;
          border-bottom:1px solid var(--c-border);
        }
        .catalogue-section-label{display:flex;align-items:baseline;gap:.8rem}
        .catalogue-section-title{
          font:400 clamp(1.2rem,2vw,1.65rem)/1.15 var(--font-serif);
          color:var(--c-ink);margin:0;
        }
        .catalogue-section-blurb{
          font-family:var(--font-sans);font-size:.85rem;
          color:var(--c-ink-muted);line-height:1.75;
          max-width:38rem;
          padding-top:.15rem;
        }

        /* ─────────────────────────────────────────────
           SECTORS
        ───────────────────────────────────────────── */
        .svc-sectors-section{
          padding-top:clamp(2rem,4vw,3.5rem);
          padding-bottom:clamp(2rem,4vw,3.5rem);
          border-top:1px solid var(--c-border);
          border-bottom:1px solid var(--c-border);
        }
        .svc-sectors-tags{display:flex;flex-wrap:wrap;gap:.5rem}
        .svc-sector-tag{
          padding:.5rem 1rem;
          border:1px solid var(--c-border-strong);
          border-radius:999px;
          font-family:var(--font-sans);font-size:.78rem;
          color:var(--c-ink-mid);
          background:var(--c-surface);
        }

        /* ─────────────────────────────────────────────
           RESEARCH PAPERS
        ───────────────────────────────────────────── */
        .svc-papers-grid{
          display:grid;
          grid-template-columns:repeat(auto-fill,minmax(min(100%,24rem),1fr));
          gap:1px;background:var(--c-border);border:1px solid var(--c-border);
          margin-bottom:clamp(2.5rem,5vw,4rem);
        }
        .svc-paper-card{
          padding:1.75rem 1.5rem;background:var(--c-bg);
        }
        .svc-paper-meta{
          font:700 .54rem/1 var(--font-manjari);letter-spacing:.13em;
          text-transform:uppercase;color:var(--c-ink-muted);
          margin-bottom:.75rem;
        }
        .svc-paper-title{
          font:400 clamp(1rem,1.6vw,1.3rem)/1.3 var(--font-serif);
          color:var(--c-ink);margin-bottom:.75rem;
        }
        .svc-policy-cta-block{
          padding:clamp(2rem,4vw,3rem);
          border:1px solid var(--c-border);
          background:linear-gradient(135deg,var(--c-surface),var(--c-bg) 70%);
        }
        .svc-policy-cta-heading{
          font:400 clamp(1.3rem,2.2vw,1.75rem)/1.2 var(--font-serif);
          color:var(--c-ink);margin-bottom:.75rem;
        }

        /* ─────────────────────────────────────────────
           FAQs
        ───────────────────────────────────────────── */
        .svc-faq-section{border-top:1px solid var(--c-border)}
        .svc-faq-layout{
          display:grid;grid-template-columns:minmax(0,.36fr) minmax(0,.64fr);
          gap:clamp(2rem,5vw,5rem);align-items:start;
        }
        .svc-faq-left{position:sticky;top:7rem}
        .svc-faq-right{display:flex;flex-direction:column}
        .svc-faq-item{
          border-bottom:1px solid var(--c-border);
        }
        .svc-faq-question{
          display:flex;align-items:center;gap:.75rem;
          padding:1.1rem 0;
          cursor:pointer;list-style:none;
          font:700 .85rem/1.45 var(--font-sans);color:var(--c-ink);
          transition:color .2s;
        }
        .svc-faq-question::-webkit-details-marker{display:none}
        .svc-faq-question:hover{color:var(--c-accent)}
        .svc-faq-q-num{
          flex-shrink:0;
          font:700 .54rem/1 var(--font-manjari);letter-spacing:.14em;color:var(--c-accent);
        }
        .svc-faq-chevron{
          margin-left:auto;flex-shrink:0;
          width:1rem;height:1rem;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%232F5D50' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-size:contain;background-repeat:no-repeat;
          transition:transform .25s ease;
        }
        details[open] .svc-faq-chevron{transform:rotate(180deg)}
        .svc-faq-answer{
          padding:.25rem 0 1.25rem clamp(1.5rem,3vw,2.25rem);
          font-family:var(--font-sans);font-size:.85rem;
          color:var(--c-ink-muted);line-height:1.75;
        }

        /* ─────────────────────────────────────────────
           CTA BAND
        ───────────────────────────────────────────── */
        .svc-cta-band{
          padding-top:clamp(3rem,6vw,5rem);
          padding-bottom:clamp(3rem,6vw,5rem);
          background:var(--c-forest);
        }
        .svc-cta-band-inner{
          display:flex;align-items:center;justify-content:space-between;
          gap:2rem;flex-wrap:wrap;
        }
        .svc-cta-band-label{
          font:700 .58rem/1 var(--font-manjari);letter-spacing:.18em;
          text-transform:uppercase;color:rgba(240,237,232,.5);
          margin-bottom:.6rem;
        }
        .svc-cta-band-heading{
          font:400 clamp(1.5rem,3vw,2.2rem)/1.1 var(--font-serif);
          color:#F0EDE8;
          letter-spacing:-.02em;
        }
        .svc-cta-band-btn{
          display:inline-flex;align-items:center;gap:.65rem;flex-shrink:0;
          padding:.9rem 1.75rem;
          border:1px solid rgba(240,237,232,.3);
          color:#F0EDE8;text-decoration:none;
          font:700 .6rem/1 var(--font-manjari);letter-spacing:.16em;
          text-transform:uppercase;
          transition:background .25s,border-color .25s;
        }
        .svc-cta-band-btn:hover{
          background:rgba(240,237,232,.1);
          border-color:rgba(240,237,232,.6);
        }

        /* ─────────────────────────────────────────────
           OTHER SERVICE AREAS
        ───────────────────────────────────────────── */
        .svc-other-section{border-top:1px solid var(--c-border)}
        .svc-other-grid{
          display:grid;
          grid-template-columns:repeat(auto-fill,minmax(min(100%,20rem),1fr));
          gap:1px;background:var(--c-border);border:1px solid var(--c-border);
        }
        .svc-other-card{
          display:flex;align-items:flex-start;gap:1rem;padding:1.5rem;
          background:var(--c-bg);text-decoration:none;color:inherit;
          transition:background .2s;
        }
        .svc-other-card:hover{background:var(--c-surface)}
        .svc-other-index{
          flex-shrink:0;padding-top:.15rem;
          font:700 .54rem/1 var(--font-manjari);letter-spacing:.14em;color:var(--c-accent);
        }
        .svc-other-body{flex:1}
        .svc-other-body h3{
          font:400 1rem/1.25 var(--font-serif);color:var(--c-ink);
          margin-bottom:.5rem;
          transition:color .2s;
        }
        .svc-other-card:hover .svc-other-body h3{color:var(--c-accent)}
        .svc-other-arrow{
          flex-shrink:0;align-self:center;
          color:var(--c-ink-muted);opacity:.4;
          transition:opacity .2s,transform .2s;
        }
        .svc-other-card:hover .svc-other-arrow{opacity:1;transform:translateX(3px)}

        /* ─────────────────────────────────────────────
           RELATED WORK LIST
        ───────────────────────────────────────────── */
        .related-work-list{
          display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));
          gap:.5rem;padding:0;list-style:none;
        }
        .related-work-list a{
          display:flex;align-items:center;justify-content:space-between;gap:1rem;
          padding:1rem 1.25rem;border:1px solid var(--c-border);
          background:var(--c-bg);
          color:var(--c-ink-mid);text-decoration:none;
          font:500 .82rem/1.5 var(--font-sans);
          transition:border-color .2s,color .2s,background .2s;
        }
        .related-work-list a:hover{
          border-color:var(--c-accent);
          color:var(--c-accent);background:var(--c-surface);
        }

        /* ─────────────────────────────────────────────
           FOCUS / ACCESSIBILITY
        ───────────────────────────────────────────── */
        .svc-breadcrumb a:focus-visible,
        .svc-index-link:focus-visible,
        .svc-card-cta:focus-visible,
        .reach-card:focus-visible,
        .svc-cta-band-btn:focus-visible,
        .svc-other-card:focus-visible,
        .related-work-list a:focus-visible,
        .svc-faq-question:focus-visible{
          outline:2px solid var(--c-accent);outline-offset:4px;
        }

        /* ─────────────────────────────────────────────
           REDUCED MOTION
        ───────────────────────────────────────────── */
        @media(prefers-reduced-motion:reduce){
          .svc-card,.svc-card::before,
          .working-note,.working-note::after,
          .reach-card,.svc-other-card,.svc-other-arrow,
          .svc-index-link svg,.svc-faq-chevron{transition:none}
        }

        /* ─────────────────────────────────────────────
           RESPONSIVE
        ───────────────────────────────────────────── */
        @media(max-width:900px){
          .svc-positioning-layout,.svc-faq-layout{grid-template-columns:1fr}
          .svc-positioning-left,.svc-faq-left{position:static}
          .catalogue-section-header{grid-template-columns:1fr}
        }
        @media(max-width:820px){
          .svc-masthead-inner{grid-template-columns:2rem minmax(0,1fr)}
          .svc-masthead-aside{display:none}
          .svc-rail i{min-height:5rem}
          .svc-other-grid{grid-template-columns:1fr}
        }
        @media(max-width:640px){
          .svc-grid{grid-template-columns:1fr}
          .svc-papers-grid{grid-template-columns:1fr}
          .working-grid{grid-template-columns:1fr}
          .reach-grid{grid-template-columns:1fr}
          .svc-cta-band-inner{flex-direction:column;align-items:flex-start}
        }
        @media(max-width:560px){
          .svc-masthead{padding-top:2.5rem;padding-bottom:2.75rem}
          .svc-masthead-inner{grid-template-columns:1.25rem minmax(0,1fr);gap:.85rem}
          .svc-rail span{font-size:.8rem}
          .svc-breadcrumb{margin-bottom:2rem;font-size:.52rem}
          .svc-kicker{font-size:.52rem;letter-spacing:.12em}
          .svc-hero-title{font-size:clamp(2.15rem,10vw,3.2rem)}
          .svc-hero-foot{margin-top:1.75rem;gap:1rem}
          .svc-index{top:3.55rem}
          .svc-index-inner{min-height:3.15rem}
          .svc-index-label{display:none}
          .svc-card{padding:1.4rem 1.25rem 1.25rem}
          .catalogue-section-header{gap:1rem}
          .svc-faq-question{font-size:.82rem}
        }
      `}</style>
    </div>
  );
}
