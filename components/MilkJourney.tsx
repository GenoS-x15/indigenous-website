"use client";

import Image from "next/image";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { Container, SectionTitle } from "./ui";
import { useReducedMotion } from "@/lib/motion";

// The company's own photos, in the same order as journey.steps in the language files.
const STEP_IMAGES = [
  "/images/goat-hero.jpg",
  "/images/milk-record.jpg",
  "/images/events/dairy-bmc.jpg",
  "/images/events/dairy-lab.jpg",
  "/images/events/processing-plant.jpg",
  "/images/events/milk-delivery.jpg",
];

const ROUTE = "M0,40 C100,0 150,0 200,40 S300,80 400,40 S500,0 600,40 S700,80 800,40 S900,0 1000,40 S1100,80 1200,40";

/** From goat to family: six steps joined by a path, with a drop of milk travelling along it on wide screens. */
export function MilkJourney() {
  const { t } = useLang();
  const j = t.journey;
  const reduced = useReducedMotion();

  return (
    <section className="bg-forest-50 py-20 sm:py-28">
      <Container>
        <SectionTitle title={j.title} text={j.intro} />
        <div className="relative mt-14">
          <svg
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            aria-hidden
            focusable="false"
            className="absolute inset-x-[8%] top-12 hidden h-20 w-[84%] text-forest-300 lg:block"
          >
            <path id="milk-route" d={ROUTE} fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            {!reduced && (
              <circle r="9" className="fill-white stroke-forest-600" strokeWidth="3">
                <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#milk-route" />
                </animateMotion>
              </circle>
            )}
          </svg>
          <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
            {j.steps.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 80} className="flex gap-5 lg:block lg:text-center">
                <div className={`relative h-24 w-24 shrink-0 overflow-hidden bg-forest-100 lg:mx-auto lg:h-32 lg:w-32 ${i % 2 ? "mask-blob-2" : "mask-blob-1"}`}>
                  <Image src={STEP_IMAGES[i]} alt={s.t} fill sizes="128px" className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-forest-600 lg:mt-5">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="text-lg font-extrabold text-forest-950">{s.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-forest-900/80">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
