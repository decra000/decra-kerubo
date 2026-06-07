import { ArrowRight } from "lucide-react";

export function InsightsPreview() {
  return (
    <section className="section page-x" style={{ background: "var(--c-bg)", borderTop: "1px solid var(--c-border)" }}>
      <div className="inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} id="the-1000-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.75rem" }}>
            <span style={{ display: "inline-block", width: "1.75rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">The 1000</span>
          </div>
          <h2 className="t-display t-display-lg" style={{ marginBottom: "1.5rem" }}>
            Tech harm has faces.
          </h2>
          <p className="t-body" style={{ marginBottom: "1.1rem" }}>
            The 1000 is a research and advocacy initiative documenting real cases of tech-enabled harm across Africa — to build the policy argument from the ground up.
          </p>
          <p className="t-body" style={{ marginBottom: "2.5rem" }}>
            Stories of people affected by ungoverned technology. Told honestly. Available on Spotify.
          </p>
          <a href="https://open.spotify.com/show/placeholder" target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              background: "#1DB954", color: "#000", fontFamily: "var(--font-manjari)",
              fontWeight: 700, fontSize: "0.825rem", padding: "0.75rem 1.5rem",
              borderRadius: "100px", textDecoration: "none",
            }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            Listen on Spotify
          </a>
        </div>

        <div style={{ background: "var(--c-sage-deep)", borderRadius: "16px", padding: "2.5rem" }}>
          <p style={{ fontSize: "0.675rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: "1.5rem" }}>What it documents</p>
          {[
            ["Platform harms", "Real-time crises with no legal recourse"],
            ["Data exploitation", "Vulnerable populations in unregulated digital spaces"],
            ["Tech-facilitated coercion", "Domestic abuse enabled by connected devices"],
            ["Children's data", "Minors in systems with no privacy protection"],
            ["Discriminatory AI", "Algorithmic outcomes that reinforce inequality"],
          ].map(([title, sub]) => (
            <div key={title} style={{ marginBottom: "1.1rem", paddingBottom: "1.1rem", borderBottom: "1px solid rgba(244,245,240,0.07)" }}>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.95rem", color: "rgba(244,245,240,0.88)", marginBottom: "0.2rem" }}>{title}</p>
              <p style={{ fontSize: "0.8rem", color: "rgba(244,245,240,0.45)", lineHeight: 1.6 }}>{sub}</p>
            </div>
          ))}
          <p style={{ fontSize: "0.675rem", color: "rgba(244,245,240,0.25)", marginTop: "0.5rem" }}>Non-commercial · Not legal consultancy</p>
        </div>
      </div>
      <style>{`@media(max-width:768px){ #the-1000-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }`}</style>
    </section>
  );
}
