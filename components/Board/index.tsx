import { BoardMember } from "@/lib/api/BoardAPI";
import Board2022 from "@/public/assets/board/2022.jpg";
import Board2023 from "@/public/assets/board/2023.jpg";
import Board2024 from "@/public/assets/board/2024.jpg";
import Image, { StaticImageData } from "next/image";
import BoardCard from "../BoardCard";
import Button from "../Button";
import styles from "./style.module.css";

const boardPhotos: Record<number, StaticImageData> = {
	2022: Board2022,
	2023: Board2023,
	2024: Board2024,
};

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
			{boardPhotos[startYear] ? (
				<div className={styles.boardPhotoWrapper}>
					<Image
						src={boardPhotos[startYear]}
						alt={`ACM Cyber board photo ${startYear}–${startYear + 1}`}
						className={styles.boardPhoto}
						fill
					/>
				</div>
			) : null}
		</>
	);
}
