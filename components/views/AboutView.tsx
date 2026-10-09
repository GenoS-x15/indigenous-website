"use client";

import Image from "next/image";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { Wave } from "../Wave";
import { Container, PageBanner, SectionTitle } from "../ui";
import { COLLAB_IMAGES } from "@/lib/events";
import { SITE } from "@/lib/site";

const MASKS = ["mask-blob-1", "mask-blob-2", "mask-arch", "mask-blob-3"];

export function AboutView() {
  const { t } = useLang();
  const a = t.about;

  return (
    <>
      <PageBanner title={a.title} intro={a.intro} image="banner-about" alt={t.alt.about} />

      {/* Company details and vision */}
      <section className="py-16 sm:py-24">
        <Container className="grid gap-16 lg:grid-cols-[20rem_1fr] lg:gap-24">
          <Reveal>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-forest-600">{a.factsTitle}</h2>
            <dl className="mt-6 divide-y divide-forest-900/10 border-y border-forest-900/10">
              <div className="py-4">
                <dt className="sr-only">{t.brand.full}</dt>
                <dd className="font-bold text-forest-950">{SITE.legalName}</dd>
              </div>
              <div className="py-4">
                <dt className="text-sm text-forest-700">{a.cin}</dt>
                <dd className="font-mono font-semibold text-forest-950">{SITE.cin}</dd>
              </div>
              <div className="py-4">
                <dt className="text-sm text-forest-700">{a.gstin}</dt>
                <dd className="font-mono font-semibold text-forest-950">{SITE.gstin}</dd>
              </div>
              <div className="py-4">
                <dt className="text-sm text-forest-700">{a.ceo}</dt>
                <dd className="font-semibold text-forest-950">{SITE.ceo}</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-forest-600">{a.visionTitle}</h2>
            <blockquote className="mt-6 text-2xl font-semibold leading-snug text-forest-950 sm:text-4xl">
              <span className="text-forest-400" aria-hidden>
                &ldquo;
              </span>
              {a.vision}
              <span className="text-forest-400" aria-hidden>
                &rdquo;
              </span>
            </blockquote>
          </Reveal>
        </Container>
      </section>

      {/* Mission */}
      <section className="hoof-pattern bg-forest-900 text-white">
        <Wave className="text-white" top shape="hill" />
        <Container className="py-14 sm:py-20">
          <SectionTitle title={a.missionTitle} dark />
          <ol className="mt-10 grid gap-x-16 md:grid-cols-2">
            {a.mission.map((m, i) => (
              <Reveal as="li" key={m} delay={(i % 2) * 80} className="flex gap-6 border-b border-white/15 py-6">
                <span className="text-4xl font-extrabold leading-none text-forest-400" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg leading-relaxed text-forest-50">{m}</span>
              </Reveal>
            ))}
          </ol>
        </Container>
        <Wave className="text-white" />
      </section>

      {/* Collaborations */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionTitle title={a.collabTitle} text={a.collabIntro} />
          <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {a.collab.map((c, i) => (
              <Reveal as="li" key={c} delay={(i % 4) * 80}>
                <div className={`relative aspect-[4/3] overflow-hidden bg-forest-100 ${MASKS[i % MASKS.length]}`}>
                  <Image src={COLLAB_IMAGES[i]} alt={c} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
                </div>
                <p className="mt-4 border-t border-forest-900/10 pt-3 font-bold text-forest-950">{c}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
