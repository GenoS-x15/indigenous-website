"use client";

import Image from "next/image";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { Check, Container, PageBanner } from "../ui";

export function GuideView() {
  const { t } = useLang();
  const g = t.guide;

  return (
    <>
      <PageBanner title={g.title} intro={g.intro} image="/images/herd-feeding.jpg" />

      <Container className="grid gap-10 py-14 lg:grid-cols-[16rem_1fr] lg:py-20">
        <aside className="min-w-0 lg:sticky lg:top-36 lg:self-start">
          <nav aria-label={g.title} className="no-scrollbar flex max-w-full gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
            {g.sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="shrink-0 rounded-full border border-forest-200 px-4 py-2 text-sm font-semibold text-forest-800 transition hover:bg-forest-50 lg:rounded-xl">
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 space-y-14">
          {g.sections.map((s, i) => (
            <Reveal as="section" key={s.id} className="scroll-mt-40">
              <div id={s.id} className="grid gap-6 overflow-hidden rounded-3xl border border-forest-100 bg-white p-4 shadow-sm sm:p-6 md:grid-cols-5 scroll-mt-40">
                <div className={`relative min-h-60 overflow-hidden rounded-2xl bg-forest-100 md:col-span-2 ${i % 2 ? "md:order-2" : ""}`}>
                  <Image src={s.image} alt={s.title} fill sizes="(min-width:768px) 30vw, 100vw" className="object-cover" />
                </div>
                <div className="md:col-span-3">
                  <h2 className="text-2xl font-extrabold text-forest-900">{s.title}</h2>
                  <p className="mt-2 text-forest-700">{s.summary}</p>
                  <ul className="mt-5 space-y-3 text-[15px] text-ink">
                    {s.points.map((p) => (
                      <Check key={p}>{p}</Check>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal className="rounded-2xl border-l-4 border-forest-600 bg-forest-50 p-5 text-forest-950">
            <p className="font-bold">{t.common.note}</p>
            <p className="mt-1">{g.disclaimer}</p>
          </Reveal>

          <Reveal>
            <h2 className="text-xl font-extrabold text-forest-900">{t.common.sources}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-forest-800">
              {g.sourcesList.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline decoration-forest-300 underline-offset-4 hover:text-forest-950">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
