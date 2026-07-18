"use client";

import { useState } from "react";
import { PAPERS } from "@/lib/papers";
import { PaperViewer } from "./PaperViewer";

/**
 * Self-contained trigger for reading a paper, with as little navigation as
 * possible:
 *  - externally published papers (Librarika, Millennium Fellows, …) open
 *    their external record directly in a new tab — no intermediate modal;
 *  - protected PDFs open the full-screen view-only reader in place.
 * Renders a plain <button>/<a> so it composes as a pill button or a whole
 * card via className/style.
 */
export function PaperLink({
  slug,
  children,
  className,
  style,
}: {
  slug: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  const paper = PAPERS.find((p) => p.slug === slug);
  if (!paper) return null;

  const baseStyle: React.CSSProperties = {
    background: "none", border: "none", padding: 0, margin: 0,
    font: "inherit", textAlign: "inherit", color: "inherit", cursor: "pointer",
    ...style,
  };

  if (paper.externalUrl) {
    return (
      <a
        href={paper.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={{ ...baseStyle, textDecoration: "none" }}
      >
        {children}
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
        style={baseStyle}
      >
        {children}
      </button>
      {open && <PaperViewer paper={paper} onClose={() => setOpen(false)} />}
    </>
  );
}
