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

        {/* The poem is untitled, so the page's heading is the section label
            itself rather than an invented title over her work. */}
        <div className="art-stage-copy">
          <div className="art-eyebrow">
            <span className="art-rule" />
            <h1 className="art-eyebrow-heading">Art</h1>
          </div>
          <p className="art-byline">A poem — Decra Kerubo</p>
        </div>

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
        {/* ── See more ── */}
        <a
          className="art-more"
          href={POETRY_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="art-more-label">See more</span>
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
           and cropping it to fill the viewport would cut exactly that away. */
        .art-canvas {
          position: absolute;
          inset: 0;
          background-image: url('${HERO_IMAGE}');
          background-repeat: no-repeat;
          background-size: contain;
          background-position: 92% center;
        }
        /* The sheet sits right of centre, so the label takes the black space
           beside it rather than fighting the paper for the same ground. */
        .art-stage-copy {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: var(--max-w);
          margin: 0 auto;
          padding: 0 var(--space-page-x);
          animation: artRise 1.6s cubic-bezier(0.16,1,0.3,1) 0.2s both;
        }
        .art-eyebrow {
          display: flex; align-items: center; gap: 0.7rem;
          margin-bottom: 1.4rem;
          font-family: var(--font-manjari), sans-serif;
          font-weight: 700; font-size: 0.58rem;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: rgba(214, 186, 152, 0.75);
        }
        .art-rule { display: block; width: 1.6rem; height: 1px; background: rgba(214, 186, 152, 0.5); }
        /* The h1 carries the page's heading without looking like one. */
        .art-eyebrow-heading {
          font: inherit;
          letter-spacing: inherit;
          text-transform: inherit;
          color: inherit;
          margin: 0;
        }
        .art-byline {
          font-family: var(--font-serif), Georgia, serif;
          font-style: italic;
          font-size: clamp(1.05rem, 1.7vw, 1.4rem);
          letter-spacing: 0.01em;
          color: rgba(243, 232, 220, 0.72);
          margin: 0;
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

        /* ── See more ── */
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

        /* On a phone the sheet fills the width, so there is no black column
           beside it — the label moves below it instead, centred. */
        @media (max-width: 820px) {
          .art-stage { align-items: flex-end; }
          .art-canvas { background-position: center 24%; background-size: 106%; }
          .art-stage-copy {
            text-align: center;
            padding-bottom: clamp(2.5rem, 8vh, 4.5rem);
          }
          .art-eyebrow { justify-content: center; margin-bottom: 1rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .art-stage-copy,
          .art-stanza { animation: none !important; opacity: 1; transform: none; filter: none; }
          .art-portrait-img,
          .art-more-arrow { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
