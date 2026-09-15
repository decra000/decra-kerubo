import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Award, ArrowRight } from "lucide-react";
import { EngineeringGrid } from "@/components/engineering/EngineeringGrid";
import { engineeringProjects } from "@/lib/engineering-projects";
import { PAPERS } from "@/lib/papers";
import { PaperLink } from "@/components/research/PaperLink";

export const metadata: Metadata = {
  title: "Engineering & Research",
  description:
    "Selected engineering builds and published research from Decra Kerubo: AI tools, apps, websites, and applied research on AI, data protection, and algorithmic accountability, built and written in partnership with academic and industry programs across Africa.",
  alternates: { canonical: "/engineering" },
};

/* Each paper's one-line gloss, written fresh rather than clipped from its
   abstract. Kept as a lookup by slug so a missing entry fails loudly (a
   blank line) instead of silently falling back to abstract text this
   section deliberately doesn't show. */
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

export default function EngineeringPage() {
  return (
    <div style={{ background: "var(--c-bg)", paddingTop: "6rem" }}>

      {/* ── Header ── */}
      <section className="section page-x" style={{ borderBottom: "1px solid var(--c-border)" }}>
        <div className="inner">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">Engineering &amp; Research</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
            <h1 className="t-display t-display-xl" style={{ marginBottom: 0 }}>Selected builds.</h1>
            <Link
              href="/?engage=tech-development#collaborate"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "var(--c-forest)", color: "rgba(248,246,241,0.95)",
                fontFamily: "var(--font-manjari)", fontWeight: 700,
                fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "0.75rem 1.4rem", borderRadius: "100px",
                textDecoration: "none", whiteSpace: "nowrap",
              }}
            >
              Request a build <ArrowUpRight size={13} />
            </Link>
          </div>
          <p className="t-body" style={{ maxWidth: "34rem" }}>
            AI tools, apps, websites, and applied research I have directly and collaboratively built with different languages and frameworks cross-industry.
          </p>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="section page-x">
        <div className="inner">
          <EngineeringGrid projects={engineeringProjects} />
        </div>
      </section>

      {/* ── Research ──
          Engineering and research are the same practice looked at from two
          angles, so they share this page rather than living on separate
          ones. Deliberately plainer than the grid above: no images, no
          cards, one line per paper instead of the abstract. Every "Read the
          paper" still runs through PaperLink exactly as it does above, so
          the protected-PDF viewer and external-link branching aren't
          duplicated, just reused. */}
      <section className="section page-x" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div className="inner" style={{ maxWidth: "42rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">Research</span>
          </div>
          <h2 className="t-display t-display-lg" style={{ marginBottom: "1.25rem" }}>Published work.</h2>
          <p className="t-body" style={{ marginBottom: "3rem" }}>
            Applied research on AI, data protection, and algorithmic accountability, published in partnership
            with academic and industry programs.
          </p>

          <div style={{ borderTop: "1px solid var(--c-border)" }}>
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

                  <h3 style={{
                    fontFamily: "var(--font-serif)", fontWeight: 400,
                    fontSize: "clamp(1.3rem, 2.4vw, 1.9rem)", lineHeight: 1.25,
                    color: "var(--c-ink)", marginBottom: "1rem", maxWidth: "36rem",
                  }}>
                    {paper.title}
                  </h3>

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
          </div>
        </div>
      </section>
    </div>
  );
}
