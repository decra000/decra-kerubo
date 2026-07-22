"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { engineeringProjects, type EngineeringProject } from "@/lib/engineering-projects";
import { PAPERS } from "@/lib/papers";

/**
 * The homepage Research section's slideshow: one slide per research effort,
 * pairing each paper with the product it powers where one exists. Each
 * slide is deliberately minimal — research title, organization, the paired
 * solution's title if any, and a single "Explore" action — the full detail
 * (abstract, embedded paper, solution image, how to try it) lives on that
 * item's own page at /engineering/<slug>, not crammed into the slide.
 */
const SLIDE_PICKS: Array<(p: EngineeringProject) => boolean> = [
  (p) => p.slug === "ai-footprint-tracker",
  (p) => p.slug === "cyberbullying-detection-tool",
  (p) => p.paperSlug === "cross-border-data-transfer",
];

export function ResearchSlides() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const slides = SLIDE_PICKS
    .map((pick) => engineeringProjects.find(pick))
    .filter((p): p is EngineeringProject => !!p);
  const slideCount = slides.length;

  // Auto-advance every 7s; pauses while hovered, and sits out entirely for
  // people who've asked their OS for reduced motion.
  useEffect(() => {
    if (slideCount <= 1 || paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % slideCount), 7000);
    return () => clearInterval(t);
  }, [slideCount, paused]);

  if (slideCount === 0) return null;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStartX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) < 40 || slideCount <= 1) return;
        setSlide((s) => (dx < 0 ? (s + 1) % slideCount : (s - 1 + slideCount) % slideCount));
      }}
    >
      <div style={{ overflow: "hidden" }}>
        <div style={{
          display: "flex",
          transform: `translateX(-${Math.min(slide, slideCount - 1) * 100}%)`,
          transition: "transform 0.65s cubic-bezier(0.16,1,0.3,1)",
        }}>
          {slides.map((p) => {
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
                className="card rsc-slide"
                style={{
                  padding: "clamp(2rem, 4vw, 3.5rem)",
                  flex: "0 0 100%", minWidth: 0,
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
      </div>

      {/* Slide controls: arrows + dots */}
      {slideCount > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1.25rem" }}>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => setSlide((s) => (s - 1 + slideCount) % slideCount)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "1.9rem", height: "1.9rem", borderRadius: "50%",
              background: "none", border: "1px solid var(--c-border-strong)",
              color: "var(--c-ink-muted)", cursor: "pointer", transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border-strong)"; }}
          >
            <ChevronLeft size={14} />
          </button>

          <div style={{ display: "flex", gap: "0.45rem" }}>
            {slides.map((p, i) => (
              <button
                key={p.title}
                type="button"
                aria-label={`Go to slide ${i + 1}: ${p.title}`}
                onClick={() => setSlide(i)}
                style={{
                  width: i === slide ? "1.4rem" : "0.45rem", height: "0.45rem",
                  borderRadius: "999px", border: "none", cursor: "pointer", padding: 0,
                  background: i === slide ? "var(--c-accent)" : "var(--c-border-strong)",
                  transition: "width 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s",
                }}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next slide"
            onClick={() => setSlide((s) => (s + 1) % slideCount)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "1.9rem", height: "1.9rem", borderRadius: "50%",
              background: "none", border: "1px solid var(--c-border-strong)",
              color: "var(--c-ink-muted)", cursor: "pointer", transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border-strong)"; }}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
