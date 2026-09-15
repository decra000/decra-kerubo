import Link from "next/link";
import type { EngineeringProject } from "@/lib/engineering-projects";
import { PaperLink } from "@/components/research/PaperLink";

export type { EngineeringProject };

/**
 * Image-led card: one big image, one plain title below it, nothing else.
 * Laid out two per row.
 */
function Card({ p }: { p: EngineeringProject }) {
  const body = (
    <>
      <div style={{ aspectRatio: "2 / 1", overflow: "hidden", background: "var(--c-surface)" }}>
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
      <p style={{
        fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "1rem",
        color: "var(--c-ink)", marginTop: "1.5rem", marginBottom: 0,
      }}>
        {p.title}
      </p>
    </>
  );

  const cardStyle: React.CSSProperties = { display: "block", textDecoration: "none", width: "100%" };

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
  // A research write-up paired to a tool (paperSlug + relatedSlug both set)
  // is folded into that tool's own detail page instead of getting a card
  // of its own here.
  const visible = projects.filter((p) => !(p.paperSlug && p.relatedSlug));

  return (
    <div className="eng-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", columnGap: "2.5rem", rowGap: "3.5rem" }}>
      {visible.map((p) => <Card key={p.title} p={p} />)}
      <style>{`
        @media(max-width: 700px){ .eng-grid{ grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
