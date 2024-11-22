import { getEvent, rangeFormat } from "@/lib/events";
import { Metadata } from "next";

type EventPageProps = {
	params: Promise<{ uuid: string }>;
};

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
	const { uuid } = await params;
	const event = await getEvent(uuid);

	return {
		title: `${event.title} | ACM Cyber`,
		description: `${rangeFormat.formatRange(new Date(event.start), new Date(event.end))}\n${event.location}\n\n${event.description}`,
		openGraph: {
			images: [event.cover],
		},
	};
}

export default async function EventPage({ params }: EventPageProps) {
	const { uuid } = await params;
	const event = await getEvent(uuid);

	return <pre>{JSON.stringify(event, null, 2)}</pre>;
}
