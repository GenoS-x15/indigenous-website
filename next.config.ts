import type { NextConfig } from "next";

// Static export: the site is uploaded to Hostinger public_html as plain files.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
