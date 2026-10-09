"use client";

import Image from "./Img";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { TransitionLink } from "./TransitionLink";
import { EmailLink } from "./EmailLink";
import { appSource } from "./AppDownload";
import { LANGS } from "@/lib/site";

export const NAV = [
  { key: "home", href: "/" },
  { key: "about", href: "/about/" },
  { key: "project", href: "/project/" },
  { key: "guide", href: "/care-guide/" },
  { key: "training", href: "/women-training/" },
  { key: "events", href: "/events/" },
  { key: "contact", href: "/contact/" },
] as const;

export function Header() {
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar with language switch */}
      <div className="bg-forest-900 text-forest-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-1.5 text-xs sm:px-6">
          <EmailLink className="truncate opacity-90 hover:opacity-100" copyClassName="hover:bg-forest-800" />
          <div className="flex items-center gap-2" role="group" aria-label={t.top.language}>
            <span className="hidden opacity-80 sm:inline">{t.top.language}</span>
            <div className="flex overflow-hidden rounded-full border border-forest-400/50">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLang(l.code)}
                  aria-pressed={lang === l.code}
                  lang={l.code}
                  className={`px-3 py-1 font-semibold transition-colors ${
                    lang === l.code ? "bg-white text-forest-900" : "text-forest-50 hover:bg-forest-800"
                  }`}
                >
                  <span className="sm:hidden">{l.short}</span>
                  <span className="hidden sm:inline">{l.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-forest-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
          <TransitionLink href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <Image src="/logo.png" alt="" width={48} height={48} className="h-11 w-11 shrink-0 sm:h-12 sm:w-12" priority />
            <span className="min-w-0 leading-tight">
              <span className="block text-lg font-extrabold tracking-wide text-forest-900 sm:text-xl">
                {t.brand.short.toUpperCase()}
              </span>
              <span className="hidden truncate text-[11px] font-medium text-forest-700 sm:block">
                {t.brand.full}
              </span>
            </span>
          </TransitionLink>

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
            {NAV.map((n) => (
              <TransitionLink
                key={n.key}
                href={n.href}
                aria-current={isActive(n.href) ? "page" : undefined}
                className={`relative px-3 py-2 text-sm font-semibold transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-forest-600 after:transition-transform ${
                  isActive(n.href) ? "text-forest-950 after:scale-x-100" : "text-forest-800 after:scale-x-0 hover:text-forest-950 hover:after:scale-x-100"
                }`}
              >
                {t.nav[n.key]}
              </TransitionLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {appSource !== "none" && (
              <TransitionLink
                href="/download/"
                className="hidden rounded-full px-3 py-2 text-sm font-semibold text-forest-800 transition hover:bg-forest-50 2xl:inline-block"
              >
                {t.nav.download}
              </TransitionLink>
            )}
            <TransitionLink
              href="/staff/"
              className="hidden rounded-full bg-forest-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-forest-800 sm:inline-block"
            >
              {t.nav.staff}
            </TransitionLink>
            <button
              type="button"
              className="rounded-lg border border-forest-200 p-2 text-forest-900 xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? t.nav.close : t.nav.menu}
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-nav" className="border-t border-forest-100 bg-white px-4 pb-4 pt-2 xl:hidden" aria-label="Mobile">
            <ul className="grid gap-1">
              {NAV.map((n) => (
                <li key={n.key}>
                  <TransitionLink
                    href={n.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={`block border-l-4 px-4 py-3 text-base font-semibold ${
                      isActive(n.href) ? "border-forest-600 text-forest-950" : "border-transparent text-forest-800 hover:border-forest-200"
                    }`}
                  >
                    {t.nav[n.key]}
                  </TransitionLink>
                </li>
              ))}
              {appSource !== "none" && (
                <li>
                  <TransitionLink
                    href="/download/"
                    onClick={() => setOpen(false)}
                    className="block border-l-4 border-transparent px-4 py-3 text-base font-semibold text-forest-800 hover:border-forest-200"
                  >
                    {t.nav.download}
                  </TransitionLink>
                </li>
              )}
              <li>
                <TransitionLink
                  href="/staff/"
                  onClick={() => setOpen(false)}
                  className="mt-1 block rounded-xl bg-forest-700 px-4 py-3 text-center text-base font-semibold text-white"
                >
                  {t.nav.staff}
                </TransitionLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
