"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** True when the visitor asked the system for less motion. False while rendering on the server. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
}

/**
 * Calls `onProgress` with how far an element has travelled through the viewport (0 entering at the bottom,
 * 1 leaving at the top), once per animation frame while scrolling. Returns a cleanup function.
 */
export function trackScroll(el: HTMLElement, onProgress: (p: number) => void) {
  let frame = 0;
  const update = () => {
    frame = 0;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    onProgress(Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height))));
  };
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    if (frame) cancelAnimationFrame(frame);
  };
}
