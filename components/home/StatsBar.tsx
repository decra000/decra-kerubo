"use client";
import { useEffect, useRef, useState } from "react";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let n = 0;
        const step = target / 40;
        const id = setInterval(() => {
          n += step;
          if (n >= target) { setCount(target); clearInterval(id); }
          else setCount(Math.floor(n));
        }, 35);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export function StatsBar() {
  return (
    /* Surface bg — one step up from parchment, not dark */
    <div style={{ background: "var(--c-surface)", borderTop: "1px solid var(--c-border)", borderBottom: "1px solid var(--c-border)", padding: "2.5rem var(--space-page-x)" }}>
      <div className="inner" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2rem", textAlign: "center" }} id="stats-grid">
        {[
          { v: 15, s: " min", l: "Free discovery call" },
          { v: 48, s: "h",    l: "Response guarantee" },
          { v: 2,  s: "",     l: "Advisory tracks" },
          { v: 5,  s: "+",    l: "Years in practice" },
        ].map(({ v, s, l }) => (
          <div key={l}>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem,3vw,2.4rem)", color: "var(--c-sage-dark)", lineHeight: 1, marginBottom: "0.4rem" }}>
              <Counter target={v} suffix={s} />
            </p>
            <p style={{ fontSize: "0.775rem", color: "var(--c-ink-muted)" }}>{l}</p>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:560px){ #stats-grid { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
    </div>
  );
}
