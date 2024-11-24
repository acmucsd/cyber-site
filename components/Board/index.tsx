import { BoardMember } from "@/lib/api/BoardAPI";
import BoardCard from "../BoardCard";
import Button from "../Button";
import styles from "./style.module.css";

export type BoardProps = {
	startYear: number;
	members: BoardMember[];
	years: number[];
};
export default function Board({ startYear, members, years }: BoardProps) {
	return (
		<>
			<div className={styles.years}>
				{years
					.map((year) => (
						<Button href={`/about/${year}`} primary={year === startYear} small key={year}>
							{year}–{year + 1}
						</Button>
					))
					.reverse()}
			</div>
			<div className={styles.members}>
				{members.map((member) => (
					<BoardCard member={member} key={`${member.name}\n${member.position}`} />
				))}
			</div>
		</>
	);
}
