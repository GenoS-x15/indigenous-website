"use client";

import Image from "../Img";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { Container, PageBanner, SectionTitle } from "../ui";
import { COLLAB_IMAGES, EVENT_IMAGES } from "@/lib/events";

const MASKS = ["mask-blob-1", "mask-arch", "mask-blob-2", "mask-blob-3"];

export function EventsView() {
  const { t } = useLang();
  const e = t.events;
  // Items 5 and 6 are collaboration meetings, shown with the partners below.
  const milestoneIdx = [0, 1, 2, 3, 4, 7];

  return (
    <>
      <PageBanner title={e.title} intro={e.intro} image="banner-events" alt={t.alt.events} />

      {/* Milestones as a timeline */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionTitle title={e.groupEvents} />
          <ol className="mt-14 space-y-16 sm:space-y-24">
            {milestoneIdx.map((idx, n) => {
              const it = e.items[idx];
              return (
                <Reveal as="li" key={idx} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
                  <div className={`relative aspect-[4/3] w-full overflow-hidden bg-forest-100 ${MASKS[n % MASKS.length]} ${n % 2 ? "md:order-2" : ""}`}>
                    <Image src={EVENT_IMAGES[idx]} alt={it.title} fill sizes="(min-width:768px) 45vw, 100vw" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-forest-600">
                      {it.date || String(n + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-3xl font-extrabold leading-tight text-forest-950">{it.title}</h3>
                    <p className="mt-4 text-lg leading-relaxed text-forest-900/80">{it.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* Collaborations */}
      <section className="bg-forest-50 py-16 sm:py-24">
        <Container>
          <SectionTitle title={e.groupCollab} text={t.about.collabIntro} />
          <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.collab.map((c, i) => (
              <Reveal as="li" key={c} delay={(i % 4) * 80}>
                <div className={`relative aspect-[4/3] overflow-hidden bg-forest-100 ${MASKS[(i + 1) % MASKS.length]}`}>
                  <Image src={COLLAB_IMAGES[i]} alt={c} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
                </div>
                <p className="mt-4 border-t border-forest-900/10 pt-3 font-bold text-forest-950">{c}</p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-12 text-sm text-forest-800/80">{e.note}</p>
        </Container>
      </section>
    </>
  );
}
