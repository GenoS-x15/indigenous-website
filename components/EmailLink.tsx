"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./LanguageProvider";
import { SITE } from "@/lib/site";

/** Phones and tablets have a mail app, so mailto: works there. Desktops often do not. */
function isMobileDevice() {
  const ua = navigator.userAgent;
  // iPadOS reports itself as a Mac, so also check for touch.
  return /Android|iPhone|iPad|iPod|Mobile/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
}

const gmailUrl = (subject?: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SITE.email)}` +
  (subject ? `&su=${encodeURIComponent(subject)}` : "");

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers or blocked clipboard access: copy a selected hidden field.
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.cssText = "position:fixed;top:0;left:0;opacity:0";
    document.body.appendChild(field);
    field.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    field.remove();
    return ok;
  }
}

/**
 * The company email address as a link that works everywhere:
 * mailto: on phones, Gmail compose in a new tab on desktop, plus a copy button.
 */
export function EmailLink({
  subject,
  className = "",
  children,
  copy = true,
  copyClassName = "",
}: {
  subject?: string;
  className?: string;
  children?: React.ReactNode;
  copy?: boolean;
  copyClassName?: string;
}) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const mailto = `mailto:${SITE.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

  const onCopy = async () => {
    if (!(await copyText(SITE.email))) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span className="inline-flex max-w-full items-center gap-2">
      <a
        href={mailto}
        className={className}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || isMobileDevice()) return;
          e.preventDefault();
          window.open(gmailUrl(subject), "_blank", "noopener,noreferrer");
        }}
      >
        {children ?? SITE.email}
      </a>
      {copy && (
        <button
          type="button"
          onClick={onCopy}
          title={t.email.copy}
          aria-label={t.email.copy}
          className={`inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-1 text-xs font-semibold opacity-80 transition hover:opacity-100 ${copyClassName}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            {copied ? (
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            ) : (
              <>
                <rect x="9" y="9" width="12" height="12" rx="2" />
                <path d="M5 15V5a2 2 0 0 1 2-2h10" />
              </>
            )}
          </svg>
          <span aria-live="polite" className={copied ? "" : "sr-only"}>
            {copied ? t.email.copied : ""}
          </span>
        </button>
      )}
    </span>
  );
}
