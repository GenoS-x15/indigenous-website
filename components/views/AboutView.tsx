"use client";

import Image from "next/image";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { Check, Container, PageBanner, SectionTitle } from "../ui";
import { COLLAB_IMAGES } from "@/lib/events";
import { SITE } from "@/lib/site";

export function AboutView() {
  const { t } = useLang();
  const a = t.about;

  return (
    <>
      <PageBanner title={a.title} intro={a.intro} image="/images/herd-field.jpg" />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-3">
          <Reveal className="rounded-3xl border border-forest-100 bg-forest-50 p-7 lg:col-span-1">
            <h2 className="text-xl font-extrabold text-forest-900">{a.factsTitle}</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-forest-700">{t.brand.full}</dt>
              </div>
              <div>
                <dt className="text-forest-700">{a.cin}</dt>
                <dd className="font-mono font-semibold text-forest-950">{SITE.cin}</dd>
              </div>
              <div>
                <dt className="text-forest-700">{a.gstin}</dt>
                <dd className="font-mono font-semibold text-forest-950">{SITE.gstin}</dd>
              </div>
              <div>
                <dt className="text-forest-700">{a.ceo}</dt>
                <dd className="font-semibold text-forest-950">{SITE.ceo}</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={100} className="rounded-3xl bg-forest-800 p-7 text-white lg:col-span-1">
            <h2 className="text-2xl font-extrabold">{a.visionTitle}</h2>
            <p className="mt-4 leading-relaxed text-forest-100">{a.vision}</p>
          </Reveal>

          <Reveal delay={200} className="rounded-3xl border border-forest-200 p-7 lg:col-span-1">
            <h2 className="text-2xl font-extrabold text-forest-900">{a.missionTitle}</h2>
            <ul className="mt-4 space-y-3 text-[15px] text-forest-950">
              {a.mission.map((m) => (
                <Check key={m}>{m}</Check>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="bg-forest-50 py-16 sm:py-20">
        <Container>
          <SectionTitle title={a.collabTitle} text={a.collabIntro} />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {a.collab.map((c, i) => (
              <Reveal as="li" key={c} delay={(i % 4) * 80} className="overflow-hidden rounded-2xl border border-forest-100 bg-white shadow-sm">
                <div className="relative aspect-[16/10]">
                  <Image src={COLLAB_IMAGES[i]} alt={c} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
                </div>
                <p className="p-4 font-semibold text-forest-900">{c}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
