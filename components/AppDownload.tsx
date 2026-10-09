"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./LanguageProvider";
import { TransitionLink } from "./TransitionLink";
import { copyText } from "@/lib/clipboard";
import { SITE, type LangCode } from "@/lib/site";
import appMeta from "@/lib/app-meta.json";

/** Written by scripts/app-meta.mjs before every dev run and build. */
type AppMeta =
  | { available: false }
  | { available: true; file: string; version: string; sizeMB: number; buildDate: string; sha256: string };
const META = appMeta as AppMeta;

const LOCALE: Record<LangCode, string> = { en: "en-IN", hi: "hi-IN", mr: "mr-IN" };

/** Which download, if any, the site offers: the Play Store first, then the hosted APK. */
export const appSource = SITE.appUrl ? "play" : META.available ? "apk" : "none";

const btn =
  "inline-flex items-center gap-3 rounded-full bg-forest-700 px-7 py-3.5 font-bold text-white shadow-lg shadow-forest-900/15 transition hover:-translate-y-0.5 hover:bg-forest-800";

function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" />
    </svg>
  );
}

/**
 * The Android app button with its details.
 * compact: button and one line of facts (home page); full: also checksum, install steps and the warning note.
 */
export function AppDownload({ compact = false, dark = false }: { compact?: boolean; dark?: boolean }) {
  const { t, lang } = useLang();
  const a = t.app;
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const muted = dark ? "text-forest-100" : "text-forest-900/75";

  if (appSource === "play") {
    return (
      <a href={SITE.appUrl} target="_blank" rel="noopener noreferrer" className={btn}>
        <DownloadIcon />
        {a.play}
      </a>
    );
  }

  if (!META.available) {
    return (
      <p className={`inline-block rounded-full border-2 border-dashed px-7 py-3 font-semibold ${dark ? "border-forest-400 text-forest-100" : "border-forest-300 text-forest-700"}`}>
        {t.staff.appBtn} ({t.common.comingSoon})
      </p>
    );
  }

  const date = new Intl.DateTimeFormat(LOCALE[lang], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(META.buildDate),
  );
  const facts = [
    META.version && `${a.version} ${META.version}`,
    `${a.size} ${META.sizeMB} MB`,
    `${a.updated} ${date}`,
  ].filter(Boolean);

  const onCopy = async () => {
    if (!(await copyText(META.sha256))) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <a href={META.file} download className={btn}>
        <DownloadIcon />
        {a.apk}
      </a>
      <p className={`mt-3 text-sm ${muted}`}>
        {facts.join("  ·  ")}  ·  {a.androidOnly}
      </p>

      {compact ? (
        <p className="mt-2 text-sm">
          <TransitionLink href="/download/" className={`font-semibold underline underline-offset-4 ${dark ? "text-white" : "text-forest-800"}`}>
            {a.installTitle}
          </TransitionLink>
        </p>
      ) : (
        <div className="mt-10 space-y-10">
          <div>
            <h3 className="text-lg font-extrabold">{a.installTitle}</h3>
            <ol className="mt-4 space-y-3">
              {a.steps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="text-2xl font-extrabold leading-none text-forest-600" aria-hidden>
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="border-l-4 border-forest-500 pl-5">
            <h3 className="text-lg font-extrabold">{a.warnTitle}</h3>
            <p className={`mt-2 leading-relaxed ${muted}`}>{a.warn}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-forest-600">{a.checksum}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <code className="break-all font-mono text-xs leading-relaxed">{META.sha256}</code>
              <button
                type="button"
                onClick={onCopy}
                className="rounded-full border border-forest-300 px-3 py-1 text-xs font-semibold text-forest-800 transition hover:bg-forest-50"
              >
                <span aria-live="polite">{copied ? a.copied : a.copyChecksum}</span>
              </button>
            </div>
            <p className={`mt-2 text-sm ${muted}`}>{a.checksumHelp}</p>
          </div>
        </div>
      )}
    </div>
  );
}

