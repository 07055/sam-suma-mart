import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.samsumamart.co.ke' }],
        destination: 'https://samsumamart.co.ke/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
