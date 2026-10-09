import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

const ROUTES = ["", "about", "project", "care-guide", "women-training", "events", "staff", "download", "contact", "privacy", "terms", "account-deletion", "credits"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({ url: `${SITE.siteUrl}/${r ? r + "/" : ""}`, lastModified: new Date("2026-10-09") }));
}
