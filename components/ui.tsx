import Image from "next/image";
import { Reveal } from "./Reveal";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function PageBanner({ title, intro, image }: { title: string; intro?: string; image?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-900 text-white">
      {image && (
        <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-30" />
      )}
      <div className="-z-10 absolute inset-0 bg-gradient-to-r from-forest-950/90 via-forest-900/70 to-forest-800/40" />
      <Container className="py-16 sm:py-24">
        <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-forest-100">{intro}</p>}
      </Container>
    </section>
  );
}

export function SectionTitle({ kicker, title, text, center = false }: { kicker?: string; title: string; text?: string; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {kicker && <p className="text-sm font-bold uppercase tracking-[0.2em] text-forest-600">{kicker}</p>}
      <h2 className="mt-2 text-3xl font-extrabold leading-tight text-forest-950 sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-lg leading-relaxed text-forest-900/80">{text}</p>}
    </Reveal>
  );
}

export function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 leading-relaxed">
      <svg className="mt-1 h-5 w-5 shrink-0 text-forest-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

export function Photo({ src, alt, className = "", sizes = "(min-width:1024px) 40vw, 100vw", priority = false }: { src: string; alt: string; className?: string; sizes?: string; priority?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-forest-100 ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-700 hover:scale-105" />
    </div>
  );
}
