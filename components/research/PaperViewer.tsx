"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Info } from "lucide-react";
import type { Paper } from "@/lib/papers";

/**
 * Full-screen, view-only reader for a protected PDF (/api/research/<slug>).
 * The whole viewport belongs to the paper — just a slim header bar with the
 * title, an optional collapsible abstract, and Close. Papers with an
 * externalUrl never reach this component; their links open directly in a
 * new tab (see PaperLink / the homepage Research section).
 */
export function PaperViewer({ paper, onClose }: { paper: Paper; onClose: () => void }) {
  const [status, setStatus] = useState<"checking" | "ready" | "missing">("checking");
  const [showAbstract, setShowAbstract] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  useEffect(() => {
    let cancelled = false;
    setStatus("checking");
    fetch(`/api/research/${paper.slug}`, { method: "HEAD" })
      .then(res => { if (!cancelled) setStatus(res.ok ? "ready" : "missing"); })
      .catch(() => { if (!cancelled) setStatus("missing"); });
    return () => { cancelled = true; };
  }, [paper.slug]);

  // Portaled to <body>: a transformed ancestor (e.g. the featured-slides
  // carousel track) would otherwise become the containing block for this
  // fixed-position overlay and drag it off-screen with the slides.
  return createPortal(
    <div
      role="dialog" aria-modal="true" aria-label={paper.title}
      onContextMenu={e => e.preventDefault()}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "#0A0A0A",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* Slim header — everything else is reading space */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
        padding: "0.65rem 1.25rem", borderBottom: "1px solid rgba(240,237,232,0.12)", flexShrink: 0,
        background: "#1A1916",
      }}>
        <div style={{ minWidth: 0, display: "flex", alignItems: "baseline", gap: "0.85rem" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.95rem", color: "#F0EDE8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {paper.title}
          </p>
          <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.52rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(240,237,232,0.45)", whiteSpace: "nowrap", flexShrink: 0 }}>
            View only · {paper.dates}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
          <button
            onClick={() => setShowAbstract(a => !a)}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              background: "none", border: "1px solid rgba(240,237,232,0.2)", borderRadius: "999px",
              cursor: "pointer", color: showAbstract ? "#5FA98F" : "rgba(240,237,232,0.55)",
              fontFamily: "var(--font-manjari)", fontWeight: 700,
              fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "0.4rem 0.8rem", transition: "color 0.2s",
            }}
          >
            <Info size={11} /> Abstract
          </button>
          <button onClick={onClose} aria-label="Close" style={{
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(240,237,232,0.55)",
            fontFamily: "var(--font-manjari)", fontWeight: 700,
            fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase",
            padding: "0.4rem 0.6rem", transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#F0EDE8"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(240,237,232,0.55)"}>
            Close ✕
          </button>
        </div>
      </div>

      {/* Collapsible abstract strip — hidden by default so the paper gets the space */}
      {showAbstract && (
        <div style={{ padding: "0.9rem 1.25rem", background: "#1A1916", borderBottom: "1px solid rgba(240,237,232,0.12)", flexShrink: 0, maxHeight: "9rem", overflowY: "auto" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.8rem", color: "rgba(240,237,232,0.72)", lineHeight: 1.65, maxWidth: "56rem" }}>
            {paper.abstract}
          </p>
        </div>
      )}

      {/* The paper itself — fills everything that's left */}
      <div style={{ flex: 1, minHeight: 0 }}>
        {status === "ready" && (
          <iframe src={`/api/research/${paper.slug}#toolbar=0&navpanes=0`} title={paper.title}
            style={{ width: "100%", height: "100%", border: "none", display: "block" }} />
        )}
        {status === "missing" && (
          <div style={{
            width: "100%", height: "100%",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            textAlign: "center", padding: "2rem",
          }}>
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.15rem", color: "#F0EDE8", marginBottom: "0.75rem" }}>
              Check back soon.
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.8rem", color: "rgba(240,237,232,0.5)", lineHeight: 1.7, maxWidth: "26rem" }}>
              This paper is being prepared for publication and isn&apos;t available to view just yet.
            </p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
