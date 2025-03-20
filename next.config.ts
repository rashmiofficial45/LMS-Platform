import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'cdn.sanity.io',
      port: ''
    }], // Add the required domain here
  },
};

export default nextConfig;
