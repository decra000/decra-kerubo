import type { Metadata } from "next";
import Link from "next/link";
import { Award, ArrowRight } from "lucide-react";
import { PAPERS } from "@/lib/papers";
import { engineeringProjects } from "@/lib/engineering-projects";
import { PaperLink } from "@/components/research/PaperLink";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Published research from Decra Kerubo on AI, data protection, and algorithmic accountability, in partnership with academic and industry programs across Africa.",
  alternates: { canonical: "/research" },
};

/* Each paper's one-line gloss, written fresh rather than clipped from its
   abstract, and the fellowship/tool pairing pulled from the matching entry
   in engineeringProjects. Kept as a lookup by slug so a missing gloss fails
   loudly (a blank line) instead of silently falling back to abstract text
   this page deliberately doesn't show. */
const GLOSS: Record<string, string> = {
  "democratization-decarbonization-ai":
    "Makes the case for AI that reaches more people while costing the planet less, and for edge computing as the way there.",
  "ai-enabled-regulation":
    "Tests how well current social media regulation actually works, and builds toward real-time detection where it doesn't.",
  "cross-border-data-transfer":
    "Reads cross-border data transfer law against regulations like the GDPR, and where the framework needs to catch up.",
  "unbiased-hiring-algorithms":
    "Builds toward a hiring tool that stays efficient without inheriting the bias baked into automated screening.",
};

export default function ResearchPage() {
  return (
    <div style={{ background: "var(--c-bg)", paddingTop: "6rem" }}>
      {/* ── Header ── */}
      <section className="section page-x" style={{ borderBottom: "1px solid var(--c-border)" }}>
        <div className="inner" style={{ maxWidth: "42rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">Research</span>
          </div>
          <h1 className="t-display t-display-xl" style={{ marginBottom: "1.25rem" }}>Published work.</h1>
          <p className="t-body">
            Applied research on AI, data protection, and algorithmic accountability, published in partnership
            with academic and industry programs.
          </p>
        </div>
      </section>

      {/* ── The list ──
          Deliberately plain: no images, no cards, one line per paper rather
          than the abstract. The site's protected-PDF viewer and external-link
          branching (PaperLink) still gate every "Read the paper" exactly as
          it does everywhere else this data is used. */}
      <section className="section page-x">
        <div className="inner" style={{ maxWidth: "42rem", borderTop: "1px solid var(--c-border)" }}>
          {PAPERS.map((paper) => {
            const project = engineeringProjects.find((p) => p.paperSlug === paper.slug);
            const orgLabel = project?.fellowship || paper.partner.replace(/^In association with (the )?/i, "");
            const poweredTool = project?.relatedSlug
              ? engineeringProjects.find((p) => p.slug === project.relatedSlug)
              : undefined;

            return (
              <article key={paper.slug} style={{ borderBottom: "1px solid var(--c-border)", padding: "3rem 0" }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "0.4rem", width: "fit-content",
                    fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.03em",
                    color: "var(--c-forest)", border: "1px solid var(--c-border-strong)",
                    borderRadius: "100px", padding: "0.35rem 0.85rem",
                  }}>
                    <Award size={11} strokeWidth={2} />
                    {orgLabel}
                  </div>
                  <span className="t-body-sm">{paper.dates}</span>
                </div>

                <h2 style={{
                  fontFamily: "var(--font-serif)", fontWeight: 400,
                  fontSize: "clamp(1.3rem, 2.4vw, 1.9rem)", lineHeight: 1.25,
                  color: "var(--c-ink)", marginBottom: "1rem", maxWidth: "36rem",
                }}>
                  {paper.title}
                </h2>

                <p className="t-body" style={{ maxWidth: "34rem", marginBottom: "1.75rem" }}>
                  {GLOSS[paper.slug]}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.75rem" }}>
                  <PaperLink slug={paper.slug} className="btn-primary">
                    Read the paper <ArrowRight size={13} />
                  </PaperLink>
                  {poweredTool && (
                    <Link
                      href={`/engineering/${poweredTool.slug}`}
                      style={{
                        fontFamily: "var(--font-manjari)", fontWeight: 700,
                        fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase",
                        color: "var(--c-ink-muted)", textDecoration: "none",
                        borderBottom: "1px solid var(--c-border-strong)", paddingBottom: "2px",
                      }}
                    >
                      See {poweredTool.title}, the tool it powers
                    </Link>
                  )}
                </div>
              </article>
            );
          })}

          <div style={{ paddingTop: "2.5rem", textAlign: "center" }}>
            <Link
              href="/engineering"
              style={{
                fontFamily: "var(--font-manjari)", fontWeight: 700,
                fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--c-ink-muted)", textDecoration: "none",
              }}
            >
              See the products these built
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
