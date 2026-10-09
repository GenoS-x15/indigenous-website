"use client";

import Image from "next/image";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { Check, Container, PageBanner, Photo, SectionTitle } from "../ui";

export function ProjectView() {
  const { t } = useLang();
  const p = t.project;
  const bars = [
    { label: "1", value: 6000 },
    { label: "2", value: 15000 },
    { label: "3", value: 25000 },
  ];

  return (
    <>
      <PageBanner title={p.title} intro={p.intro} image="/images/events/dairy-bmc.jpg" />

      {/* Where */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle title={p.whereTitle} text={p.where} />
            <Reveal className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="font-bold text-forest-800">{p.dhule}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.dhuleVillages.map((v) => (
                    <li key={v} className="rounded-full bg-forest-100 px-3 py-1 text-sm font-medium text-forest-900">{v}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-forest-800">{p.nandurbar}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.nandurbarVillages.map((v) => (
                    <li key={v} className="rounded-full bg-forest-100 px-3 py-1 text-sm font-medium text-forest-900">{v}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <Photo src="/images/events/dairy-building.jpg" alt="The goat dairy building at Malpur" className="aspect-[4/3]" />
          </Reveal>
        </Container>
      </section>

      {/* Objectives */}
      <section className="bg-forest-50 py-16 sm:py-20">
        <Container>
          <SectionTitle title={p.objTitle} text={p.objText} />
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {p.objThree.map((o, i) => (
              <Reveal as="li" key={o} delay={i * 90} className="rounded-2xl bg-forest-700 p-6 text-center text-xl font-extrabold text-white">
                {o}
              </Reveal>
            ))}
          </ul>
          <ul className="mt-8 grid max-w-4xl gap-3 text-forest-950">
            {p.objPoints.map((o) => (
              <Check key={o}>{o}</Check>
            ))}
          </ul>
        </Container>
      </section>

      {/* Methodology */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionTitle title={p.methodTitle} />
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {p.method.map((m, i) => (
              <Reveal as="li" key={m.t} delay={(i % 3) * 90} className="rounded-2xl border border-forest-100 bg-white p-6 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-100 font-extrabold text-forest-800">{i + 1}</span>
                <h3 className="mt-4 text-lg font-bold text-forest-900">{m.t}</h3>
                <p className="mt-2 leading-relaxed text-forest-950/80">{m.d}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Targets */}
      <section className="bg-forest-900 py-16 text-white sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-extrabold sm:text-4xl">{p.targetTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-forest-100">{p.targetText}</p>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-3xl bg-forest-800 p-6 sm:p-8" role="img" aria-label={p.chart}>
              <div className="flex h-56 items-end gap-6">
                {bars.map((b) => (
                  <div key={b.label} className="flex flex-1 flex-col items-center justify-end gap-2">
                    <span className="text-sm font-bold text-forest-100">{b.value.toLocaleString("en-IN")}</span>
                    <div className="w-full rounded-t-xl bg-gradient-to-t from-forest-500 to-forest-300" style={{ height: `${(b.value / 25000) * 170}px` }} />
                    <span className="text-xs font-semibold text-forest-200">{b.label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-forest-200">{p.chart}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Value addition */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionTitle title={p.valueTitle} text={p.valueText} />
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <Reveal className="rounded-3xl bg-forest-50 p-7">
              <h3 className="text-xl font-extrabold text-forest-900">{p.fourTitle}</h3>
              <ol className="mt-5 space-y-3">
                {p.four.map((f, i) => (
                  <li key={f} className="flex items-center gap-4 rounded-xl bg-white p-4 font-semibold text-forest-950 shadow-sm">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-700 text-sm text-white">{i + 1}</span>
                    {f}
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="text-xl font-extrabold text-forest-900">{p.dairyTitle}</h3>
              <p className="mt-3 leading-relaxed text-forest-950/85">{p.dairyText}</p>
            </Reveal>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Photo src="/images/events/dairy-bmc.jpg" alt="Bulk milk chillers at the dairy" className="aspect-square" sizes="25vw" />
            <Photo src="/images/events/processing-plant.jpg" alt="Milk processing equipment" className="aspect-square" sizes="25vw" />
            <Photo src="/images/events/dairy-lab.jpg" alt="Milk testing laboratory" className="aspect-square" sizes="25vw" />
            <Photo src="/images/events/milk-delivery.jpg" alt="Milk delivery vehicle leaving Malpur" className="aspect-square" sizes="25vw" />
          </div>
        </Container>
      </section>

      {/* Associates */}
      <section className="pb-8">
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
