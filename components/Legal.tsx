import { Container } from "./ui";

export const LEGAL_UPDATED = "9 October 2026";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <section className="bg-forest-900 text-white">
        <Container className="py-14 sm:py-20">
          <h1 className="text-3xl font-extrabold sm:text-5xl">{title}</h1>
          <p className="mt-4 text-forest-200">Last updated: {LEGAL_UPDATED}</p>
        </Container>
      </section>
      <Container className="py-14">
        <article className="mx-auto max-w-3xl space-y-8 text-[17px] leading-relaxed text-forest-950 [&_a]:text-forest-700 [&_a]:underline [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-forest-900 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          {children}
        </article>
      </Container>
    </>
  );
}
