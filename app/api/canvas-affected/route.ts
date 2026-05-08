import fs from "fs/promises";
import path from "path";

export async function GET() {
	const filePath = path.join(process.cwd(), "app", "canvas-affected", "affected.json");
	try {
		const content = await fs.readFile(filePath, "utf8");
		const data = JSON.parse(content);
		return new Response(JSON.stringify(data), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: "Could not read affected.json" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
