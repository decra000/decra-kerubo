"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, FileText, Award, ChevronLeft, ChevronRight, Puzzle, Download } from "lucide-react";
import { engineeringProjects, type EngineeringProject } from "@/lib/engineering-projects";
import { PaperLink } from "./PaperLink";

/**
 * The homepage Research section's slideshow: one slide per research effort,
 * pairing each paper with the product it powers where one exists.
 * Slide deck (in order): AI Footprint Tracker + its decarbonization paper,
 * Cybersecurity Detection Tool + its online-safety paper, and the
 * cross-border data transfer dissertation on its own.
 */
const SLIDE_PICKS: Array<(p: EngineeringProject) => boolean> = [
  (p) => p.slug === "ai-footprint-tracker",
  (p) => p.slug === "cybersecurity-detection-tool",
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
            const pairedResearch = !p.paperSlug && p.relatedSlug
              ? engineeringProjects.find((x) => x.slug === p.relatedSlug)
              : undefined;

            return (
              <article
                key={p.title}
                className="card rsc-slide"
                style={{
                  padding: 0, overflow: "hidden",
                  flex: "0 0 100%", minWidth: 0,
                  display: "grid", textAlign: "left",
                  gridTemplateColumns: pairedResearch ? "0.85fr 1fr 1.3fr" : "1.1fr 1fr",
                  border: "1px solid var(--c-border-strong)",
                }}
              >
                {pairedResearch && (
                  <div className="rsc-slide-research" style={{
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    padding: "clamp(1.25rem, 2.5vw, 2rem)",
                    background: "var(--c-surface)",
                    borderRight: "1px solid var(--c-border)",
                  }}>
                    <span style={{
                      fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em",
                      textTransform: "uppercase", color: "var(--c-accent)", marginBottom: "0.75rem",
                    }}>
                      The research
                    </span>
                    <h4 style={{
                      fontFamily: "var(--font-serif)", fontWeight: 400,
                      fontSize: "clamp(1rem, 1.6vw, 1.2rem)", color: "var(--c-ink)",
                      lineHeight: 1.3, marginBottom: "1rem",
                    }}>
                      {pairedResearch.title}
                    </h4>
                    {pairedResearch.paperSlug && (
                      <PaperLink
                        slug={pairedResearch.paperSlug}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: "0.35rem", width: "fit-content",
                          fontFamily: "var(--font-manjari)", fontWeight: 700,
                          fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase",
                          color: "var(--c-ink-muted)", borderBottom: "1px solid var(--c-border-strong)", paddingBottom: "0.2rem",
                        }}
                      >
                        Read the paper <FileText size={11} />
                      </PaperLink>
                    )}
                  </div>
                )}

                <div style={{ aspectRatio: "16 / 11", overflow: "hidden", background: "var(--c-surface)" }}>
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>

                <div style={{ padding: "clamp(1.5rem, 3vw, 2.5rem)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <span style={{
                    display: "inline-block", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", color: "var(--c-forest)", marginBottom: "0.9rem",
                  }}>
                    {p.subtitle}
                  </span>

                  <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)", color: "var(--c-ink)", marginBottom: "0.75rem", lineHeight: 1.2 }}>
                    {p.title}
                  </h3>

                  <p style={{ fontSize: "0.85rem", color: "var(--c-ink-muted)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                    {p.description}
                  </p>

                  {p.fellowship && (
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: "0.4rem", width: "fit-content",
                      fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.05em",
                      color: "var(--c-forest)", border: "1px solid var(--c-border-strong)",
                      borderRadius: "100px", padding: "0.35rem 0.8rem", marginBottom: "1.5rem",
                    }}>
                      <Award size={12} strokeWidth={2} />
                      {p.fellowship}
                    </div>
                  )}

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                    {p.paperSlug ? (
                      <PaperLink slug={p.paperSlug} className="btn-primary">
                        Read the paper <FileText size={13} />
                      </PaperLink>
                    ) : p.slug && (
                      <Link href={`/engineering/${p.slug}`} className="btn-primary">
                        View project <ArrowUpRight size={13} />
                      </Link>
                    )}
                    {p.chromeUrl ? (
                      <a href={p.chromeUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                        <Puzzle size={13} /> Add to Chrome
                      </a>
                    ) : p.downloadUrl && (
                      <a href={p.downloadUrl} download className="btn-outline">
                        <Download size={13} /> Download Extension
                      </a>
                    )}
                  </div>
                </div>
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

      <style>{`
        @media(max-width: 760px){ .rsc-slide{ grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
