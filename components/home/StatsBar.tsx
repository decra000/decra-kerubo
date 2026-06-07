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
        let start = 0;
        const step = target / 40;
        const id = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(id); }
          else setCount(Math.floor(start));
        }, 35);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 15, suffix: " min", label: "Free discovery call" },
  { value: 48, suffix: "h", label: "Response guarantee" },
  { value: 2, suffix: "", label: "Advisory tracks" },
  { value: 100, suffix: "%", label: "Nairobi-based" },
];

export function StatsBar() {
  return (
    <div style={{ background: "var(--c-sage-deep)", padding: "2.5rem var(--space-page-x)" }}>
      <div className="inner" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", textAlign: "center" }} id="stats-grid">
        {stats.map(s => (
          <div key={s.label}>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem,3vw,2.5rem)", color: "rgba(244,245,240,0.92)", lineHeight: 1, marginBottom: "0.4rem" }}>
              <Counter target={s.value} suffix={s.suffix} />
            </p>
            <p style={{ fontSize: "0.775rem", color: "rgba(244,245,240,0.4)", letterSpacing: "0.04em" }}>{s.label}</p>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:640px){ #stats-grid { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
    </div>
  );
}
