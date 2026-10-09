"use client";

import { useId, useState } from "react";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { Container, SectionTitle, WebPicture } from "./ui";
import { withApp, type LangCode } from "@/lib/site";

// The rule used in the company's app: total feed is 4% of body weight, split 90% silage and 10% concentrate mixture.
export const FEED_SHARE = 0.04;
export const SILAGE_SHARE = 0.9;
const MIN_KG = 1;
const MAX_KG = 150;
/** Total feed that fills the bowl to the brim: a 100 kg goat, so typical weights show a clear level. */
const FULL_KG = 100 * FEED_SHARE;

export function feedFor(weightKg: number) {
  const total = weightKg * FEED_SHARE;
  return { total, silage: total * SILAGE_SHARE, mixture: total * (1 - SILAGE_SHARE) };
}

const LOCALE: Record<LangCode, string> = { en: "en-IN", hi: "hi-IN", mr: "mr-IN" };

/** Interactive feed calculator with a bowl that fills as the weight goes up. */
export function FeedCalculator() {
  const { t, lang } = useLang();
  const c = t.calc;
  const id = useId();
  const [raw, setRaw] = useState("40");

  const weight = Number(raw.replace(",", "."));
  const valid = raw.trim() !== "" && Number.isFinite(weight) && weight >= MIN_KG && weight <= MAX_KG;
  const feed = feedFor(valid ? weight : 0);
  const num = new Intl.NumberFormat(LOCALE[lang], { maximumFractionDigits: 2 });

  // Bowl interior spans y 40..120 in the SVG; fill height follows the total feed.
  const level = Math.min(1, feed.total / FULL_KG);
  const fillH = 80 * level;
  const mixH = fillH * (1 - SILAGE_SHARE);

  return (
    <section className="bg-forest-50 py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionTitle title={c.title} text={withApp(c.intro)} />
          <Reveal className="mt-10">
            <label htmlFor={id} className="block text-sm font-bold uppercase tracking-[0.18em] text-forest-700">
              {c.label}
            </label>
            <div className="mt-3 flex items-baseline gap-3 border-b-2 border-forest-700 pb-2">
              <input
                id={id}
                type="number"
                inputMode="decimal"
                min={MIN_KG}
                max={MAX_KG}
                step="0.5"
                value={raw}
                onChange={(e) => setRaw(e.target.value)}
                aria-invalid={!valid}
                aria-describedby={`${id}-help`}
                className="w-full min-w-0 bg-transparent text-5xl font-extrabold text-forest-950 outline-none sm:text-6xl"
              />
              <span className="text-2xl font-bold text-forest-700">{c.kg}</span>
            </div>
            <p id={`${id}-help`} className={`mt-2 text-sm ${valid ? "text-forest-900/70" : "font-semibold text-red-700"}`}>
              {valid ? c.disclaimer : c.invalid}
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-4" aria-live="polite">
              {[
                { l: c.total, v: feed.total, cls: "text-forest-950" },
                { l: c.silage, v: feed.silage, cls: "text-forest-700" },
                { l: c.mixture, v: feed.mixture, cls: "text-soil" },
              ].map((r) => (
                <div key={r.l}>
                  <dt className="text-xs font-semibold uppercase leading-snug tracking-wider text-forest-800/80">{r.l}</dt>
                  <dd className={`mt-1 text-2xl font-extrabold sm:text-3xl ${r.cls}`}>
                    {valid ? num.format(r.v) : "-"} <span className="text-base font-bold">{c.kg}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal className="relative mx-auto w-full max-w-md">
          <div className="mask-blob-1 relative aspect-square w-full bg-forest-100 opacity-90">
            <WebPicture name="goat-fodder" alt={t.alt.fodder} />
          </div>
          <svg viewBox="0 0 200 140" className="absolute -bottom-6 left-1/2 w-3/4 -translate-x-1/2 drop-shadow-xl" aria-hidden focusable="false">
            <defs>
              <clipPath id={`${id}-bowl`}>
                <path d="M20 40 H180 C176 92 140 120 100 120 C60 120 24 92 20 40 Z" />
              </clipPath>
            </defs>
            <path d="M20 40 H180 C176 92 140 120 100 120 C60 120 24 92 20 40 Z" fill="#fff" />
            <g clipPath={`url(#${id}-bowl)`}>
              <g style={{ transform: `translateY(${120 - fillH}px)`, transition: "transform 0.6s cubic-bezier(0.2,0.8,0.2,1)" }}>
                <rect x="0" y="0" width="200" height={mixH + 0.5} fill="#d97706" />
                <rect x="0" y={mixH} width="200" height={Math.max(0, fillH - mixH)} fill="#16a34a" />
              </g>
            </g>
            <path d="M20 40 H180 C176 92 140 120 100 120 C60 120 24 92 20 40 Z" fill="none" stroke="#14532d" strokeWidth="5" />
            <ellipse cx="100" cy="40" rx="84" ry="7" fill="none" stroke="#14532d" strokeWidth="5" />
            <rect x="80" y="122" width="40" height="10" rx="4" fill="#14532d" />
          </svg>
        </Reveal>
      </Container>
    </section>
  );
}
