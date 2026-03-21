import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    'preview-chat-18dd11f2-2d10-4285-8130-b08d2b1d9cf1.space.z.ai',
    '.space.z.ai',
  ],
};

export default nextConfig;
