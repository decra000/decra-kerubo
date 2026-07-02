"use client";
import { useEffect } from "react";

/**
 * Reading-progress bar driven by native scroll — no scroll hijacking,
 * no inertia. Just a simple, honest width update on the real scroll position.
 */
export function ScrollProgress() {
  useEffect(() => {
    const rp = document.getElementById("rp");
    const fn = () => {
      if (!rp) return;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      rp.style.width = h > 0 ? `${(window.scrollY / h) * 100}%` : "0%";
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    window.addEventListener("resize", fn);
    return () => {
      window.removeEventListener("scroll", fn);
      window.removeEventListener("resize", fn);
    };
  }, []);

  return <div id="rp" style={{ width: "0%" }} />;
}
