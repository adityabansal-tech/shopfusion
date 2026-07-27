import type { NextConfig } from "next";

const baseConfig: NextConfig = {
  turbopack: {},
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Prevents Next.js SSG pages from hanging the build when fetching DB data
  staticPageGenerationTimeout: 60,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default baseConfig;