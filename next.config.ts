import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'ac.goit.global',
      pathname: '/**',
    }, { protocol: 'https', hostname: 'aliiev-lomach.com' },],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://notehub-api.goit.study/:path*',
      },
    ];
  },
};

export default nextConfig;
