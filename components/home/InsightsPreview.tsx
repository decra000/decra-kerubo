"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const issues = [
  { title: "Platform harms", sub: "Real-time crises with no legal recourse", n: "01" },
  { title: "Data exploitation", sub: "Vulnerable populations in unregulated spaces", n: "02" },
  { title: "Tech-facilitated coercion", sub: "Domestic abuse enabled by connected devices", n: "03" },
  { title: "Children's data", sub: "Minors in systems with no privacy protection", n: "04" },
  { title: "Discriminatory AI", sub: "Algorithmic outcomes that reinforce inequality", n: "05" },
];

export function InsightsPreview() {
  const [activeIssue, setActiveIssue] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Auto-cycle
  useEffect(() => {
    const id = setInterval(() => setActiveIssue(i => (i + 1) % issues.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} className="section page-x" style={{ background: "var(--c-bg)", borderTop: "1px solid var(--c-border)", overflow: "hidden" }}>
      <div className="inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} id="the-1000-grid">

        {/* Left */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-30px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.75rem" }}>
            <span style={{ display: "inline-block", width: "1.75rem", height: "1px", background: "var(--c-gold)" }} />
            <span className="t-label">The 1000 Initiative</span>
          </div>
          <h2 className="t-display t-display-lg" style={{ marginBottom: "1.5rem" }}>Tech harm<br />has faces.</h2>
          <p className="t-body" style={{ marginBottom: "1.1rem" }}>
            A research and advocacy initiative documenting real cases of tech-enabled harm across Africa — building the policy argument from the ground up.
          </p>
          <p className="t-body" style={{ marginBottom: "2.5rem" }}>
            Stories of people affected by ungoverned technology. Told honestly. On Spotify.
          </p>
          <a href="https://open.spotify.com/show/placeholder" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "#1DB954", color: "#000", fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.85rem", padding: "0.8rem 1.6rem", borderRadius: "100px", textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(29,185,84,0.35)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            Listen on Spotify
          </a>
        </div>

        {/* Right — animated issue list */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(30px)", transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s" }}>
          <div style={{ background: "var(--c-sage-deep)", borderRadius: "20px", overflow: "hidden" }}>
            <div style={{ padding: "1.5rem 1.75rem", borderBottom: "1px solid rgba(244,245,240,0.06)" }}>
              <p style={{ fontSize: "0.675rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--c-gold)" }}>What it documents</p>
            </div>
            {issues.map((issue, i) => (
              <div key={issue.title}
                onMouseEnter={() => setActiveIssue(i)}
                style={{
                  display: "flex", alignItems: "center", gap: "1.25rem",
                  padding: "1.1rem 1.75rem", cursor: "default",
                  background: activeIssue === i ? "rgba(244,245,240,0.06)" : "transparent",
                  borderBottom: i < issues.length - 1 ? "1px solid rgba(244,245,240,0.05)" : "none",
                  transition: "background 0.25s",
                }}>
                <span style={{ fontSize: "0.65rem", color: activeIssue === i ? "var(--c-gold)" : "rgba(244,245,240,0.2)", fontWeight: 700, letterSpacing: "0.1em", flexShrink: 0, transition: "color 0.25s" }}>{issue.n}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.95rem", color: activeIssue === i ? "rgba(244,245,240,0.92)" : "rgba(244,245,240,0.5)", transition: "color 0.25s", marginBottom: "0.15rem" }}>{issue.title}</p>
                  <p style={{ fontSize: "0.75rem", color: "rgba(244,245,240,0.3)", lineHeight: 1.5 }}>{issue.sub}</p>
                </div>
                <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: activeIssue === i ? "var(--c-gold)" : "transparent", flexShrink: 0, transition: "background 0.25s" }} />
              </div>
            ))}
            <div style={{ padding: "1.1rem 1.75rem" }}>
              <p style={{ fontSize: "0.675rem", color: "rgba(244,245,240,0.2)" }}>Non-commercial · Not legal consultancy</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){ #the-1000-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }`}</style>
    </section>
  );
}
