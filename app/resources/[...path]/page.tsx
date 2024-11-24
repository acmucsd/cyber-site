import { getAllPosts } from "@/lib/util/posts";
import { readFile } from "fs/promises";

type ResourcePageProps = {
	params: Promise<{ path: string[] }>;
};

export default async function ResourcePage({ params }: ResourcePageProps) {
	const { path } = await params;

	const markdown = await readFile(`posts/${path.join("/")}.md`, "utf-8");

	return <pre>{markdown}</pre>;
}

export async function generateStaticParams() {
	const paths = await getAllPosts();
	return paths.map((path) => ({ path: path.split("/").slice(1) }));
}

// Should prevent directory traversal by allowlisting paths
export const dynamicParams = false;
