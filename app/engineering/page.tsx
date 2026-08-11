import type { Metadata } from "next";
import { EngineeringGrid } from "@/components/engineering/EngineeringGrid";
import { engineeringProjects } from "@/lib/engineering-projects";

export const metadata: Metadata = {
  title: "Engineering",
  description:
    "Selected engineering builds from Decra Kerubo, AI tools, apps, websites, and applied research I have directly and collaboratively built with different languages and frameworks cross-industry.",
  alternates: { canonical: "/engineering" },
};

export default function EngineeringPage() {
  return (
    <div style={{ background: "var(--c-bg)", paddingTop: "6rem" }}>

      {/* ── Header ── */}
      <section className="section page-x" style={{ borderBottom: "1px solid var(--c-border)" }}>
        <div className="inner">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">Engineering</span>
          </div>
          <h1 className="t-display t-display-xl" style={{ marginBottom: "1.25rem" }}>Selected builds.</h1>
          <p className="t-body" style={{ maxWidth: "34rem" }}>
            AI tools, apps, websites, and applied research I have directly and collaboratively built with different languages and frameworks cross-industry.
          </p>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="section page-x">
        <div className="inner">
          <EngineeringGrid projects={engineeringProjects} />
        </div>
      </section>
    </div>
  );
}
