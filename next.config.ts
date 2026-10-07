import type { NextConfig } from "next";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://127.0.0.1:1337";
const strapi = new URL(STRAPI_URL);

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/contact/call", destination: "/contact", permanent: true }];
  },
  images: {
    remotePatterns: [
      {
        protocol: strapi.protocol.replace(":", "") as "http" | "https",
        hostname: strapi.hostname,
        port: strapi.port || undefined,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
