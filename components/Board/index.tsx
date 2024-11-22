import { BoardMember } from "@/lib/board";
import Link from "next/link";
import BoardCard from "../BoardCard";
import styles from "./style.module.css";

export type BoardProps = {
	startYear: number;
	members: BoardMember[];
	years: number[];
	current?: boolean;
};
export default function Board({ startYear, members, years, current = false }: BoardProps) {
	return (
		<>
			<h1>{current ? "Our Team" : `Board in ${startYear}–${startYear + 1}`}</h1>
			<div className={styles.years}>
				{years.map((year) => (
					<Link
						className={`${styles.year} ${year === startYear ? styles.active : ""}`}
						href={`/about/${year}`}
						key={year}
					>
						{year}–{year + 1}
					</Link>
				))}
			</div>
			<div className={styles.members}>
				{members.map((member) => (
					<BoardCard member={member} key={member.name} />
				))}
			</div>
		</>
	);
}
