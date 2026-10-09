import type { Metadata } from "next";
import { EventsView } from "@/components/views/EventsView";

export const metadata: Metadata = {
  title: "Events",
  description: "Health camps, project announcements, dairy milestones and collaborations.",
  alternates: { canonical: "/events/" },
};

export default function Page() {
  return <EventsView />;
}
