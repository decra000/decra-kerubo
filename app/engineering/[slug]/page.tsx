import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Puzzle, Award, FileText } from "lucide-react";
import { engineeringProjects } from "@/lib/engineering-projects";
import { PaperLink } from "@/components/research/PaperLink";

export async function generateStaticParams() {
  return engineeringProjects
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = engineeringProjects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `https://decrakerubo.com/engineering/${slug}` },
  };
}

export default async function EngineeringProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = engineeringProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  const related = project.relatedSlug
    ? engineeringProjects.find((p) => p.slug === project.relatedSlug)
    : undefined;

  return (
    <div style={{ background: "var(--c-bg)", paddingTop: "6rem" }}>
      <section className="section page-x">
        <div className="inner" style={{ maxWidth: "52rem" }}>
          <Link
            href="/engineering"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--c-ink-muted)", textDecoration: "none", marginBottom: "2rem",
            }}
          >
            <ArrowLeft size={13} /> Engineering
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">{project.subtitle}</span>
          </div>

          <h1 className="t-display t-display-lg" style={{ marginBottom: "1.5rem" }}>
            {project.title}
          </h1>

          {project.fellowship && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem", width: "fit-content",
              fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.05em",
              color: "var(--c-forest)", border: "1px solid var(--c-border-strong)",
              borderRadius: "100px", padding: "0.4rem 0.9rem", marginBottom: "2rem",
            }}>
              <Award size={12} strokeWidth={2} />
              {project.fellowship}
            </div>
          )}

          <div style={{ aspectRatio: "16 / 9", overflow: "hidden", borderRadius: "10px", border: "1px solid var(--c-border)", marginBottom: "2.5rem", background: "var(--c-surface)" }}>
            <img
              src={project.image}
              alt={project.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          <p className="t-body" style={{ fontSize: "0.95rem", marginBottom: "2rem" }}>
            {project.detail || project.description}
          </p>

          {project.techStack && project.techStack.length > 0 && (
            <div style={{ marginBottom: "2.5rem" }}>
              <span className="t-label" style={{ display: "block", marginBottom: "0.75rem" }}>Built with</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {project.techStack.map((t) => (
                  <span key={t} style={{
                    fontSize: "0.7rem", color: "var(--c-ink-mid)",
                    border: "1px solid var(--c-border)", borderRadius: "100px", padding: "0.3rem 0.8rem",
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", borderTop: "1px solid var(--c-border)", paddingTop: "2rem" }}>
            {project.paperSlug ? (
              <PaperLink slug={project.paperSlug} className="btn-primary">
                <FileText size={13} /> Read the paper
              </PaperLink>
            ) : project.chromeUrl ? (
              <a href={project.chromeUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <Puzzle size={13} /> Add to Chrome
              </a>
            ) : (
              <span className="t-body-sm" style={{ display: "inline-flex", alignItems: "center" }}>
                Chrome Web Store listing coming soon.
              </span>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                View source <ArrowUpRight size={13} />
              </a>
            )}
          </div>

          {related && (
            <div style={{ marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid var(--c-border)" }}>
              <span className="t-label" style={{ display: "block", marginBottom: "0.75rem" }}>Related work</span>
              {related.paperSlug ? (
                <PaperLink slug={related.paperSlug} style={{ display: "block" }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem", color: "var(--c-ink)" }}>
                    {related.title}
                  </span>
                  <span className="t-body-sm" style={{ display: "block", marginTop: "0.35rem" }}>
                    {related.description}
                  </span>
                </PaperLink>
              ) : (
                <Link
                  href={`/engineering/${related.slug}`}
                  style={{ display: "block", textDecoration: "none" }}
                >
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem", color: "var(--c-ink)" }}>
                    {related.title}
                  </span>
                  <span className="t-body-sm" style={{ display: "block", marginTop: "0.35rem" }}>
                    {related.description}
                  </span>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
