import { BoardMember } from "@/lib/api/BoardAPI";
import Image from "next/image";
import Link from "next/link";
import { GitHub, Globe, Linkedin, Mail } from "react-feather";
import styles from "./style.module.css";

export type BoardCardProps = {
	member: BoardMember;
};
export default function BoardCard({ member }: BoardCardProps) {
	return (
		<article className={styles.card}>
			<div className={styles.photoWrapper}>
				{member.photo ? (
					<Image src={member.photo} alt={`Photo of ${member.name}`} fill className={styles.photo} />
				) : null}
			</div>
			<div className={styles.info}>
				<div>
					<p className={styles.name}>{member.name}</p>
					<p className={styles.secondary}>{member.pronouns}</p>
					<p>{member.position}</p>
					{member.specialization ? <p className={styles.secondary}>{member.specialization}</p> : null}
				</div>
				<div className={styles.links}>
					{member.website ? (
						<Link href={member.website}>
							<Globe size={18} />
						</Link>
					) : null}
					{member.linkedin ? (
						<Link href={member.linkedin}>
							<Linkedin size={18} />
						</Link>
					) : null}
					{member.github ? (
						<Link href={`https://github.com/${member.github}`}>
							<GitHub size={18} />
						</Link>
					) : null}
					{member.email ? (
						<Link href={`mailto:${member.email}`}>
							<Mail size={18} />
						</Link>
					) : null}
				</div>
			</div>
		</article>
	);
}
