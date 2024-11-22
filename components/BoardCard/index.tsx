import { BoardMember } from "@/lib/api/BoardAPI";
import Image from "next/image";
import styles from "./style.module.css";

export type BoardCardProps = {
	member: BoardMember;
};
export default function BoardCard({ member }: BoardCardProps) {
	return (
		<div className={styles.card}>
			{member.photo ? (
				<Image src={member.photo} alt={`Photo of ${member.name}`} width={48} height={48} className={styles.photo} />
			) : null}
			<p>{member.name}</p>
		</div>
	);
}
