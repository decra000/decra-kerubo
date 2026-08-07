import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Art",
  description:
    "An untitled poem by Decra Kerubo. Poetry and visual work alongside the law and the code.",
  alternates: { canonical: "https://decrakerubo.com/art" },
};

const POETRY_URL = "https://a.co/d/02koN5PF";

const HERO_IMAGE = "/art-hero-portrait.webp";

/* ── The poem ──
   Untitled, and set exactly as written: one block, the poet's own line
   breaks, no stanza divisions invented for it and no typographic
   emphasis added to the closing lines. */
const POEM = [
  "The soles of your feet are made of the fragments of my yard,",
  "A nurture for a thousand generations back,",
  "Why is your life an act of mercy like you're lack of devotion?",
  "Why are you glued to that spot like you're lack of morals?",
];

export default function ArtPage() {
  return (
    <div className="art-page">
      {/* ── The piece ── */}
      <section className="art-stage">
        <div className="art-frame">
          <div
            className="art-canvas"
            role="img"
            aria-label="A black-and-white portrait of Decra Kerubo, lit against a dark ground."
          />
          <div className="art-stage-fade" aria-hidden="true" />
        </div>

        {/* The hero carries the image and nothing else. The page still needs
            a heading for the document outline and for anyone arriving by
            screen reader, so it is here but not drawn. */}
        <h1 className="art-sr-only">Art — a poem by Decra Kerubo</h1>
      </section>

      {/* ── The poem ── */}
      <section className="art-poem-wrap">
        <div className="art-poem">
          <p className="art-stanza">
            {POEM.map((line, i) => (
              <span key={i} className="art-line" style={{ animationDelay: `${0.2 + i * 0.13}s` }}>
                {line}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ── Full-width portrait: the poem ends, then her face, then the way
             out. Drawn as a background rather than an <img> so it degrades to
             the page's own dark gradient if the asset is ever missing. ── */}
      <section className="art-portrait" aria-label="Portrait of Decra Kerubo">
        <div className="art-portrait-img" />
        <div className="art-portrait-grade" aria-hidden="true" />
      </section>

      <section className="art-outro">
        {/* ── More works ── */}
        <a
          className="art-more"
          href={POETRY_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="art-more-label">More works</span>
          <span className="art-more-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 34" width="22" height="30" fill="none">
              <path d="M12 1 V30" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              <path d="M4 22 L12 31 L20 22" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
      </section>

      <style>{`
        /* Pure black, so the hero photograph runs edge to edge into the page
           and the poem below sits in the same dark. */
        .art-page {
          background: #000;
          color: #F3E8DC;
        }

        /* This page paints its own black whatever theme the visitor is in, so
           the navbar's ink-coloured links disappear into it — in light mode
           they were #2E2E2E on black. Lift them for this page only. :has()
           scopes it here without the navbar having to know about this page,
           and !important is required because those colours are inline styles
           (the hover handlers set them on the element directly). */
        body:has(.art-page) .nav-logo {
          color: rgba(244, 234, 220, 0.94) !important;
        }
        body:has(.art-page) .nav-link {
          color: rgba(244, 234, 220, 0.72) !important;
        }
        body:has(.art-page) .nav-link:hover {
          color: #FFFFFF !important;
        }
        body:has(.art-page) .theme-toggle,
        body:has(.art-page) .nav-mob-toggle {
          color: rgba(244, 234, 220, 0.9) !important;
          border-color: rgba(244, 234, 220, 0.32) !important;
        }
        /* The CTA is a filled block, so it needs the inverse treatment: a light
           plate with dark type, rather than dark-on-dark. */
        body:has(.art-page) .nav-cta {
          background: #F4EADC !important;
          color: #0A0A0A !important;
        }

        /* ── Stage ──
           The portrait is held to a readable size and centred, rather than
           run to the full width: at 1278px across, a face is too big to take
           in as a face. The frame stays square so the square photograph fills
           it with nothing cropped. Sized up again — the previous 62rem cap
           read as small on wide screens, so the hard rem cap is dropped
           entirely in favour of a near-full-bleed width, held back only by a
           small side margin and a vh ceiling for square-aspect tall screens. */
        .art-stage {
          position: relative;
          width: 100%;
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1.5rem, 3vh, 2.5rem) clamp(0.75rem, 2vw, 2rem);
        }
        /* Fixed at 800px rather than driven by the viewport: the frame is
           square, so its width sets how large the face is drawn, and past
           roughly this size it stops reading as a portrait. The 100% term
           only takes over on screens narrower than 800px. */
        .art-frame {
          position: relative;
          width: min(100%, 50rem);
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }
        .art-canvas {
          position: absolute;
          inset: 0;
          background-image: url('${HERO_IMAGE}');
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center 80%;
          /* Pushed further from 78% to 80% — another small nudge, cropping a
             touch more off the top and shifting the visible subject higher
             still in the frame. */
          /* Deliberately no entrance animation. The image is the entire hero,
             and an opacity-0 start would leave the page looking blank for
             anyone whose animations never run. */
        }
        /* Present to assistive tech and to the document outline, drawn nowhere. */
        .art-sr-only {
          position: absolute;
          width: 1px; height: 1px;
          margin: -1px; padding: 0; border: 0;
          overflow: hidden;
          clip-path: inset(50%);
          white-space: nowrap;
        }
        /* Dissolves the frame's top and bottom edges into the page, so the
           square has no hard horizontal cut. Gentler than before: the frame
           is now small enough that a heavy fade would eat the portrait. Its
           left and right edges need nothing — the photograph's own ground is
           already black. */
        /* Dissolves the frame's edges into the page. Originally this only
           needed to handle the top/bottom edges — the frame sat inset with
           side padding, so the page's own black background naturally
           letterboxed the left/right sides. Now that the frame runs full
           width edge-to-edge, that letterboxing is gone, so a horizontal
           fade is layered in as well (via a second background/mask-style
           gradient) to stop the image ending in a hard vertical line at the
           viewport edges. The top fade has been increased (0/6/14/22 →
           0/10/22/34): darker through the upper-mid stop and reaching full
           transparency later, so more of the top of the frame is blended
           into the page black before the clear middle begins. */
        .art-stage-fade {
          position: absolute; inset: 0;
          background:
            linear-gradient(
              180deg,
              #000 0%,
              rgba(0,0,0,0.72) 10%,
              rgba(0,0,0,0.28) 22%,
              rgba(0,0,0,0) 34%,
              rgba(0,0,0,0) 74%,
              rgba(0,0,0,0.22) 85%,
              rgba(0,0,0,0.70) 95%,
              #000 100%
            ),
            linear-gradient(
              90deg,
              #000 0%,
              rgba(0,0,0,0.45) 3%,
              rgba(0,0,0,0) 9%,
              rgba(0,0,0,0) 91%,
              rgba(0,0,0,0.45) 97%,
              #000 100%
            );
          z-index: 1; pointer-events: none;
        }

        /* ── Poem ── */
        .art-poem-wrap {
          padding: clamp(4rem, 10vw, 8rem) var(--space-page-x) clamp(3.5rem, 8vw, 6rem);
        }
        /* Wide enough that the longest line has real headroom — at 36rem it
           cleared by 7px, which a font fallback would have wiped out, and a
           wrapped line would break the poet's line breaks. */
        .art-poem {
          max-width: 44rem;
          margin: 0 auto;
        }
        /* Font size stepped down from the original clamp(1.05rem, 1.6vw, 1.3rem)
           — the poem is longer now, so a touch smaller keeps the block from
           reading as oversized against the frame above it. */
        .art-stanza {
          font-family: var(--font-serif), Georgia, serif;
          font-size: clamp(0.92rem, 1.35vw, 1.12rem);
          line-height: 2.05;
          color: rgba(243, 232, 220, 0.9);
          margin: 0;
          text-align: center;
        }
        /* Each line is its own block so the poet's line breaks hold at every
           width instead of reflowing, and so they can arrive in sequence. */
        .art-line {
          display: block;
          animation: artRise 1.4s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* ── Full-width portrait ── */
        .art-portrait {
          position: relative;
          width: 100%;
          height: clamp(300px, 52vh, 560px);
          overflow: hidden;
        }
        .art-portrait-img {
          position: absolute;
          inset: 0;
          background-image: url('/decra-portrait-bw.webp');
          background-size: cover;
          background-position: 53% 28%;
          background-repeat: no-repeat;
          animation: artPortraitDrift 26s ease-in-out infinite alternate;
        }
        /* Melts the photo into the page at both edges so it reads as part of
           the piece rather than a pasted-in rectangle. */
        .art-portrait-grade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, #000 0%, rgba(0,0,0,0.35) 16%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.4) 82%, #000 100%);
        }
        @keyframes artPortraitDrift {
          from { transform: scale(1.02); }
          to   { transform: scale(1.10); }
        }

        .art-outro {
          padding: clamp(3rem, 7vw, 5rem) var(--space-page-x) clamp(5rem, 12vw, 9rem);
        }

        /* ── More works ── */
        .art-more {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.55rem;
          margin: 0 auto;
          width: fit-content;
          text-decoration: none;
          color: rgba(255, 216, 176, 0.9);
          transition: color 0.3s ease;
        }
        .art-more:hover { color: #FFF3E4; }
        .art-more-label {
          font-family: var(--font-manjari), sans-serif;
          font-weight: 700; font-size: 0.62rem;
          letter-spacing: 0.26em; text-transform: uppercase;
        }
        .art-more-arrow {
          display: block;
          animation: artBeckon 2.4s cubic-bezier(0.45,0,0.55,1) infinite;
        }
        .art-more:hover .art-more-arrow { animation-duration: 1.4s; }

        /* ── Motion ── */
        @keyframes artRise {
          from { opacity: 0; transform: translateY(22px); filter: blur(4px); }
          to   { opacity: 1; transform: none;             filter: blur(0);   }
        }
        @keyframes artBeckon {
          0%, 100% { transform: translateY(-4px); opacity: 0.55; }
          50%      { transform: translateY(5px);  opacity: 1;    }
        }

        @media (prefers-reduced-motion: reduce) {
          .art-line { animation: none !important; opacity: 1; transform: none; filter: none; }
          .art-portrait-img,
          .art-more-arrow { animation: none !important; }
        }

        /* ── Mobile: hero runs full width, edge to edge ──
           Below 640px the side padding and the width cap are dropped so the
           square strip fills the viewport's full width rather than sitting
           inset like the desktop frame. Top/bottom padding stays so the
           fades still have room to breathe.

           Both overlays (.art-stage-fade on the hero, .art-portrait-grade on
           the lower portrait) are unconditional in the base styles above, so
           they were always rendering on mobile — but with the frame now
           edge-to-edge there's no side letterboxing to help them read as an
           overlay, and the portrait strip is shorter here, so both gradients
           are restated with stronger stops for this breakpoint rather than
           left to inherit values tuned for a taller desktop frame. */
        @media (max-width: 640px) {
          .art-stage {
            padding-left: 0;
            padding-right: 0;
          }
          .art-frame {
            width: 100vw;
            max-width: 100vw;
          }
          .art-stage-fade {
            background: linear-gradient(
              180deg,
              #000 0%,
              rgba(0,0,0,0.7) 6%,
              rgba(0,0,0,0.2) 16%,
              rgba(0,0,0,0) 26%,
              rgba(0,0,0,0) 72%,
              rgba(0,0,0,0.3) 84%,
              rgba(0,0,0,0.78) 94%,
              #000 100%
            );
          }
          .art-portrait {
            height: clamp(220px, 42vh, 380px);
          }
          .art-portrait-grade {
            background:
              linear-gradient(180deg, #000 0%, rgba(0,0,0,0.45) 14%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.5) 80%, #000 100%);
          }
        }
      `}</style>
    </div>
  );
}