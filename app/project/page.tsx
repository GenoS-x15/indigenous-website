import type { Metadata } from "next";
import { ProjectView } from "@/components/views/ProjectView";

export const metadata: Metadata = {
  title: "Zalawadi Goat Milk Enhancement Project",
  description: "Objectives, methodology, milk targets, project villages and the dairy centre at Malpur.",
  alternates: { canonical: "/project/" },
};

export default function Page() {
  return <ProjectView />;
}
