export function TrustBar() {
  const pillars = [
    { label: "Tech Policy & Startup Law", sub: "For companies & products" },
    { label: "Founder Legal",             sub: "For founders & entrepreneurs" },
    { label: "The 1000",                  sub: "Tech harm research & policy" },
    { label: "Entrora Systems",           sub: "AI Engineering — external" },
  ];
  return (
    <section style={{ borderTop: "1px solid var(--c-border)", borderBottom: "1px solid var(--c-border)", background: "var(--c-surface)", paddingLeft: "var(--space-page-x)", paddingRight: "var(--space-page-x)" }}>
      <div className="inner" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {pillars.map((p, i) => (
          <div key={p.label} style={{ padding: "1.75rem 1.5rem", borderRight: i < pillars.length - 1 ? "1px solid var(--c-border)" : "none", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.8rem", color: "var(--c-forest)", marginBottom: "0.25rem" }}>{p.label}</p>
            <p style={{ fontSize: "0.62rem", color: "var(--c-ink-muted)" }}>{p.sub}</p>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:640px){.inner{grid-template-columns:1fr 1fr !important;} .inner > div{border-right:none !important; border-bottom:1px solid var(--c-border);}}`}</style>
    </section>
  );
}
