import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EngineeringGrid } from "@/components/engineering/EngineeringGrid";
import { engineeringProjects } from "@/lib/engineering-projects";

export const metadata: Metadata = {
  title: "Engineering",
  description:
    "Selected engineering builds from Decra Kerubo, AI tools, apps, websites, and applied research I have directly and collaboratively built with different languages and frameworks cross-industry.",
  alternates: { canonical: "https://decrakerubo.com/engineering" },
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
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
            <h1 className="t-display t-display-xl" style={{ marginBottom: 0 }}>Selected builds.</h1>
            <Link
              href="/?engage=tech-development#collaborate"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "var(--c-forest)", color: "rgba(248,246,241,0.95)",
                fontFamily: "var(--font-manjari)", fontWeight: 700,
                fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "0.75rem 1.4rem", borderRadius: "100px",
                textDecoration: "none", whiteSpace: "nowrap",
              }}
            >
              Request a build <ArrowUpRight size={13} />
            </Link>
          </div>
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
