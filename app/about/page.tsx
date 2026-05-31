import Board from "@/components/Board";
import Button from "@/components/Button";
import { getBoard } from "@/lib/api/BoardAPI";
import { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

// Cache the board data for 1 day
export const revalidate = 86400;

export const metadata: Metadata = {
	title: "About | ACM Cyber",
	description:
		"We're UC San Diego's student-led cybersecurity club, part of ACM at UC San Diego. We aim to make cybersecurity accessible through workshops, competitions, and socials.",
};

export default async function About() {
	const boardHistory = await getBoard("first");

	return (
		<main className={styles.container}>
			<h1>About ACM Cyber</h1>
			{/* Not plagiarism at all!! I would never copy from https://ai.acmucsd.com/ */}
			<p>
				We're UC San Diego's student-led cybersecurity club, part of the <Link href="https://acmucsd.com" className={styles.link}>ACM at UC San Diego</Link> student chapter. Through our workshops, competitions, and socials, we aim to make cybersecurity accessible and have tons of fun along the way.
			</p>
			<h2>Join Us</h2>
			<p>
				ACM is a members-first community. There is no fee or application to become a member, and everyone is welcome,
				regardless of experience. Simply create an account on the{" "}
				<Link href="https://members.acmucsd.com/" className={styles.link}>
					ACM Membership Portal
				</Link>{" "}
				and come to any of our events!
			</p>
			<p>
				If our mission calls out to you, join our board! Board applications open every spring
				quarter. If this seems too daunting, you can also apply to be a Diamond Staff in fall quarter. It's a
				lighter commitment to see if we're right for each other. Join the{" "}
				<Link href="https://acmurl.com/discord" className={styles.link}>
					main ACM Discord
				</Link>{" "}
				for any applications-related questions or updates.
			</p>
			<p>
				We are always looking for challenge developers for SDCTF. If you&rsquo;re interested, message the president on
				the{" "}
				<Link href="https://acmurl.com/cyber-discord" className={styles.link}>
					ACM Cyber Discord
				</Link>
				.
			</p>
			<div className={styles.buttons}>
				<Button href="https://acmurl.com/cyber-elections">Board Elections</Button>
				<Button href="https://acmurl.com/staff-info">Diamond Staff</Button>
			</div>
			<h2>Our Board</h2>
			<Board
				startYear={boardHistory[0].startYear}
				members={boardHistory[0].members}
				years={boardHistory.map(({ startYear }) => startYear)}
			/>
		</main>
	);
}
