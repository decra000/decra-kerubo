import Link from "next/link";
import type { EngineeringProject } from "@/lib/engineering-projects";
import { PaperLink } from "@/components/research/PaperLink";

export type { EngineeringProject };

/**
 * Image-led card: one big image, one plain title below it, nothing else.
 */
function Card({ p }: { p: EngineeringProject }) {
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
  // Research write-ups live in the paper slider above instead of this list,
  // whether or not they're paired to a tool.
  const visible = projects.filter((p) => !p.paperSlug);

  return (
    <div style={{ maxWidth: "42rem", display: "flex", flexDirection: "column", gap: "3.5rem" }}>
      {visible.map((p) => <Card key={p.title} p={p} />)}
    </div>
  );
}
