"use client";

import Image from "./Img";
import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { Container } from "./ui";

/**
 * Breed spotlight: the photo reveals the breed details on hover (mouse) or with the button (touch, keyboard).
 * Facts come from breed.facts in the language files, which only repeat what the site already says.
 */
export function BreedSpotlight() {
  const { t } = useLang();
  const b = t.breed;
  const [open, setOpen] = useState(false);

  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-forest-600">{b.kicker}</p>
          <h2 className="mt-2 text-4xl font-extrabold leading-tight text-forest-950 sm:text-6xl">{b.name}</h2>
          <p className="mt-5 text-forest-900/75">{b.hint}</p>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="breed-facts"
            className="mt-6 rounded-full border-2 border-forest-700 px-6 py-3 font-semibold text-forest-800 transition hover:bg-forest-50"
          >
            {open ? b.hide : b.show}
          </button>
        </Reveal>

        <Reveal className="group relative">
          <div
            className="mask-blob-1 relative aspect-[4/3] w-full cursor-pointer overflow-hidden bg-forest-100"
            onClick={() => setOpen((v) => !v)}
          >
            <Image
              src="/images/goat-hero.jpg"
              alt={t.alt.zalawadi}
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              id="breed-facts"
              className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-forest-950/95 via-forest-950/80 to-forest-950/10 p-8 pb-12 text-white transition-all duration-500 sm:p-12 sm:pb-16 ${
                open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
              }`}
            >
              <dl className="space-y-3">
                {b.facts.map((f) => (
                  <div key={f.t}>
                    <dt className="text-xs font-bold uppercase tracking-[0.2em] text-forest-300">{f.t}</dt>
                    <dd className="text-sm leading-relaxed text-forest-50 sm:text-base">{f.d}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
