"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** Rolling company logo, used for the first page load and any waiting state. */
export function Spinner({ size = 40, label = "Loading" }: { size?: number; label?: string }) {
  return (
    <span role="status" aria-label={label} className="inline-flex">
      <Image src="/logo.png" alt="" width={size} height={size} className="animate-roll rounded-full" priority />
    </span>
  );
}

/** Longest the first-load screen may stay, even if images are still downloading on a slow connection. */
const MAX_MS = 1200;

export function Loader() {
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Hide shortly after load, or at MAX_MS, whichever comes first.
    const cap = window.setTimeout(() => setHide(true), MAX_MS);
    let soon: number | undefined;
    const finish = () => {
      soon = window.setTimeout(() => setHide(true), 300);
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(cap);
      if (soon) window.clearTimeout(soon);
    };
  }, []);

  useEffect(() => {
    if (!hide) return;
    const t = window.setTimeout(() => setGone(true), 500);
    return () => window.clearTimeout(t);
  }, [hide]);

  if (gone) return null;
  return (
    <div
      className={`ig-loader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${hide ? "pointer-events-none opacity-0" : "opacity-100"}`}
      aria-hidden={hide}
    >
      <Spinner size={132} />
      <p className="mt-6 text-sm font-semibold tracking-[0.3em] text-forest-800">INDIGENOUS</p>
    </div>
  );
}
