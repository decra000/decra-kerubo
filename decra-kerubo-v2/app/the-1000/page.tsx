import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "The 1000 — Tech Harm Index",
  description: "Documenting real cases of technology harm to advocate for better policy. A living index by Decra.",
};

const categories = [
  { id: "coercion",     label: "Tech Coercion",      color: "#8B2020" },
  { id: "child",        label: "Child Exposure",      color: "#7A4A00" },
  { id: "bullying",     label: "Cyberbullying",       color: "#1A3A6B" },
  { id: "episode",      label: "Episode Posting",     color: "#3D1A6B" },
  { id: "surveillance", label: "Covert Surveillance", color: "#1A5C3A" },
  { id: "manipulation", label: "Algorithmic Harm",    color: "#4A3000" },
];

const profiles = [
  {
    id: "001", category: "episode",
    headline: "A man in Kisumu posted live during a mental health episode. The video reached 200k views before it was reported.",
    policyGap: "No platform-level duty of care for real-time mental health crisis detection in Sub-Saharan Africa.",
    jurisdiction: "Kenya", year: 2024, status: "unresolved",
  },
  {
    id: "002", category: "child",
    headline: "A 9-year-old in Nairobi was unknowingly enrolled in a data-harvesting learning app by her school.",
    policyGap: "Kenya's Data Protection Act lacks specific provisions for children's data collected in educational contexts.",
    jurisdiction: "Kenya", year: 2024, status: "policy-gap",
  },
  {
    id: "003", category: "bullying",
    headline: "A university student was doxxed across four platforms simultaneously. Each platform acted independently — none coordinated.",
    policyGap: "Cross-platform coordination obligations don't exist in any current African tech regulation framework.",
    jurisdiction: "Uganda", year: 2023, status: "unresolved",
  },
  {
    id: "004", category: "coercion",
    headline: "A domestic abuse survivor was tracked in real-time through a shared family app she could not remove without her abuser knowing.",
    policyGap: "Tech-facilitated coercive control is not a distinct harm category in Kenyan law.",
    jurisdiction: "Kenya", year: 2024, status: "unresolved",
  },
  {
    id: "005", category: "manipulation",
    headline: "A small Nairobi retailer's product was suppressed by a marketplace algorithm with no explanation or appeal path.",
    policyGap: "Algorithmic transparency and redress mechanisms are absent from e-commerce regulation in East Africa.",
    jurisdiction: "Kenya", year: 2023, status: "policy-gap",
  },
  {
    id: "006", category: "surveillance",
    headline: "A secondary school installed keylogging software on student devices without parental consent or disclosure.",
    policyGap: "Institutional surveillance of minors lacks regulatory oversight under current data protection frameworks.",
    jurisdiction: "Tanzania", year: 2024, status: "under-review",
  },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  "unresolved":   { label: "Unresolved",   color: "#8B2020", bg: "rgba(139,32,32,0.07)"  },
  "policy-gap":   { label: "Policy Gap",   color: "#7A4A00", bg: "rgba(122,74,0,0.07)"   },
  "under-review": { label: "Under Review", color: "#1A3A6B", bg: "rgba(26,58,107,0.07)"  },
};

