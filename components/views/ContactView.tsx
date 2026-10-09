"use client";

import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { ZoomLink } from "../ZoomLink";
import { EmailLink } from "../EmailLink";
import { Container, PageBanner } from "../ui";
import { SITE } from "@/lib/site";

export function ContactView() {
  const { t } = useLang();
  const c = t.contact;

  return (
    <>
      <PageBanner title={c.title} intro={c.intro} image="/images/goat-shelter.jpg" />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-2">
          <Reveal className="rounded-3xl bg-forest-50 p-8">
            <p className="text-sm font-bold uppercase tracking-widest text-forest-600">{c.person}</p>
            <h2 className="mt-1 text-2xl font-extrabold text-forest-900">{SITE.ceo}</h2>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-sm font-semibold text-forest-700">{c.phone}</dt>
                {SITE.phones.map((p) => (
                  <dd key={p}>
                    <a href={`tel:+91${p.replace(/\s/g, "")}`} className="text-lg font-semibold text-forest-950 hover:underline">{p}</a>
                  </dd>
                ))}
              </div>
              <div>
                <dt className="text-sm font-semibold text-forest-700">{c.email}</dt>
                <dd>
                  <EmailLink className="text-lg font-semibold text-forest-950 hover:underline" copyClassName="text-forest-800 hover:bg-forest-100" />
                </dd>
              </div>
            </dl>
            <div className="mt-8">
              <EmailLink copy={false} className="inline-block rounded-full bg-forest-700 px-7 py-3.5 font-bold text-white transition hover:bg-forest-800">
                {c.sendMail}
              </EmailLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="rounded-3xl border border-forest-200 p-8">
            <p className="text-sm font-bold uppercase tracking-widest text-forest-600">{c.address}</p>
            <address className="mt-3 text-xl font-semibold not-italic text-forest-950">
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="block space-y-1 hover:underline">
                {SITE.address.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </a>
            </address>
            <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-full border-2 border-forest-700 px-7 py-3.5 font-bold text-forest-800 transition hover:bg-forest-100">
              {c.openMaps}
            </a>
            <p className="mt-8 text-sm text-forest-800">
              <ZoomLink href="/privacy/" className="underline underline-offset-4">{c.legal}</ZoomLink>
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
