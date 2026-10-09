import type { Metadata } from "next";
import { StaffView } from "@/components/views/StaffView";

export const metadata: Metadata = {
  title: "Staff Portal",
  description: "Access for authorised Indigenous employees: Pashu Sakhi, LSS Officers and administrators.",
  alternates: { canonical: "/staff/" },
};

export default function Page() {
  return <StaffView />;
}
