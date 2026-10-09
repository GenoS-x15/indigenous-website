"use client";

import Image from "next/image";
import { useLang } from "../LanguageProvider";
import { ZoomLink } from "../ZoomLink";
import { Reveal } from "../Reveal";
import { Carousel } from "../Carousel";
import { AppDownload } from "../AppDownload";
import { GuideTabs } from "../GuideTabs";
import { Container, Photo, SectionTitle } from "../ui";
import { EVENT_IMAGES } from "@/lib/events";

export function HomeView() {
  const { t } = useLang();
  const slides = t.events.items.map((e, i) => ({ src: EVENT_IMAGES[i], title: e.title, date: e.date }));

  const stats = [
    { n: "17", l: t.stats.villages },
    { n: "2", l: t.stats.districts },
    { n: "6", l: t.stats.chillers },
    { n: "25,000", l: t.stats.goal },
  ];

  return (
    <>
      {/* Hero */}
      <section className="leaf-bg relative overflow-hidden bg-forest-50">
        <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:py-20">
          <div className="order-2 lg:order-1">
            <p className="inline-block rounded-full border border-forest-300 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-forest-700">
              {t.hero.kicker}
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] text-forest-950 sm:text-5xl lg:text-6xl">
              {t.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-forest-900/80">{t.hero.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ZoomLink href="/project/" className="rounded-full bg-forest-700 px-7 py-3.5 font-semibold text-white shadow-lg shadow-forest-700/25 transition hover:-translate-y-0.5 hover:bg-forest-800">
                {t.hero.cta1}
              </ZoomLink>
              <ZoomLink href="/care-guide/" className="rounded-full border-2 border-forest-700 bg-white px-7 py-3.5 font-semibold text-forest-800 transition hover:-translate-y-0.5 hover:bg-forest-100">
                {t.hero.cta2}
              </ZoomLink>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl shadow-forest-900/20">
              <Image
                src="/images/goat-hero.jpg"
                alt="A black Zalawadi goat standing in a farm yard"
                fill
                priority
                sizes="(min-width:1024px) 45vw, 100vw"
                className="hero-photo object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-forest-800 text-white">
        <Container className="grid grid-cols-2 gap-y-8 py-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 90} className="px-3 text-center">
              <p className="text-4xl font-extrabold text-forest-200 sm:text-5xl">{s.n}</p>
              <p className="mx-auto mt-2 max-w-48 text-sm leading-snug text-forest-100">{s.l}</p>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Who we are */}
      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle title={t.intro.title} text={t.intro.text} />
            <ul className="mt-8 space-y-5">
              {t.intro.points.map((p, i) => (
                <Reveal as="li" key={p.t} delay={i * 100} className="rounded-2xl border border-forest-100 bg-forest-50 p-5">
                  <h3 className="font-bold text-forest-900">{p.t}</h3>
                  <p className="mt-1 text-forest-900/80">{p.d}</p>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal className="grid grid-cols-2 gap-4">
            <Photo src="/images/health-check.jpg" alt="A veterinarian examining goats with a rearer" className="col-span-2 aspect-[16/10]" sizes="(min-width:1024px) 45vw, 100vw" />
            <Photo src="/images/herd-field.jpg" alt="Goats grazing in an open field" className="aspect-square" sizes="(min-width:1024px) 22vw, 50vw" />
            <Photo src="/images/herd-feeding.jpg" alt="Goats feeding together at a trough" className="aspect-square" sizes="(min-width:1024px) 22vw, 50vw" />
          </Reveal>
        </Container>
      </section>

      {/* Care guide */}
      <section id="care" className="bg-forest-50 py-16 sm:py-24">
        <Container>
          <SectionTitle kicker={t.nav.guide} title={t.guide.title} text={t.guide.intro} />
          <Reveal className="mt-10">
            <GuideTabs />
          </Reveal>
          <p className="mt-6 text-sm text-forest-800/80">{t.guide.disclaimer}</p>
          <div className="mt-6">
            <ZoomLink href="/care-guide/" className="inline-block rounded-full bg-forest-700 px-6 py-3 font-semibold text-white transition hover:bg-forest-800">
              {t.common.fullGuide}
            </ZoomLink>
          </div>
        </Container>
      </section>

      {/* Women training */}
      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Photo src="/images/hoof-care.jpg" alt="A trainer demonstrating goat handling" className="aspect-[4/3]" sizes="(min-width:1024px) 45vw, 100vw" />
          </Reveal>
          <div>
            <SectionTitle kicker={t.nav.training} title={t.training.title} text={t.training.intro} />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.training.why.slice(0, 4).map((w) => (
                <li key={w} className="flex gap-3 rounded-xl bg-forest-50 p-4 text-sm leading-relaxed text-forest-950">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-forest-600" aria-hidden />
                  {w}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ZoomLink href="/women-training/" className="inline-block rounded-full border-2 border-forest-700 px-6 py-3 font-semibold text-forest-800 transition hover:bg-forest-100">
                {t.common.learnMore}
              </ZoomLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Events */}
      <section className="bg-forest-50 py-16 sm:py-24">
        <Container>
          <SectionTitle kicker={t.nav.events} title={t.events.title} text={t.events.intro} />
          <Reveal className="mt-10">
            <Carousel slides={slides} label={t.events.title} />
          </Reveal>
          <div className="mt-8">
            <ZoomLink href="/events/" className="inline-block rounded-full bg-forest-700 px-6 py-3 font-semibold text-white transition hover:bg-forest-800">
              {t.common.allEvents}
            </ZoomLink>
          </div>
        </Container>
      </section>

      {/* Staff portal */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-br from-forest-900 to-forest-700 p-8 text-white sm:p-12 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-extrabold">{t.staff.title}</h2>
              <p className="mt-3 text-lg text-forest-100">{t.staff.intro}</p>
              <div className="mt-6">
                <AppDownload compact dark />
              </div>
            </div>
            <ZoomLink href="/staff/" className="rounded-full bg-white px-7 py-3.5 font-bold text-forest-900 transition hover:-translate-y-0.5 hover:bg-forest-100">
              {t.nav.staff}
            </ZoomLink>
          </Reveal>
        </Container>
      </section>

      {/* Associated organisations */}
      <section className="pb-8">
        <Container>
          <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-forest-600">{t.project.associatesTitle}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-10">
            <Image src="/images/partner-asf.png" alt="Annasaheb Shinde Foundation" width={150} height={150} className="h-28 w-auto object-contain" />
            <Image src="/images/partner-aja-mesh.png" alt="Aja Mesh Support Pvt. Ltd." width={170} height={150} className="h-28 w-auto object-contain" />
          </div>
        </Container>
      </section>
    </>
  );
}
