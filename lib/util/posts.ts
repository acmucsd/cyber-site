import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import { UrlTransform } from "react-markdown";

export const dateFormat = new Intl.DateTimeFormat("en-US", {
	dateStyle: "medium",
	timeZone: "UTC",
});

const isMarkdown = /\.md$/;

export async function getAllPosts(path = "", target: string[] = []): Promise<string[]> {
	for (const entry of await readdir(`posts/${path}`, { withFileTypes: true })) {
		if (entry.isDirectory()) {
			await getAllPosts(`${path}/${entry.name}`, target);
		} else if (entry.isFile() && isMarkdown.test(entry.name)) {
			const postId = `${path}/${entry.name.replace(isMarkdown, "")}`;
			if (postId === "/index") {
				continue;
			}
			target.push(postId);
		}
	}
	return target;
}

export type PostMetadata = {
	published?: Date;
	title?: string;
	description?: string;
};
export type Post = PostMetadata & {
	path: string;
	markdown: string;
};
export type PublishedPost = Post & {
	published: Date;
};

export async function getPost(path: string): Promise<Post> {
	const { content, data } = matter(await readFile(`posts/${path}.md`, "utf-8"));
	return { path, markdown: content, ...(data as PostMetadata) };
}

export const urlTransform: UrlTransform = (url, key) => {
	if (key === "href") {
		if (url.endsWith(".md") && !/^https?:\/\//.test(url)) {
			return url.replace(/\.md$/, "");
		}
	}
	return url;
};
