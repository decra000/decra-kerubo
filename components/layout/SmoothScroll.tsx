"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Buttery, inertia-based smooth scrolling for the whole site.
 * Wraps the page in a Lenis instance driven by requestAnimationFrame,
 * and keeps the reading-progress bar (#rp) in sync on every tick.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 4), // smooth quart-out — glide, no bounce
      smoothWheel: true,
      touchMultiplier: 1.1,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;

    const rp = document.getElementById("rp");
    lenis.on("scroll", ({ scroll, limit }: { scroll: number; limit: number }) => {
      if (rp && limit > 0) rp.style.width = `${(scroll / limit) * 100}%`;
    });

    let raf: number;
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    // Let in-page anchor links (nav, footer, #services etc.) use the same
    // smooth, eased scroll instead of jumping.
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a[href^='#'], a[href^='/#']");
      if (!target) return;
      const href = target.getAttribute("href") || "";
      const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { duration: 1.3, easing: (t: number) => 1 - Math.pow(1 - t, 4), offset: -70 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
