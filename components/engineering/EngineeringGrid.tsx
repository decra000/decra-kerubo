import Link from "next/link";
import type { EngineeringProject } from "@/lib/engineering-projects";
import { PaperLink } from "@/components/research/PaperLink";

export type { EngineeringProject };

/**
 * Single-column, image-led list: one big image, one plain title below it,
 * a hairline rule between entries, nothing else. Modeled directly on
 * https://oreoluwaayofisher.framer.website/portfolio.
 */
function Row({ p, last }: { p: EngineeringProject; last: boolean }) {
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

  const rowStyle: React.CSSProperties = {
    display: "block", textDecoration: "none", width: "100%",
    paddingBottom: "3.5rem", marginBottom: "3.5rem",
    borderBottom: last ? "none" : "1px solid var(--c-border)",
  };

  if (p.paperSlug) {
    return <PaperLink slug={p.paperSlug} style={rowStyle}>{body}</PaperLink>;
  }

  return p.slug ? (
    <Link href={`/engineering/${p.slug}`} style={rowStyle}>{body}</Link>
  ) : (
    <div style={rowStyle}>{body}</div>
  );
}

export function EngineeringGrid({ projects }: { projects: EngineeringProject[] }) {
  // A research write-up paired to a tool (paperSlug + relatedSlug both set)
  // is folded into that tool's own detail page instead of getting a row
  // of its own here.
  const visible = projects.filter((p) => !(p.paperSlug && p.relatedSlug));

  return (
    <div style={{ maxWidth: "42rem" }}>
      {visible.map((p, i) => (
        <Row key={p.title} p={p} last={i === visible.length - 1} />
      ))}
    </div>
  );
}
