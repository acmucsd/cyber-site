import { PublicEvent, rangeFormat } from "@/lib/events";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";

export type EventCardProps = {
	event: PublicEvent;
};
export default function EventCard({ event }: EventCardProps) {
	return (
		<Link href={`/event/${event.uuid}`} className={styles.card}>
			<div className={styles.cover}>
				<Image src={event.cover} alt={`${event.title} cover image`} fill />
			</div>
			<div className={styles.info}>
				<p>{rangeFormat.formatRange(new Date(event.start), new Date(event.end))}</p>
				<p className={styles.title}>{event.title}</p>
				<p>{event.location}</p>
			</div>
		</Link>
	);
}
