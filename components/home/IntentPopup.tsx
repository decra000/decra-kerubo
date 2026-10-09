"use client";

import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";

type Path = "building" | "thinking" | "meeting";

const paths: { id: Path; eyebrow: string; title: string; note: string; href: string }[] = [
  {
    id: "building",
    eyebrow: "I have something in motion",
    title: "I’m building a product",
    note: "Let’s bring product, engineering and legal judgment into the same room.",
    href: "/services/embedded-product-counsel",
  },
  {
    id: "thinking",
    eyebrow: "I’m weighing a decision",
    title: "I need a clear point of view",
    note: "For a product, an AI system, a partnership or a question that needs untangling.",
    href: "/services",
  },
  {
    id: "meeting",
    eyebrow: "I’d rather talk it through",
    title: "Let’s have a conversation",
    note: "Bring the unfinished version. We can find the useful next step together.",
    href: "/book",
  },
];

export function IntentPopup() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      if (sessionStorage.getItem("decra-welcome-seen")) return;
      timer = setTimeout(() => setVisible(true), 1400);
    } catch {
      // If storage is unavailable, keep the page uninterrupted.
    }
    return () => { if (timer) clearTimeout(timer); };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") dismiss(); };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [visible]);

  const dismiss = () => {
    if (closing) return;
    setClosing(true);
    try { sessionStorage.setItem("decra-welcome-seen", "1"); } catch { /* continue */ }
    setTimeout(() => setVisible(false), 260);
  };

  if (!visible) return null;

  return (
    <div
      className={`welcome-screen${closing ? " is-closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      onClick={dismiss}
    >
      <div className="welcome-frame" onClick={(event) => event.stopPropagation()}>
        <button className="welcome-close" type="button" onClick={dismiss} aria-label="Close welcome note">
          <span>Let me explore</span><X size={17} strokeWidth={1.5} />
        </button>

        <div className="welcome-copy">
          <p className="welcome-kicker"><span /> A note from Decra</p>
          <h2 id="welcome-title">You don’t have to<br /><em>have it all figured out.</em></h2>
          <p className="welcome-intro">Some days the best move is to pause, get a little perspective, and decide what matters next. Start wherever you are.</p>
        </div>

        <div className="welcome-paths">
          {paths.map((path, index) => (
            <a className="welcome-path" href={path.href} key={path.id} onClick={dismiss} style={{ "--path-index": index } as React.CSSProperties}>
              <span className="welcome-path-copy">
                <span className="welcome-path-eyebrow">{path.eyebrow}</span>
                <span className="welcome-path-title">{path.title}</span>
                <span className="welcome-path-note">{path.note}</span>
              </span>
              <ArrowRight className="welcome-arrow" size={18} strokeWidth={1.4} />
            </a>
          ))}
        </div>

        <p className="welcome-signoff">Take your time. The work will still be here.</p>
      </div>

      <style>{`
        .welcome-screen{position:fixed;inset:0;z-index:1200;display:grid;place-items:center;padding:clamp(1rem,4vw,3.5rem);background:rgba(12,15,13,.92);color:#f5f3ed;backdrop-filter:blur(18px);animation:welcome-in .48s cubic-bezier(.2,.75,.25,1) both}
        .welcome-screen.is-closing{animation:welcome-out .26s ease both}
        .welcome-frame{position:relative;width:min(100%,74rem);max-height:min(90svh,58rem);overflow:auto;padding:clamp(2rem,6vw,5.5rem);border:1px solid rgba(245,243,237,.16);background:radial-gradient(ellipse at 12% 0%,rgba(95,169,143,.11),transparent 43%),linear-gradient(135deg,#171c19,#101311 66%);box-shadow:0 32px 100px rgba(0,0,0,.38)}
        .welcome-close{position:absolute;right:clamp(1.25rem,3vw,2.5rem);top:clamp(1.25rem,3vw,2.5rem);display:flex;align-items:center;gap:.65rem;padding:.45rem 0;border:0;background:none;color:rgba(245,243,237,.67);font:500 .68rem/1 var(--font-sans);cursor:pointer;transition:color .2s ease}
        .welcome-close:hover,.welcome-close:focus-visible{color:#fff}
        .welcome-copy{max-width:52rem;margin-bottom:clamp(2rem,5vw,4rem)}
        .welcome-kicker{display:flex;align-items:center;gap:.65rem;margin-bottom:1.5rem;color:#aeb9ae;font:700 .62rem/1 var(--font-manjari);letter-spacing:.2em;text-transform:uppercase}
        .welcome-kicker span{width:1.5rem;height:1px;background:#70aa91}
        .welcome-copy h2{margin-bottom:1.25rem;color:#f4f1e9;font:400 clamp(2.5rem,6vw,5.8rem)/.98 var(--font-serif);letter-spacing:-.035em}
        .welcome-copy h2 em{color:#b8c3b7;font-weight:400}
        .welcome-intro{max-width:37rem;color:rgba(245,243,237,.7);font:400 clamp(.9rem,1.25vw,1.02rem)/1.75 var(--font-sans)}
        .welcome-paths{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid rgba(245,243,237,.18);border-bottom:1px solid rgba(245,243,237,.18)}
        .welcome-path{min-height:12rem;display:flex;align-items:flex-start;justify-content:space-between;gap:1.25rem;padding:1.6rem 1.5rem 1.7rem 0;color:inherit;text-decoration:none;transition:background .25s ease,padding .25s ease,color .25s ease;animation:welcome-rise .55s cubic-bezier(.2,.75,.25,1) both;animation-delay:calc(.12s + var(--path-index)*.08s)}
        .welcome-path+.welcome-path{padding-left:1.5rem;border-left:1px solid rgba(245,243,237,.14)}
        .welcome-path:hover,.welcome-path:focus-visible{background:rgba(245,243,237,.045);padding-top:1.85rem;color:#fff}
        .welcome-path-copy{display:flex;flex-direction:column;align-items:flex-start}
        .welcome-path-eyebrow{margin-bottom:1rem;color:#8d9d91;font:700 .58rem/1.4 var(--font-manjari);letter-spacing:.13em;text-transform:uppercase}
        .welcome-path-title{margin-bottom:.6rem;color:#f4f1e9;font:400 clamp(1.1rem,1.65vw,1.45rem)/1.2 var(--font-serif)}
        .welcome-path-note{max-width:18rem;color:rgba(245,243,237,.58);font:400 .76rem/1.65 var(--font-sans)}
        .welcome-arrow{flex:0 0 auto;margin-top:.1rem;color:#91b39e;transition:transform .22s ease}
        .welcome-path:hover .welcome-arrow,.welcome-path:focus-visible .welcome-arrow{transform:translateX(4px)}
        .welcome-signoff{margin-top:1.5rem;color:rgba(245,243,237,.45);font:italic 400 .82rem/1.5 var(--font-serif)}
        @keyframes welcome-in{from{opacity:0}to{opacity:1}}
        @keyframes welcome-out{to{opacity:0;visibility:hidden}}
        @keyframes welcome-rise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
        @media(max-width:700px){.welcome-screen{padding:0;align-items:end}.welcome-frame{width:100%;max-height:94svh;padding:5.25rem 1.35rem 1.5rem;border-width:1px 0 0}.welcome-copy{margin-bottom:1.5rem}.welcome-copy h2{font-size:clamp(2.35rem,11vw,3.6rem)}.welcome-copy h2 br{display:none}.welcome-intro{font-size:.85rem}.welcome-paths{grid-template-columns:1fr}.welcome-path{min-height:auto;padding:1rem 0;align-items:center}.welcome-path+.welcome-path{padding-left:0;border-left:0;border-top:1px solid rgba(245,243,237,.12)}.welcome-path-eyebrow{margin-bottom:.35rem}.welcome-path-title{margin-bottom:.2rem;font-size:1.12rem}.welcome-path-note{font-size:.72rem}.welcome-signoff{margin-top:1rem;font-size:.76rem}}
        @media(prefers-reduced-motion:reduce){.welcome-screen,.welcome-path{animation:none}.welcome-path,.welcome-arrow{transition:none}}
      `}</style>
    </div>
  );
}
