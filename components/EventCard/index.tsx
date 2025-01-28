import { PublicEvent } from "@/lib/api/EventsAPI";
import { dateFormatShort } from "@/lib/util/events";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";

export type EventCardProps = {
	event: PublicEvent;
	large?: boolean;
	showDescription?: boolean;
	className?: string;
};
export default function EventCard({ event, large, showDescription, className = "" }: EventCardProps) {
	return (
		<Link href={`/event/${event.uuid}`} className={`${styles.card} ${large ? styles.large : ""} ${className}`}>
			<div className={styles.cover}>
				<Image src={event.cover} alt={`${event.title} cover image`} fill />
			</div>
			<div className={styles.info}>
				<p>{dateFormatShort.formatRange(new Date(event.start), new Date(event.end))}</p>
				<p className={styles.title}>{event.title}</p>
				<p>{event.location}</p>
			</div>
			{large || showDescription ? <p className={styles.description}>{event.description}</p> : null}
		</Link>
	);
}
