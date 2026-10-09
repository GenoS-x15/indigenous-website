import type { Metadata } from "next";
import { ContactView } from "@/components/views/ContactView";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Indigenous Goat Breed Development Pvt. Ltd. at Malpur, Dhule, Maharashtra.",
  alternates: { canonical: "/contact/" },
};

export default function Page() {
  return <ContactView />;
}
