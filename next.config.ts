import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use an alternate build directory to avoid OneDrive `.next` reparse/readlink issues
  distDir: 'build',
  images: {
    // Allow explicit quality values to avoid future Next.js 16 warnings
    qualities: [75, 85],
  },
};

export default nextConfig;
