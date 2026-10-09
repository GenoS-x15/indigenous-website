// Page transitions: which motion each page uses when you arrive on it.
// The keyframes live in app/globals.css (.page[data-enter=...] and body[data-leave=...]).
// To change a page's motion, change its entry here. Reduced-motion users always get an instant change.

export type Variant = "zoom" | "slide-right" | "slide-left" | "slide-up" | "slide-down" | "wipe" | "circle" | "blur" | "fade";

export const ROUTE_TRANSITIONS: Record<string, Variant> = {
  "/": "zoom",
  "/about/": "slide-right",
  "/project/": "slide-up",
  "/care-guide/": "wipe",
  "/women-training/": "slide-left",
  "/events/": "circle",
  "/staff/": "blur",
  "/contact/": "slide-down",
  "/download/": "slide-up",
};

/** Exit time of the current page before the next one is shown, in ms (must match globals.css). */
export const EXIT_MS = 220;

/** Legal pages, credits and anything not listed simply fade. */
export function variantFor(path: string): Variant {
  const clean = path.split(/[?#]/)[0];
  const withSlash = clean.endsWith("/") ? clean : `${clean}/`;
  return ROUTE_TRANSITIONS[withSlash] ?? "fade";
}
