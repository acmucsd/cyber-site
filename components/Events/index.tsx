import { PublicEvent } from "@/lib/api/EventsAPI";
import { FIRST_YEAR, getCurrentAcademicYear } from "@/lib/util/events";
import Button from "../Button";
import EventCard from "../EventCard";
import styles from "./style.module.css";

export type EventsProps = {
	startYear: number;
	events: PublicEvent[];
	upcoming?: PublicEvent[];
	archive?: boolean;
};
export default function Events({ startYear, events, upcoming = [], archive = false }: EventsProps) {
	const currentYear = getCurrentAcademicYear();

	const years = [];
	for (let year = FIRST_YEAR; year <= currentYear; year++) {
		years.push(
			<Button href={`/events/${year}`} primary={year === startYear} small key={year}>
				{year}–{year + 1}
			</Button>,
		);
	}

	return (
		<main className={styles.container}>
			{upcoming.length === 1 ? (
				<>
					<h1>Coming up next</h1>
					<EventCard event={upcoming[0]} large />
				</>
			) : upcoming.length > 0 ? (
				<>
					<h1>Upcoming events</h1>
					<div className={styles.upcoming}>
						<EventCard event={upcoming[0]} showDescription />
						{upcoming.slice(1, 3).map((event) => (
							<EventCard event={event} key={event.uuid} />
						))}
					</div>
				</>
			) : null}
			<h1>{archive ? `Events in ${startYear}–${startYear + 1}` : "Past events"}</h1>
			<div className={styles.years}>{years}</div>
			<div className={styles.events}>
				{events.map((event) => (
					<EventCard event={event} key={event.uuid} />
				))}
			</div>
		</main>
	);
}
