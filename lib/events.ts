export type PublicEvent = {
	uuid: string;
	organization: string;
	committee: string;
	thumbnail: string | null;
	cover: string;
	title: string;
	description: string;
	location: string;
	eventLink: string;
	start: string;
	end: string;
	attendanceCode?: string;
	pointValue: number;
	requiresStaff: boolean;
	staffPointBonus: number;
	discordEvent: string | null;
	foodItems: string | null;
};

const API_PATH = "https://api.acmucsd.com/api/v2/event";

export async function getAllCyberEvents(reversed = false): Promise<PublicEvent[]> {
	const response = await fetch(
		`${API_PATH}?${new URLSearchParams({
			committee: "Cyber",
			reverse: String(reversed),
		})}`,
	);
	if (!response.ok) {
		throw new Error(`HTTP ${response.status} error: ${response.url}`);
	}
	const { error, events } = await response.json();
	if (error) {
		throw new Error(error);
	}
	return events;
}

export async function getEvent(uuid: string): Promise<PublicEvent> {
	const response = await fetch(`${API_PATH}/${uuid}`);
	if (!response.ok) {
		throw new Error(`HTTP ${response.status} error: ${response.url}`);
	}
	const { error, event } = await response.json();
	if (error) {
		throw new Error(error);
	}
	return event;
}

export const rangeFormat = new Intl.DateTimeFormat("en-US", {
	dateStyle: "medium",
	timeStyle: "short",
});

export function getCurrentAcademicYear() {
	const today = new Date();
	return today.getMonth() < 7 ? today.getFullYear() - 1 : today.getFullYear();
}
