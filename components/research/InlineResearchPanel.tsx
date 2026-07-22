"use client";

import { ArrowUpRight } from "lucide-react";
import type { Paper } from "@/lib/papers";
import { ProtectedPdfPages } from "./PaperViewer";

/**
 * The Research section of a merged research+product detail page. Unlike
 * PaperViewer (a full-screen modal), this sits inline in the page's normal
 * scroll flow: the PDF renders inside a bounded, roughly-A4-proportioned
 * frame that scrolls internally, while the page itself keeps scrolling
 * normally the moment the pointer leaves that frame.
 */
export function InlineResearchPanel({ paper }: { paper: Paper }) {
  return (
    <div>
      <p style={{ fontSize: "0.9rem", color: "var(--c-ink-mid)", lineHeight: 1.8, marginBottom: "2rem", maxWidth: "42rem" }}>
        {paper.abstract}
      </p>

      {paper.externalUrl ? (
        <a
          href={paper.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Read the full paper <ArrowUpRight size={13} />
        </a>
      ) : (
        <div
          style={{
            width: "100%",
            maxWidth: "38rem",
            height: "min(88vh, 1150px)",
            overflowY: "auto",
            background: "#0A0A0A",
            border: "1px solid var(--c-border-strong)",
            borderRadius: "6px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <ProtectedPdfPages slug={paper.slug} title={paper.title} />
        </div>
      )}
    </div>
  );
}
