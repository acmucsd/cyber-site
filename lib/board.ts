import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

// Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
const serviceAccountAuth = new JWT({
	// env var values here are copied from service account credentials generated by google
	// see "Authentication" section in docs for more info
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

export async function getBoard(): Promise<AcmBoard[]> {
	const doc = new GoogleSpreadsheet(process.env.BOARD_SPREADSHEET_ID ?? "", serviceAccountAuth);
	await doc.loadInfo();

	const years: AcmBoard[] = [];

	for (let i = 0; i < doc.sheetCount; i++) {
		const sheet = doc.sheetsByIndex[i];
		sheet.loadHeaderRow(2);
		const rows = await sheet.getRows();
		const members = rows
			.map((row): BoardMember => {
				const specialization = row.get("Specialized Position");
				const photo = row.get("Profile Picture") || null;
				return {
					team: row.get("Team")?.toLowerCase(),
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
			.filter((member) => member.team === "cyber" && member.name && member.position && member.email);
		if (members.length === 0) {
			continue;
		}
		years.push({
			startYear: 2000 + +(sheet.title.match(/\d+/)?.[0] ?? ""),
			members,
		});

		// Avoid hitting Google Sheets rate limit due to Next cache being disabled
		// in dev mode
		if (process.env.NODE_ENV === "development" && i === 1) {
			break;
		}
	}

	return years;
}
