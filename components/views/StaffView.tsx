"use client";

import { useState } from "react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { Spinner } from "../Loader";
import { AppDownload } from "../AppDownload";
import { Container, PageBanner, SectionTitle } from "../ui";
import { SITE, withApp } from "@/lib/site";

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
      <PageBanner title={s.title} intro={s.intro} image="banner-staff" alt={t.alt.staff} />

      <section className="py-16 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* The admin panel sign-in: the one card on this page */}
          <Reveal className="rounded-[2rem] bg-forest-900 p-8 text-white shadow-xl shadow-forest-900/20 sm:p-10">
            <h2 className="text-3xl font-extrabold">{t.nav.staff}</h2>
            <p className="mt-4 leading-relaxed text-forest-100">{s.secure}</p>
            <button
              type="button"
              onClick={openAdmin}
              disabled={!SITE.adminUrl}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 font-bold text-forest-900 transition enabled:hover:bg-forest-100 disabled:cursor-not-allowed disabled:bg-white/60"
            >
              {opening && <Spinner size={22} label={t.common.loading} />}
              {SITE.adminUrl ? s.open : `${s.open} (${t.common.comingSoon})`}
            </button>
          </Reveal>

          <Reveal delay={120} className="text-forest-950">
            <h2 className="text-3xl font-extrabold text-forest-950">{s.appTitle}</h2>
            <p className="mt-4 leading-relaxed text-forest-900/85">{withApp(s.appText)}</p>
            <div className="mt-8">
              <AppDownload />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-forest-50 py-16 sm:py-24">
        <Container>
          <SectionTitle title={s.rolesTitle} />
          <dl className="mt-10">
            {s.roles.map((r, i) => (
              <Reveal key={r.t} delay={i * 70} className="grid gap-2 border-b border-forest-900/10 py-6 md:grid-cols-[16rem_1fr] md:gap-10">
                <dt className="text-xl font-extrabold text-forest-950">{r.t}</dt>
                <dd className="leading-relaxed text-forest-900/85">{r.d}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>
    </>
  );
}
