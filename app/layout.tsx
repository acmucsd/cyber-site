import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
	subsets: ["latin"],
	display: "swap",
	weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
	title: "ACM Cyber",
	description:
		"ACM [CYBER] at UC San Diego is an inclusive community of students interested in [CYBERSECURITY]. We promote community and education about [CYBERSECURITY] by hosting workshops, competitions, and socials throughout the year.",
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
