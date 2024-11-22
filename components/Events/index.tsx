import { getCurrentAcademicYear, PublicEvent } from "@/lib/events";
import Link from "next/link";
import EventCard from "../EventCard";
import styles from "./style.module.css";

const FIRST_YEAR = 2019;

export type EventsProps = {
	startYear: number;
	events: PublicEvent[];
	archive?: boolean;
};
export default function Events({ startYear, events, archive = false }: EventsProps) {
	const currentYear = getCurrentAcademicYear();

	const years = [];
	for (let year = FIRST_YEAR; year <= currentYear; year++) {
		years.push(
			<Link className={`${styles.year} ${year === startYear ? styles.active : ""}`} href={`/events/${year}`} key={year}>
				{year}–{year + 1}
			</Link>,
		);
	}
	years.reverse();

	return (
		<div className={styles.container}>
			<h2>{archive ? `Events in ${startYear}–${startYear + 1}` : "Past events"}</h2>
			<div className={styles.years}>{years}</div>
			<div className={styles.events}>
				{events.map((event) => (
					<EventCard event={event} key={event.uuid} />
				))}
			</div>
		</div>
	);
}

// Ensure NextJS doesn't cache the events while building
export const dynamic = "force-dynamic";
