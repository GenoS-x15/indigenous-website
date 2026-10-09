"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { Container, Line, PageBanner } from "../ui";
import { withApp } from "@/lib/site";

const MASKS = ["mask-blob-1", "mask-arch", "mask-blob-2", "mask-blob-3"];

export function GuideView() {
  const { t } = useLang();
  const g = t.guide;
  const [active, setActive] = useState(g.sections[0].id);

  // Highlight the jump link of the section currently in the middle of the screen.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    g.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [g.sections]);

  return (
    <>
      <PageBanner title={g.title} intro={g.intro} image="banner-care-guide" alt={t.alt.guide} />

      <Container className="grid gap-12 py-14 lg:grid-cols-[14rem_1fr] lg:gap-16 lg:py-20">
        <aside className="min-w-0 lg:sticky lg:top-36 lg:self-start">
          <nav aria-label={t.guidePage.onThisPage}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest-600">{t.guidePage.onThisPage}</p>
            <ol className="no-scrollbar mt-3 flex gap-5 overflow-x-auto border-b border-forest-900/10 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-b-0 lg:border-l">
              {g.sections.map((s, i) => {
                const on = active === s.id;
                return (
                  <li key={s.id} className="shrink-0">
                    <a
                      href={`#${s.id}`}
                      aria-current={on ? "location" : undefined}
                      className={`-mb-px block border-b-2 py-2 text-sm transition-colors lg:-ml-px lg:mb-0 lg:border-b-0 lg:border-l-2 lg:py-1.5 lg:pl-4 ${
                        on ? "border-forest-600 font-bold text-forest-950" : "border-transparent text-forest-800/80 hover:text-forest-950"
                      }`}
                    >
                      <span className="mr-2 tabular-nums text-forest-400">{String(i + 1).padStart(2, "0")}</span>
                      {s.title}
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        </aside>

        <div className="min-w-0">
          {g.sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-36 border-b border-forest-900/10 py-14 first:pt-0 sm:py-20">
              <Reveal
                className={`grid items-start gap-10 ${i % 2 ? "md:grid-cols-[17rem_1fr] xl:grid-cols-[20rem_1fr]" : "md:grid-cols-[1fr_17rem] xl:grid-cols-[1fr_20rem]"}`}
              >
                <div className={i % 2 ? "md:order-2" : ""}>
                  <p className="text-7xl font-extrabold leading-none text-forest-100" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="-mt-6 text-3xl font-extrabold text-forest-950 sm:text-4xl">{s.title}</h2>
                  <p className="mt-6 border-l-4 border-forest-500 pl-5 text-xl font-semibold leading-snug text-forest-800 sm:text-2xl">{s.summary}</p>
                  <ul className="mt-6 text-[17px] text-forest-950">
                    {s.points.map((p) => (
                      <Line key={p}>{withApp(p)}</Line>
                    ))}
                  </ul>
                </div>
                <div className={`relative aspect-[4/5] w-full overflow-hidden bg-forest-100 md:sticky md:top-40 ${MASKS[i % MASKS.length]}`}>
                  <Image src={s.image} alt={s.title} fill sizes="(min-width:768px) 20rem, 100vw" className="object-cover" />
                </div>
              </Reveal>
            </section>
          ))}

          <Reveal className="mt-14 border-l-4 border-forest-600 pl-5 text-forest-950">
            <p className="font-bold">{t.common.note}</p>
            <p className="mt-1">{g.disclaimer}</p>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="text-xl font-extrabold text-forest-900">{t.common.sources}</h2>
            <ul className="mt-4 text-forest-800">
              {g.sourcesList.map((s) => (
                <Line key={s.url} marker="hoof">
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline decoration-forest-300 underline-offset-4 hover:text-forest-950">
                    {s.label}
                  </a>
                </Line>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
