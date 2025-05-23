import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

const serviceAccountAuth = new JWT({
	email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
	key: process.env.GOOGLE_PRIVATE_KEY,
	scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export type BoardMember = {
	team: string;
	position: string;
	specialization: string | null;
	name: string;
	pronouns: string;
	email: string;
	github: string | null;
	linkedin: string | null;
	website: string | null;
	major: string;
	gradYear: number;
	photo: string | null;
};

export type AcmBoard = {
	startYear: number;
	members: BoardMember[];
};

/**
 * @param year - Year to fetch members for. Needed to avoid hitting API limits.
 */
export async function getBoard(year?: number | "first"): Promise<AcmBoard[]> {
	const doc = new GoogleSpreadsheet(process.env.BOARD_SPREADSHEET_ID ?? "", serviceAccountAuth);
	await doc.loadInfo();

	const years: AcmBoard[] = [];

	for (let i = 0; i < doc.sheetCount; i++) {
		const sheet = doc.sheetsByIndex[i];
		if (sheet.hidden) {
			// Nick creating a sheet to figure out how many people are in board during
			// all hands broke the website
			continue;
		}
		const startYear = 2000 + +(sheet.title.match(/\d+/)?.[0] ?? "");
		if (year === "first" ? i !== 0 : startYear !== year) {
			years.push({
				startYear,
				members: [],
			});
			continue;
		}
		sheet.loadHeaderRow(2);
		const rows = await sheet.getRows();
		let team = "";
		const members = rows
			.map((row): BoardMember => {
				const specialization = row.get("Specialized Position");
				const photo = row.get("Profile Picture") || null;
				// For 2020-2021, which doesn't have a Team column
				if (!row.get("Name")) {
					team = row.get("Position")?.toLowerCase() ?? "";
				}
				return {
					team: row.get("Team")?.toLowerCase() || team,
					position: row.get("Position"),
					specialization: specialization === "-----" ? null : specialization || null,
					name: row.get("Name"),
					pronouns: row.get("Pronouns"),
					email: row.get("ACM Email"),
					github: row.get("Github") || null,
					linkedin: row.get("LinkedIn") || null,
					website: row.get("Website") || null,
					major: row.get("Major"),
					gradYear: +row.get("Grad Year"),
					// Discord CDN no longer works
					photo: photo?.startsWith("https://cdn.discordapp.com/") ? null : photo,
				};
			})
			.filter(
				(member) =>
					((member.team === "cyber" || member.team === "acm cyber") &&
						member.name &&
						member.position &&
						// 2020-2021 didn't have emails for most members
						(member.email || startYear === 2020)) ||
					// For Aaron Eason in 2019-2020
					member.specialization === "Cybersecurity",
			);
		years.push({
			startYear,
			members,
		});
	}

	return years;
}
