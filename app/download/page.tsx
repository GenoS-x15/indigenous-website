import type { Metadata } from "next";
import { DownloadView } from "@/components/views/DownloadView";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Download the ${SITE.app.name} app`,
  description: `Download ${SITE.app.name}, the Android app used by goat owners, Pashu Sakhi and LSS Officers of Indigenous Goat Breed Development Pvt. Ltd., with install steps.`,
  alternates: { canonical: "/download/" },
};

export default function Page() {
  return <DownloadView />;
}
