"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Check, Award, ArrowUpRight } from "lucide-react";
import type { EngineeringProject } from "@/lib/engineering-projects";

/**
 * Quick-look popup for work that doesn't have its own /engineering/[slug]
 * page, e.g. Entrora LPMS: the badge and a short feature list, no detail
 * page to navigate to since the real product lives on its own site.
 */
export function ProductPopup({ project, onClose }: { project: EngineeringProject; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog" aria-modal="true" aria-label={project.title}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(10,10,10,0.7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: "26rem", maxHeight: "90vh", overflowY: "auto",
          background: "var(--c-bg)", border: "1px solid var(--c-border-strong)", borderRadius: 0,
        }}
      >
        <div style={{ aspectRatio: "2 / 1", overflow: "hidden", background: "var(--c-surface)", borderBottom: "1px solid var(--c-border)" }}>
          <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>

        <div style={{ padding: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1.1rem" }}>
            {project.badge && (
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem", width: "fit-content",
                fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase",
                color: "var(--c-forest)", border: "1px solid var(--c-border-strong)",
                borderRadius: 0, padding: "0.3rem 0.75rem",
              }}>
                <Award size={11} strokeWidth={2} />
                {project.badge}
              </div>
            )}
            <button
              onClick={onClose}
              aria-label="Close"
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--c-ink-muted)", lineHeight: 0, flexShrink: 0 }}
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>

          <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "1.1rem", color: "var(--c-ink)", marginBottom: "0.5rem" }}>
            {project.title}
          </p>
          <p style={{ fontSize: "0.82rem", color: "var(--c-ink-muted)", lineHeight: 1.65, marginBottom: "1.5rem" }}>
            {project.description}
          </p>

          {project.popupFeatures && project.popupFeatures.length > 0 && (
            <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: project.demoUrl ? "1.75rem" : 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {project.popupFeatures.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                  <Check size={14} strokeWidth={2} color="var(--c-forest)" style={{ marginTop: "0.15rem", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.82rem", color: "var(--c-ink)", lineHeight: 1.6 }}>{f}</span>
                </li>
              ))}
            </ul>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                width: "100%", background: "var(--c-forest)", color: "rgba(248,246,241,0.95)",
                fontFamily: "var(--font-manjari)", fontWeight: 700,
                fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "0.85rem 1.5rem", borderRadius: 0, textDecoration: "none",
              }}
            >
              Book a demo <ArrowUpRight size={13} />
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
