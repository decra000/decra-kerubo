"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Puzzle, Download, Award, Link2, FileText } from "lucide-react";
import type { EngineeringProject } from "@/lib/engineering-projects";
import { PaperLink } from "@/components/research/PaperLink";

export type { EngineeringProject };

/** Small connector badge shown on either side of a tool ↔ research pairing. */
function PairBadge({ label }: { label: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "0.35rem", width: "fit-content",
      fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.04em",
      color: "var(--c-accent)", background: "rgba(47,93,80,0.08)",
      borderRadius: "100px", padding: "0.3rem 0.7rem",
    }}>
      <Link2 size={11} strokeWidth={2.2} />
      {label}
    </span>
  );
}

const categories = [
  { id: "ai", label: "AI Projects" },
  { id: "apps", label: "Apps" },
  { id: "websites", label: "Websites" },
  { id: "research", label: "Research & Writing" },
];

export function EngineeringGrid({ projects }: { projects: EngineeringProject[] }) {
  const [active, setActive] = useState<string>("all");

  const visible = active === "all" ? projects : projects.filter((p) => p.categories.includes(active));
  const featured = visible.filter((p) => p.featured);

  // A research entry that's itself paired to a tool (paperSlug + relatedSlug
  // both set) is folded into its paired tool's card as the research column
  // instead of getting its own featured card — but only when that tool is
  // actually present in the current filter. Under a filter where the tool
  // isn't visible (e.g. "Research & Writing" alone), keep the research
  // item's own featured card so it doesn't disappear entirely.
  const featuredCards = featured.filter((p) => {
    if (!(p.paperSlug && p.relatedSlug)) return true;
    return !visible.some((x) => x.slug === p.relatedSlug);
  });

  // Anything already shown as a paired-research column inside a featured
  // card (even if it isn't itself featured, e.g. "Harnessing Online Users'
  // Safety Using AI") is dropped from the regular grid too, so it isn't
  // listed twice on the same page.
  const pairedResearchSlugs = new Set(
    featuredCards.map((p) => p.relatedSlug).filter((s): s is string => !!s)
  );
  const rest = visible.filter((p) => !p.featured && !(p.slug && pairedResearchSlugs.has(p.slug)));

  return (
    <div>
      {/* ── Filter pills ── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem" }}>
        <button
          type="button"
          onClick={() => setActive("all")}
          className="eng-filter-btn"
          style={{
            fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "0.4rem 0.9rem", borderRadius: "100px", cursor: "pointer",
            border: `1px solid ${active === "all" ? "var(--c-forest)" : "var(--c-border-strong)"}`,
            color: active === "all" ? "var(--c-forest)" : "var(--c-ink-muted)",
            background: active === "all" ? "rgba(14,61,50,0.06)" : "transparent",
            transition: "all 0.2s ease",
          }}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActive(c.id)}
            className="eng-filter-btn"
            style={{
              fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "0.4rem 0.9rem", borderRadius: "100px", cursor: "pointer",
              border: `1px solid ${active === c.id ? "var(--c-forest)" : "var(--c-border-strong)"}`,
              color: active === c.id ? "var(--c-forest)" : "var(--c-ink-muted)",
              background: active === c.id ? "rgba(14,61,50,0.06)" : "transparent",
              transition: "all 0.2s ease",
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* ── Featured project(s), full width, stacked ── */}
      {featuredCards.map((p) => {
        // Only render the 3-column research pairing when `p` is the tool
        // side (research items don't get a nested research column pointing
        // back at themselves, or at the tool, which would invert the labels).
        const pairedResearch = !p.paperSlug && p.relatedSlug
          ? projects.find((x) => x.slug === p.relatedSlug)
          : undefined;

        return (
          <article
            key={p.title}
            className="card eng-featured"
            style={{
              padding: 0, overflow: "hidden", marginBottom: "1.25rem",
              display: "grid",
              gridTemplateColumns: pairedResearch ? "0.85fr 1fr 1.3fr" : "1.1fr 1fr",
              border: "1px solid var(--c-border-strong)",
            }}
          >
            {pairedResearch && (
              <div className="eng-research-col" style={{
                display: "flex", flexDirection: "column", justifyContent: "center",
                padding: "clamp(1.25rem, 2.5vw, 2rem)",
                background: "var(--c-surface)",
                borderRight: "1px solid var(--c-border)",
              }}>
                <span style={{
                  fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "var(--c-accent)", marginBottom: "0.75rem",
                }}>
                  Paired research
                </span>
                <h4 style={{
                  fontFamily: "var(--font-serif)", fontWeight: 400,
                  fontSize: "clamp(1rem, 1.6vw, 1.2rem)", color: "var(--c-ink)",
                  lineHeight: 1.3, marginBottom: "1rem",
                }}>
                  {pairedResearch.title}
                </h4>
                {pairedResearch.paperSlug ? (
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
                ) : pairedResearch.slug && (
                  <Link
                    href={`/engineering/${pairedResearch.slug}`}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.35rem", width: "fit-content",
                      fontFamily: "var(--font-manjari)", fontWeight: 700,
                      fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase",
                      color: "var(--c-ink-muted)", borderBottom: "1px solid var(--c-border-strong)", paddingBottom: "0.2rem",
                      textDecoration: "none",
                    }}
                  >
                    Read more <ArrowUpRight size={11} />
                  </Link>
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
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.9rem", flexWrap: "wrap" }}>
                <span style={{
                  display: "inline-block", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "var(--c-forest)",
                }}>
                  Featured · {p.subtitle}
                </span>
              </div>

              <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)", color: "var(--c-ink)", marginBottom: "0.75rem", lineHeight: 1.2 }}>
                {p.title}
              </h3>

              <p style={{ fontSize: "0.85rem", color: "var(--c-ink-muted)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                {p.description}
              </p>

              {!pairedResearch && p.relatedSlug && p.pairLabel && (
                <div style={{ marginBottom: "0.9rem" }}>
                  <PairBadge label={p.pairLabel} />
                </div>
              )}

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

      {/* ── Project grid ── */}
      <div className="eng-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
        {rest.map((p) => {
          const cardBody = (
            <>
              <div style={{ aspectRatio: "16 / 10", overflow: "hidden", background: "var(--c-surface)" }}>
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{ padding: "1.4rem" }}>
                <span style={{ display: "inline-block", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-forest)", marginBottom: "0.6rem" }}>
                  {p.subtitle}
                </span>
                <h3 style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.95rem", color: "var(--c-ink)", marginBottom: "0.55rem", lineHeight: 1.4 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: "0.775rem", color: "var(--c-ink-muted)", lineHeight: 1.7, marginBottom: p.relatedSlug && p.pairLabel ? "0.8rem" : 0 }}>
                  {p.description}
                </p>
                {p.relatedSlug && p.pairLabel && <PairBadge label={p.pairLabel} />}
              </div>
            </>
          );

          const cardStyle: React.CSSProperties = { padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", textDecoration: "none", width: "100%" };

          if (p.paperSlug) {
            return (
              <PaperLink key={p.title} slug={p.paperSlug} className="card" style={cardStyle}>
                {cardBody}
              </PaperLink>
            );
          }

          return p.slug ? (
            <Link key={p.title} href={`/engineering/${p.slug}`} className="card" style={cardStyle}>
              {cardBody}
            </Link>
          ) : (
            <article
              key={p.title}
              className="card"
              style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}
            >
              {cardBody}
            </article>
          );
        })}
      </div>

      {visible.length === 0 && (
        <p className="t-body" style={{ padding: "3rem 0", textAlign: "center" }}>No projects in this category yet.</p>
      )}

      <style>{`
        @media(max-width: 900px){ .eng-grid{ grid-template-columns: repeat(2,1fr) !important; } }
        @media(max-width: 620px){ .eng-grid{ grid-template-columns: 1fr !important; } }
        @media(max-width: 760px){ .eng-featured{ grid-template-columns: 1fr !important; } }
        .eng-filter-btn:hover{ border-color: var(--c-forest) !important; color: var(--c-forest) !important; }
      `}</style>
    </div>
  );
}
