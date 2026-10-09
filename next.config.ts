import type { NextConfig } from "next";

// Static export: the site is plain files, for Hostinger public_html or GitHub Pages.
// NEXT_PUBLIC_BASE_PATH is the sub-folder the site lives in ("" for a domain of its own).
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
