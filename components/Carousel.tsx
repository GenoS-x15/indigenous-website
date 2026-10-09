"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type Slide = { src: string; title: string; date?: string; text?: string };

function usePerView() {
  const [n, setN] = useState(1);
  useEffect(() => {
    const calc = () => setN(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return n;
}

/** Rolling strip of event photos. Pauses on hover and focus, and respects reduced motion. */
export function Carousel({ slides, label }: { slides: Slide[]; label: string }) {
  const perView = usePerView();
  const max = Math.max(0, slides.length - perView);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const go = useCallback((i: number) => setIndex(i > max ? 0 : i < 0 ? max : i), [max]);

  useEffect(() => {
    if (paused || reduced.current || max === 0) return;
    const id = window.setInterval(() => setIndex((i) => (i >= max ? 0 : i + 1)), 4200);
    return () => window.clearInterval(id);
  }, [paused, max]);

  const safeIndex = Math.min(index, max);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative"
    >
      <div className="overflow-hidden rounded-3xl">
        <ul
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          style={{ transform: `translateX(-${(safeIndex * 100) / perView}%)` }}
        >
          {slides.map((s, i) => (
            <li
              key={s.src + i}
              className="shrink-0 px-2"
              style={{ width: `${100 / perView}%` }}
              aria-hidden={i < safeIndex || i >= safeIndex + perView}
            >
              <figure className="group overflow-hidden rounded-2xl border border-forest-100 bg-white shadow-sm">
                <div className="relative aspect-[4/3] overflow-hidden bg-forest-100">
                  <Image
                    src={s.src}
                    alt={s.title}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <figcaption className="p-4">
                  {s.date && (
                    <p className="text-xs font-bold uppercase tracking-wider text-forest-600">{s.date}</p>
                  )}
                  <p className="mt-1 font-bold leading-snug text-forest-950">{s.title}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      {max > 0 && (
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex gap-2" role="group" aria-label="Slides">
            {Array.from({ length: max + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                aria-current={i === safeIndex}
                onClick={() => go(i)}
                className={`h-2.5 rounded-full transition-all ${i === safeIndex ? "w-8 bg-forest-700" : "w-2.5 bg-forest-200 hover:bg-forest-400"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" aria-label="Previous" onClick={() => go(safeIndex - 1)} className="rounded-full border border-forest-200 p-2 text-forest-800 hover:bg-forest-50">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M15 6l-6 6 6 6" /></svg>
            </button>
            <button type="button" aria-label="Next" onClick={() => go(safeIndex + 1)} className="rounded-full border border-forest-200 p-2 text-forest-800 hover:bg-forest-50">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
