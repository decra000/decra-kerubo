import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EngineeringGrid } from "@/components/engineering/EngineeringGrid";
import { engineeringProjects } from "@/lib/engineering-projects";

export const metadata: Metadata = {
  title: "Research & Engineering",
  description:
    "Research and engineering from Decra Kerubo, technology lawyer and product counsel in Nairobi, Kenya: applied research on AI, data protection, and where technology outpaces the law, and the tools built from what it found.",
  alternates: { canonical: "/engineering" },
};

export default function EngineeringPage() {
  return (
    <div style={{ background: "var(--c-bg)", paddingTop: "6rem" }}>
      {/* ── Grid ── */}
      <section className="section page-x">
        <div className="inner">
          <EngineeringGrid projects={engineeringProjects} />
        </div>
      </section>

      {/* ── Closing CTA ──
          The one ask on the page, and it comes last, after the builds have
          made the case rather than opening with it. */}
      <section className="section page-x" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div className="inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
          <div>
            <p className="t-label" style={{ marginBottom: "0.75rem" }}>Build something</p>
            <h2 className="t-display t-display-md" style={{ marginBottom: 0 }}>Have a product that needs this.</h2>
          </div>
          <Link
            href="/?engage=tech-development#collaborate"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "var(--c-forest)", color: "rgba(248,246,241,0.95)",
              fontFamily: "var(--font-manjari)", fontWeight: 700,
              fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "0.9rem 1.6rem", borderRadius: "100px",
              textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0,
            }}
          >
            Request a build <ArrowUpRight size={13} />
          </Link>
        </div>
      </section>
    </div>
  );
}
