import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "book-a-nook.vercel.app",
			},
			{
				protocol: "https",
				hostname: "placehold.co",
			},
		],
	},
} satisfies NextConfig;

export default withPWA({
	dest: "public",
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === "development",
})(nextConfig);
