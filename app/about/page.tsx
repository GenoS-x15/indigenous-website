import type { Metadata } from "next";
import { AboutView } from "@/components/views/AboutView";

export const metadata: Metadata = {
  title: "About Us",
  description: "Indigenous Goat Breed Development Pvt. Ltd. protects indigenous goat breeds, starting with the Zalawadi goat in Dhule and Nandurbar, Maharashtra.",
  alternates: { canonical: "/about/" },
};

export default function Page() {
  return <AboutView />;
}
