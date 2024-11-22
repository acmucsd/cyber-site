export const rangeFormat = new Intl.DateTimeFormat("en-US", {
	dateStyle: "medium",
	timeStyle: "short",
	timeZone: "America/Los_Angeles",
});

export const FIRST_YEAR = 2019;

export function getCurrentAcademicYear() {
	const today = new Date();
	return today.getMonth() < 7 ? today.getFullYear() - 1 : today.getFullYear();
}
