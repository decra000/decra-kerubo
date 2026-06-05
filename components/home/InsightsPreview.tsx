"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const cases = [
  { category: "Episode Posting",    catColor: "#3D1A6B", title: "Man posts live during mental health episode — 200k views before removal.", gap: "No platform duty of care for real-time crisis detection in Sub-Saharan Africa.", jurisdiction: "Kenya", year: 2024 },
  { category: "Child Exposure",     catColor: "#7A4A00", title: "9-year-old enrolled in data-harvesting school app without parental knowledge.", gap: "Kenya's Data Protection Act lacks provisions for children's data in educational contexts.", jurisdiction: "Kenya", year: 2024 },
  { category: "Tech Coercion",      catColor: "#8B2020", title: "Domestic abuse survivor tracked in real-time through a shared family app she couldn't remove.", gap: "Tech-facilitated coercive control is not a distinct harm category in Kenyan law.", jurisdiction: "Kenya", year: 2024 },
];

export function InsightsPreview() {
  return (
    <section className="section page-x" style={{ background: "var(--c-bg)" }}>
      <div className="inner">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "var(--c-gold)" }} />
              <span className="t-label">The 1000</span>
            </div>
            <h2 className="t-display t-display-lg">Tech Harm Index.</h2>
            <p className="t-body" style={{ maxWidth: "32rem", marginTop: "0.75rem" }}>
              Documenting cases of tech harm to build the policy argument. Every case is a gap in the law.
            </p>
          </div>
          <Link href="/the-1000" className="btn-text">View the full index <ArrowRight size={12} /></Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", borderTop: "1px solid var(--c-border)" }}>
          {cases.map((c, i) => (
            <div key={i} style={{ padding: "2rem", borderRight: i < cases.length - 1 ? "1px solid var(--c-border)" : "none" }}>
              <span style={{ display: "inline-block", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: c.catColor, marginBottom: "0.85rem" }}>{c.category}</span>
              <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.875rem", color: "var(--c-ink)", lineHeight: 1.5, marginBottom: "0.85rem" }}>{c.title}</p>
              <div style={{ background: "rgba(14,61,50,0.04)", borderLeft: "2px solid var(--c-forest)", padding: "0.6rem 0.8rem", borderRadius: "0 5px 5px 0", marginBottom: "1rem" }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--c-forest)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Policy Gap</p>
                <p style={{ fontSize: "0.72rem", color: "var(--c-ink-mid)", lineHeight: 1.6 }}>{c.gap}</p>
              </div>
              <span style={{ fontSize: "0.65rem", color: "var(--c-ink-muted)" }}>{c.jurisdiction} · {c.year}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.inner > div:last-child{grid-template-columns:1fr !important;} .inner > div:last-child > div{border-right:none !important; border-bottom:1px solid var(--c-border);}}`}</style>
    </section>
  );
}
