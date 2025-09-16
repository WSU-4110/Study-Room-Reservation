// next.config.ts
import withPWA from "next-pwa";
import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  // keep your existing options here, e.g.:
  // images: { remotePatterns: [{ protocol: "https", hostname: "example.com" }] },
} satisfies NextConfig;

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  // disable in development if desired:
  // disable: process.env.NODE_ENV === "development",
})(nextConfig);
