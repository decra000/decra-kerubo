import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Art",
  description:
    "Undoing — a poem by Decra Kerubo, with an illustration that breathes. Poetry and visual work alongside the law and the code.",
  alternates: { canonical: "https://decrakerubo.com/art" },
};

const POETRY_URL = "https://hellopoetry.com/@Kirah1106";

/* ────────────────────────────────────────────────────────────────
   The illustration.

   Rather than a static drawing, the figure is built from contour
   lines the way a topographic map builds a landform: a stack of
   horizontal lines, each displaced by the same body profile, with
   the displacement strongest through the middle of the stack and
   easing to nothing above and below it. That gives volume without
   an outline — a body implied by where the lines swell, and by
   where they let go of it and flatten back into open water.

   Each line then drifts on its own slow cycle, so the whole form
   rises and settles like breath rather than sitting still.
   ──────────────────────────────────────────────────────────────── */

const W = 800;
const H = 1000;
const LINE_COUNT = 54;
const SAMPLES = 132;

/** Gaussian swell: the building block of the body profile. */
function swell(x: number, center: number, amp: number, width: number) {
  const d = (x - center) / width;
  return amp * Math.exp(-d * d);
}

/**
 * The reclining profile, read left to right: head, the dip of a
 * throat, the rise of a chest, the narrowing at the waist, hip,
 * thigh — then nothing, the body simply stops being insisted upon.
 */
function bodyProfile(t: number) {
  const value =
    swell(t, 0.235, 60, 0.052) +   // head
    swell(t, 0.305, 26, 0.032) +   // throat
    swell(t, 0.335, -14, 0.028) +  // the hollow above the collarbone
    swell(t, 0.435, 78, 0.078) +   // chest
    swell(t, 0.560, 30, 0.055) +   // waist
    swell(t, 0.680, 84, 0.072) +   // hip
    swell(t, 0.820, 44, 0.085) +   // thigh
    swell(t, 0.925, 16, 0.060);    // the last of it

  // Let the form release at both ends so it never reads as cut off.
  const release = Math.min(1, Math.max(0, (1 - t) / 0.12)) * Math.min(1, Math.max(0, t / 0.06));
  return value * release;
}

/** Deterministic jitter — no Math.random, so server and client agree. */
function seeded(i: number, salt = 1) {
  return (Math.sin(i * 12.9898 * salt) * 43758.5453) % 1;
}

