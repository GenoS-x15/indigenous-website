import type { Metadata } from "next";
import { TrainingView } from "@/components/views/TrainingView";

export const metadata: Metadata = {
  title: "Women Training",
  description: "Goat rearing training for women beneficiaries: shelter, feed, health, breeding, records and enrolment checklist.",
  alternates: { canonical: "/women-training/" },
};

export default function Page() {
  return <TrainingView />;
}
