"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const IgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const LiIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.06 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return { ref, vis };
}

const fade = (vis: boolean, delay = 0): React.CSSProperties => ({
  opacity: vis ? 1 : 0,
  transform: vis ? "none" : "translateY(18px)",
  transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
});

const LBL: React.CSSProperties = {
  fontFamily: "var(--font-manjari)", fontWeight: 700,
  fontSize: "0.55rem", letterSpacing: "0.24em", textTransform: "uppercase",
  color: "var(--c-ink-muted)",
};
const SERIF = (sz = "clamp(2rem,3.5vw,3rem)"): React.CSSProperties => ({
  fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
  fontSize: sz, color: "var(--c-ink)", lineHeight: 1.05,
});
const BODY: React.CSSProperties = {
  fontFamily: "var(--font-sans)", fontWeight: 300,
  fontSize: "0.875rem", color: "var(--c-ink-muted)", lineHeight: 1.85,
};
const SEC: React.CSSProperties = {
  borderTop: "1px solid var(--c-border)",
  padding: "var(--space-section) var(--space-x)",
};

/* ── S1: Cover ── */
function Cover() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);
  return (
    <section style={{ minHeight: "100svh", background: "var(--c-bg)", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
      {/* Full bleed image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <img src="/decra-about.jpg" alt="Decra Kerubo"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
        {/* Dark gradient from bottom */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--c-bg) 0%, rgba(8,8,8,0.55) 40%, transparent 70%)" }} />
      </div>
      {/* Text over image bottom */}
      <div style={{ position: "relative", zIndex: 2, padding: "4rem var(--space-x) 5rem", maxWidth: "var(--max-w)", margin: "0 auto", width: "100%" }}>
        <div style={fade(vis, 0.2)}>
          <p style={{ ...LBL, color: "rgba(240,238,233,0.5)", marginBottom: "1rem" }}>About</p>
          <h1 style={{ ...SERIF("clamp(2.5rem,5vw,4.5rem)"), color: "#F0EEE9", marginBottom: "1rem" }}>Decra Kerubo.</h1>
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1rem", color: "rgba(240,238,233,0.55)", maxWidth: "28rem", lineHeight: 1.75 }}>
            Lawyer. Computer Scientist. Technology Law Consultant. Nairobi.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── S2: Bio + Education ── */
function Bio() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={SEC}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "7rem", alignItems: "start" }} className="bio-g">

          {/* Photo */}
          <div style={fade(vis)}>
            <div style={{ aspectRatio: "3/4", overflow: "hidden", marginBottom: "1.5rem" }}>
              <img src="/decra-about.jpg" alt="Decra Kerubo"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
            </div>
            {/* Credentials */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                ["LLB", "Bachelor of Laws", "University of Nairobi"],
                ["BSc", "Computer Science", "University of Nairobi"],
              ].map(([deg, full, uni]) => (
                <div key={deg} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", padding: "1rem 0", borderBottom: "1px solid var(--c-border)" }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.8rem", color: "var(--c-accent)", minWidth: "2.5rem" }}>{deg}</span>
                  <div>
                    <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.82rem", color: "var(--c-ink)", marginBottom: "0.15rem" }}>{full}</p>
                    <p style={{ ...LBL, fontSize: "0.5rem" }}>{uni}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Copy */}
          <div style={fade(vis, 0.1)}>
            <p style={{ ...LBL, marginBottom: "1.5rem" }}>Background</p>
            <h2 style={{ ...SERIF("clamp(1.6rem,3vw,2.4rem)"), marginBottom: "2rem" }}>Two degrees. One rare intersection.</h2>

            <p style={{ ...BODY, marginBottom: "1.25rem" }}>
              A law degree and a computer science degree aren't the typical combination — but they're the combination that makes this practice rare. Most legal challenges in technology can't be solved by law alone, and most technical decisions carry legal consequences nobody tracks until it's too late.
            </p>
            <p style={{ ...BODY, marginBottom: "1.25rem" }}>
              I built a practice at that intersection: technology law consulting for companies, products, and platforms — and startup advisory for the people building them. For AI engineering and technical development, I run Entrora Systems separately.
            </p>
            <p style={{ ...BODY, marginBottom: "3rem" }}>
              My work is grounded in the belief that legal clarity is a competitive advantage — not a compliance box. The founders and companies I work with move faster because they've done it right the first time.
            </p>

            {/* Inspiration */}
            <p style={{ ...LBL, marginBottom: "1.25rem" }}>Inspiration</p>
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.1rem", color: "var(--c-ink)", lineHeight: 1.6, marginBottom: "3rem", maxWidth: "28rem", borderLeft: "1px solid var(--c-accent)", paddingLeft: "1.5rem" }}>
              "Technology without legal grounding is fragile. Law without technical understanding is blind. The combination is rare — that's where I operate."
            </p>

            {/* Partnership anticipation */}
            <p style={{ ...LBL, marginBottom: "1.25rem" }}>Partnership anticipations</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                "Law firms seeking technology law capacity",
                "Tech companies needing embedded legal advisory",
                "Investors looking for portfolio legal support",
                "Accelerators and incubators for startup programming",
                "International firms expanding into East Africa",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", padding: "0.85rem 0", borderBottom: "1px solid var(--c-border)", ...BODY, color: "var(--c-ink-mid)" }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.7rem", color: "var(--c-accent)", flexShrink: 0, paddingTop: "0.1rem" }}>{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </div>
              ))}
            </div>

            <div style={{ marginTop: "2.5rem" }}>
              <Link href="/partner" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                fontFamily: "var(--font-manjari)", fontWeight: 700, fontSize: "0.55rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--c-ink)", textDecoration: "none",
                borderBottom: "1px solid var(--c-ink)", paddingBottom: "2px",
                transition: "color 0.2s, border-color 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-ink)"; }}>
                Start a partnership <ArrowRight size={10} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:700px){.bio-g{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
    </section>
  );
}

