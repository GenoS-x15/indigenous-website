import Image from "./Img";
import { Reveal } from "./Reveal";
import { HoofPrint, Leaf } from "./Shapes";
import { Wave } from "./Wave";
import { asset } from "@/lib/site";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

/** Pixel size of the desktop file of each photo in public/images/web/ (the mobile file is used below 768 px). */
function webSize(name: string) {
  if (name === "hero-goats") return { w: 2400, h: 1600, mobile: "-mobile" };
  if (name.startsWith("banner-")) return { w: 1920, h: 1080, mobile: "-800" };
  return { w: 1200, h: 900, mobile: "-800" };
}

/** A photo from public/images/web/ with its smaller mobile file, filling its parent. */
export function WebPicture({
  name,
  alt,
  className = "",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const { w, h, mobile } = webSize(name);
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={asset(`/images/web/${name}${mobile}.webp`)} />
      <img
        src={asset(`/images/web/${name}.webp`)}
        alt={alt}
        width={w}
        height={h}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      />
    </picture>
  );
}

/** Full-bleed photo banner with a deep green gradient, a slow zoom and a wavy edge into the page. */
export function PageBanner({ title, intro, image, alt = "" }: { title: string; intro?: string; image: string; alt?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-950 text-white">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <WebPicture name={image} alt={alt} priority className="kenburns" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950/95 via-forest-950/75 to-forest-900/30" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-forest-950/70 to-transparent" />
      <Container className="pb-24 pt-20 sm:pb-32 sm:pt-28 lg:pb-40 lg:pt-36">
        <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] sm:text-6xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-forest-50/90 sm:text-xl">{intro}</p>}
      </Container>
      <div className="absolute inset-x-0 bottom-0">
        <Wave />
      </div>
    </section>
  );
}

/** Section heading with a hand-drawn stroke that draws itself when the heading scrolls into view. */
export function SectionTitle({
  kicker,
  title,
  text,
  center = false,
  dark = false,
  as: Tag = "h2",
}: {
  kicker?: string;
  title: string;
  text?: string;
  center?: boolean;
  dark?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {kicker && (
        <p className={`text-sm font-bold uppercase tracking-[0.2em] ${dark ? "text-forest-300" : "text-forest-600"}`}>{kicker}</p>
      )}
      <Tag className={`mt-2 text-3xl font-extrabold leading-tight sm:text-5xl ${dark ? "text-white" : "text-forest-950"}`}>{title}</Tag>
      <svg
        viewBox="0 0 240 14"
        className={`scribble mt-3 h-3 w-40 ${center ? "mx-auto" : ""} ${dark ? "text-forest-400" : "text-forest-500"}`}
        aria-hidden
        focusable="false"
      >
        <path d="M3 9C40 4 80 3 120 6s76 5 117-2" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
      {text && <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-forest-100" : "text-forest-900/80"}`}>{text}</p>}
    </Reveal>
  );
}

/** A list item drawn as a simple line with a leaf or hoof-print marker. */
export function Line({ children, marker = "leaf", dark = false }: { children: React.ReactNode; marker?: "leaf" | "hoof"; dark?: boolean }) {
  const color = dark ? "text-forest-300" : "text-forest-600";
  return (
    <li className={`flex gap-3 border-b py-3 leading-relaxed last:border-b-0 ${dark ? "border-white/10" : "border-forest-900/10"}`}>
      {marker === "leaf" ? <Leaf className={`mt-1 shrink-0 ${color}`} /> : <HoofPrint className={`mt-1 shrink-0 ${color}`} size={18} />}
      <span>{children}</span>
    </li>
  );
}

/** One of the company's own photos (public/images/), optionally cut with an organic mask. */
export function Photo({
  src,
  alt,
  className = "",
  mask = "",
  sizes = "(min-width:1024px) 40vw, 100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  mask?: "" | "mask-blob-1" | "mask-blob-2" | "mask-blob-3" | "mask-arch";
  sizes?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-forest-100 ${mask || "rounded-[2rem]"} ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}
