import { PublicEvent } from "@/lib/api/EventsAPI";
import Link from "next/link";
import EventCard from "../EventCard";
import styles from "./style.module.css";

export type EventsPreviewProps = {
	events: PublicEvent[];
};
export default function EventsPreview({ events }: EventsPreviewProps) {
	const now = new Date();
	const past = events.filter((event) => new Date(event.end) < now).slice(0, 4);
	const upcoming = events.filter((event) => new Date(event.end) >= now).reverse();

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<h2>{upcoming.length > 0 ? "Upcoming events" : "Past events"}</h2>
				<Link href="/events" className={styles.link}>
					View all
				</Link>
			</div>
			<div className={styles.scroller}>
				{(upcoming.length > 0 ? upcoming : past).map((event) => (
					<EventCard event={event} key={event.uuid} className={styles.card} />
				))}
			</div>
		</div>
	);
}
