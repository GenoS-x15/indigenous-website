"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { DICTS, type Dict } from "@/lib/i18n";
import type { LangCode } from "@/lib/site";

type Ctx = { lang: LangCode; t: Dict; setLang: (l: LangCode) => void };
const LanguageContext = createContext<Ctx>({ lang: "en", t: DICTS.en, setLang: () => {} });

const KEY = "ig-lang";
const EVENT = "ig-lang-change";
const isLang = (v: unknown): v is LangCode => v === "en" || v === "hi" || v === "mr";

// In-memory copy, so switching still works when storage is blocked.
let current: LangCode | null = null;

function readLang(): LangCode {
  if (current) return current;
  try {
    const saved = localStorage.getItem(KEY);
    if (isLang(saved)) current = saved;
  } catch {
    /* storage blocked: stay on English */
  }
  return current ?? "en";
}

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY && isLang(e.newValue)) current = e.newValue;
    onChange();
  };
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // The static HTML is English; the saved choice is applied right after hydration.
  const lang = useSyncExternalStore<LangCode>(subscribe, readLang, () => "en");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: LangCode) => {
    current = l;
    try {
      localStorage.setItem(KEY, l);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const value = useMemo(() => ({ lang, t: DICTS[lang], setLang }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);
