"use client";

import { useEffect } from "react";

const PRINT =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 3.5c-2.6 0-4.1 3.7-3.6 7.8.4 3.3 2.4 5.2 4.3 4.6 1.9-.5 2.5-3.5 2-6.6C9.3 6 8.5 3.5 7 3.5z"/><path d="M17 3.5c2.6 0 4.1 3.7 3.6 7.8-.4 3.3-2.4 5.2-4.3 4.6-1.9-.5-2.5-3.5-2-6.6C14.7 6 15.5 3.5 17 3.5z"/></svg>';
const STEP = 70; // px of mouse travel between prints
const MAX = 14;

/** Faint hoof prints that follow the mouse. Desktop mouse only; off for touch and reduced motion. */
export function HoofTrail() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastX = 0;
    let lastY = 0;
    let travelled = 0;
    let left = false;
    const live: HTMLElement[] = [];

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      travelled += Math.hypot(dx, dy);
      if (travelled < STEP) return;
      travelled = 0;
      const angle = Math.atan2(dy, dx);
      // Alternate left and right feet a little to each side of the path.
      left = !left;
      const side = left ? -7 : 7;
      const x = e.clientX + Math.cos(angle + Math.PI / 2) * side;
      const y = e.clientY + Math.sin(angle + Math.PI / 2) * side;
      const el = document.createElement("span");
      el.className = "trail-print";
      el.innerHTML = PRINT;
      el.style.left = `${x - 7}px`;
      el.style.top = `${y - 7}px`;
      el.style.transform = `rotate(${(angle * 180) / Math.PI + 90}deg)`;
      document.body.appendChild(el);
      live.push(el);
      if (live.length > MAX) live.shift()?.remove();
      el.addEventListener("animationend", () => {
        el.remove();
        const i = live.indexOf(el);
        if (i >= 0) live.splice(i, 1);
      });
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onFirst = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
    };

    window.addEventListener("pointerdown", onFirst, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onFirst);
      window.removeEventListener("pointermove", onMove);
      live.forEach((el) => el.remove());
    };
  }, []);

  return null;
}
