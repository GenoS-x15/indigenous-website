"use client";

import Image from "next/image";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { Container, PageBanner, SectionTitle } from "../ui";
import { COLLAB_IMAGES, EVENT_IMAGES } from "@/lib/events";

export function EventsView() {
  const { t } = useLang();
  const e = t.events;
  // Items 5 and 6 are collaboration meetings, shown in their own group below.
  const milestoneIdx = [0, 1, 2, 3, 4, 7];

  return (
    <>
      <PageBanner title={e.title} intro={e.intro} image="/images/events/health-camp.jpg" />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionTitle title={e.groupEvents} />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {milestoneIdx.map((idx, n) => {
              const it = e.items[idx];
              return (
                <Reveal as="li" key={idx} delay={(n % 3) * 90} className="group overflow-hidden rounded-3xl border border-forest-100 bg-white shadow-sm">
                  <div className="relative aspect-[4/3] overflow-hidden bg-forest-100">
                    <Image src={EVENT_IMAGES[idx]} alt={it.title} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-5">
                    {it.date && <p className="text-xs font-bold uppercase tracking-wider text-forest-600">{it.date}</p>}
                    <h3 className="mt-1 text-lg font-bold text-forest-950">{it.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-forest-950/80">{it.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className="bg-forest-50 py-16 sm:py-20">
        <Container>
          <SectionTitle title={e.groupCollab} text={t.about.collabIntro} />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.collab.map((c, i) => (
              <Reveal as="li" key={c} delay={(i % 4) * 80} className="group overflow-hidden rounded-2xl border border-forest-100 bg-white shadow-sm">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={COLLAB_IMAGES[i]} alt={c} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <p className="p-4 font-semibold text-forest-900">{c}</p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-10 text-sm text-forest-800/80">{e.note}</p>
        </Container>
      </section>
    </>
  );
}
