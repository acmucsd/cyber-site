import Board from "@/components/Board";
import { getBoard } from "@/lib/board";
import { Metadata } from "next";
import styles from "./page.module.css";

// Cache the board data for 1 day
export const revalidate = 86400;

export const metadata: Metadata = {
	title: "About | ACM Cyber",
};

export default async function About() {
	const boardHistory = await getBoard();

	return (
		<main className={styles.container}>
			<Board
				startYear={boardHistory[0].startYear}
				members={boardHistory[0].members}
				years={boardHistory.map(({ startYear }) => startYear)}
				current
			/>
		</main>
	);
}
