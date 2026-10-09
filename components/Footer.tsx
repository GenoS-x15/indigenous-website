"use client";

import Image from "next/image";
import { useLang } from "./LanguageProvider";
import { TransitionLink } from "./TransitionLink";
import { EmailLink } from "./EmailLink";
import { appSource } from "./AppDownload";
import { NAV } from "./Header";
import { SITE } from "@/lib/site";

// Grass along the top edge of the footer. A simple integer generator keeps server and browser output identical.
const BLADES = (() => {
  let seed = 7;
  const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  return Array.from({ length: 90 }, (_, i) => {
    const x = i * 16 + rand() * 10;
    const h = 14 + rand() * 22;
    const tip = x + 3 + (rand() - 0.5) * 12;
    const f = (n: number) => n.toFixed(1);
    return {
      d: `M${f(x)} 40Q${f(x + 2)} ${f(40 - h / 2)} ${f(tip)} ${f(40 - h)}Q${f(x + 4)} ${f(40 - h / 2)} ${f(x + 7)} 40Z`,
      delay: `${f(-rand() * 4.5)}s`,
    };
  });
})();

function Grass() {
  return (
    <svg viewBox="0 0 1440 40" preserveAspectRatio="xMidYMax slice" aria-hidden focusable="false" className="block h-10 w-full text-forest-950">
      {BLADES.map((b) => (
        <path key={b.d} d={b.d} fill="currentColor" className="blade" style={{ animationDelay: b.delay }} />
      ))}
    </svg>
  );
}

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  const link = "hover:text-white";

  return (
    <footer className="text-forest-100">
      <Grass />
      <div className="bg-forest-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
          <div>
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
                  <TransitionLink href={n.href} className={link}>{t.nav[n.key]}</TransitionLink>
                </li>
              ))}
              <li>
                <TransitionLink href="/staff/" className={link}>{t.nav.staff}</TransitionLink>
              </li>
              {appSource !== "none" && (
                <li>
                  <TransitionLink href="/download/" className={link}>{t.nav.download}</TransitionLink>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-forest-400">{t.footer.legalTitle}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li><TransitionLink href="/privacy/" className={link}>{t.footer.privacy}</TransitionLink></li>
              <li><TransitionLink href="/terms/" className={link}>{t.footer.terms}</TransitionLink></li>
              <li><TransitionLink href="/account-deletion/" className={link}>{t.footer.deletion}</TransitionLink></li>
              <li><TransitionLink href="/credits/" className={link}>{t.footer.credits}</TransitionLink></li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-forest-400">{t.footer.contactTitle}</h2>
            <address className="mt-4 space-y-1 text-sm not-italic text-forest-200">
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className={`block ${link}`}>
                {SITE.address.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </a>
              <p className="pt-2">
                <EmailLink className={link} copyClassName="hover:bg-forest-900" />
              </p>
              {SITE.phones.map((p) => (
                <p key={p}>
                  <a href={`tel:+91${p.replace(/\s/g, "")}`} className={link}>{p}</a>
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
              <Image src={SITE.developer.logo} alt={SITE.developer.name} width={44} height={40} className="h-10 w-11 rounded-md object-cover" />
              <p className="leading-snug">
                <span className="block text-forest-400">{t.footer.licensing}</span>
                <span>
                  {t.footer.licenseText} <strong className="font-semibold text-forest-100">{SITE.developer.name}</strong>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
