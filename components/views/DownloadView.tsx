"use client";

import { useLang } from "../LanguageProvider";
import { AppDownload } from "../AppDownload";
import { Reveal } from "../Reveal";
import { Container, PageBanner } from "../ui";
import { withApp } from "@/lib/site";

export function DownloadView() {
  const { t } = useLang();

  return (
    <>
      <PageBanner title={withApp(t.app.title)} intro={withApp(t.app.intro)} image="banner-staff" alt={t.alt.staff} />
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal className="max-w-3xl text-forest-950">
            <AppDownload />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
