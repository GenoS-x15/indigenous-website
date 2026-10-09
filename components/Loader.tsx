"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** Rolling company logo, used for the first page load and any waiting state. */
export function Spinner({ size = 40, label = "Loading" }: { size?: number; label?: string }) {
  return (
    <span role="status" aria-label={label} className="inline-flex">
      <Image
        src="/logo.png"
        alt=""
        width={size}
        height={size}
        className="animate-roll rounded-full"
        priority
      />
    </span>
  );
}

export function Loader() {
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    const finish = () => {
      timer = window.setTimeout(() => setHide(true), 700);
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    return () => {
      window.removeEventListener("load", finish);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!hide) return;
    const t = window.setTimeout(() => setGone(true), 600);
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
