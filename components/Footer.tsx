"use client";

import Image from "next/image";
import { useLang } from "./LanguageProvider";
import { ZoomLink } from "./ZoomLink";
import { EmailLink } from "./EmailLink";
import { NAV } from "./Header";
import { SITE } from "@/lib/site";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-forest-950 text-forest-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="" width={56} height={56} className="h-14 w-14" />
            <p className="text-lg font-extrabold tracking-wide text-white">{t.brand.short.toUpperCase()}</p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-forest-200">{t.brand.full}</p>
          <p className="mt-2 text-sm leading-relaxed text-forest-300">{t.brand.tagline}</p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-forest-400">{t.footer.explore}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.key}>
                <ZoomLink href={n.href} className="hover:text-white">{t.nav[n.key]}</ZoomLink>
              </li>
            ))}
            <li>
              <ZoomLink href="/staff/" className="hover:text-white">{t.nav.staff}</ZoomLink>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-forest-400">{t.footer.legalTitle}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><ZoomLink href="/privacy/" className="hover:text-white">{t.footer.privacy}</ZoomLink></li>
            <li><ZoomLink href="/terms/" className="hover:text-white">{t.footer.terms}</ZoomLink></li>
            <li><ZoomLink href="/account-deletion/" className="hover:text-white">{t.footer.deletion}</ZoomLink></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-forest-400">{t.footer.contactTitle}</h2>
          <address className="mt-4 space-y-1 text-sm not-italic text-forest-200">
            {SITE.address.map((l) => (
              <p key={l}>{l}</p>
            ))}
            <p className="pt-2">
              <EmailLink className="hover:text-white" copyClassName="hover:bg-forest-900" />
            </p>
            {SITE.phones.map((p) => (
              <p key={p}>
                <a href={`tel:+91${p.replace(/\s/g, "")}`} className="hover:text-white">{p}</a>
              </p>
            ))}
          </address>
        </div>
      </div>

      {/* Copyright and licensing: visible, quiet, no animation */}
      <div className="border-t border-forest-900">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 text-xs text-forest-300 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p>
              &copy; {year} {SITE.legalName}. {t.footer.rights}
            </p>
            <p className="text-forest-400">
              CIN {SITE.cin} &nbsp;|&nbsp; GSTIN {SITE.gstin}
            </p>
          </div>
          <div className="flex items-center gap-3" aria-label={t.footer.licensing}>
            <Image
              src={SITE.developer.logo}
              alt={SITE.developer.name}
              width={44}
              height={40}
              className="h-10 w-11 rounded-md object-cover"
            />
            <p className="leading-snug">
              <span className="block text-forest-400">{t.footer.licensing}</span>
              <span>
                {t.footer.licenseText} <strong className="font-semibold text-forest-100">{SITE.developer.name}</strong>
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
