"use client";

import { useEffect, useRef } from "react";

const fmt = (n: number) => Math.round(n).toLocaleString("en-IN");

/** A number that counts up from zero the first time it scrolls into view. The static HTML shows the final value. */
export function CountUp({ value, className = "" }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") return;
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1600);
          el.textContent = fmt(value * (1 - Math.pow(1 - t, 3)));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    // Only count up if the number starts out of view, so nobody sees it jump back to zero.
    const r = el.getBoundingClientRect();
    if (r.top > window.innerHeight) {
      el.textContent = fmt(0);
      io.observe(el);
    }
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {fmt(value)}
    </span>
  );
}
