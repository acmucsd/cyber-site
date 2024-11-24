import { readdir } from "fs/promises";

export async function getAllPosts(path = "", target: string[] = []): Promise<string[]> {
	for (const entry of await readdir(`posts/${path}`, { withFileTypes: true })) {
		if (entry.isDirectory()) {
			await getAllPosts(`${path}/${entry.name}`, target);
		} else if (entry.isFile() && /\.mdx?$/.test(entry.name)) {
			const postId = `${path}/${entry.name.replace(/\.mdx?$/, "")}`;
			if (postId === "/index") {
				continue;
			}
			target.push(postId);
		}
	}
	return target;
}
