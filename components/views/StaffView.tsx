"use client";

import { useState } from "react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { Spinner } from "../Loader";
import { Container, PageBanner, SectionTitle } from "../ui";
import { SITE } from "@/lib/site";

export function StaffView() {
  const { t } = useLang();
  const s = t.staff;
  const [opening, setOpening] = useState(false);

  const openAdmin = () => {
    if (!SITE.adminUrl) return;
    setOpening(true);
    window.open(SITE.adminUrl, "_blank", "noopener,noreferrer");
    window.setTimeout(() => setOpening(false), 1200);
  };

  return (
    <>
      <PageBanner title={s.title} intro={s.intro} image="/images/events/health-camp-checkup.jpg" />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-2">
          <Reveal className="rounded-3xl border-2 border-forest-700 bg-white p-8 shadow-lg shadow-forest-900/10">
            <h2 className="text-2xl font-extrabold text-forest-900">{t.nav.staff}</h2>
            <p className="mt-3 leading-relaxed text-forest-950/85">{s.secure}</p>
            <button
              type="button"
              onClick={openAdmin}
              disabled={!SITE.adminUrl}
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-forest-700 px-7 py-3.5 font-bold text-white transition enabled:hover:bg-forest-800 disabled:cursor-not-allowed disabled:bg-forest-300"
            >
              {opening && <Spinner size={22} label={t.common.loading} />}
              {SITE.adminUrl ? s.open : `${s.open} (${t.common.comingSoon})`}
            </button>
          </Reveal>

          <Reveal delay={120} className="rounded-3xl bg-forest-50 p-8">
            <h2 className="text-2xl font-extrabold text-forest-900">{s.appTitle}</h2>
            <p className="mt-3 leading-relaxed text-forest-950/85">{s.appText}</p>
            {SITE.appUrl ? (
              <a href={SITE.appUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-block rounded-full border-2 border-forest-700 px-7 py-3.5 font-bold text-forest-800 transition hover:bg-forest-100">
                {s.appBtn}
              </a>
            ) : (
              <p className="mt-7 inline-block rounded-full border-2 border-dashed border-forest-300 px-7 py-3 font-semibold text-forest-700">
                {s.appBtn} ({t.common.comingSoon})
              </p>
            )}
          </Reveal>
        </Container>
      </section>

      <section className="bg-forest-50 pb-16 pt-4 sm:pb-20">
        <Container>
          <SectionTitle title={s.rolesTitle} />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {s.roles.map((r, i) => (
              <Reveal as="li" key={r.t} delay={i * 80} className="rounded-2xl border border-forest-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-forest-900">{r.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-950/80">{r.d}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
