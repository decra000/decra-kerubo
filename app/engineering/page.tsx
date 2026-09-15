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
      {/* ── Statement ──
          Why this page exists, in Decra's own words, before any of the
          work itself. */}
      <section className="section page-x" style={{ borderBottom: "1px solid var(--c-border)" }}>
        <div className="inner eng-statement-row" style={{ display: "flex", alignItems: "flex-start", gap: "clamp(2rem, 5vw, 4rem)", flexWrap: "wrap" }}>
          <img
            src="/decra-about-portrait.jpg"
            alt="Decra Kerubo"
            style={{
              flex: "0 0 clamp(200px, 24vw, 300px)", width: "clamp(200px, 24vw, 300px)", height: "auto",
              border: "1px solid var(--c-border-strong)", borderRadius: 0, display: "block",
            }}
          />
          <div style={{ flex: "1 1 320px", minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
              <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
              <span className="t-label">Engineering</span>
            </div>
            <h1
              className="t-display"
              style={{
                fontFamily: "var(--font-serif)", fontWeight: 400,
                fontSize: "clamp(1.3rem, 2.4vw, 1.9rem)", lineHeight: 1.5,
                color: "var(--c-ink)", maxWidth: "42rem",
              }}
            >
              Building tech is the easy part. What&apos;s hard is what it&apos;s built on, and how it&apos;s built.
              I&apos;ve spent years reviewing tech products across industries for investment decisions, and that
              work is what brought me here, into the infrastructure tech actually runs on, and the algorithms
              sitting inside it.
            </h1>
          </div>
        </div>
        <style>{`
          @media (max-width: 640px) {
            .eng-statement-row img { flex-basis: 160px !important; width: 160px !important; }
          }
        `}</style>
      </section>

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
