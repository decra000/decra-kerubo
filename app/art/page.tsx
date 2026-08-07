import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Art",
  description:
    "Right at the End of the Noise — a poem by Decra Kerubo. Poetry and visual work alongside the law and the code.",
  alternates: { canonical: "https://decrakerubo.com/art" },
};

const POETRY_URL =
  "https://www.amazon.com/s?i=digital-text&rh=p_27%3ADecra+the+Poet&s=relevancerank&text=Decra+the+Poet&ref=dp_byline_sr_ebooks_2";

/* The burnt sheet, photographed on black. Sitting in its own file rather
   than being drawn means the char reads as real paper: the curl, the
   scorch bleeding through the fibres, the torn wound in the middle. The
   surrounding black matches the page, so it needs no framing. */
const HERO_IMAGE = "/art-burnt-paper.webp";

/* ── The poem ── */
const TITLE = "Right at the End of the Noise";

const STANZAS: string[][] = [
  [
    "There is a room past the shouting.",
    "You reach it the way you reach sleep —",
    "not by trying. By stopping.",
  ],
  [
    "All evening the world kept its engines running:",
    "the sirens, the arguing water in the pipes,",
    "my own heart, that small unstoppable drum,",
    "insisting, insisting.",
  ],
  [
    "And then a slackening.",
    "Not silence — silence is a wall.",
    "This is the other thing:",
    "the hush that opens.",
  ],
  [
    "Put your mouth against the hour",
    "and let it go soft.",
    "Somewhere the last horn lets out its held breath.",
    "Somewhere a door decides not to close.",
  ],
  [
    "I have been loud my whole life.",
    "Let me be the quiet after.",
  ],
  [
    "It comes the way warmth comes into a hand —",
    "you never feel it arrive,",
    "you only notice you were cold before.",
    "Slowly. Then entirely.",
  ],
  [
    "This is not the dark they promised,",
    "all teeth and falling.",
    "This is the long unclenching,",
    "a fist remembering it was a palm.",
  ],
  [
    "Take everything in me that was noise",
    "and set it down.",
    "The wanting — put it down.",
    "The proving — put it down.",
    "Even the name: put it down.",
    "It was only ever a way of being called back.",
  ],
  [
    "I am spilling gently past my edges.",
    "I am the sound just after the bell,",
    "which is not the bell,",
    "and is not nothing,",
    "and is the sweetest part.",
  ],
  [
    "Hold me here.",
    "Hold me while the last of it goes out —",
    "warm, and wide, and unhurried.",
  ],
];

/* The closing lines, given their own treatment below: each one fainter and
   more widely spaced than the last, so the poem lands rather than stops. */
const CODA = [
  "and right at the end of the noise,",
  "quiet,",
  "and quiet,",
  "and enough.",
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

        <div className="art-stage-copy">
          <div className="art-eyebrow">
            <span className="art-rule" />
            <span>Art</span>
          </div>
          <h1 className="art-title">{TITLE}</h1>
          <p className="art-byline">A poem — Decra Kerubo</p>
        </div>

        <div className="art-stage-fade" aria-hidden="true" />
      </section>

      {/* ── The poem ── */}
      <section className="art-poem-wrap">
        <div className="art-poem">
          {STANZAS.map((lines, i) => (
            <p key={i} className="art-stanza" style={{ animationDelay: `${0.25 + i * 0.14}s` }}>
              {lines.map((line, j) => (
                <span key={j}>
                  {line}
                  {j < lines.length - 1 && <br />}
                </span>
              ))}
            </p>
          ))}

          {/* The closing lines slow down on the page the way they slow
              down in the mouth. */}
          <p className="art-stanza art-coda" style={{ animationDelay: `${0.25 + STANZAS.length * 0.14}s` }}>
            {CODA.map((line, i) => (
              <span key={i} className={`art-coda-${i + 1}`}>{line}</span>
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
        /* The sheet sits right of centre, so the title takes the black space
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
        .art-title {
          font-family: var(--font-serif), Georgia, serif;
          font-weight: 400; font-style: italic;
          font-size: clamp(2.4rem, 5vw, 4.2rem);
          line-height: 0.98;
          letter-spacing: -0.02em;
          color: #F4EADC;
          margin: 0 0 1rem;
          max-width: 8ch;
        }
        .art-byline {
          font-family: var(--font-sans), sans-serif;
          font-size: 0.82rem;
          letter-spacing: 0.02em;
          color: rgba(243, 232, 220, 0.55);
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
        .art-poem {
          max-width: 36rem;
          margin: 0 auto;
        }
        .art-stanza {
          font-family: var(--font-serif), Georgia, serif;
          font-size: clamp(1.02rem, 1.5vw, 1.22rem);
          line-height: 2.05;
          color: rgba(243, 232, 220, 0.9);
          margin: 0 0 2.4rem;
          text-align: center;
          animation: artRise 1.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        .art-stanza:nth-child(odd) { color: rgba(243, 232, 220, 0.82); }

        /* The last lines fall one per line, each a little fainter and a
           little wider, so the poem lands rather than stops. */
        .art-coda span { display: block; font-style: italic; }
        .art-coda-1 { opacity: 0.92; }
        .art-coda-2 { opacity: 0.80; }
        .art-coda-3 { opacity: 0.66; letter-spacing: 0.05em; }
        .art-coda-4 { opacity: 0.52; letter-spacing: 0.16em; }

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
           beside it — the title moves below it instead, centred. */
        @media (max-width: 820px) {
          .art-stage { align-items: flex-end; }
          /* Sheet sits high and a little smaller, to leave the lower third
             clear for the title, which runs to two lines at this width. */
          .art-canvas { background-position: center 20%; background-size: 104%; }
          .art-stage-copy {
            text-align: center;
            padding-bottom: clamp(2rem, 6vh, 3.5rem);
          }
          .art-eyebrow { justify-content: center; margin-bottom: 1rem; }
          .art-title { font-size: clamp(1.9rem, 8.4vw, 2.6rem); max-width: none; }
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
