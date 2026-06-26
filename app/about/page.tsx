"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function useReveal(threshold = 0.06) {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [threshold]);
  return { ref, vis };
}

/* shared tokens */
const LBL: React.CSSProperties = {
  fontFamily: "var(--font-manjari)", fontWeight: 700,
  fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase",
  color: "var(--c-ink-muted)",
};
const SERIF = (sz = "clamp(2rem,3.5vw,3rem)"): React.CSSProperties => ({
  fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
  fontSize: sz, color: "var(--c-ink)", lineHeight: 1.05, letterSpacing: "-0.01em",
});
const BODY: React.CSSProperties = {
  fontFamily: "var(--font-sans)", fontWeight: 400,
  fontSize: "0.925rem", color: "var(--c-ink-mid)", lineHeight: 1.85,
};

/* ─── S1: HERO ─── */
function Cover() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t); }, []);

  return (
    <section style={{ height: "100svh", position: "relative", overflow: "hidden", background: "#0A0A0A" }}>
      {/* Full-bleed image */}
      <div style={{
        position: "absolute", inset: 0,
        opacity: vis ? 1 : 0,
        transition: "opacity 1.4s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <img
          src="/decra-cover.jpg"
          alt=""
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center 38%",
            display: "block",
          }}
        />
      </div>

      {/* Gradient — heavy enough to make text legible */}
      <div style={{
        position: "absolute", inset: 0,
        background: `
          linear-gradient(to top, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.4) 32%, rgba(10,10,10,0.05) 55%, transparent 72%),
          linear-gradient(to right, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.3) 40%, transparent 65%)
        `,
      }} />

      {/* Text — bottom left */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "4rem var(--space-x) 5rem",
        maxWidth: "calc(var(--max-w) + var(--space-x) * 2)", margin: "0 auto",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(22px)",
        transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.5s",
      }}>
        <p style={{ ...LBL, color: "rgba(240,237,232,0.55)", marginBottom: "0.85rem" }}>About</p>
        <h1 style={{
          fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
          fontSize: "clamp(3rem, 6vw, 5.5rem)",
          color: "#F0EDE8",
          lineHeight: 1.02, letterSpacing: "-0.02em",
          marginBottom: "1.25rem",
          textShadow: "0 2px 24px rgba(0,0,0,0.4)",
        }}>Decra Kerubo.</h1>
        <p style={{
          fontFamily: "var(--font-sans)", fontWeight: 400,
          fontSize: "clamp(0.875rem, 1.4vw, 1.05rem)",
          color: "rgba(240,237,232,0.72)",
          letterSpacing: "0.01em",
          marginBottom: "2rem",
        }}>
          Lawyer &nbsp;·&nbsp; Computer Scientist &nbsp;·&nbsp; Technology Law Consultant &nbsp;·&nbsp; Nairobi
        </p>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <a href="#bio" style={{
            fontFamily: "var(--font-manjari)", fontWeight: 700,
            fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(240,237,232,0.5)", textDecoration: "none", transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#F0EDE8"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(240,237,232,0.5)"}>
            Read more
          </a>
          <span style={{ width: "1px", height: "10px", background: "rgba(240,237,232,0.2)", display: "block" }} />
          <Link href="/partner" style={{
            fontFamily: "var(--font-manjari)", fontWeight: 700,
            fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(196,160,106,0.9)", textDecoration: "none", transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#C4A06A"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(196,160,106,0.9)"}>
            Work together
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── S2: BIO ─── */
function Bio() {
  const { ref, vis } = useReveal();

  return (
    <section id="bio" ref={ref as React.RefObject<HTMLElement>} style={{
      padding: "clamp(5rem,9vw,10rem) var(--space-x)",
      background: "var(--c-bg)",
    }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "0.85fr 1.15fr",
          gap: "clamp(3rem,6vw,7rem)", alignItems: "start",
        }} id="bio-grid">

          {/* Photo */}
          <div style={{
            opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <div style={{ overflow: "hidden", aspectRatio: "3/4", marginBottom: "1.75rem" }}>
              <img
                src="/decra-about.jpg"
                alt="Decra Kerubo"
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "center 18%",
                  display: "block", filter: "saturate(0.95)",
                  transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)"}
                onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"}
              />
            </div>
            {[["LLB", "Bachelor of Laws"], ["BSc", "Computer Science"]].map(([abbr, full], i) => (
              <div key={abbr} style={{
                display: "flex", alignItems: "baseline", gap: "1.25rem",
                padding: "0.9rem 0",
                borderTop: i === 0 ? "1px solid var(--c-border)" : "none",
                borderBottom: "1px solid var(--c-border)",
              }}>
                <span style={{
                  fontFamily: "var(--font-serif)", fontStyle: "italic",
                  fontSize: "0.82rem", color: "var(--c-accent)", minWidth: "2.5rem",
                }}>{abbr}</span>
                <span style={{
                  fontFamily: "var(--font-sans)", fontWeight: 400,
                  fontSize: "0.82rem", color: "var(--c-ink-mid)",
                }}>{full}</span>
              </div>
            ))}
          </div>

          {/* Copy */}
          <div style={{
            opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.12s",
            paddingTop: "0.25rem",
          }}>
            <p style={{ ...LBL, marginBottom: "1.5rem" }}>Background</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(1.9rem,3vw,2.6rem, color: "var(--c-ink)", lineHeight: 1.05, letterSpacing: "-0.01em""), marginBottom: "2rem" }}>
              Two degrees.<br />One rare intersection.
            </h2>

            <p style={{ ...BODY, marginBottom: "1.25rem" }}>
              A law degree and a computer science degree aren't the typical combination — but they're the combination that makes this practice rare. Most legal challenges in technology can't be solved by law alone, and most technical decisions carry legal consequences nobody tracks until it's too late.
            </p>
            <p style={{ ...BODY, marginBottom: "3rem" }}>
              I built a practice at that intersection: technology law consulting for companies, products, and platforms — and startup advisory for the people building them.
            </p>

            {/* Pullquote */}
            <blockquote style={{
              borderLeft: "2px solid var(--c-accent)",
              paddingLeft: "1.5rem",
              marginBottom: "3rem",
            }}>
              <p style={{
                fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
                fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)",
                color: "var(--c-ink)",
                lineHeight: 1.65,
              }}>
                "Legal clarity is a competitive advantage — not a compliance box."
              </p>
            </blockquote>

            <p style={{ ...LBL, marginBottom: "1.25rem" }}>Open to partnering with</p>

            <div style={{ marginBottom: "3rem" }}>
              {[
                "Law firms seeking technology law capacity",
                "Tech companies needing embedded legal advisory",
                "Investors — portfolio legal support",
                "Accelerators and incubators",
                "International firms entering East Africa",
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", gap: "1.25rem",
                  padding: "0.85rem 0",
                  borderBottom: "1px solid var(--c-border)",
                  opacity: vis ? 1 : 0,
                  transition: `opacity 0.6s ease ${0.2 + i * 0.07}s`,
                }}>
                  <span style={{
                    fontFamily: "var(--font-serif)", fontStyle: "italic",
                    fontSize: "0.75rem", color: "var(--c-accent)",
                    flexShrink: 0, paddingTop: "0.1rem",
                  }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{
                    fontFamily: "var(--font-sans)", fontWeight: 400,
                    fontSize: "0.88rem", color: "var(--c-ink-mid)", lineHeight: 1.6,
                  }}>{item}</span>
                </div>
              ))}
            </div>

            <Link href="/partner" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontFamily: "var(--font-manjari)", fontWeight: 700,
              fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--c-ink)", textDecoration: "none",
              borderBottom: "1px solid var(--c-ink)", paddingBottom: "2px",
              transition: "color 0.2s, border-color 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-accent)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-accent)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--c-ink)"; }}>
              Start a partnership <ArrowRight size={11} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:720px){#bio-grid{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
    </section>
  );
}

