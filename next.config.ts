import type { NextConfig } from "next";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://127.0.0.1:1337";
const strapi = new URL(STRAPI_URL);

// Static export (produces a `dist`/`out` folder) only when STATIC_EXPORT=true,
// so the normal SSR build (for Amplify) is unaffected.
const isStatic = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/contact/call", destination: "/contact", permanent: true }];
  },
  ...(isStatic ? { output: "export", trailingSlash: true } : {}),
  images: {
    unoptimized: isStatic,
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
