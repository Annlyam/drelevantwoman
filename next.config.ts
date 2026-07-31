import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  optimizeFonts: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.drelevantwoman.vercel.app",
          },
        ],
        destination: "https://drelevantwoman.vercel.app/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
