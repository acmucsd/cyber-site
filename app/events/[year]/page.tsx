import Events from "@/components/Events";
import { FIRST_YEAR, getAllCyberEvents, getCurrentAcademicYear } from "@/lib/api/EventsAPI";
import { Metadata } from "next";

// Cache the events for 1 day
export const revalidate = 86400;

type EventsPageProps = {
	params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: EventsPageProps): Promise<Metadata> {
	const { year } = await params;

	return {
		title: `Events in ${year}–${+year + 1} | ACM Cyber`,
	};
}

export default async function EventsPage({ params }: EventsPageProps) {
	// TODO: handle invalid years
	const { year } = await params;
	const start = new Date(+year, 7, 1);
	const end = new Date(+year + 1, 7, 1);

	const events = await getAllCyberEvents();

	return (
		<Events
			startYear={+year}
			events={events.filter((event) => new Date(event.end) >= start && new Date(event.start) <= end)}
			archive
		/>
	);
}

export async function generateStaticParams() {
	const currentYear = getCurrentAcademicYear();
	const years = [];
	for (let year = FIRST_YEAR; year <= currentYear; year++) {
		years.push({ year: String(year) });
	}
	return years;
}
