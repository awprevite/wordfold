import type { NextConfig } from "next";

// To use npm run dev, the contents of this function may need to be deleted
const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // Converts Next.js to static files
  distDir: "out",   // Default directory for GitHub Pages
  basePath: "/wordfold",
  assetPrefix: "/wordfold",  // Ensures assets load correctly
};

export default nextConfig;
