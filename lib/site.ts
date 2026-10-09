// Single place for company facts. Edit here, the whole site updates.
export const SITE = {
  name: "Indigenous",
  legalName: "Indigenous Goat Breed Development Private Limited",
  shortLegal: "IGBDPL",
  cin: "U01100PN2022PTC209861",
  gstin: "27AAGCI5953D1ZI",
  email: "igbdpl22@gmail.com",
  phones: ["77090 10407", "94230 12256"],
  ceo: "Mr. Kiran Shreekant Patwardhan",
  address: [
    "Goat Dairy, Amravati Dam Road",
    "At Village Malpur, Sindkheda",
    "Dist. Dhule, Maharashtra 425408",
  ],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Goat+Dairy+Amravati+Dam+Road+Malpur+Sindkheda+Dhule+425408",
  // Set these in .env.local (see .env.example). Empty = button shows "coming soon".
  adminUrl: process.env.NEXT_PUBLIC_ADMIN_URL ?? "",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  developer: {
    name: "Genos Cybernetics",
    logo: "/genos-logo.png",
  },
} as const;

export type LangCode = "en" | "hi" | "mr";
export const LANGS: { code: LangCode; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "hi", label: "हिन्दी", short: "हिं" },
  { code: "mr", label: "मराठी", short: "मरा" },
];
