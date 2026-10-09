import type { Metadata } from "next";
import { GuideView } from "@/components/views/GuideView";

export const metadata: Metadata = {
  title: "Goat Care Guide",
  description: "Housing, feeding, hygienic milking, health, breeding and kid care for goat rearers.",
  alternates: { canonical: "/care-guide/" },
};

export default function Page() {
  return <GuideView />;
}
