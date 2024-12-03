import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import styles from "./style.module.css";

export type TestimonialProps = {
	photo: StaticImageData;
	name: string;
	role: string;
	comment: string;
	url?: string;
};
export default function Testimonial({ photo, name, role, comment, url }: TestimonialProps) {
	const content = (
		<>
			<Image src={photo} alt={`Photo of ${name}`} width={80} height={80} className={styles.photo} />
			<div className={styles.side}>
				<p className={styles.comment}>{comment}</p>
				<div className={styles.info}>
					<p className={styles.name}>{name}</p>
					<p className={styles.role}>{role}</p>
				</div>
			</div>
		</>
	);
	return url ? (
		<Link href={url} target="_blank" className={styles.card}>
			{content}
		</Link>
	) : (
		<div className={styles.card}>{content}</div>
	);
}
