import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Award, ArrowRight } from "lucide-react";
import { EngineeringGrid } from "@/components/engineering/EngineeringGrid";
import { engineeringProjects } from "@/lib/engineering-projects";
import { PAPERS } from "@/lib/papers";
import { PaperLink } from "@/components/research/PaperLink";

export const metadata: Metadata = {
  title: "Research & Engineering",
  description:
    "Research and engineering from Decra Kerubo, technology lawyer and product counsel in Nairobi, Kenya: applied research on AI, data protection, and where technology outpaces the law, and the tools built from what it found.",
  alternates: { canonical: "/engineering" },
};

/* Each paper's one-line gloss, written plainly rather than clipped from its
   abstract. Kept as a lookup by slug so a missing entry fails loudly (a
   blank line) instead of silently falling back to abstract text this
   section deliberately doesn't show. */
const GLOSS: Record<string, string> = {
  "democratization-decarbonization-ai":
    "AI often doesn't reach the people who need it, and running it costs real energy and water. This looks at edge computing as a way to close both gaps.",
  "ai-enabled-regulation":
    "Tests how well social media platforms actually catch cyberbullying, then builds a real-time NLP and machine learning system that catches more of it.",
  "cross-border-data-transfer":
    "Checks whether cross-border data transfer law, including the GDPR, still holds up against how data actually moves and gets reused today.",
  "unbiased-hiring-algorithms":
    "Looks at where hiring algorithms introduce bias, and what it would take to fix that without losing the efficiency they're built for.",
};

export default function EngineeringPage() {
  return (
    <div style={{ background: "var(--c-bg)", paddingTop: "6rem" }}>

      {/* ── Header ──
          No CTA here. The research and the built work are the argument; the
          ask comes at the end, once someone has actually seen both, not as
          the first thing on the page. */}
      <section className="section page-x" style={{ borderBottom: "1px solid var(--c-border)" }}>
        <div className="inner">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">Research &amp; Engineering</span>
          </div>
          <h1 className="t-display t-display-xl" style={{ marginBottom: "1.25rem" }}>
            Research, and what got built from it.
          </h1>
          <p className="t-body" style={{ maxWidth: "34rem" }}>
            Four research papers on AI, data protection, and algorithmic accountability, and the tools I built
            off the back of them.
          </p>
        </div>
      </section>

      {/* ── Research ──
          Leads the page: the research is the credibility, the builds are the
          proof it goes somewhere. Deliberately plain, no images, no cards,
          one line per paper instead of the abstract. Every "Read the paper"
          runs through PaperLink exactly as the grid below does, so the
          protected-PDF viewer and external-link branching aren't
          duplicated, just reused. */}
      <section className="section page-x" style={{ borderBottom: "1px solid var(--c-border)" }}>
        <div className="inner" style={{ maxWidth: "42rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">Research</span>
          </div>
          <h2 className="t-display t-display-lg" style={{ marginBottom: "1.25rem" }}>Research.</h2>

          <p className="t-body" style={{ maxWidth: "36rem", marginBottom: "3rem" }}>
            Four papers written between 2021 and now, across a UN fellowship, two universities, and a
            Mercedes-Benz program. One of them, the cyberbullying detection paper, is formally published;
            the rest were completed for their respective programs and are listed here on that basis. Together
            they cover AI accessibility and its environmental cost, harmful content on social media, cross-border
            data transfer law, and bias in hiring algorithms.
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

      {/* ── Grid ── */}
      <section className="section page-x">
        <div className="inner">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">Engineering</span>
          </div>
          <h2 className="t-display t-display-lg" style={{ marginBottom: "1.25rem" }}>Selected builds.</h2>
          <p className="t-body" style={{ maxWidth: "34rem", marginBottom: "3rem" }}>
            AI tools, apps, and websites I have directly and collaboratively built with different languages
            and frameworks cross-industry.
          </p>
          <EngineeringGrid projects={engineeringProjects} />
        </div>
      </section>

      {/* ── Closing CTA ──
          The one ask on the page, and it comes last, after the research and
          the builds have made the case rather than opening with it. Same
          destination the header button used to point at. */}
      <section className="section page-x" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div className="inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
          <div>
            <p className="t-label" style={{ marginBottom: "0.75rem" }}>Build something</p>
            <h2 className="t-display t-display-md" style={{ marginBottom: 0 }}>Have a product that needs this.</h2>
          </div>
          <Link
            href="/?engage=tech-development#collaborate"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "var(--c-forest)", color: "rgba(248,246,241,0.95)",
              fontFamily: "var(--font-manjari)", fontWeight: 700,
              fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "0.9rem 1.6rem", borderRadius: "100px",
              textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0,
            }}
          >
            Request a build <ArrowUpRight size={13} />
          </Link>
        </div>
      </section>
    </div>
  );
}
