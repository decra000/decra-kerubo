"use client";

import Link from "next/link";
import { ArrowUpRight, Award } from "lucide-react";
import { engineeringProjects, type EngineeringProject } from "@/lib/engineering-projects";
import { PAPERS } from "@/lib/papers";

/**
 * The homepage Research section: one card per research effort, pairing each
 * paper with the product it powers where one exists. Stacked in a single
 * column rather than a carousel — each card is deliberately minimal
 * (research title, organization, the paired solution's title if any, and a
 * single "Explore" action), so there's no need to hide them behind slides;
 * the full detail (abstract, embedded paper, solution image, how to try it)
 * lives on that item's own page at /engineering/<slug>.
 */
const PICKS: Array<(p: EngineeringProject) => boolean> = [
  (p) => p.slug === "ai-footprint-tracker",
  (p) => p.slug === "cyberbullying-detection-tool",
  (p) => p.paperSlug === "cross-border-data-transfer",
];

export function ResearchSlides() {
  const items = PICKS
    .map((pick) => engineeringProjects.find(pick))
    .filter((p): p is EngineeringProject => !!p);

  if (items.length === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {items.map((p) => {
        // Whichever side of the pair carries paperSlug is "the research";
        // the other (if any) is "the solution" it powers.
        const isResearch = !!p.paperSlug;
        const solution = isResearch && p.relatedSlug
          ? engineeringProjects.find((x) => x.slug === p.relatedSlug)
          : (!isResearch ? p : undefined);
        const research = isResearch ? p : (p.relatedSlug ? engineeringProjects.find((x) => x.slug === p.relatedSlug) : undefined);
        const paper = research?.paperSlug ? PAPERS.find((x) => x.slug === research.paperSlug) : undefined;

        // Explore always lands on the merged detail page: the solution's
        // own slug if one exists, otherwise the research's own slug.
        const exploreSlug = solution?.slug ?? research?.slug ?? p.slug;

        return (
          <article
            key={p.title}
            className="card"
            style={{
              padding: "clamp(2rem, 4vw, 3.5rem)",
              textAlign: "left",
              border: "1px solid var(--c-border-strong)",
            }}
          >
            <span style={{
              fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "var(--c-accent)", marginBottom: "0.85rem", display: "block",
            }}>
              The research
            </span>

            <h3 style={{
              fontFamily: "var(--font-serif)", fontWeight: 400,
              fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)", color: "var(--c-ink)",
              lineHeight: 1.25, marginBottom: "1rem", maxWidth: "34rem",
            }}>
              {paper?.title ?? research?.title ?? p.title}
            </h3>

            {(paper?.partner || research?.fellowship) && (
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem", width: "fit-content",
                fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.03em",
                color: "var(--c-forest)", border: "1px solid var(--c-border-strong)",
                borderRadius: "100px", padding: "0.35rem 0.8rem", marginBottom: "1.5rem",
              }}>
                <Award size={12} strokeWidth={2} />
                {research?.fellowship || paper?.partner}
              </div>
            )}

            {solution && (
              <p style={{ fontSize: "0.72rem", color: "var(--c-ink-muted)", marginBottom: "1.75rem" }}>
                <span style={{ textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginRight: "0.5rem" }}>
                  Solution
                </span>
                {solution.title}
              </p>
            )}

            <Link href={`/engineering/${exploreSlug}`} className="btn-primary">
              Explore <ArrowUpRight size={13} />
            </Link>
          </article>
        );
      })}
    </div>
  );
}
