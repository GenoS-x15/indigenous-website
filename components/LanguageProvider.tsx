"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DICTS, type Dict } from "@/lib/i18n";
import type { LangCode } from "@/lib/site";

type Ctx = { lang: LangCode; t: Dict; setLang: (l: LangCode) => void };
const LanguageContext = createContext<Ctx>({ lang: "en", t: DICTS.en, setLang: () => {} });

const KEY = "ig-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "en" || saved === "hi" || saved === "mr") setLangState(saved);
    } catch {
      /* storage blocked: stay on English */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: LangCode) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ lang, t: DICTS[lang], setLang }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);
