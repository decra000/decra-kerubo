"use client";

import { useState } from "react";
import Link from "next/link";
import { Award } from "lucide-react";
import type { EngineeringProject } from "@/lib/engineering-projects";
import { PaperLink } from "@/components/research/PaperLink";
import { ProductPopup } from "./ProductPopup";

export type { EngineeringProject };

/** Small status pill shown on the card itself, e.g. "Demo", "Licenced Product". */
function Badge({ label }: { label: string }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "0.35rem", width: "fit-content",
      fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase",
      color: "var(--c-forest)", border: "1px solid var(--c-border-strong)",
      borderRadius: 0, padding: "0.28rem 0.65rem", marginTop: "0.65rem",
      background: "var(--c-bg)",
    }}>
      <Award size={10} strokeWidth={2} />
      {label}
    </div>
  );
}

/**
 * Image-led card: one big image, a status badge, and a plain title below it.
 */
function Card({ p, onOpenPopup }: { p: EngineeringProject; onOpenPopup: (p: EngineeringProject) => void }) {
  const body = (
    <>
      <div style={{ aspectRatio: "2 / 1", overflow: "hidden", background: "var(--c-surface)", border: "1px solid var(--c-border-strong)", borderRadius: 0 }}>
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
      {p.badge && <Badge label={p.badge} />}
      <p style={{
        fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.85rem",
        color: "var(--c-ink)", marginTop: "0.65rem", marginBottom: 0, lineHeight: 1.4,
      }}>
        {p.title}
      </p>
    </>
  );

  const cardStyle: React.CSSProperties = { display: "block", textDecoration: "none", width: "100%" };

  if (p.popupFeatures) {
    return (
      <button type="button" onClick={() => onOpenPopup(p)} style={{ ...cardStyle, background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", font: "inherit", color: "inherit" }}>
        {body}
      </button>
    );
  }

  if (p.paperSlug) {
    return <PaperLink slug={p.paperSlug} style={cardStyle}>{body}</PaperLink>;
  }

  return p.slug ? (
    <Link href={`/engineering/${p.slug}`} style={cardStyle}>{body}</Link>
  ) : (
    <div style={cardStyle}>{body}</div>
  );
}

export function EngineeringGrid({ projects }: { projects: EngineeringProject[] }) {
  // Research write-ups live in the paper slider above instead of this list,
  // whether or not they're paired to a tool.
  const visible = projects.filter((p) => !p.paperSlug);
  const [popupProject, setPopupProject] = useState<EngineeringProject | null>(null);

  return (
    <div className="eng-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", columnGap: "1.75rem", rowGap: "2.5rem" }}>
      {visible.map((p) => <Card key={p.title} p={p} onOpenPopup={setPopupProject} />)}
      <style>{`
        @media(max-width: 900px){ .eng-grid{ grid-template-columns: repeat(2, 1fr) !important; } }
        @media(max-width: 560px){ .eng-grid{ grid-template-columns: 1fr !important; } }
      `}</style>
      {popupProject && <ProductPopup project={popupProject} onClose={() => setPopupProject(null)} />}
    </div>
  );
}
