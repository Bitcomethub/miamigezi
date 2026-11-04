import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PostHog reverse proxy (POSTHOG-1): olaylar kendi alan adimizdan gider, reklam engelleyici kaybi azalir.
  async rewrites() {
    return [
      { source: "/ingest/static/:path*", destination: "https://us-assets.i.posthog.com/static/:path*" },
      { source: "/ingest/:path*", destination: "https://us.i.posthog.com/:path*" },
    ];
  },
  /* config options here */
};

export default nextConfig;
