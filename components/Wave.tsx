/**
 * A soft wavy or hill-shaped edge between two bands. `className` sets its colour (text-*):
 * at the bottom of a band, use the colour of the band that follows; with `top`, it sits at the top of a band
 * in the colour of the band before it.
 */
export function Wave({ className = "text-white", shape = "wave", top = false }: { className?: string; shape?: "wave" | "hill"; top?: boolean }) {
  const d =
    shape === "hill"
      ? "M0,64 C180,20 360,8 560,36 C760,64 900,70 1080,40 C1240,14 1360,22 1440,40 L1440,80 L0,80 Z"
      : "M0,40 C240,72 480,4 720,30 C960,56 1200,70 1440,26 L1440,80 L0,80 Z";
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
      className={`pointer-events-none block h-10 w-full sm:h-16 ${top ? "rotate-180" : ""} ${className}`}
    >
      <path d={d} fill="currentColor" />
    </svg>
  );
}
