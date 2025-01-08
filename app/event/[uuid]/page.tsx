import Button from "@/components/Button";
import IcalDownloadButton from "@/components/IcalDownloadButton";
import { getEvent, PublicEvent } from "@/lib/api/EventsAPI";
import { dateFormat } from "@/lib/util/events";
import { Metadata } from "next";
import Image from "next/image";
import { Download } from "react-feather";
import styles from "./page.module.css";

type EventPageProps = {
	params: Promise<{ uuid: string }>;
};

// Cache the event for 1 hour
export const revalidate = 3600;

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
	const { uuid } = await params;
	const event = await getEvent(uuid);

	return {
		title: `${event.title} | ACM Cyber`,
		description: `📅 ${dateFormat.formatRange(new Date(event.start), new Date(event.end))}\n📍 ${event.location}\n\n${event.description}`,
		openGraph: {
			images: [event.cover],
		},
	};
}

// From https://github.com/acmucsd/membership-portal-ui-v2/blob/main/src/components/events/CalendarButtons/index.tsx#L75
const generateGoogleCalendarUrl = ({ title, description, location, start, end }: PublicEvent): string => {
	const params = new URLSearchParams();
	params.append("action", "TEMPLATE");
	params.append("text", title);
	params.append("details", description);
	params.append("location", location);
	params.append(
		"dates",
		`${start.replaceAll("-", "").replaceAll(":", "").replaceAll(".", "")}/${end.replaceAll("-", "").replaceAll(":", "").replaceAll(".", "")}`,
	);

	return `https://www.google.com/calendar/render?${params}`;
};

export default async function EventPage({ params }: EventPageProps) {
	const { uuid } = await params;
	const event = await getEvent(uuid);

	return (
		<div className={styles.container}>
			<div className={styles.coverWrapper}>
				<Image src={event.cover} alt={`Cover for ${event.title}`} fill className={styles.cover} />
				<Image src={event.cover} alt={`Cover for ${event.title}`} fill className={styles.blur} />
			</div>
			<div className={styles.info}>
				<h1>{event.title}</h1>
				<div>
					<p>{dateFormat.formatRange(new Date(event.start), new Date(event.end))}</p>
					<p>{event.location}</p>
				</div>
				<div className={styles.buttons}>
					<Button href="https://acmurl.com/cyber-discord" primary>
						Join Discord for updates
					</Button>
					<Button href={generateGoogleCalendarUrl(event)} target="_blank">
						Add to Google Calendar
					</Button>
					<IcalDownloadButton event={event} className={styles.hasIcon}>
						<Download size={20} aria-hidden />
						Download .ics file
					</IcalDownloadButton>
				</div>
				<p>{event.description}</p>
			</div>
		</div>
	);
}
