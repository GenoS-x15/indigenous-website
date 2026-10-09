"use client";

import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { Wave } from "../Wave";
import { Container, Line, PageBanner, Photo, SectionTitle } from "../ui";

export function TrainingView() {
  const { t } = useLang();
  const tr = t.training;

  return (
    <>
      <PageBanner title={tr.title} intro={tr.intro} image="banner-women-training" alt={t.alt.training} />

      {/* Why */}
      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTitle title={tr.whyTitle} />
            <ul className="mt-8 text-lg text-forest-950">
              {tr.why.map((w) => (
                <Line key={w}>{w}</Line>
              ))}
            </ul>
          </div>
          <Reveal>
            <Photo src="/images/herd-feeding.jpg" alt="Goats feeding at a trough" mask="mask-blob-2" className="aspect-[4/3] w-full" sizes="(min-width:1024px) 45vw, 100vw" />
          </Reveal>
        </Container>
      </section>

      {/* Four areas of care, as open editorial columns */}
      <section className="bg-forest-50 py-16 sm:py-24">
        <Container>
          <ol className="grid gap-x-16 gap-y-14 md:grid-cols-2">
            {tr.blocks.map((b, i) => (
              <Reveal as="li" key={b.title} delay={(i % 2) * 100}>
                <p className="text-6xl font-extrabold leading-none text-forest-200" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-forest-950">{b.title}</h2>
                <ul className="mt-4 text-forest-950">
                  {b.points.map((p) => (
                    <Line key={p} marker="hoof">
                      {p}
                    </Line>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Daily records */}
      <section className="hoof-pattern bg-forest-900 text-white">
        <Wave className="text-forest-50" top shape="hill" />
        <Container className="grid gap-14 py-14 sm:py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTitle title={tr.recordTitle} text={tr.recordIntro} dark />
            <ul className="mt-8 text-lg">
              {tr.records.map((r) => (
                <Line key={r} dark>
                  {r}
                </Line>
              ))}
            </ul>
          </div>
          <Reveal className="grid grid-cols-3 items-end gap-4">
            <Photo src="/images/milk-record.jpg" alt="Measuring goat milk" mask="mask-arch" className="aspect-[3/5]" sizes="20vw" />
            <Photo src="/images/dung-record.jpg" alt="Goat dung collected for recording" mask="mask-arch" className="aspect-[3/4]" sizes="20vw" />
            <Photo src="/images/lab-urine.jpg" alt="Goat urine distillation apparatus" mask="mask-arch" className="aspect-[3/5]" sizes="20vw" />
          </Reveal>
        </Container>
        <Wave className="text-white" />
      </section>

      {/* Information for each goat */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionTitle title={tr.goatInfoTitle} />
          <ol className="mt-10 grid gap-x-16 md:grid-cols-2">
            {tr.goatInfo.map((g, i) => (
              <li key={g} className="flex gap-5 border-b border-forest-900/10 py-4 text-forest-950">
                <span className="w-8 shrink-0 text-2xl font-extrabold text-forest-300" aria-hidden>
                  {i + 1}
                </span>
                <span className="leading-relaxed">{g}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Enrolment checklist: the one card on this page, so it can be printed or kept as a list */}
      <section className="bg-forest-50 py-16 sm:py-24">
        <Container>
          <SectionTitle title={tr.enrolTitle} text={tr.enrolIntro} />
          <Reveal className="mt-10 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-forest-900/5 sm:p-10">
            <div className="grid gap-10 lg:grid-cols-3">
              {tr.enrolGroups.map((grp) => (
                <div key={grp.title}>
                  <h3 className="text-lg font-extrabold text-forest-900">{grp.title}</h3>
                  <ul className="mt-3 text-[15px] text-forest-950">
                    {grp.items.map((it) => (
                      <Line key={it}>{it}</Line>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
