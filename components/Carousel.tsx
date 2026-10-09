"use client";

import Image from "./Img";
import { useCallback, useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { useReducedMotion } from "@/lib/motion";

export type Slide = { src: string; title: string; date?: string; text?: string };

const INTERVAL_MS = 6000;

/** Full-height photo slides with the caption on the photo. Pauses on hover, focus or the pause button. */
export function Carousel({ slides, label }: { slides: Slide[]; label: string }) {
  const { t } = useLang();
  const c = t.carousel;
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const paused = hovered || stopped || reduced;

  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [paused, index, slides.length]);

  const s = slides[index];
  const btn =
    "flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/40 backdrop-blur transition hover:bg-white/30";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className="carousel relative isolate h-[70svh] max-h-[44rem] min-h-[26rem] overflow-hidden bg-forest-950 text-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {slides.map((sl, i) => (
        <div
          key={sl.src + i}
          aria-hidden={i !== index}
          className={`absolute inset-0 -z-10 transition-[opacity,transform] duration-1000 ${i === index ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
        >
          <Image src={sl.src} alt={i === index ? sl.title : ""} fill sizes="100vw" className="object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950/95 via-forest-950/40 to-transparent" />

      <div className="flex h-full flex-col justify-end px-5 pb-8 sm:px-10 sm:pb-12 lg:px-16">
        <div aria-live={paused ? "polite" : "off"} className="max-w-3xl">
          <p className="text-sm font-semibold text-forest-200">
            {c.slideOf.replace("{n}", String(index + 1)).replace("{total}", String(slides.length))}
            {s.date && <span className="ml-3 font-bold uppercase tracking-wider text-forest-300">{s.date}</span>}
          </p>
          <h3 className="mt-2 text-2xl font-extrabold leading-tight sm:text-4xl">{s.title}</h3>
          {s.text && <p className="mt-2 max-w-2xl leading-relaxed text-forest-50/85">{s.text}</p>}
        </div>

        <div className="mt-8 flex items-center gap-3">
          <button type="button" aria-label={c.prev} onClick={() => go(index - 1)} className={btn}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button type="button" aria-label={c.next} onClick={() => go(index + 1)} className={btn}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {!reduced && (
            <button
              type="button"
              aria-label={stopped ? c.play : c.pause}
              aria-pressed={stopped}
              onClick={() => setStopped((v) => !v)}
              className={`${btn} !h-11 !w-11`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                {stopped ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h4v14H7zM13 5h4v14h-4z" />}
              </svg>
            </button>
          )}
          {/* Restarts with each slide and after a pause, in step with the timer. */}
          <div className="ml-2 h-0.5 min-w-0 flex-1 overflow-hidden bg-white/20" aria-hidden>
            {!paused && (
              <div key={index} className="progress-line h-full bg-white" style={{ ["--dur" as string]: `${INTERVAL_MS}ms` }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
