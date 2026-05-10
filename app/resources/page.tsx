import { urlTransform } from "@/lib/util/posts";
import { readFile } from "fs/promises";
import { Metadata } from "next";
import Link from "next/link";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import styles from "./page.module.css";

export const metadata: Metadata = {
	title: "Resources | ACM Cyber",
	description: "A collection of guides written by ACM Cyber.",
};

export default async function Page() {
	const content = await readFile("posts/index.md", "utf-8");

	return (
		<div className={styles.container}>
			<h1>Resources</h1>
			<Markdown
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeRaw]}
				urlTransform={urlTransform}
				remarkRehypeOptions={{ allowDangerousHtml: true }}
				components={{
					a: ({ href, ...props }) => (href !== undefined ? <Link href={href} {...props} /> : <a {...props} />),
				}}
			>
				{content}
			</Markdown>	
		</div>
	);
}
