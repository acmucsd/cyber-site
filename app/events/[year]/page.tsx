import Events from "@/components/Events";
import { getAllCyberEvents } from "@/lib/events";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Events | ACM Cyber",
};

export default async function EventsPage({ params }: { params: Promise<{ year: string }> }) {
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
