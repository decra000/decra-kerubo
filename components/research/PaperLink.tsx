"use client";

import { useState } from "react";
import { PAPERS } from "@/lib/papers";
import { PaperViewer } from "./PaperViewer";

/**
 * Self-contained trigger for opening a paper in the shared PaperViewer
 * modal. Drop it anywhere — a pill button, or wrapping a whole card — by
 * passing className/style; it renders a plain <button> so it composes with
 * either look. Safe to use inside a server component (it's the client
 * island, not the page it lives on).
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

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
        style={{
          background: "none", border: "none", padding: 0, margin: 0,
          font: "inherit", textAlign: "inherit", color: "inherit", cursor: "pointer",
          ...style,
        }}
      >
        {children}
      </button>
      {open && <PaperViewer paper={paper} onClose={() => setOpen(false)} />}
    </>
  );
}
