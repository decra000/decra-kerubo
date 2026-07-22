"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Info, Loader2 } from "lucide-react";
import type { Paper } from "@/lib/papers";

/**
 * Renders the protected PDF as page images on <canvas> via pdf.js instead
 * of handing the file to the browser's native PDF viewer. That removes the
 * native download/print/save controls entirely and leaves no text layer,
 * so page content can't be selected or copied. (Determined users can still
 * screenshot — nothing rendered on a screen can prevent that — but every
 * casual extraction path is closed.)
 */
export function ProtectedPdfPages({ slug, title }: { slug: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

        const res = await fetch(`/api/research/${slug}`);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.arrayBuffer();
        if (cancelled) return;

        const doc = await pdfjs.getDocument({ data }).promise;
        if (cancelled) return;
        setProgress({ done: 0, total: doc.numPages });
        setState("ready");

        // Render at the reader's width, sharp on high-DPI screens (capped
        // at 2x so long documents don't chew through memory).
        const pageWidth = Math.min(container.clientWidth - 2, 900);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        for (let i = 1; i <= doc.numPages; i++) {
          if (cancelled) return;
          const page = await doc.getPage(i);
          const base = page.getViewport({ scale: 1 });
          const scale = pageWidth / base.width;
          const viewport = page.getViewport({ scale: scale * dpr });

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = `${pageWidth}px`;
          canvas.style.height = `${(viewport.height / dpr)}px`;
          canvas.style.display = "block";
          canvas.style.margin = "0 auto 12px";
          canvas.style.background = "#fff";
          canvas.style.boxShadow = "0 2px 14px rgba(0,0,0,0.45)";
          canvas.setAttribute("aria-label", `${title}, page ${i}`);

          const ctx = canvas.getContext("2d");
          if (!ctx) continue;
          await page.render({ canvas, canvasContext: ctx, viewport }).promise;
          if (cancelled) return;
          container.appendChild(canvas);
          setProgress({ done: i, total: doc.numPages });
        }
      } catch (err) {
        console.error("Protected PDF render failed:", err);
        if (!cancelled) setState("error");
      }
    })();

    return () => {
      cancelled = true;
      if (container) container.replaceChildren();
    };
  }, [slug, title]);

  return (
    <div style={{ width: "100%", height: "100%", overflowY: "auto", userSelect: "none", padding: "16px 8px" }}>
      {state === "loading" && (
        <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: "rgba(240,237,232,0.6)", fontFamily: "var(--font-sans)", fontSize: "0.85rem", paddingTop: "3rem" }}>
          <Loader2 size={15} style={{ animation: "pv-spin 1s linear infinite" }} /> Preparing the paper…
        </p>
      )}
      {state === "error" && (
        <p style={{ textAlign: "center", color: "rgba(240,237,232,0.6)", fontFamily: "var(--font-sans)", fontSize: "0.85rem", paddingTop: "3rem" }}>
          Couldn&apos;t open this paper just now — please try again in a moment.
        </p>
      )}
      {state === "ready" && progress.done < progress.total && (
        <p style={{ textAlign: "center", color: "rgba(240,237,232,0.45)", fontFamily: "var(--font-sans)", fontSize: "0.72rem", marginBottom: "0.75rem" }}>
          Loading pages… {progress.done}/{progress.total}
        </p>
      )}
      <div ref={containerRef} />
      <style>{`@keyframes pv-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/**
 * Full-screen, view-only reader for a protected paper. The whole viewport
 * belongs to the pages — just a slim header bar with the title, an optional
 * collapsible abstract, and Close. Papers with an externalUrl never reach
 * this component; their links open directly in a new tab (see PaperLink).
 */
export function PaperViewer({ paper, onClose }: { paper: Paper; onClose: () => void }) {
  const [showAbstract, setShowAbstract] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  // Portaled to <body>: a transformed ancestor (e.g. a slides carousel
  // track) would otherwise become the containing block for this
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

      {/* The paper itself — protected canvas pages, fills everything left */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <ProtectedPdfPages slug={paper.slug} title={paper.title} />
      </div>
    </div>,
    document.body
  );
}