function contourPath(index: number) {
  const centerIdx = LINE_COUNT * 0.42;
  const spread = LINE_COUNT * 0.30;

  // How much of the body this particular line carries.
  const k = (index - centerIdx) / spread;
  const volume = Math.exp(-k * k);

  // Lines below the body settle into open water; lines above it thin out.
  const baseY = 150 + (index / (LINE_COUNT - 1)) * 720;

  let d = "";
  for (let s = 0; s <= SAMPLES; s++) {
    const t = s / SAMPLES;
    const x = t * W;

    // A slow lateral wave, phase-shifted per line, so even the flat
    // water is never quite flat.
    const water = Math.sin(t * 7.5 + index * 0.42) * (2.6 + index * 0.11);

    const y = baseY - bodyProfile(t) * volume + water;
    d += `${s === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    if (s < SAMPLES) d += " ";
  }
  return d;
}

/** Embers leaving the body — the part that has already gone. */
const EMBERS = Array.from({ length: 26 }, (_, i) => {
  const r = seeded(i + 1);
  const r2 = seeded(i + 1, 2.7);
  const r3 = seeded(i + 1, 5.1);
  return {
    x: 120 + Math.abs(r) * 620,
    y: 320 + Math.abs(r2) * 430,
    size: 0.9 + Math.abs(r3) * 2.4,
    duration: 16 + Math.abs(r) * 16,
    delay: Math.abs(r2) * 14,
    drift: (r3 > 0 ? 1 : -1) * (10 + Math.abs(r) * 34),
  };
});

function Illustration() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="art-canvas"
      role="img"
      aria-label="An illustration of a reclining figure formed from contour lines that swell into a body and then flatten into open water, with embers rising."
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0.25" y2="1">
          <stop offset="0%" stopColor="#0B0710" />
          <stop offset="34%" stopColor="#1E0E1C" />
          <stop offset="62%" stopColor="#3E1626" />
          <stop offset="84%" stopColor="#6E2A2F" />
          <stop offset="100%" stopColor="#B4653F" />
        </linearGradient>

        <radialGradient id="bloom" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD9A8" stopOpacity="0.50" />
          <stop offset="45%" stopColor="#E88F6A" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#E8886A" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF0D6" stopOpacity="0.75" />
          <stop offset="60%" stopColor="#FFC48A" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FFC48A" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE2B8" />
          <stop offset="38%" stopColor="#FFB58A" />
          <stop offset="70%" stopColor="#E4738A" />
          <stop offset="100%" stopColor="#7A4A8C" />
        </linearGradient>

        <radialGradient id="vignette" cx="50%" cy="46%" r="62%">
          <stop offset="55%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.62" />
        </radialGradient>

        <filter id="soften" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      <rect width={W} height={H} fill="url(#sky)" />

      {/* The flood behind the eyes, breathing */}
      <g className="art-bloom">
        <ellipse cx={330} cy={430} rx={360} ry={300} fill="url(#bloom)" filter="url(#soften)" />
      </g>

      {/* Light gathering where the head tips back */}
      <g className="art-halo">
        <circle cx={188} cy={392} r={132} fill="url(#halo)" filter="url(#soften)" />
      </g>

      {/* The body, and the water it is becoming */}
      <g className="art-lines" fill="none" stroke="url(#lineGrad)" strokeLinecap="round">
        {Array.from({ length: LINE_COUNT }, (_, i) => {
          const depth = i / (LINE_COUNT - 1);
          return (
            <path
              key={i}
              d={contourPath(i)}
              strokeWidth={0.6 + (1 - Math.abs(depth - 0.42)) * 1.15}
              opacity={0.16 + (1 - Math.abs(depth - 0.42) * 1.15) * 0.62}
              style={{
                animationDuration: `${17 + (i % 7) * 2.4}s`,
                animationDelay: `${-(i * 0.31)}s`,
              }}
            />
          );
        })}
      </g>

      {/* What has already left */}
      <g className="art-embers">
        {EMBERS.map((e, i) => (
          <circle
            key={i}
            cx={e.x}
            cy={e.y}
            r={e.size}
            fill="#FFD9A8"
            style={{
              animationDuration: `${e.duration}s`,
              animationDelay: `${-e.delay}s`,
              // Each ember wanders its own way up.
              ["--drift" as string]: `${e.drift}px`,
            }}
          />
        ))}
      </g>

      <rect width={W} height={H} fill="url(#vignette)" />
    </svg>
  );
}

/* ── The poem ── */
const STANZAS: string[][] = [
  [
    "Come slowly, then. I have all evening,",
    "and the evening has no walls.",
  ],
  [
    "Lay your hand where the pulse still argues",
    "its small case for staying —",
    "tell it there is nothing left to win.",
  ],
  [
    "I am unlacing.",
    "Not torn. Not taken. Unlaced,",
    "the way light leaves a room in summer:",
    "so gradually the room believes",
    "it was always this gold, this dim, this warm.",
  ],
  [
    "Somewhere a tide decides",
    "it has held the shore long enough.",
    "Somewhere a candle stops pretending",
    "it was ever separate from the air.",
  ],
  [
    "Touch me and I go quieter —",
    "a hymn losing its consonants,",
    "a wave forgetting the word return.",
    "Every breath is a smaller country.",
    "Every smaller country is enough.",
  ],
  [
    "This is not the ending they warned about,",
    "all iron and hurry.",
    "This is the long exhale,",
    "the body agreeing at last with the dark,",
    "the spine going soft as a wick.",
  ],
  [
    "Say my name once, and misspell it.",
    "Let me be that easy to release.",
  ],
  [
    "I am arriving everywhere at once —",
    "in the ceiling, the curtain, the rain",
    "starting somewhere over the coast —",
    "and nowhere hurts.",
  ],
  [
    "Oh, the sweetness of the giving-way.",
    "The white flood behind the eyes.",
    "The hush that comes after wanting,",
    "which is not emptiness",
    "but the room that wanting was standing in.",
  ],
  [
    "Hold me while I finish.",
    "Hold me while I widen.",
    "I am not leaving.",
    "I am becoming the leaving —",
  ],
];

export default function ArtPage() {
  return (
    <div className="art-page">
      {/* ── The piece ── */}
      <section className="art-stage">
        <Illustration />

        <div className="art-stage-copy">
          <div className="art-eyebrow">
            <span className="art-rule" />
            <span>Art</span>
          </div>
          <h1 className="art-title">Undoing</h1>
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
            <span className="art-coda-1">and the leaving is warm,</span>
            <span className="art-coda-2">and the warmth</span>
            <span className="art-coda-3">is</span>
            <span className="art-coda-4">slow.</span>
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
          <span className="art-more-sub">More poems on Hello Poetry</span>
        </a>
      </section>

      <style>{`
        .art-page {
          background: #0B0710;
          color: #F3E8DC;
        }

        /* ── Stage ── */
        .art-stage {
          position: relative;
          min-height: 100svh;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
        }
        .art-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
        }
        .art-stage-copy {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: var(--max-w);
          margin: 0 auto;
          padding: 0 var(--space-page-x) clamp(4rem, 12vh, 8rem);
          animation: artRise 1.6s cubic-bezier(0.16,1,0.3,1) 0.2s both;
        }
        .art-eyebrow {
          display: flex; align-items: center; gap: 0.7rem;
          margin-bottom: 1.4rem;
          font-family: var(--font-manjari), sans-serif;
          font-weight: 700; font-size: 0.58rem;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: rgba(255, 216, 176, 0.75);
        }
        .art-rule { display: block; width: 1.6rem; height: 1px; background: rgba(255, 216, 176, 0.55); }
        .art-title {
          font-family: var(--font-serif), Georgia, serif;
          font-weight: 400; font-style: italic;
          font-size: clamp(3rem, 11vw, 7.5rem);
          line-height: 0.94;
          letter-spacing: -0.02em;
          color: #FFF3E4;
          margin: 0 0 1rem;
          text-shadow: 0 2px 40px rgba(0,0,0,0.45);
        }
        .art-byline {
          font-family: var(--font-sans), sans-serif;
          font-size: 0.82rem;
          letter-spacing: 0.02em;
          color: rgba(243, 232, 220, 0.62);
          margin: 0;
        }
        .art-stage-fade {
          position: absolute; left: 0; right: 0; bottom: 0; height: 22vh;
          background: linear-gradient(180deg, rgba(11,7,16,0) 0%, #0B0710 100%);
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
          animation: artRise 1.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        .art-stanza:nth-child(odd) { color: rgba(243, 232, 220, 0.82); }

        /* The last four lines fall one per line, each a little further
           in and a little fainter, so the poem lands rather than stops. */
        .art-coda span { display: block; font-style: italic; }
        .art-coda-1 { padding-left: 0;      opacity: 0.92; }
        .art-coda-2 { padding-left: 2.2rem; opacity: 0.80; }
        .art-coda-3 { padding-left: 5.2rem; opacity: 0.66; letter-spacing: 0.05em; }
        .art-coda-4 { padding-left: 9rem;   opacity: 0.52; letter-spacing: 0.16em; }

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
            linear-gradient(180deg, #0B0710 0%, rgba(11,7,16,0.35) 16%, rgba(11,7,16,0) 42%, rgba(11,7,16,0.4) 82%, #0B0710 100%);
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
        .art-more-sub {
          font-family: var(--font-sans), sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.02em;
          color: rgba(243, 232, 220, 0.42);
          transition: color 0.3s ease;
        }
        .art-more:hover .art-more-sub { color: rgba(243, 232, 220, 0.7); }

        /* ── Motion ── */
        @keyframes artRise {
          from { opacity: 0; transform: translateY(22px); filter: blur(4px); }
          to   { opacity: 1; transform: none;             filter: blur(0);   }
        }
        @keyframes artBeckon {
          0%, 100% { transform: translateY(-4px); opacity: 0.55; }
          50%      { transform: translateY(5px);  opacity: 1;    }
        }

        .art-lines path {
          animation-name: artBreathe;
          animation-timing-function: cubic-bezier(0.45,0,0.55,1);
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }
        @keyframes artBreathe {
          from { transform: translate3d(-7px, 3px, 0); }
          to   { transform: translate3d(7px, -3px, 0); }
        }

        .art-bloom { animation: artBloom 11s ease-in-out infinite alternate; transform-origin: 330px 430px; }
        @keyframes artBloom {
          from { opacity: 0.68; transform: scale(0.94); }
          to   { opacity: 1;    transform: scale(1.07); }
        }
        .art-halo { animation: artHalo 8.5s ease-in-out infinite alternate; transform-origin: 188px 392px; }
        @keyframes artHalo {
          from { opacity: 0.62; transform: scale(0.97); }
          to   { opacity: 1;    transform: scale(1.05); }
        }

        .art-embers circle {
          animation-name: artEmber;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes artEmber {
          0%   { opacity: 0;    transform: translate3d(0, 0, 0); }
          18%  { opacity: 0.85; }
          70%  { opacity: 0.5; }
          100% { opacity: 0;    transform: translate3d(var(--drift), -190px, 0); }
        }

        @media (max-width: 640px) {
          .art-stage-copy { padding-bottom: clamp(3rem, 9vh, 5rem); }
          .art-coda-2 { padding-left: 1.4rem; }
          .art-coda-3 { padding-left: 3.2rem; }
          .art-coda-4 { padding-left: 5.4rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .art-stage-copy,
          .art-stanza { animation: none !important; opacity: 1; transform: none; filter: none; }
          .art-lines path,
          .art-embers circle,
          .art-bloom,
          .art-halo,
          .art-portrait-img,
          .art-more-arrow { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
