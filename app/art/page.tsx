import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Art",
  description:
    "An untitled poem by Decra Kerubo. Poetry and visual work alongside the law and the code.",
  alternates: { canonical: "https://decrakerubo.com/art" },
};

const POETRY_URL =
  "https://www.amazon.com/s?i=digital-text&rh=p_27%3ADecra+the+Poet&s=relevancerank&text=Decra+the+Poet&ref=dp_byline_sr_ebooks_2";

/* The burnt sheet, photographed on black. Sitting in its own file rather
   than being drawn means the char reads as real paper: the curl, the
   scorch bleeding through the fibres, the torn wound in the middle. The
   surrounding black matches the page, so it needs no framing. */
const HERO_IMAGE = "/art-burnt-paper.webp";

/* ── The poem ──
   Untitled, and set exactly as written: one block, the poet's own line
   breaks, no stanza divisions invented for it and no typographic
   emphasis added to the closing lines. */
const POEM = [
  "Lenny, the soles of your feet are made of fragments of my yard,",
  "my love, my pain, my home,",
  "and still you keep crawling back to it.",
  "You knew how to tie your laces when you were four.",
  "Nations are changing, Lenny,",
  "and you're stood there like you're immortal.",
  "Another light goes out. We don't ask whose.",
  "Where are you going, Lenny.",
];

export default function ArtPage() {
  return (
    <div className="art-page">
      {/* ── The piece ── */}
      <section className="art-stage">
        <div
          className="art-canvas"
          role="img"
          aria-label="A sheet of paper burned through the middle, its edges curled and scorched, resting on black."
        />

        {/* The hero carries the image and nothing else. The page still needs
            a heading for the document outline and for anyone arriving by
            screen reader, so it is here but not drawn. */}
        <h1 className="art-sr-only">Art — a poem by Decra Kerubo</h1>

        <div className="art-stage-fade" aria-hidden="true" />
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
        /* Pure black, so the photograph's own background is indistinguishable
           from the page and the sheet appears to float. */
        .art-page {
          background: #000;
          color: #F3E8DC;
        }

        /* ── Stage ── */
        .art-stage {
          position: relative;
          min-height: 100svh;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        /* contain, never cover: the shape of the burnt sheet is the image,
           and cropping it to fill the viewport would cut exactly that away.
           With nothing else in the hero it sits dead centre. */
        .art-canvas {
          position: absolute;
          inset: 0;
          background-image: url('${HERO_IMAGE}');
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
          /* Deliberately no entrance animation. The image is the entire hero
             now, and an opacity-0 start would leave the page looking blank
             for anyone whose animations never run. */
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
        .art-stage-fade {
          position: absolute; left: 0; right: 0; bottom: 0; height: 22vh;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, #000 100%);
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
        .art-stanza {
          font-family: var(--font-serif), Georgia, serif;
          font-size: clamp(1.05rem, 1.6vw, 1.3rem);
          line-height: 2.15;
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

        /* On a phone the sheet takes a little more of the width, so it isn't
           marooned in the middle of a tall black screen. */
        @media (max-width: 820px) {
          .art-canvas { background-size: 112%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .art-line { animation: none !important; opacity: 1; transform: none; filter: none; }
          .art-portrait-img,
          .art-more-arrow { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
