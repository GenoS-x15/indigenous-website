"use client";

import { useEffect, useRef } from "react";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { HoofPrint } from "./Shapes";
import { Container, SectionTitle, WebPicture } from "./ui";
import { trackScroll } from "@/lib/motion";

/** Goat life-cycle: a winding line draws itself down the page as the stages scroll past. */
export function LifeCycle() {
  const { t } = useLang();
  const l = t.lifecycle;
  const list = useRef<HTMLOListElement>(null);
  const line = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = list.current;
    const path = line.current;
    if (!el || !path || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Draw a little ahead of the reader (fully drawn two-thirds of the way through), and never undraw.
    let drawn = 0;
    return trackScroll(el, (p) => {
      drawn = Math.max(drawn, Math.min(1, p * 1.6));
      path.style.strokeDashoffset = String(1 - drawn);
    });
  }, []);

  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[1fr_22rem] lg:gap-20">
        <div>
          <SectionTitle title={l.title} text={l.intro} />
          <ol ref={list} className="relative mt-14 pl-16 sm:pl-20">
            <svg
              viewBox="0 0 64 1000"
              preserveAspectRatio="none"
              aria-hidden
              focusable="false"
              className="absolute left-0 top-0 h-full w-12 text-forest-500 sm:w-16"
            >
              <path
                ref={line}
                d="M32 0 C4 100 60 200 32 300 S4 500 32 600 S60 800 32 1000"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="1"
                strokeDashoffset="0"
                pathLength={1}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {l.stages.map((s, i) => (
              <Reveal as="li" key={s.t} delay={60} className="relative pb-12 last:pb-0">
                <span className="absolute -left-16 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-white text-forest-700 ring-2 ring-forest-500 sm:-left-20 sm:h-16 sm:w-16">
                  <HoofPrint size={22} />
                </span>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-forest-600">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-2xl font-extrabold text-forest-950">{s.t}</h3>
                <p className="mt-2 max-w-xl leading-relaxed text-forest-900/80">{s.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
        <div className="relative hidden lg:block">
          <div className="sticky top-40">
            <div className="mask-blob-2 relative aspect-[3/4] w-full bg-forest-100">
              <WebPicture name="goat-kids" alt={t.alt.kids} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
