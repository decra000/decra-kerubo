import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About & Work",
  description: "Decra — Lawyer, Computer Scientist, AI Engineer and Entrepreneur. Selected case studies.",
};

const values = [
  { title: "Clarity over complexity.",               body: "The best advice simplifies. If you leave a consultation more confused than when you arrived, something went wrong." },
  { title: "Decisions have downstream consequences.", body: "Company structure, IP registration, AI adoption — these are not administrative tasks. They shape what becomes possible later." },
  { title: "The intersection is the value.",         body: "Technology without legal grounding is fragile. Law without technical understanding is blind. The combination is rare — that's where I operate." },
];

const cases = [
  {
    tag: "Tech Policy & Startup Law",
    title: "IP Strategy for a Kenyan EdTech Startup Pre-Fundraise",
    challenge: "A Kenyan EdTech startup preparing for a seed round. Investors flagged IP ownership gaps — the core product had been built by contractors with no IP assignment clauses.",
    approach: "Audited all existing contracts, identified IP exposure, drafted retroactive IP assignment agreements, and established a forward-looking IP policy.",
    outcome: "IP position cleaned up before due diligence. Fundraise proceeded. Founders left with a clear IP governance framework.",
    lessons: "IP conversations are uncomfortable to have early and expensive to fix late.",
  },
  {
    tag: "Founder Legal",
    title: "Founder Structure Advisory for a Multi-Country Social Enterprise",
    challenge: "Two co-founders launching across Kenya and Uganda. No formal agreement on equity, roles, IP, or exit scenarios.",
    approach: "Facilitated a structured founder conversation, defined equity splits and vesting schedules, drafted a co-founder agreement, and identified the right incorporation structure for multi-country operations.",
    outcome: "Clear legal foundation established before operations commenced. Entity structure tax-efficient for both jurisdictions.",
    lessons: "Founder agreements are not a sign of distrust — they are a sign of respect.",
  },
  {
    tag: "Tech Policy & Startup Law",
    title: "AI Document Review System for a Legal NGO",
    challenge: "A Nairobi-based legal NGO was spending 60% of staff time manually reviewing documents for case eligibility with a limited budget and no technical team.",
    approach: "Conducted an AI readiness assessment, identified open-source tools, and built a lightweight document classification system via Entrora Systems.",
    outcome: "Document review time reduced by 70%. Staff redirected to higher-value case management. Zero ongoing licensing costs.",
    lessons: "AI adoption doesn't require enterprise budgets. Right scoping matters more than investment size.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ background: "var(--c-bg)", paddingTop: "6rem" }}>

      {/* ── About header ── */}
      <section className="section page-x">
        <div className="inner about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          {/* Photo */}
          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "3/4", position: "relative", background: "rgba(14,61,50,0.04)", border: "1px solid var(--c-border)" }}>
              <Image
                src="/decra-about.jpg"
                alt="Decra"
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
              />
            </div>
            {/* Credential tag */}
            <div style={{ position: "absolute", bottom: "1.25rem", left: "1.25rem", right: "1.25rem", background: "rgba(14,61,50,0.88)", backdropFilter: "blur(8px)", borderRadius: "10px", padding: "1rem 1.1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {[["LLB", "Bachelor of Laws"], ["BSc", "Computer Science"]].map(([d, s]) => (
                  <div key={d}>
                    <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.9rem", color: "var(--c-gold)" }}>{d}</p>
                    <p style={{ fontSize: "0.6rem", color: "rgba(248,246,241,0.45)", marginTop: "0.15rem" }}>{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Copy */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
              <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
              <span className="t-label">About Decra</span>
            </div>
            <h1 className="t-display t-display-xl" style={{ marginBottom: "1.5rem" }}>Two degrees. One practice.</h1>
            <p className="t-body" style={{ marginBottom: "0.9rem" }}>
              A law degree and a computer science degree aren't the typical combination — but they're the combination that makes this advisory rare. Most legal challenges in tech can't be solved by law alone, and most technical decisions have legal consequences nobody tracks.
            </p>
            <p className="t-body" style={{ marginBottom: "0.9rem" }}>
              I built a practice at that intersection: tech policy and startup law for companies, and founder legal for the people building them. For AI engineering and tech development, I run Entrora Systems separately.
            </p>
            <div style={{ borderTop: "1px solid var(--c-border)", paddingTop: "1.5rem", marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              {[
                { label: "Based in",    value: "Nairobi, Kenya" },
                { label: "Serving",     value: "Startups, NGOs, Founders, SMEs" },
                { label: "Also via",    value: "Entrora Systems — AI & tech development" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", gap: "2rem" }}>
                  <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-ink-muted)", minWidth: "5rem", paddingTop: "0.15rem" }}>{item.label}</span>
                  <span style={{ fontSize: "0.8rem", color: "var(--c-ink)" }}>{item.value}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "2rem" }}>
              <Link href="/book" className="btn-primary">Work with Decra <ArrowRight size={13} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section page-x" style={{ background: "var(--c-surface)", borderTop: "1px solid var(--c-border)" }}>
        <div className="inner">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "3rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">What I Believe</span>
          </div>
          <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2.5rem" }}>
            {values.map(v => (
              <div key={v.title} style={{ borderTop: "2px solid var(--c-gold)", paddingTop: "1.5rem" }}>
                <h3 className="t-display t-display-sm" style={{ marginBottom: "0.75rem" }}>{v.title}</h3>
                <p className="t-body-sm">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Work divider ── */}
      <div id="work" />

      {/* ── Work header ── */}
      <section className="section page-x" style={{ background: "var(--c-forest)", borderBottom: "1px solid var(--c-border)" }}>
        <div className="inner work-header" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
              <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
              <span className="t-label">Selected Work</span>
            </div>
            <h2 className="t-display t-display-lg" style={{ color: "rgba(248,246,241,0.9)" }}>Real engagements, real outcomes.</h2>
          </div>
          <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden", aspectRatio: "4/3" }}>
            <Image
              src="/decra-services.jpg"
              alt="Decra at work"
              fill
              style={{ objectFit: "cover", objectPosition: "top center", opacity: 0.7 }}
            />
          </div>
        </div>
      </section>

      {/* ── Cases ── */}
      <section className="page-x" style={{ paddingBottom: "var(--space-section)", background: "var(--c-bg)" }}>
        <div className="inner">
          {cases.map((c, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: "4rem", borderTop: "1px solid var(--c-border)", paddingTop: "3rem", paddingBottom: "3rem" }}>
              <div style={{ paddingTop: "0.25rem" }}>
                <span className="t-label" style={{ display: "block", marginBottom: "0.75rem" }}>{c.tag}</span>
                <h3 className="t-display t-display-md">{c.title}</h3>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }}>
                {[{ label: "Challenge", text: c.challenge }, { label: "Approach", text: c.approach }, { label: "Outcome", text: c.outcome }, { label: "Lesson", text: c.lessons }].map(block => (
                  <div key={block.label} className="card">
                    <p className="t-label" style={{ marginBottom: "0.5rem" }}>{block.label}</p>
                    <p className="t-body-sm">{block.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section page-x" style={{ background: "var(--c-forest)" }}>
        <div className="inner" style={{ maxWidth: "36rem" }}>
          <h2 className="t-display t-display-lg" style={{ color: "rgba(248,246,241,0.9)", marginBottom: "0.75rem" }}>Ready to have a real conversation?</h2>
          <p style={{ fontSize: "0.825rem", color: "rgba(248,246,241,0.45)", marginBottom: "2rem" }}>Book a free discovery call — 15 minutes, no obligation.</p>
          <Link href="/book" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "var(--c-gold)", color: "var(--c-forest)", fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em", padding: "0.75rem 1.6rem", borderRadius: "100px", textDecoration: "none" }}>
            Book a Discovery Call <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <style>{`
        @media(max-width: 768px) {
          .about-grid, .work-header { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .values-grid { grid-template-columns: 1fr !important; }
          .inner > div { grid-template-columns: 1fr !important; }
          .inner > div > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
