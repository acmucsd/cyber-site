import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
	subsets: ["latin"],
	display: "swap",
	weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
	title: "ACM Cyber at UCSD",
	description:
		"ACM [CYBER] at UC San Diego is an inclusive community of students interested in [CYBERSECURITY]. We promote community and education about [CYBERSECURITY] by hosting workshops, competitions, and socials throughout the year.",
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#52bfbf" },
		{ media: "(prefers-color-scheme: dark)", color: "#030712" },
	],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={`${dmSans.className}`}>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
