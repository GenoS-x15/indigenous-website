"use client";

import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { Check, Container, PageBanner, Photo, SectionTitle } from "../ui";

export function TrainingView() {
  const { t } = useLang();
  const tr = t.training;

  return (
    <>
      <PageBanner title={tr.title} intro={tr.intro} image="/images/hoof-care.jpg" />

      {/* Why */}
      <section className="py-16 sm:py-20">
        <Container className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle title={tr.whyTitle} />
            <ul className="mt-6 space-y-4 text-lg text-forest-950">
              {tr.why.map((w) => (
                <Check key={w}>{w}</Check>
              ))}
            </ul>
          </div>
          <Reveal>
            <Photo src="/images/herd-feeding.jpg" alt="Goats feeding at a trough" className="aspect-[4/3]" sizes="(min-width:1024px) 45vw, 100vw" />
          </Reveal>
        </Container>
      </section>

      {/* Four blocks */}
      <section className="bg-forest-50 py-16 sm:py-20">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2">
            {tr.blocks.map((b, i) => (
              <Reveal as="li" key={b.title} delay={(i % 2) * 100} className="rounded-3xl border border-forest-100 bg-white p-7 shadow-sm">
                <h3 className="text-xl font-extrabold text-forest-900">{b.title}</h3>
                <ul className="mt-4 space-y-3 text-forest-950">
                  {b.points.map((p) => (
                    <Check key={p}>{p}</Check>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Records */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <Reveal className="rounded-3xl bg-forest-800 p-8 text-white">
            <h2 className="text-2xl font-extrabold">{tr.recordTitle}</h2>
            <p className="mt-2 text-forest-100">{tr.recordIntro}</p>
            <ul className="mt-6 space-y-4 text-forest-50">
              {tr.records.map((r) => (
                <Check key={r}>{r}</Check>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-3 gap-3">
              <Photo src="/images/milk-record.jpg" alt="Measuring goat milk" className="aspect-square" sizes="15vw" />
              <Photo src="/images/dung-record.jpg" alt="Goat dung collected for recording" className="aspect-square" sizes="15vw" />
              <Photo src="/images/lab-urine.jpg" alt="Goat urine distillation apparatus" className="aspect-square" sizes="15vw" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-2xl font-extrabold text-forest-900">{tr.goatInfoTitle}</h2>
            <ol className="mt-5 grid gap-2 sm:grid-cols-1">
              {tr.goatInfo.map((g, i) => (
                <li key={g} className="flex gap-4 rounded-xl border border-forest-100 px-4 py-3 text-forest-950">
                  <span className="font-extrabold text-forest-600">{i + 1}</span>
                  <span>{g}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      {/* Enrolment */}
      <section className="bg-forest-50 py-16 sm:py-20">
        <Container>
          <SectionTitle title={tr.enrolTitle} text={tr.enrolIntro} />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {tr.enrolGroups.map((grp, i) => (
              <Reveal key={grp.title} delay={i * 100} className="rounded-3xl bg-white p-7 shadow-sm">
                <h3 className="text-lg font-extrabold text-forest-900">{grp.title}</h3>
                <ul className="mt-4 space-y-2.5 text-[15px] text-forest-950">
                  {grp.items.map((it) => (
                    <Check key={it}>{it}</Check>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
