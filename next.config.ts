import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "acmucsd.s3.us-west-1.amazonaws.com",
			},
			{
				protocol: "https",
				// Some old events are hosted here
				hostname: "acmucsd.s3-us-west-1.amazonaws.com",
			},

			// Board photos
			{
				protocol: "https",
				hostname: "i.imgur.com",
			},
			{
				protocol: "https",
				hostname: "mojeanmac.github.io",
			},
			{
				protocol: "https",
				hostname: "media.licdn.com",
			},
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
			},
		],
	},
};

export default nextConfig;
