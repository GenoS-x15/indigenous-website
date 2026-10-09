import type { Metadata } from "next";
import { CreditsView } from "@/components/views/CreditsView";

export const metadata: Metadata = {
  title: "Image credits",
  description: "Photographers and licences of the photos used on the Indigenous website.",
  alternates: { canonical: "/credits/" },
};

export default function Page() {
  return <CreditsView />;
}
