import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Loader } from "@/components/Loader";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: {
    default: "Indigenous Goat Breed Development Pvt. Ltd.",
    template: "%s | Indigenous",
  },
  description:
    "Indigenous Goat Breed Development Pvt. Ltd. protects indigenous goat breeds and supports goat rearers in Dhule and Nandurbar, Maharashtra through the Zalawadi Goat Milk Enhancement Project.",
  applicationName: "Indigenous",
  authors: [{ name: "Genos Cybernetics" }],
  openGraph: {
    title: "Indigenous Goat Breed Development Pvt. Ltd.",
    description: "Indigenous goat heritage, protected with science, data and community.",
    type: "website",
    locale: "en_IN",
    images: ["/images/goat-hero.jpg"],
  },
  referrer: "strict-origin-when-cross-origin",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#14532d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <noscript>
          <style>{`.ig-loader{display:none!important}.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <LanguageProvider>
          <Loader />
          <a
            href="#content"
            className="sr-only z-[200] rounded-md bg-white px-4 py-2 font-semibold text-forest-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <Header />
          <main id="content">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
