import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Puzzle, Award, Download } from "lucide-react";
import { engineeringProjects, type EngineeringProject } from "@/lib/engineering-projects";
import { PAPERS } from "@/lib/papers";
import { InlineResearchPanel } from "@/components/research/InlineResearchPanel";

export async function generateStaticParams() {
  return engineeringProjects
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = engineeringProjects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/engineering/${slug}` },
  };
}

export default async function EngineeringProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = engineeringProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  const related = project.relatedSlug
    ? engineeringProjects.find((p) => p.slug === project.relatedSlug)
    : undefined;

  // Whichever side of the pair carries paperSlug is "the research"; the
  // other (if any) is "the solution" it powers. Reachable from either
  // slug, both render the same merged page so there's one canonical place
  // to read the research and try the product, no matter which one someone
  // clicked through from.
  const researchSide: EngineeringProject | undefined = project.paperSlug ? project : related?.paperSlug ? related : undefined;
  const productSide: EngineeringProject | undefined = project.paperSlug ? related : project;

  const paper = researchSide?.paperSlug ? PAPERS.find((p) => p.slug === researchSide.paperSlug) : undefined;
  const hasResearch = !!researchSide && !!paper;
  const hasProduct = !!productSide;

  const labelStyle = {
    display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem",
  } as const;
  const eyebrow = (text: string) => (
    <div style={labelStyle}>
      <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
      <span className="t-label">{text}</span>
    </div>
  );

  return (
    <div style={{ background: "var(--c-bg)", paddingTop: "6rem" }}>
      <section className="section page-x">
        <div className="inner" style={{ maxWidth: "52rem" }}>
          <Link
            href="/engineering"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--c-ink-muted)", textDecoration: "none", marginBottom: "2rem",
            }}
          >
            <ArrowLeft size={13} /> Engineering
          </Link>

          {/* Jump nav between the two sections, only when there's actually
              both a research and a product side to jump between */}
          {hasResearch && hasProduct && (
            <div style={{ display: "flex", gap: "1.5rem", marginBottom: "3rem", borderBottom: "1px solid var(--c-border)", paddingBottom: "1rem" }}>
              <a href="#research-section" style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-forest)", textDecoration: "none" }}>
                Research
              </a>
              <a href="#product-section" style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-ink-muted)", textDecoration: "none" }}>
                Product
              </a>
            </div>
          )}

          {/* ── Section 1: Research ── */}
          {hasResearch && paper && (
            <section
              id="research-section"
              style={{
                scrollMarginTop: "6rem",
                marginBottom: hasProduct ? "4.5rem" : 0,
                paddingBottom: hasProduct ? "3.5rem" : 0,
                borderBottom: hasProduct ? "1px solid var(--c-border)" : "none",
              }}
            >
              {eyebrow("The Research")}
              <h1 className="t-display t-display-lg" style={{ marginBottom: "1.25rem" }}>
                {paper.title}
              </h1>

              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
                {(researchSide?.fellowship || paper.partner) && (
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "0.4rem", width: "fit-content",
                    fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.03em",
                    color: "var(--c-forest)", border: "1px solid var(--c-border-strong)",
                    borderRadius: "100px", padding: "0.4rem 0.9rem",
                  }}>
                    <Award size={12} strokeWidth={2} />
                    {researchSide?.fellowship || paper.partner}
                  </div>
                )}
                <span className="t-body-sm">{paper.dates}</span>
              </div>

              <InlineResearchPanel paper={paper} />
            </section>
          )}

          {/* ── Section 2: Product/Solution ── */}
          {hasProduct && productSide && (
            <section id="product-section" style={{ scrollMarginTop: "6rem" }}>
              {eyebrow(hasResearch ? "The Solution" : productSide.subtitle)}

              {hasResearch ? (
                <h2 className="t-display t-display-lg" style={{ marginBottom: "1.5rem" }}>{productSide.title}</h2>
              ) : (
                <h1 className="t-display t-display-lg" style={{ marginBottom: "1.5rem" }}>{productSide.title}</h1>
              )}

              <div style={{ aspectRatio: "16 / 9", overflow: "hidden", borderRadius: "10px", border: "1px solid var(--c-border)", marginBottom: "2.5rem", background: "var(--c-surface)" }}>
                <img
                  src={productSide.image}
                  alt={productSide.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              <p className="t-body" style={{ fontSize: "0.95rem", marginBottom: "2rem" }}>
                {productSide.detail || productSide.description}
              </p>

              {productSide.techStack && productSide.techStack.length > 0 && (
                <div style={{ marginBottom: "2.5rem" }}>
                  <span className="t-label" style={{ display: "block", marginBottom: "0.75rem" }}>Built with</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {productSide.techStack.map((t) => (
                      <span key={t} style={{
                        fontSize: "0.7rem", color: "var(--c-ink-mid)",
                        border: "1px solid var(--c-border)", borderRadius: "100px", padding: "0.3rem 0.8rem",
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", borderTop: "1px solid var(--c-border)", paddingTop: "2rem" }}>
                {productSide.chromeUrl ? (
                  <a href={productSide.chromeUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <Puzzle size={13} /> Add to Chrome
                  </a>
                ) : productSide.downloadUrl ? (
                  <a href={productSide.downloadUrl} download className="btn-primary">
                    <Download size={13} /> Download Extension
                  </a>
                ) : (
                  <span className="t-body-sm" style={{ display: "inline-flex", alignItems: "center" }}>
                    Chrome Web Store listing coming soon.
                  </span>
                )}
                {productSide.repoUrl && (
                  <a href={productSide.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                    View source <ArrowUpRight size={13} />
                  </a>
                )}
              </div>

              {productSide.downloadUrl && !productSide.chromeUrl && (
                <div style={{ marginTop: "1.5rem", background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: "10px", padding: "1.5rem" }}>
                  <span className="t-label" style={{ display: "block", marginBottom: "0.85rem" }}>
                    How to install
                  </span>
                  <ol className="t-body-sm" style={{ margin: 0, paddingLeft: "1.1rem", lineHeight: 1.9 }}>
                    <li>Download the .zip above and unzip it.</li>
                    <li>Open <code>chrome://extensions</code> in Chrome and turn on <strong>Developer mode</strong> (top right).</li>
                    <li>Click <strong>Load unpacked</strong> and select the unzipped folder.</li>
                  </ol>
                  <p className="t-body-sm" style={{ marginTop: "0.85rem", marginBottom: 0 }}>
                    Not yet on the Chrome Web Store — this is a direct, if less polished, way to try it today.
                  </p>
                </div>
              )}
            </section>
          )}
        </div>
      </section>
    </div>
  );
}
