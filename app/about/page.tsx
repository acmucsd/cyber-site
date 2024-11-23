import Board from "@/components/Board";
import { getBoard } from "@/lib/api/BoardAPI";
import { Metadata } from "next";
import styles from "./page.module.css";

// Cache the board data for 1 day
export const revalidate = 86400;

export const metadata: Metadata = {
	title: "About | ACM Cyber",
};

export default async function About() {
	const boardHistory = await getBoard("first");

	return (
		<main className={styles.container}>
			<h1>About ACM Cyber</h1>
			<h2>Our Team</h2>
			<Board
				startYear={boardHistory[0].startYear}
				members={boardHistory[0].members}
				years={boardHistory.map(({ startYear }) => startYear)}
			/>
		</main>
	);
}
