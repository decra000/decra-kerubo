import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, Scale, MessageSquare } from "lucide-react";
import { EngineeringGrid } from "@/components/engineering/EngineeringGrid";
import { PaperSlider } from "@/components/research/PaperSlider";
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
          <div
            style={{
              position: "relative", overflow: "hidden",
              flex: "0 0 clamp(200px, 24vw, 300px)", width: "clamp(200px, 24vw, 300px)",
              border: "1px solid var(--c-border-strong)", borderRadius: 0,
            }}
          >
            <img
              src="/decra-about-portrait.jpg"
              alt="Decra Kerubo"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "linear-gradient(to bottom, transparent 70%, var(--c-bg) 96%)",
              }}
            />
          </div>
          <div style={{ flex: "1 1 320px", minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
              <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
              <span className="t-label">AI &amp; Systems Engineer &middot; Technology Lawyer | Advocate Trainee</span>
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
              I have reviewed 500+ tech products during my work at FELS, Eleva8or, and ELP (defunct), and that
              work is what brought me here, into the infrastructure tech actually runs on, and the algorithms
              sitting inside it.
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "1.5rem" }}>
              {["LLB (Hons), Africa Nazarene University", "BSc Computer Science (AI), African Leadership University"].map((deg) => (
                <div key={deg} style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem", width: "fit-content",
                  fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.02em",
                  color: "var(--c-forest)", border: "1px solid var(--c-border-strong)",
                  borderRadius: 0, padding: "0.4rem 0.85rem",
                }}>
                  <GraduationCap size={12} strokeWidth={2} />
                  {deg}
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 640px) {
            .eng-statement-row > div:first-child { flex-basis: 160px !important; width: 160px !important; }
          }
        `}</style>
      </section>

      {/* ── Research ── */}
      <section className="section page-x" style={{ borderBottom: "1px solid var(--c-border)" }}>
        <div className="inner">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">Research</span>
          </div>
          <PaperSlider />
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="section page-x">
        <div className="inner">
          <EngineeringGrid projects={engineeringProjects} />
        </div>
      </section>

      {/* ── Building for Legal ──
          Its own banner, on-brand forest green instead of the page's black
          and white, so it reads as a distinct category rather than another
          grid entry. Two rows, no images, the LPMS lives on its own site
          so this just points there. */}
      <section className="section page-x" style={{ background: "var(--c-forest)" }}>
        <div className="inner">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label" style={{ color: "rgba(248,246,241,0.55)" }}>Building for Legal</span>
          </div>
          <h2 style={{
            fontFamily: "var(--font-serif)", fontWeight: 400,
            fontSize: "clamp(1.4rem, 2.4vw, 1.9rem)", color: "rgba(248,246,241,0.95)",
            marginBottom: "2.5rem",
          }}>
            Explore.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }} className="legal-row">
            <Link
              href="/entrora"
              style={{
                display: "flex", flexDirection: "column", gap: "0.9rem",
                border: "1px solid rgba(248,246,241,0.18)", borderRadius: 0, padding: "1.75rem",
                textDecoration: "none",
              }}
            >
              <Scale size={18} color="var(--c-gold)" strokeWidth={1.5} />
              <span style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "1rem", color: "rgba(248,246,241,0.95)" }}>
                Entrora LPMS
              </span>
              <p style={{ fontSize: "0.8rem", color: "rgba(248,246,241,0.55)", lineHeight: 1.65, flex: 1 }}>
                The all-in-one platform to manage matters, clients, documents, time, and billing.
              </p>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.62rem",
                letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--c-gold)",
              }}>
                Explore <ArrowUpRight size={12} />
              </span>
            </Link>

            <Link
              href="/engineering/legal-chatbot"
              style={{
                display: "flex", flexDirection: "column", gap: "0.9rem",
                border: "1px solid rgba(248,246,241,0.18)", borderRadius: 0, padding: "1.75rem",
                textDecoration: "none",
              }}
            >
              <MessageSquare size={18} color="var(--c-gold)" strokeWidth={1.5} />
              <span style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "1rem", color: "rgba(248,246,241,0.95)" }}>
                Legal Chatbot
              </span>
              <p style={{ fontSize: "0.8rem", color: "rgba(248,246,241,0.55)", lineHeight: 1.65, flex: 1 }}>
                Helps entrepreneurs make the right early stage business legal decisions.
              </p>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.62rem",
                letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--c-gold)",
              }}>
                Explore <ArrowUpRight size={12} />
              </span>
            </Link>
          </div>
        </div>
        <style>{`
          @media (max-width: 640px) {
            .legal-row { grid-template-columns: 1fr !important; }
          }
        `}</style>
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
              padding: "0.9rem 1.6rem", borderRadius: 0,
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
