import Board from "@/components/Board";
import { getBoard } from "@/lib/board";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "../page.module.css";

// Cache the board data for 1 day
export const revalidate = 86400;

type AboutPageProps = {
	params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
	const { year } = await params;

	return {
		title: `ACM Cyber Board ${year}–${+year + 1} | ACM Cyber`,
	};
}

export default async function AboutPage({ params }: AboutPageProps) {
	const { year } = await params;
	const boardHistory = await getBoard();
	const entry = boardHistory.find(({ startYear }) => startYear === +year);
	if (!entry) {
		notFound();
	}

	const { startYear, members } = entry;

	return (
		<main className={styles.container}>
			<Board startYear={startYear} members={members} years={boardHistory.map(({ startYear }) => startYear)} />
		</main>
	);
}

export async function generateStaticParams() {
	const boardHistory = await getBoard();

	return boardHistory.map(({ startYear }) => ({ year: String(startYear) }));
}