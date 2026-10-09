"use client";

import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { TransitionLink } from "../TransitionLink";
import { EmailLink } from "../EmailLink";
import { Container, PageBanner } from "../ui";
import { SITE } from "@/lib/site";

export function ContactView() {
  const { t } = useLang();
  const c = t.contact;
  const label = "text-sm font-bold uppercase tracking-[0.2em] text-forest-600";
  const big = "text-2xl font-extrabold text-forest-950 underline decoration-forest-300 decoration-2 underline-offset-8 hover:decoration-forest-700 sm:text-3xl";

  return (
    <>
      <PageBanner title={c.title} intro={c.intro} image="banner-contact" alt={t.alt.contact} />

      <section className="py-16 sm:py-24">
        <Container className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal className="space-y-12">
            <div>
              <p className={label}>{c.person}</p>
              <p className="mt-2 text-3xl font-extrabold text-forest-950 sm:text-4xl">{SITE.ceo}</p>
            </div>
            <div>
              <p className={label}>{c.phone}</p>
              <ul className="mt-3 space-y-3">
                {SITE.phones.map((p) => (
                  <li key={p}>
                    <a href={`tel:+91${p.replace(/\s/g, "")}`} className={big}>
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={label}>{c.email}</p>
              <p className="mt-3 break-all">
                <EmailLink className={big} copyClassName="text-forest-800 hover:bg-forest-100" />
              </p>
              <div className="mt-6">
                <EmailLink copy={false} className="inline-block rounded-full bg-forest-700 px-7 py-3.5 font-bold text-white transition hover:bg-forest-800">
                  {c.sendMail}
                </EmailLink>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:border-l lg:border-forest-900/10 lg:pl-16">
            <p className={label}>{c.address}</p>
            <address className="mt-3 not-italic">
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="block text-2xl font-bold leading-snug text-forest-950 hover:underline sm:text-3xl">
                {SITE.address.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </a>
            </address>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full px-7 py-3.5 font-bold text-forest-800 ring-2 ring-forest-700 transition hover:bg-forest-50"
            >
              {c.openMaps}
            </a>
            <p className="mt-10 text-sm text-forest-800">
              <TransitionLink href="/privacy/" className="underline underline-offset-4">
                {c.legal}
              </TransitionLink>
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
