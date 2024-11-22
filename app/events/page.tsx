import Events from "@/components/Events";
import { getAllCyberEvents, getCurrentAcademicYear } from "@/lib/events";
import { Metadata } from "next";

// Cache the events for 1 hour
export const revalidate = 3600;

export const metadata: Metadata = {
	title: "Events | ACM Cyber",
};

export default async function EventsPage() {
	const year = getCurrentAcademicYear();
	const start = new Date(year, 7, 1);
	const end = new Date(year + 1, 7, 1);

	const events = (await getAllCyberEvents(true)).filter(
		(event) => new Date(event.end) >= start && new Date(event.start) <= end,
	);

	const now = new Date();

	return (
		<Events
			startYear={year}
			events={events.filter((event) => new Date(event.start) < now)}
			upcoming={events.filter((event) => new Date(event.start) >= now).reverse()}
		/>
	);
}

// Ensure NextJS doesn't cache the events while building
export const dynamic = "force-dynamic";
