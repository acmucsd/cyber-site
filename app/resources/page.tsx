import { PostCard } from "@/components/PostCard";
import { getAllPosts, getPost, PublishedPost, urlTransform } from "@/lib/util/posts";
import { readFile } from "fs/promises";
import { Metadata } from "next";
import Link from "next/link";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import styles from "./page.module.css";

export const metadata: Metadata = {
	title: "Resources | ACM Cyber",
};

export default async function Page() {
	const posts = await getAllPosts()
		.then((paths) => Promise.all(paths.map(getPost)))
		.then((posts) =>
			posts.filter((post): post is PublishedPost => !!post.published && !post.path.startsWith("/internal/")),
		);
	posts.sort((a, b) => +b.published - +a.published);

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
			<h2>Recent posts</h2>
			<div className={styles.recent}>
				{/* TODO: Cap the amount and link to an archive of all posts */}
				{posts.map((post) => (
					<PostCard key={post.path} post={post} className={styles.post} />
				))}
			</div>
		</div>
	);
}
