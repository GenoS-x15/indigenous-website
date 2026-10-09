"use client";

import { useEffect, useRef } from "react";
import { GoatSvg, HoofPrint } from "./Shapes";
import { trackScroll } from "@/lib/motion";

// The hill line is a formula, so the path, the goat and the hoof prints all share the same geometry
// and the static HTML already has everything in place.
const W = 1200;
const H = 140;
const hill = (x: number) => 96 - 22 * Math.sin((x / W) * Math.PI * 2.4 + 0.6) - 8 * Math.sin((x / W) * Math.PI * 6.2);
const slope = (x: number) => (hill(x + 1) - hill(x - 1)) / 2;
const PATH =
  "M0," + hill(0).toFixed(1) +
  Array.from({ length: 61 }, (_, i) => ` L${i * 20},${hill(i * 20).toFixed(1)}`).join("") +
  ` L${W},${H} L0,${H} Z`;
const PRINTS = Array.from({ length: 18 }, (_, i) => 0.05 + (i / 18) * 0.9);
const START = 0.04;
const SPAN = 0.92;

/** Decorative divider: a goat walks along a hill line as the page scrolls, leaving hoof prints behind it. */
export function GoatWalk({ className = "text-forest-50" }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const goat = useRef<HTMLDivElement>(null);
  const prints = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = box.current;
    const g = goat.current;
    if (!el || !g) return;
    const place = (f: number) => {
      const x = f * W;
      g.style.left = `${f * 100}%`;
      g.style.top = `${(hill(x) / H) * 100}%`;
      g.style.transform = `translate(-50%, -94%) rotate(${Math.atan(slope(x)) * (180 / Math.PI)}deg)`;
      prints.current.forEach((p, i) => p && (p.style.opacity = PRINTS[i] < f - 0.03 ? "0.55" : "0"));
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      place(0.5);
      return;
    }
    let idle: number | undefined;
    const stop = trackScroll(el, (p) => {
      place(START + SPAN * p);
      g.setAttribute("data-walking", "");
      window.clearTimeout(idle);
      idle = window.setTimeout(() => g.removeAttribute("data-walking"), 160);
    });
    return () => {
      stop();
      window.clearTimeout(idle);
    };
  }, []);

  return (
    <div ref={box} aria-hidden className={`relative h-24 w-full [overflow-x:clip] sm:h-32 ${className}`}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" focusable="false">
        <path d={PATH} fill="currentColor" />
      </svg>
      {PRINTS.map((f, i) => (
        <span
          key={f}
          ref={(n) => {
            prints.current[i] = n;
          }}
          className="hoofprint absolute text-forest-800"
          style={{
            left: `${f * 100}%`,
            top: `${(hill(f * W) / H) * 100}%`,
            opacity: 0,
            transform: `translate(-50%, ${i % 2 ? "-30%" : "10%"}) rotate(90deg)`,
          }}
        >
          <HoofPrint size={12} />
        </span>
      ))}
      <div
        ref={goat}
        className="goat absolute w-14 text-forest-900 sm:w-20"
        style={{ left: `${START * 100}%`, top: `${(hill(START * W) / H) * 100}%`, transform: "translate(-50%, -94%)" }}
      >
        <GoatSvg />
      </div>
    </div>
  );
}
