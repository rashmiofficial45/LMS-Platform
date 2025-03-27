import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'cdn.sanity.io',
    },{
      protocol: 'https',
      hostname: 'img.clerk.com',
    }], // Add the required domain here
  },
};

export default nextConfig;