/* ── S3: Social ── */
function Social() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{ ...SEC, background: "var(--c-surface)" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }} className="social-g">
          <div style={fade(vis)}>
            <p style={{ ...LBL, marginBottom: "1.25rem" }}>Follow the work</p>
            <h2 style={{ ...SERIF(), marginBottom: "1.5rem" }}>Stay connected.</h2>
            <p style={{ ...BODY, maxWidth: "22rem" }}>
              Insights on technology law, startup advisory, and African legal tech — shared regularly across platforms.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0", ...fade(vis, 0.1) }}>
            {[
              { icon: IgIcon, label: "Instagram", handle: "@decrakerubo", url: "https://instagram.com/decrakerubo", desc: "Visual storytelling — life at the intersection of law and tech" },
              { icon: LiIcon, label: "LinkedIn", handle: "Decra Kerubo", url: "https://linkedin.com/in/decrakerubo", desc: "Professional insights, case studies, and technology law commentary" },
            ].map(({ icon: Icon, label, handle, url, desc }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer" style={{
                display: "flex", gap: "1.5rem", alignItems: "flex-start",
                padding: "1.75rem 0", borderBottom: "1px solid var(--c-border)",
                textDecoration: "none", transition: "opacity 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.6"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}>
                <div style={{ width: "2rem", height: "2rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, paddingTop: "0.1rem" }}>
                  <Icon size={18} strokeWidth={1.5} style={{ color: "var(--c-ink-muted)" }} />
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1rem", color: "var(--c-ink)", marginBottom: "0.2rem" }}>{label}</p>
                  <p style={{ ...LBL, fontSize: "0.5rem", marginBottom: "0.5rem" }}>{handle}</p>
                  <p style={{ ...BODY, fontSize: "0.78rem" }}>{desc}</p>
                </div>
              </a>
            ))}
            <div style={{ borderTop: "none" }} />
          </div>
        </div>
      </div>
      <style>{`@media(max-width:700px){.social-g{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <Cover />
      <Bio />
      <Social />
    </>
  );
}
