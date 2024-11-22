"use client";

import { PublicEvent } from "@/lib/api/EventsAPI";
import { createEvent, EventAttributes } from "ics";
import { AnchorHTMLAttributes, useEffect, useState } from "react";

export type IcalDownloadButtonProps = {
	event: PublicEvent;
};
export default function IcalDownloadButton({
	event,
	...props
}: IcalDownloadButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
	const [url, setUrl] = useState("");

	useEffect(() => {
		const startDate = new Date(event.start);
		const endDate = new Date(event.end);
		const attributes: EventAttributes = {
			start: [
				startDate.getFullYear(),
				startDate.getMonth() + 1, // Library is 1-indexed rather than 0-indexed
				startDate.getDate(),
				startDate.getHours(),
				startDate.getMinutes(),
			],
			duration: { minutes: (endDate.getTime() - startDate.getTime()) / (1000 * 60) },
			title: event.title,
			description: event.description,
			location: event.location,
			url: `https://cyber.acmucsd.com/event/${event.uuid}`,
			// TODO: ACM Cyber email
			organizer: { name: "ACM Cyber", email: "acm@ucsd.edu" },
		};
		const response = createEvent(attributes);
		if (!response.value) {
			throw response.error;
		}
		const url = URL.createObjectURL(new Blob([response.value], { type: "text/calendar" }));
		setUrl(url);
		return () => {
			URL.revokeObjectURL(url);
		};
	}, [event]);

	return <a href={url} download={`${event.title}.ics`} {...props} />;
}
