export const dateFormatShort = new Intl.DateTimeFormat("en-US", {
	year: "numeric",
	month: "short",
	day: "numeric",
	weekday: "short",
	hour: "numeric",
	minute: "2-digit",
	timeZone: "America/Los_Angeles",
});

export const dateFormatLong = new Intl.DateTimeFormat("en-US", {
	year: "numeric",
	month: "long",
	day: "numeric",
	weekday: "long",
	hour: "numeric",
	minute: "2-digit",
	timeZone: "America/Los_Angeles",
});

export const FIRST_YEAR = 2019;

export function getCurrentAcademicYear() {
	const today = new Date();
	return today.getMonth() < 7 ? today.getFullYear() - 1 : today.getFullYear();
}
