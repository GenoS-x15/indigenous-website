"use client";

import Image from "next/image";
import { useLang } from "../LanguageProvider";
import { Wave } from "../Wave";
import { Container } from "../ui";
import { CREDITS } from "@/lib/credits";

/** The small version of a photo: "-mobile" for the hero, "-800" for the rest. */
const thumb = (file: string) => `/images/web/${file.replace(".webp", file.startsWith("hero-") ? "-mobile.webp" : "-800.webp")}`;

/** Image credits. Interface text is translated; titles, authors and licences stay as published (English). */
export function CreditsView() {
  const { t } = useLang();
  const c = t.credits;

  return (
    <>
      <section className="hoof-pattern relative bg-forest-900 text-white">
        <Container className="pb-24 pt-16 sm:pb-28 sm:pt-20">
          <h1 className="text-4xl font-extrabold sm:text-6xl">{c.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-forest-100">{c.intro}</p>
        </Container>
        <div className="absolute inset-x-0 bottom-0">
          <Wave />
        </div>
      </section>

      <Container className="py-14">
        <p className="text-sm text-forest-900/75">{c.note}</p>
        <ul className="mt-8">
          {CREDITS.map((cr) => (
            <li key={cr.file} className="grid gap-5 border-b border-forest-900/10 py-6 sm:grid-cols-[9rem_1fr]">
              <div className="relative aspect-[4/3] w-36 overflow-hidden rounded-2xl bg-forest-100">
                <Image src={thumb(cr.file)} alt="" fill sizes="9rem" className="object-cover" />
              </div>
              <dl className="grid gap-x-8 gap-y-2 text-sm sm:grid-cols-[7rem_1fr]">
                <dt className="font-semibold text-forest-700">{c.photo}</dt>
                <dd lang="en" className="font-bold text-forest-950">{cr.title}</dd>
                <dt className="font-semibold text-forest-700">{c.author}</dt>
                <dd lang="en">{cr.author}</dd>
                <dt className="font-semibold text-forest-700">{c.licence}</dt>
                <dd lang="en">
                  <a href={cr.licenceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-forest-700">
                    {cr.licence}
                  </a>
                </dd>
                <dt className="sr-only">{c.view}</dt>
                <dd className="sm:col-start-2">
                  <a href={cr.source} target="_blank" rel="noopener noreferrer" className="font-semibold text-forest-800 underline underline-offset-4 hover:text-forest-950">
                    {c.view}
                  </a>
                </dd>
              </dl>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
