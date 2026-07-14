"use client";

import { useState } from "react";
<<<<<<< HEAD
import { BookOpen } from "lucide-react";
=======
>>>>>>> 314f6cef77d17054e18fd6bb4a724a2a22a82282

export type EngineeringProject = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
<<<<<<< HEAD
  research?: string;
=======
>>>>>>> 314f6cef77d17054e18fd6bb4a724a2a22a82282
};

const categories = [
  { id: "ai", label: "AI Projects" },
  { id: "apps", label: "Apps" },
  { id: "websites", label: "Websites" },
  { id: "research", label: "Research & Writing" },
];

export function EngineeringGrid({ projects }: { projects: EngineeringProject[] }) {
  const [active, setActive] = useState<string>("all");

  const visible = active === "all" ? projects : projects.filter((p) => p.category === active);

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

      {/* ── Project grid ── */}
      <div className="eng-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
        {visible.map((p) => (
          <article key={p.title} className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
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
              <p style={{ fontSize: "0.775rem", color: "var(--c-ink-muted)", lineHeight: 1.7 }}>
                {p.description}
              </p>
<<<<<<< HEAD
              {p.research && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.4rem", marginTop: "0.9rem", paddingTop: "0.9rem", borderTop: "1px solid var(--c-border)" }}>
                  <BookOpen size={12} strokeWidth={1.5} style={{ color: "var(--c-forest)", flexShrink: 0, marginTop: "0.15rem" }} />
                  <p style={{ fontSize: "0.68rem", fontStyle: "italic", color: "var(--c-ink-muted)", lineHeight: 1.6 }}>
                    Grew out of research: {p.research}
                  </p>
                </div>
              )}
=======
>>>>>>> 314f6cef77d17054e18fd6bb4a724a2a22a82282
            </div>
          </article>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="t-body" style={{ padding: "3rem 0", textAlign: "center" }}>No projects in this category yet.</p>
      )}

      <style>{`
        @media(max-width: 900px){ .eng-grid{ grid-template-columns: repeat(2,1fr) !important; } }
        @media(max-width: 620px){ .eng-grid{ grid-template-columns: 1fr !important; } }
        .eng-filter-btn:hover{ border-color: var(--c-forest) !important; color: var(--c-forest) !important; }
      `}</style>
    </div>
  );
}
