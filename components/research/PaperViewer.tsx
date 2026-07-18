"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Paper } from "@/lib/papers";

/**
 * Full-screen modal that shows a paper's abstract plus either:
 *  - an inline, view-only iframe of the protected PDF (/api/research/<slug>), or
 *  - a "View Full Record" link out to the paper's external listing.
 *
 * Shared by the homepage Research accordion and the Engineering page's
 * paired research cards — this is the one place that renders a paper.
 */
export function PaperViewer({ paper, onClose }: { paper: Paper; onClose: () => void }) {
  const [status, setStatus] = useState<"checking" | "ready" | "missing">("checking");
  const isExternal = !!paper.externalUrl;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  useEffect(() => {
    if (isExternal) return;
    let cancelled = false;
    setStatus("checking");
    fetch(`/api/research/${paper.slug}`, { method: "HEAD" })
      .then(res => { if (!cancelled) setStatus(res.ok ? "ready" : "missing"); })
      .catch(() => { if (!cancelled) setStatus("missing"); });
    return () => { cancelled = true; };
  }, [paper.slug, isExternal]);

  return (
    <div
      role="dialog" aria-modal="true" aria-label={paper.title}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(10,10,10,0.82)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(1rem,4vw,3.5rem)",
      }}
    >
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: "min(88rem, 96vw)", height: "100%", maxHeight: "96vh",
        background: "#1A1916", borderRadius: "4px", overflow: "hidden",
        display: "flex", flexDirection: "column",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1rem 1.5rem", borderBottom: "1px solid rgba(240,237,232,0.1)", flexShrink: 0,
        }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.95rem", color: "#F0EDE8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {paper.title}
            </p>
            <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(240,237,232,0.45)", marginTop: "0.2rem" }}>
              View only &nbsp;·&nbsp; {paper.dates}
            </p>
          </div>
          <button onClick={onClose} aria-label="Close" style={{
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(240,237,232,0.55)",
            fontFamily: "var(--font-manjari)", fontWeight: 700,
            fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase",
            padding: "0.5rem 0.75rem", flexShrink: 0, transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#F0EDE8"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(240,237,232,0.55)"}>
            Close ✕
          </button>
        </div>

        {/* Abstract, always shown so the reader knows what the paper covers before viewing. Capped and
            scrollable so a long abstract can't crowd out the actual paper below on shorter screens. */}
        <div style={{ padding: "1rem 1.5rem 0", flexShrink: 0, maxHeight: "7rem", overflowY: "auto" }}>
          <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,237,232,0.4)", marginBottom: "0.5rem" }}>
            Abstract
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.8rem", color: "rgba(240,237,232,0.72)", lineHeight: 1.65, maxWidth: "50rem" }}>
            {paper.abstract}
          </p>
        </div>

        <div style={{ flex: 1, background: "#0A0A0A", marginTop: "1rem" }}>
          {isExternal && (
            <div style={{
              width: "100%", height: "100%",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              textAlign: "center", padding: "2rem",
            }}>
              <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.8rem", color: "rgba(240,237,232,0.5)", lineHeight: 1.7, maxWidth: "26rem", marginBottom: "1.75rem" }}>
                This paper is published externally. Continue to view the full record.
              </p>
              <a
                href={paper.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  fontFamily: "var(--font-manjari)", fontWeight: 700,
                  fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "#F0EDE8", textDecoration: "none",
                  border: "1px solid rgba(240,237,232,0.25)", borderRadius: "999px",
                  padding: "0.85rem 1.75rem", transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#5FA98F"; (e.currentTarget as HTMLElement).style.color = "#5FA98F"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(240,237,232,0.25)"; (e.currentTarget as HTMLElement).style.color = "#F0EDE8"; }}
              >
                View Full Record <ArrowRight size={12} strokeWidth={1.5} />
              </a>
            </div>
          )}
          {!isExternal && status === "ready" && (
            <iframe src={`/api/research/${paper.slug}#toolbar=0&navpanes=0`} title={paper.title}
              style={{ width: "100%", height: "100%", border: "none" }} />
          )}
          {!isExternal && status === "missing" && (
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
      </div>
    </div>
  );
}
