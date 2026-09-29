import type { NextConfig } from "next";

// Fully static export: `next build` writes plain HTML/CSS to ./out,
// which GitHub Pages serves directly. No server runtime to maintain.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
