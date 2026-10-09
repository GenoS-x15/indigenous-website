"use client";

import Image from "../Img";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { MilkJourney } from "../MilkJourney";
import { Wave } from "../Wave";
import { Container, Line, PageBanner, Photo, SectionTitle, WebPicture } from "../ui";

const TARGETS = [6000, 15000, 25000];

export function ProjectView() {
  const { t } = useLang();
  const p = t.project;

  return (
    <>
      <PageBanner title={p.title} intro={p.intro} image="banner-project" alt={t.alt.project} />

      {/* Where we work */}
      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTitle title={p.whereTitle} text={p.where} />
            <Reveal className="mt-10 space-y-6">
              {[
                { name: p.dhule, villages: p.dhuleVillages },
                { name: p.nandurbar, villages: p.nandurbarVillages },
              ].map((d) => (
                <div key={d.name} className="border-t border-forest-900/10 pt-4">
                  <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-forest-700">
                    {d.name} <span className="text-forest-400">({d.villages.length})</span>
                  </h3>
                  <p className="mt-2 leading-relaxed text-forest-950">{d.villages.join("  ·  ")}</p>
                </div>
              ))}
            </Reveal>
          </div>
          <Reveal className="relative pb-14 pl-10">
            <Photo src="/images/events/dairy-building.jpg" alt="The goat dairy building at Malpur" mask="mask-blob-2" className="aspect-[4/3] w-full" />
            <div className="mask-arch absolute bottom-0 left-0 aspect-[3/4] w-1/3 overflow-hidden ring-8 ring-white">
              <WebPicture name="milk-cans" alt={t.alt.milkCans} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Objectives: three big words */}
      <section className="bg-forest-50 py-16 sm:py-24">
        <Container>
          <SectionTitle title={p.objTitle} text={p.objText} />
          <ul className="mt-12 grid gap-6 sm:grid-cols-3">
            {p.objThree.map((o, i) => (
              <Reveal as="li" key={o} delay={i * 90} className="border-t-4 border-forest-600 pt-4">
                <span className="text-sm font-bold text-forest-600">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-1 text-4xl font-extrabold text-forest-950 sm:text-5xl">{o}</p>
              </Reveal>
            ))}
          </ul>
          <ul className="mt-12 max-w-3xl text-lg text-forest-950">
            {p.objPoints.map((o) => (
              <Line key={o}>{o}</Line>
            ))}
          </ul>
        </Container>
      </section>

      {/* Methodology */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionTitle title={p.methodTitle} />
          <ol className="mt-12 grid gap-x-16 md:grid-cols-2">
            {p.method.map((m, i) => (
              <Reveal as="li" key={m.t} delay={(i % 2) * 80} className="flex gap-6 border-b border-forest-900/10 py-7">
                <span className="w-14 shrink-0 text-5xl font-extrabold leading-none text-forest-200" aria-hidden>
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-forest-950">{m.t}</h3>
                  <p className="mt-2 leading-relaxed text-forest-900/80">{m.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Milk targets: large numbers instead of a bar chart */}
      <section className="hoof-pattern bg-forest-900 text-white">
        <Wave className="text-white" top shape="hill" />
        <Container className="py-14 sm:py-20">
          <SectionTitle title={p.targetTitle} text={p.targetText} dark />
          <dl className="mt-12 grid gap-10 sm:grid-cols-3" aria-label={p.chart}>
            {TARGETS.map((n, i) => (
              <Reveal key={n} delay={i * 100} className="flex flex-col-reverse border-l border-white/20 pl-5">
                <dt className="mt-2 text-sm text-forest-100">{p.targetLabels[i]}</dt>
                <dd className="text-5xl font-extrabold tracking-tight text-forest-200 sm:text-6xl">
                  {n.toLocaleString("en-IN")}
                  <span className="block text-base font-bold tracking-normal text-forest-300">{p.perDay}</span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
        <Wave className="text-white" />
      </section>

      {/* Value addition and the dairy */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionTitle title={p.valueTitle} text={p.valueText} />
          <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-forest-600">{p.fourTitle}</h3>
              <ol className="mt-4">
                {p.four.map((f, i) => (
                  <li key={f} className="flex items-baseline gap-5 border-b border-forest-900/10 py-4">
                    <span className="text-3xl font-extrabold text-forest-300" aria-hidden>
                      {i + 1}
                    </span>
                    <span className="text-xl font-bold text-forest-950">{f}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="text-2xl font-extrabold text-forest-950">{p.dairyTitle}</h3>
              <p className="mt-4 text-lg leading-relaxed text-forest-900/85">{p.dairyText}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <MilkJourney />

      {/* Associates */}
      <section className="py-16">
        <Container>
          <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-forest-600">{p.associatesTitle}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-10">
            <Image src="/images/partner-asf.png" alt="Annasaheb Shinde Foundation" width={150} height={150} className="h-24 w-auto object-contain" />
            <Image src="/images/partner-aja-mesh.png" alt="Aja Mesh Support Pvt. Ltd." width={170} height={150} className="h-24 w-auto object-contain" />
          </div>
        </Container>
      </section>
    </>
  );
}
