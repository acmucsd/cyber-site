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
				hostname: "acmucsd.s3-us-west-1.amazonaws.com",
			},
		],
	},
};

export default nextConfig;
