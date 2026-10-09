"use client";

import Image from "../Img";
import { useLang } from "../LanguageProvider";
import { TransitionLink } from "../TransitionLink";
import { Reveal } from "../Reveal";
import { Carousel } from "../Carousel";
import { AppDownload } from "../AppDownload";
import { CountUp } from "../CountUp";
import { GoatWalk } from "../GoatWalk";
import { FactTicker } from "../FactTicker";
import { LifeCycle } from "../LifeCycle";
import { FeedCalculator } from "../FeedCalculator";
import { BreedSpotlight } from "../BreedSpotlight";
import { Wave } from "../Wave";
import { Container, Line, Photo, SectionTitle, WebPicture } from "../ui";
import { EVENT_IMAGES } from "@/lib/events";
import { withApp } from "@/lib/site";

const STORY_MASKS = ["mask-blob-1", "mask-arch", "mask-blob-2", "mask-blob-3"] as const;

export function HomeView() {
  const { t } = useLang();
  const slides = t.events.items.map((e, i) => ({ src: EVENT_IMAGES[i], title: e.title, date: e.date, text: e.text }));
  const stats = [
    { n: 17, l: t.stats.villages },
    { n: 2, l: t.stats.districts },
    { n: 6, l: t.stats.chillers },
    { n: 25000, l: t.stats.goal },
  ];
  const heroFacts = [stats[0], stats[1], stats[3]];
  const story = t.guide.sections.slice(0, 4);

  return (
    <>
      {/* Hero: one full-width photo with the text on a deep green scrim */}
      <section className="px-2 pt-2 sm:px-4 sm:pt-4">
        <div className="relative isolate flex min-h-[70svh] overflow-hidden rounded-[1.75rem] bg-forest-950 text-white lg:min-h-[85svh] lg:rounded-[2.5rem]">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <WebPicture name="hero-goats" alt={t.hero.alt} priority className="kenburns" />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-950/95 via-forest-950/45 to-forest-950/80 lg:bg-gradient-to-r lg:from-forest-950/95 lg:via-forest-950/60 lg:to-transparent" />
          <div className="flex w-full flex-col justify-between gap-10 p-6 sm:p-10 lg:p-16">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-200 sm:text-sm">{t.brand.full}</p>
              <h1 className="mt-3 text-6xl font-extrabold leading-none tracking-tight sm:text-8xl">{t.brand.short}</h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-forest-50 sm:text-xl">{t.brand.tagline}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <TransitionLink href="/care-guide/" className="rounded-full bg-white px-7 py-3.5 font-bold text-forest-900 transition hover:-translate-y-0.5 hover:bg-forest-100">
                  {t.hero.cta2}
                </TransitionLink>
                <TransitionLink href="/contact/" className="rounded-full px-7 py-3.5 font-bold text-white ring-2 ring-white/70 transition hover:-translate-y-0.5 hover:bg-white/10">
                  {t.nav.contact}
                </TransitionLink>
              </div>
            </div>
            <dl className="flex max-w-2xl flex-wrap gap-x-10 gap-y-4 border-t border-white/25 pt-5">
              {heroFacts.map((f) => (
                <div key={f.l} className="flex min-w-0 flex-col-reverse">
                  <dt className="max-w-[12rem] text-xs leading-snug text-forest-100/85">{f.l}</dt>
                  <dd className="text-2xl font-extrabold">{f.n.toLocaleString("en-IN")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Stats: large numbers on deep green with faint hoof prints */}
      <section className="hoof-pattern mt-16 bg-forest-900 text-white" aria-labelledby="stats-title">
        <Wave className="text-white" top />
        <Container className="py-14 sm:py-20">
          <h2 id="stats-title" className="sr-only">{t.stats.title}</h2>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.l} delay={i * 90} className="flex flex-col-reverse border-l border-white/20 pl-5">
                <dt className="mt-3 max-w-[14rem] text-sm leading-snug text-forest-100">{s.l}</dt>
                <dd className="text-4xl font-extrabold tracking-tight text-forest-200 sm:text-7xl">
                  <CountUp value={s.n} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
        <Wave className="text-white" />
      </section>

      {/* Who we are: editorial text with overlapping masked photos */}
      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionTitle title={t.intro.title} text={t.intro.text} />
            <ol className="mt-10 space-y-8">
              {t.intro.points.map((p, i) => (
                <Reveal as="li" key={p.t} delay={i * 100} className="flex gap-6">
                  <span className="text-5xl font-extrabold leading-none text-forest-200" aria-hidden>
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-forest-950">{p.t}</h3>
                    <p className="mt-1 leading-relaxed text-forest-900/80">{p.d}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal className="relative mx-auto w-full max-w-xl pb-16 pr-10">
            <Photo src="/images/health-check.jpg" alt="A veterinarian examining goats with a rearer" mask="mask-blob-1" className="aspect-[5/4] w-full" sizes="(min-width:1024px) 45vw, 100vw" />
            <Photo src="/images/herd-field.jpg" alt="Goats grazing in an open field" mask="mask-arch" className="!absolute bottom-0 right-0 aspect-[3/4] w-2/5 ring-8 ring-white" sizes="20vw" />
          </Reveal>
        </Container>
      </section>

      <GoatWalk />

      {/* Care guide as a flowing story */}
      <section className="bg-forest-50 pb-20 pt-8 sm:pb-28">
        <Container>
          <SectionTitle kicker={t.nav.guide} title={t.guide.title} text={t.guide.intro} />
          <div className="mt-16 space-y-20 sm:space-y-28">
            {story.map((s, i) => (
              <Reveal key={s.id} className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                <div className={i % 2 ? "md:order-2" : ""}>
                  <Photo src={s.image} alt={s.title} mask={STORY_MASKS[i]} className="aspect-[4/3] w-full" sizes="(min-width:768px) 45vw, 100vw" />
                </div>
                <div>
                  <p className="text-6xl font-extrabold leading-none text-forest-200" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-3xl font-extrabold text-forest-950">{s.title}</h3>
                  <p className="mt-4 border-l-4 border-forest-500 pl-4 text-xl font-semibold leading-snug text-forest-800">{s.summary}</p>
                  <ul className="mt-5 text-forest-950">
                    {s.points.slice(0, 2).map((p) => (
                      <Line key={p}>{withApp(p)}</Line>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4">
            <TransitionLink href="/care-guide/" className="rounded-full bg-forest-700 px-7 py-3.5 font-bold text-white transition hover:bg-forest-800">
              {t.common.fullGuide}
            </TransitionLink>
            <p className="max-w-xl text-sm text-forest-900/75">{t.guide.disclaimer}</p>
          </div>
        </Container>
      </section>

      <FactTicker />
      <LifeCycle />
      <FeedCalculator />

      {/* Women training */}
      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <Photo src="/images/hoof-care.jpg" alt="A trainer demonstrating goat handling" mask="mask-arch" className="mx-auto aspect-[4/5] w-full max-w-md" sizes="(min-width:1024px) 40vw, 100vw" />
          </Reveal>
          <div>
            <SectionTitle kicker={t.nav.training} title={t.training.title} text={t.training.intro} />
            <ul className="mt-8 text-forest-950 sm:columns-2 sm:gap-10">
              {t.training.why.map((w) => (
                <Line key={w} marker="hoof">
                  {w}
                </Line>
              ))}
            </ul>
            <TransitionLink href="/women-training/" className="mt-8 inline-block font-bold text-forest-800 underline decoration-forest-400 decoration-2 underline-offset-8 hover:text-forest-950">
              {t.common.learnMore}
            </TransitionLink>
          </div>
        </Container>
      </section>

      {/* Events: full-height slides */}
      <section className="bg-forest-950">
        <Wave className="text-white" top shape="hill" />
        <Container className="pb-10 pt-6">
          <SectionTitle kicker={t.nav.events} title={t.events.title} text={t.events.intro} dark />
        </Container>
        <Carousel slides={slides} label={t.events.title} />
        <Container className="py-10">
          <TransitionLink href="/events/" className="inline-block rounded-full bg-white px-7 py-3.5 font-bold text-forest-900 transition hover:bg-forest-100">
            {t.common.allEvents}
          </TransitionLink>
        </Container>
        <Wave className="text-white" />
      </section>

      <BreedSpotlight />

      {/* Staff portal and the app */}
      <section className="hoof-pattern bg-forest-900 text-white">
        <Wave className="text-white" top shape="hill" />
        <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-2 lg:items-end">
          <div>
            <SectionTitle title={t.staff.title} text={t.staff.intro} dark />
            <TransitionLink href="/staff/" className="mt-8 inline-block rounded-full bg-white px-7 py-3.5 font-bold text-forest-900 transition hover:-translate-y-0.5 hover:bg-forest-100">
              {t.nav.staff}
            </TransitionLink>
          </div>
          <Reveal className="lg:border-l lg:border-white/15 lg:pl-12">
            <h3 className="text-2xl font-extrabold">{withApp(t.app.title)}</h3>
            <p className="mt-3 text-forest-100">{withApp(t.app.intro)}</p>
            <div className="mt-6">
              <AppDownload compact dark />
            </div>
          </Reveal>
        </Container>
        <Wave className="text-white" />
      </section>

      {/* Associated organisations */}
      <section className="py-16">
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
