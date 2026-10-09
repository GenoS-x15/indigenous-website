// Original SVG artwork used across the site: photo masks, hoof print, leaf marker and the walking goat.

/** Clip paths for organic photo shapes (.mask-blob-1/2/3 in globals.css). Rendered once in the layout. */
export function ShapeDefs() {
  return (
    <svg width="0" height="0" aria-hidden focusable="false" style={{ position: "absolute" }}>
      <defs>
        <clipPath id="blob-1" clipPathUnits="objectBoundingBox">
          <path d="M0.08,0.18 C0.18,0.02 0.45,0 0.66,0.04 C0.88,0.08 1,0.24 0.98,0.48 C0.96,0.72 0.9,0.92 0.66,0.98 C0.42,1.03 0.16,0.96 0.06,0.76 C-0.02,0.58 0,0.32 0.08,0.18 Z" />
        </clipPath>
        <clipPath id="blob-2" clipPathUnits="objectBoundingBox">
          <path d="M0.12,0.08 C0.3,-0.02 0.62,0.02 0.82,0.1 C0.98,0.17 1,0.42 0.97,0.62 C0.94,0.84 0.78,0.99 0.54,0.98 C0.3,0.97 0.08,0.9 0.02,0.66 C-0.03,0.44 0,0.16 0.12,0.08 Z" />
        </clipPath>
        {/* A rectangle with a soft, torn-looking bottom edge. */}
        <clipPath id="blob-3" clipPathUnits="objectBoundingBox">
          <path d="M0,0 H1 V0.9 C0.9,0.96 0.8,0.86 0.68,0.92 C0.56,0.98 0.44,0.88 0.32,0.94 C0.2,1 0.1,0.9 0,0.95 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

/** A two-toed goat hoof print. */
export function HoofPrint({ className = "", size = 16 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" className={className}>
      <path d="M7 3.5c-2.6 0-4.1 3.7-3.6 7.8.4 3.3 2.4 5.2 4.3 4.6 1.9-.5 2.5-3.5 2-6.6C9.3 6 8.5 3.5 7 3.5z" />
      <path d="M17 3.5c2.6 0 4.1 3.7 3.6 7.8-.4 3.3-2.4 5.2-4.3 4.6-1.9-.5-2.5-3.5-2-6.6C14.7 6 15.5 3.5 17 3.5z" />
    </svg>
  );
}

/** A small leaf, used as the list marker. */
export function Leaf({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden focusable="false" className={className}>
      <path d="M4 20C4 11 10 5 20 4c-1 10-7 16-16 16z" fill="currentColor" />
      <path d="M4.5 19.5C8 15 12 11 17 7" stroke="#fff" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

/** Side view of a goat facing right. Legs carry .goat-leg a/b so they can swing while walking. */
export function GoatSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 -4 100 80" fill="currentColor" aria-hidden focusable="false" className={className}>
      <path d="M18 30c-6-3-8-9-5-13 1 4 4 7 8 9z" />
      <path d="M20 28c4-8 20-10 36-8 8 1 12 4 14 10 1 8-2 16-12 18H28c-8-1-12-8-8-20z" />
      <path d="M62 24c2-8 6-15 12-18 4-2 10-1 14 3 3 3 4 6 2 8-3 1-7 0-10 0-3 3-6 9-10 15z" />
      <path d="M74 6c-2-6-8-8-12-5 5 0 8 2 10 6z" />
      <path d="M76 10c-5 2-8 6-9 10 4-2 8-5 11-8z" opacity="0.85" />
      <path d="M86 17c0 4-1 7-3 9 0-4 0-7 1-9z" />
      <rect className="goat-leg a" x="24" y="44" width="4" height="28" rx="1.6" />
      <rect className="goat-leg b" x="31" y="44" width="4" height="28" rx="1.6" />
      <rect className="goat-leg b" x="57" y="44" width="4" height="28" rx="1.6" />
      <rect className="goat-leg a" x="64" y="44" width="4" height="28" rx="1.6" />
    </svg>
  );
}
