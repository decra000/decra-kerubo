"use client";

import Link from "next/link";
import { ArrowUpRight, Award } from "lucide-react";
import { engineeringProjects, type EngineeringProject } from "@/lib/engineering-projects";
import { PAPERS } from "@/lib/papers";

/**
 * The homepage Research section: one card per research effort, pairing each
 * paper with the product it powers where one exists. Laid out as a row of
 * columns rather than a carousel — each card is deliberately minimal (the
 * solution's image, research title, organization, the paired solution's
 * title if any, and a single "Explore" action); the full detail (abstract,
 * embedded paper, solution image, how to try it) lives on that item's own
 * page at /engineering/<slug>.
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
    <div className="research-grid" style={{ display: "grid", gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: "1.25rem" }}>
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

        // Fellowship strings are already concise ("X × Y Fellowship"); a
        // paper's `partner` field reads "In association with X", strip
        // that prefix so every card's badge matches the same short style.
        const orgLabel = research?.fellowship || paper?.partner?.replace(/^In association with (the )?/i, "");

        // Prefer the solution's image; standalone research falls back to its
        // own image so every card is illustrated.
        const cardImage = solution?.image ?? research?.image ?? p.image;

        return (
          <article
            key={p.title}
            className="card"
            style={{
              padding: 0,
              overflow: "hidden",
              textAlign: "left",
              border: "1px solid var(--c-border-strong)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {cardImage && (
              <div style={{ aspectRatio: "16 / 10", overflow: "hidden", background: "var(--c-surface)" }}>
                <img
                  src={cardImage}
                  alt={solution?.title ?? research?.title ?? p.title}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            )}

            <div style={{ padding: "clamp(1.5rem, 2.5vw, 2.25rem)", display: "flex", flexDirection: "column", flex: 1 }}>
              <span style={{
                fontSize: "0.54rem", fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "var(--c-accent)", marginBottom: "0.75rem", display: "block",
              }}>
                The research
              </span>

              <h3 style={{
                fontFamily: "var(--font-serif)", fontWeight: 400,
                fontSize: "clamp(1.05rem, 1.5vw, 1.3rem)", color: "var(--c-ink)",
                lineHeight: 1.3, marginBottom: "0.85rem", maxWidth: "34rem",
              }}>
                {paper?.title ?? research?.title ?? p.title}
              </h3>

              {orgLabel && (
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "0.35rem", width: "fit-content",
                  fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.02em",
                  color: "var(--c-forest)", border: "1px solid var(--c-border-strong)",
                  borderRadius: "100px", padding: "0.3rem 0.7rem", marginBottom: "1.25rem",
                }}>
                  <Award size={11} strokeWidth={2} />
                  {orgLabel}
                </div>
              )}

              {solution && (
                <p style={{ fontSize: "0.66rem", color: "var(--c-ink-muted)", marginBottom: "1.5rem" }}>
                  <span style={{ textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700, marginRight: "0.4rem" }}>
                    Solution
                  </span>
                  {solution.title}
                </p>
              )}

              <Link href={`/engineering/${exploreSlug}`} className="btn-primary" style={{ marginTop: "auto", alignSelf: "flex-start" }}>
                Explore <ArrowUpRight size={13} />
              </Link>
            </div>
          </article>
        );
      })}
      <style>{`
        @media (max-width: 860px) { .research-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
