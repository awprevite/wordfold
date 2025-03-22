import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // Converts Next.js to static files
  distDir: "out",   // Default directory for GitHub Pages
  basePath: "/wordfold"
};

export default nextConfig;
