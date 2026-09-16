"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Award, FileText } from "lucide-react";
import { PAPERS } from "@/lib/papers";
import { engineeringProjects } from "@/lib/engineering-projects";
import { PaperLink } from "./PaperLink";

/** Slug of the shipped product each paper is paired to, when one exists. */
function productSlugFor(paperSlug: string): string | undefined {
  const researchEntry = engineeringProjects.find((p) => p.paperSlug === paperSlug);
  return researchEntry?.relatedSlug;
}

/** Each paper's one-line gloss, written plainly rather than clipped from its abstract. */
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

export function PaperSlider() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".paper-slide");
    const step = card ? card.getBoundingClientRect().width + 24 : 340;
    track.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={trackRef}
        className="paper-track"
        style={{
          display: "flex", gap: "1.5rem", overflowX: "auto",
          scrollSnapType: "x mandatory", paddingBottom: "0.5rem",
        }}
      >
        {PAPERS.map((paper) => {
          const productSlug = productSlugFor(paper.slug);
          return (
          <article
            key={paper.slug}
            className="paper-slide"
            style={{
              flex: "0 0 clamp(260px, 80vw, 340px)", scrollSnapAlign: "start",
              border: "1px solid var(--c-border-strong)", borderRadius: 0,
              padding: "1.75rem", display: "flex", flexDirection: "column",
              background: "var(--c-bg)",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem", marginBottom: "1.1rem" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem", width: "fit-content",
                fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.03em",
                color: "var(--c-forest)", border: "1px solid var(--c-border-strong)",
                borderRadius: "100px", padding: "0.3rem 0.75rem",
              }}>
                <Award size={10} strokeWidth={2} />
                {paper.partner.replace(/^In association with (the )?/i, "")}
              </div>
            </div>

            <h3 style={{
              fontFamily: "var(--font-serif)", fontWeight: 400,
              fontSize: "1.1rem", lineHeight: 1.3,
              color: "var(--c-ink)", marginBottom: "0.75rem",
            }}>
              {paper.title}
            </h3>

            <p className="t-body-sm" style={{ marginBottom: "1.25rem" }}>{paper.dates}</p>

            <p style={{ fontSize: "0.8rem", color: "var(--c-ink-muted)", lineHeight: 1.7, marginBottom: "1.5rem", flex: 1 }}>
              {GLOSS[paper.slug]}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.25rem" }}>
              <PaperLink
                slug={paper.slug}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem", width: "fit-content",
                  fontFamily: "var(--font-manjari)", fontWeight: 700,
                  fontSize: "0.62rem", letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "var(--c-ink-muted)", borderBottom: "1px solid var(--c-border-strong)", paddingBottom: "0.2rem",
                }}
              >
                Read the paper <FileText size={12} />
              </PaperLink>
              {productSlug && (
                <Link
                  href={`/engineering/${productSlug}`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.4rem", width: "fit-content",
                    fontFamily: "var(--font-manjari)", fontWeight: 700,
                    fontSize: "0.62rem", letterSpacing: "0.08em", textTransform: "uppercase",
                    color: "var(--c-forest)", borderBottom: "1px solid var(--c-border-strong)", paddingBottom: "0.2rem",
                    textDecoration: "none",
                  }}
                >
                  Explore product <ArrowUpRight size={12} />
                </Link>
              )}
            </div>
          </article>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.25rem" }}>
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous paper"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "2.25rem", height: "2.25rem", border: "1px solid var(--c-border-strong)", borderRadius: 0,
            background: "none", color: "var(--c-ink)", cursor: "pointer",
          }}
        >
          <ArrowLeft size={14} />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Next paper"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "2.25rem", height: "2.25rem", border: "1px solid var(--c-border-strong)", borderRadius: 0,
            background: "none", color: "var(--c-ink)", cursor: "pointer",
          }}
        >
          <ArrowRight size={14} />
        </button>
      </div>

      <style>{`.paper-track::-webkit-scrollbar { display: none; } .paper-track { scrollbar-width: none; }`}</style>
    </div>
  );
}
