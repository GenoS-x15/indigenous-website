"use client";

import Image from "next/image";
import { useState } from "react";
import { useLang } from "./LanguageProvider";

/** Tabbed summary of the care guide for the home page. */
export function GuideTabs() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const sections = t.guide.sections;
  const s = sections[Math.min(active, sections.length - 1)];

  return (
    <div>
      <div role="tablist" aria-label={t.guide.title} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {sections.map((sec, i) => (
          <button
            key={sec.id}
            role="tab"
            id={`tab-${sec.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${sec.id}`}
            type="button"
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              i === active
                ? "border-forest-700 bg-forest-700 text-white shadow"
                : "border-forest-200 bg-white text-forest-800 hover:border-forest-400 hover:bg-forest-50"
            }`}
          >
            {sec.title}
          </button>
        ))}
      </div>

      <div
        key={s.id}
        role="tabpanel"
        id={`panel-${s.id}`}
        aria-labelledby={`tab-${s.id}`}
        className="page-zoom mt-6 grid gap-8 overflow-hidden rounded-3xl border border-forest-100 bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-5"
      >
        <div className="relative min-h-64 overflow-hidden rounded-2xl bg-forest-100 lg:col-span-2 lg:min-h-80">
          <Image src={s.image} alt={s.title} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
        </div>
        <div className="lg:col-span-3">
          <h3 className="text-2xl font-extrabold text-forest-900">{s.title}</h3>
          <p className="mt-2 text-forest-700">{s.summary}</p>
          <ul className="mt-5 space-y-3">
            {s.points.map((p) => (
              <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-forest-500" aria-hidden />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