/* ─── S3: EDITORIAL BREAK ─── */
function EditorialBreak() {
  const { ref, vis } = useReveal(0.1);
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{
      height: "clamp(280px, 40vh, 480px)",
      position: "relative", overflow: "hidden", background: "#0A0A0A",
    }}>
      <img src="/decra-texture.jpg" alt="" style={{
        width: "100%", height: "100%",
        objectFit: "cover", objectPosition: "center 40%",
        display: "block",
        filter: "saturate(0.75)",
        opacity: vis ? 0.85 : 0,
        transform: vis ? "scale(1)" : "scale(1.04)",
        transition: "opacity 1.4s cubic-bezier(0.16,1,0.3,1), transform 1.6s cubic-bezier(0.16,1,0.3,1)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(10,10,10,0.15) 0%, transparent 25%, transparent 75%, rgba(10,10,10,0.25) 100%)",
        pointerEvents: "none",
      }} />
    </section>
  );
}

/* ─── S4: SOCIAL — icons only ─── */
function Social() {
  const { ref, vis } = useReveal();

  const socials = [
    {
      label: "Instagram",
      url: "https://instagram.com/decrakerubo",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      url: "https://linkedin.com/in/decrakerubo",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
    },
    {
      label: "Spotify",
      url: "https://open.spotify.com",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      ),
    },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{
      padding: "clamp(4rem,7vw,8rem) var(--space-x)",
      background: "var(--c-bg)",
      borderTop: "1px solid var(--c-border)",
    }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "center", gap: "2.5rem", flexWrap: "wrap",
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : "translateY(14px)",
          transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {socials.map(({ label, url, icon }, i) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                aria-label={label}
                style={{
                  color: "var(--c-ink-muted)",
                  textDecoration: "none",
                  lineHeight: 0, display: "block",
                  opacity: vis ? 1 : 0,
                  transition: `opacity 0.5s ease ${0.1 + i * 0.08}s, color 0.2s, transform 0.2s`,
                } as React.CSSProperties}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-ink)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-ink-muted)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <Cover />
      <Bio />
      <EditorialBreak />
      <Social />
    </>
  );
}
