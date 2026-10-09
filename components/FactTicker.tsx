"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { HoofPrint } from "./Shapes";
import { Container } from "./ui";
import { useReducedMotion } from "@/lib/motion";

/** A slow band of short goat facts. Pauses on hover, focus or the pause button; a plain list under reduced motion. */
export function FactTicker() {
  const { t } = useLang();
  const k = t.ticker;
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  const items = (copy: number) =>
    k.facts.map((f) => (
      <li key={`${copy}-${f}`} className="flex shrink-0 items-center gap-3 pr-12">
        <HoofPrint size={16} className="text-forest-500" />
        <span>{f}</span>
      </li>
    ));

  return (
    <section aria-label={k.title} className="border-y border-forest-900/10 bg-white py-6">
      <Container className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <p className="w-full shrink-0 text-sm font-bold uppercase tracking-[0.2em] text-forest-600 sm:w-auto">{k.title}</p>
        {reduced ? (
          <ul className="flex flex-wrap gap-y-2 text-forest-950">{items(0)}</ul>
        ) : (
          <>
            <div
              className="ticker relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
              data-paused={paused ? "" : undefined}
              tabIndex={0}
            >
              <div className="ticker-track flex w-max text-forest-950">
                <ul className="flex">{items(0)}</ul>
                <ul className="flex" aria-hidden>
                  {items(1)}
                </ul>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              aria-label={paused ? k.play : k.pause}
              title={paused ? k.play : k.pause}
              className="shrink-0 rounded-full p-2 text-forest-800 transition hover:bg-forest-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h4v14H7zM13 5h4v14h-4z" />}
              </svg>
            </button>
          </>
        )}
      </Container>
    </section>
  );
}