export default function The1000Page() {
  const total = 1000;
  const documented = profiles.length;

  return (
    <div style={{ background: "var(--c-bg)", paddingTop: "6rem" }}>

      {/* ── Header ── */}
      <section className="section page-x" style={{ borderBottom: "1px solid var(--c-border)" }}>
        <div className="inner">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">The 1000</span>
          </div>

          <div className="header-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "end" }}>
            <div>
              <h1 className="t-display t-display-xl" style={{ marginBottom: "1.25rem" }}>Tech Harm Index.</h1>
              <p className="t-body" style={{ maxWidth: "30rem" }}>
                A living index of documented cases where technology caused harm — and where the law failed to protect people.
                Every profile is a policy argument.
              </p>
            </div>
            <div>
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--c-ink-muted)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Cases documented</span>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--c-forest)" }}>{documented} / {total}</span>
                </div>
                <div style={{ height: "3px", background: "var(--c-border)", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(documented / total * 100).toFixed(1)}%`, background: "var(--c-gold)", borderRadius: "2px" }} />
                </div>
              </div>
              <p style={{ fontSize: "0.775rem", color: "var(--c-ink-muted)", lineHeight: 1.7 }}>
                Details are anonymized to protect individuals. Cases are selected for the policy gap they expose, not shock value. This index informs Decra's tech policy advisory work.
              </p>
            </div>
          </div>

          {/* Category legend */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "2.5rem" }}>
            {categories.map(c => (
              <span key={c.id} style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.28rem 0.75rem", borderRadius: "100px", border: `1px solid ${c.color}35`, color: c.color }}>
                {c.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nove Spotify Banner ── */}
      <section className="page-x" style={{ paddingTop: "2.5rem", paddingBottom: "0" }}>
        <div className="inner">
          <a
            href="https://open.spotify.com/show/nove"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", background: "#0E3D32", borderRadius: "14px", padding: "1.4rem 1.75rem", textDecoration: "none", border: "1px solid rgba(30,215,96,0.15)" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
              {/* Spotify icon SVG */}
              <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "50%", background: "#1DB954", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1DB954", marginBottom: "0.25rem" }}>Now Listening — Spotify Podcast</p>
                <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "1rem", color: "rgba(248,246,241,0.92)", marginBottom: "0.15rem" }}>Nove</p>
                <p style={{ fontSize: "0.72rem", color: "rgba(248,246,241,0.45)", lineHeight: 1.5 }}>The podcast companion to The 1000 — real stories of tech harm, told with context and policy intent.</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#1DB954", flexShrink: 0 }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700 }}>Listen on Spotify</span>
              <ArrowUpRight size={14} />
            </div>
          </a>
        </div>
      </section>

      {/* ── Cases grid ── */}
      <section className="section page-x">
        <div className="inner">
          <div className="cases-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }}>
            {profiles.map(p => {
              const cat = categories.find(c => c.id === p.category)!;
              const stat = statusConfig[p.status];
              return (
                <article key={p.id} className="card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <span style={{ fontFamily: "var(--font-manjari)", fontWeight: 100, fontSize: "1.4rem", color: "rgba(28,28,26,0.15)", letterSpacing: "-0.02em" }}>#{p.id}</span>
                    <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.25rem 0.65rem", borderRadius: "100px", color: stat.color, background: stat.bg }}>
                      {stat.label}
                    </span>
                  </div>
                  <span style={{ display: "inline-block", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: cat.color, marginBottom: "0.75rem" }}>
                    {cat.label}
                  </span>
                  <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.9rem", color: "var(--c-ink)", lineHeight: 1.55, marginBottom: "1rem" }}>
                    {p.headline}
                  </p>
                  <div style={{ background: "rgba(14,61,50,0.04)", borderLeft: "2px solid var(--c-forest)", padding: "0.75rem 0.9rem", borderRadius: "0 6px 6px 0", marginBottom: "1rem" }}>
                    <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-forest)", marginBottom: "0.3rem" }}>Policy Gap</p>
                    <p style={{ fontSize: "0.775rem", color: "var(--c-ink-mid)", lineHeight: 1.65 }}>{p.policyGap}</p>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <span style={{ fontSize: "0.65rem", color: "var(--c-ink-muted)" }}>{p.jurisdiction}</span>
                    <span style={{ fontSize: "0.65rem", color: "var(--c-border)" }}>·</span>
                    <span style={{ fontSize: "0.65rem", color: "var(--c-ink-muted)" }}>{p.year}</span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Contribute */}
          <div style={{ marginTop: "4rem", padding: "3rem", background: "var(--c-forest)", borderRadius: "16px", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "3rem" }}>
            <div>
              <p className="t-label" style={{ marginBottom: "0.75rem" }}>Contribute to the Index</p>
              <h3 style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "1.05rem", color: "rgba(248,246,241,0.9)", marginBottom: "0.6rem" }}>Know a case that belongs here?</h3>
              <p style={{ fontSize: "0.775rem", color: "rgba(248,246,241,0.5)", lineHeight: 1.7, maxWidth: "36rem" }}>
                If you've witnessed or experienced tech harm in Africa — especially where the law failed — share it.
                All submissions are reviewed, anonymized, and credited only if you request it.
              </p>
            </div>
            <a href="mailto:the1000@decrakero.com?subject=Case%20Submission"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "var(--c-gold)", color: "var(--c-forest)", fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em", padding: "0.75rem 1.6rem", borderRadius: "100px", textDecoration: "none", whiteSpace: "nowrap" }}>
              Submit a Case <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media(max-width: 768px) {
          .header-grid, .cases-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .inner > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
