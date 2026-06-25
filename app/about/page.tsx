"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const IgIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const LiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

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

/* ─── S1: HERO — full-bleed portrait, name anchored bottom-left ─── */
function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t); }, []);

  return (
    <section style={{
      height: "100svh",
      position: "relative",
      overflow: "hidden",
      background: "#080808",
    }}>
      {/* Full-bleed image — fades in */}
      <div style={{
        position: "absolute", inset: 0,
        opacity: vis ? 1 : 0,
        transition: "opacity 1.4s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <img
          src="/decra-hero.jpg"
          alt=""
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 15%",
            display: "block",
          }}
        />
      </div>

      {/* Gradient — bottom fade to bg, light vignette left */}
      <div style={{
        position: "absolute", inset: 0,
        background: `
          linear-gradient(to top,  rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.35) 35%, transparent 60%),
          linear-gradient(to right, rgba(8,8,8,0.28) 0%, transparent 50%)
        `,
      }} />

      {/* Text — bottom-left, slides up */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "4rem var(--space-x) 5rem",
        maxWidth: "var(--max-w)", margin: "0 auto",
      }}>
        <div style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : "translateY(24px)",
          transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.5s",
        }}>
          <p style={{
            fontFamily: "var(--font-manjari)", fontWeight: 700,
            fontSize: "0.52rem", letterSpacing: "0.28em", textTransform: "uppercase",
            color: "rgba(240,238,233,0.38)", marginBottom: "1rem",
          }}>Decra Kerubo</p>

          <h1 style={{
            fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
            fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
            color: "#F0EEE9",
            lineHeight: 1.02, letterSpacing: "-0.01em",
            marginBottom: "1.5rem",
          }}>
            Lawyer.<br />Computer Scientist.<br />Technology Law.
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
            <a href="#bio" style={{
              fontFamily: "var(--font-manjari)", fontWeight: 700,
              fontSize: "0.52rem", letterSpacing: "0.22em", textTransform: "uppercase",
              color: "rgba(240,238,233,0.45)", textDecoration: "none", transition: "color 0.25s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#F0EEE9"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(240,238,233,0.45)"}>
              Read more
            </a>
            <span style={{ width: "1px", height: "10px", background: "rgba(240,238,233,0.18)", display: "block" }} />
            <Link href="/partner" style={{
              fontFamily: "var(--font-manjari)", fontWeight: 700,
              fontSize: "0.52rem", letterSpacing: "0.22em", textTransform: "uppercase",
              color: "rgba(196,160,106,0.85)", textDecoration: "none", transition: "color 0.25s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#C4A06A"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(196,160,106,0.85)"}>
              Work together
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── S2: BIO — photo left, sparse copy right ─── */
function Bio() {
  const { ref, vis } = useReveal();

  return (
    <section id="bio" ref={ref as React.RefObject<HTMLElement>} style={{
      padding: "clamp(6rem,11vw,12rem) var(--space-x)",
      background: "var(--c-bg)",
    }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "0.85fr 1.15fr",
          gap: "clamp(3rem,7vw,8rem)",
          alignItems: "start",
        }} id="bio-grid">

          {/* ── Photo column ── */}
          <div style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(28px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
          }}>
            {/* Main photo */}
            <div style={{
              position: "relative",
              overflow: "hidden",
              aspectRatio: "3/4",
              marginBottom: "2rem",
            }}>
              <img
                src="/decra-about.jpg"
                alt="Decra Kerubo"
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "center 15%",
                  display: "block",
                  filter: "saturate(0.92)",
                  transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)"}
                onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"}
              />
            </div>

            {/* Credentials — minimal lines */}
            {[["LLB", "Bachelor of Laws"], ["BSc", "Computer Science"]].map(([abbr, full], i) => (
              <div key={abbr} style={{
                display: "flex", alignItems: "baseline", gap: "1.25rem",
                padding: "0.9rem 0",
                borderTop: i === 0 ? "1px solid var(--c-border)" : "none",
                borderBottom: "1px solid var(--c-border)",
              }}>
                <span style={{
                  fontFamily: "var(--font-serif)", fontStyle: "italic",
                  fontSize: "0.75rem", color: "var(--c-accent)", minWidth: "2.5rem",
                }}>{abbr}</span>
                <span style={{
                  fontFamily: "var(--font-sans)", fontWeight: 300,
                  fontSize: "0.78rem", color: "var(--c-ink-mid)",
                }}>{full}</span>
              </div>
            ))}
          </div>

          {/* ── Copy column ── */}
          <div style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(28px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.12s",
            paddingTop: "0.5rem",
          }}>
            {/* Eyebrow */}
            <p style={{
              fontFamily: "var(--font-manjari)", fontWeight: 700,
              fontSize: "0.52rem", letterSpacing: "0.26em", textTransform: "uppercase",
              color: "var(--c-ink-muted)", marginBottom: "1.75rem",
            }}>Background</p>

            {/* Heading */}
            <h2 style={{
              fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
              fontSize: "clamp(2rem, 3.2vw, 2.8rem)",
              color: "var(--c-ink)", lineHeight: 1.06, letterSpacing: "-0.01em",
              marginBottom: "2.5rem",
            }}>
              Two degrees.<br />One rare intersection.
            </h2>

            {/* Body — very few sentences */}
            <p style={{
              fontFamily: "var(--font-sans)", fontWeight: 300,
              fontSize: "0.9rem", color: "var(--c-ink-muted)",
              lineHeight: 1.9, maxWidth: "30rem", marginBottom: "1.5rem",
            }}>
              A law degree and a computer science degree aren't the typical combination — but they're the combination that makes this practice rare.
            </p>
            <p style={{
              fontFamily: "var(--font-sans)", fontWeight: 300,
              fontSize: "0.9rem", color: "var(--c-ink-muted)",
              lineHeight: 1.9, maxWidth: "30rem", marginBottom: "3.5rem",
            }}>
              Most legal challenges in technology can't be solved by law alone. Most technical decisions carry legal consequences nobody tracks until it's too late. I built a practice at that intersection.
            </p>

            {/* Pullquote */}
            <div style={{
              borderLeft: "1px solid var(--c-accent)",
              paddingLeft: "1.75rem",
              marginBottom: "3.5rem",
            }}>
              <p style={{
                fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
                fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                color: "var(--c-ink)", lineHeight: 1.6,
              }}>
                "Legal clarity is a competitive advantage — not a compliance box."
              </p>
            </div>

            {/* Partnership list — very spare */}
            <p style={{
              fontFamily: "var(--font-manjari)", fontWeight: 700,
              fontSize: "0.52rem", letterSpacing: "0.26em", textTransform: "uppercase",
              color: "var(--c-ink-muted)", marginBottom: "1.25rem",
            }}>Open to partnering with</p>

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
                  padding: "0.8rem 0",
                  borderBottom: "1px solid var(--c-border)",
                  fontFamily: "var(--font-sans)", fontWeight: 300,
                  fontSize: "0.82rem", color: "var(--c-ink-mid)",
                  opacity: vis ? 1 : 0,
                  transition: `opacity 0.6s ease ${0.18 + i * 0.07}s`,
                }}>
                  <span style={{
                    fontFamily: "var(--font-serif)", fontStyle: "italic",
                    fontSize: "0.68rem", color: "var(--c-accent)",
                    flexShrink: 0, paddingTop: "0.1rem",
                  }}>{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </div>
              ))}
            </div>

            <Link href="/partner" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontFamily: "var(--font-manjari)", fontWeight: 700,
              fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase",
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

      <style>{`@media(max-width:720px){#bio-grid{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
    </section>
  );
}

/* ─── S3: EDITORIAL IMAGE — full-bleed break ─── */
function EditorialBreak() {
  const { ref, vis } = useReveal(0.1);
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{
      height: "clamp(420px, 70vh, 780px)",
      position: "relative",
      overflow: "hidden",
      background: "#080808",
    }}>
      <img
        src="/decra-editorial.jpg"
        alt=""
        style={{
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 20%",
          display: "block",
          opacity: vis ? 0.88 : 0,
          transform: vis ? "scale(1)" : "scale(1.04)",
          transition: "opacity 1.4s cubic-bezier(0.16,1,0.3,1), transform 1.6s cubic-bezier(0.16,1,0.3,1)",
          filter: "saturate(0.78)",
        }}
      />
      {/* Very subtle gradient top + bottom */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(8,8,8,0.18) 0%, transparent 30%, transparent 70%, rgba(8,8,8,0.28) 100%)",
        pointerEvents: "none",
      }} />
    </section>
  );
}

/* ─── S4: SOCIAL — minimal, breathing ─── */
function Social() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} style={{
      padding: "clamp(6rem,11vw,12rem) var(--space-x)",
      background: "var(--c-bg)",
      borderTop: "1px solid var(--c-border)",
    }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(3rem,7vw,8rem)", alignItems: "start",
        }} id="social-grid">

          {/* Left — heading */}
          <div style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(20px)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <p style={{
              fontFamily: "var(--font-manjari)", fontWeight: 700,
              fontSize: "0.52rem", letterSpacing: "0.26em", textTransform: "uppercase",
              color: "var(--c-ink-muted)", marginBottom: "1.5rem",
            }}>Follow the work</p>
            <h2 style={{
              fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400,
              fontSize: "clamp(2rem,3.2vw,2.8rem)",
              color: "var(--c-ink)", lineHeight: 1.06,
              marginBottom: "1.5rem",
            }}>Stay<br />connected.</h2>
            <p style={{
              fontFamily: "var(--font-sans)", fontWeight: 300,
              fontSize: "0.85rem", color: "var(--c-ink-muted)",
              lineHeight: 1.85, maxWidth: "20rem",
            }}>
              Technology law insights, case studies, and African legal tech — across platforms.
            </p>
          </div>

          {/* Right — social links */}
          <div style={{
            display: "flex", flexDirection: "column",
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(20px)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}>
            {[
              {
                Icon: IgIcon,
                label: "Instagram",
                handle: "@decrakerubo",
                url: "https://instagram.com/decrakerubo",
                desc: "Life at the intersection of law and tech",
              },
              {
                Icon: LiIcon,
                label: "LinkedIn",
                handle: "Decra Kerubo",
                url: "https://linkedin.com/in/decrakerubo",
                desc: "Professional insights and technology law commentary",
              },
            ].map(({ Icon, label, handle, url, desc }, i) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer" style={{
                display: "flex", gap: "1.75rem", alignItems: "flex-start",
                padding: "2rem 0",
                borderBottom: "1px solid var(--c-border)",
                textDecoration: "none",
                opacity: vis ? 1 : 0,
                transition: `opacity 0.6s ease ${0.15 + i * 0.1}s, filter 0.25s`,
                filter: "none",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.filter = "opacity(0.55)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter = "none"}>
                <div style={{
                  width: "2.25rem", height: "2.25rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, color: "var(--c-ink-muted)", paddingTop: "0.15rem",
                }}>
                  <Icon />
                </div>
                <div>
                  <p style={{
                    fontFamily: "var(--font-serif)", fontStyle: "italic",
                    fontSize: "1.05rem", color: "var(--c-ink)", marginBottom: "0.2rem",
                  }}>{label}</p>
                  <p style={{
                    fontFamily: "var(--font-manjari)", fontWeight: 700,
                    fontSize: "0.5rem", letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "var(--c-ink-muted)", marginBottom: "0.55rem",
                  }}>{handle}</p>
                  <p style={{
                    fontFamily: "var(--font-sans)", fontWeight: 300,
                    fontSize: "0.8rem", color: "var(--c-ink-muted)", lineHeight: 1.7,
                  }}>{desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:720px){#social-grid{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <Hero />
      <Bio />
      <EditorialBreak />
      <Social />
    </>
  );
}
