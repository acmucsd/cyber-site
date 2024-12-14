import { dateFormat, getAllPosts, getPost, urlTransform } from "@/lib/util/posts";
import { Metadata } from "next";
import Link from "next/link";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import "./nord.css";
import styles from "./page.module.css";

type ResourcePageProps = {
	params: Promise<{ path: string[] }>;
};

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
	const { path } = await params;
	const { published, title, description } = await getPost(path.join("/"));

	return {
		title: title ? `${title} | ACM Cyber` : "ACM Cyber",
		description,
		openGraph: { type: "article", publishedTime: published && dateFormat.format(published), authors: "ACM Cyber" },
	};
}

export default async function ResourcePage({ params }: ResourcePageProps) {
	const { path } = await params;
	const { markdown, title, published } = await getPost(path.join("/"));
	const isInternal = path[0] === "internal";

	return (
		<>
			<div className={styles.header}>
				{title ? <h1 className={styles.heading}>{title}</h1> : null}
				<p className={styles.publishDate}>
					{published
						? `${isInternal ? "Created" : "Posted"} ${dateFormat.format(published)}.`
						: isInternal
							? "Undated."
							: "Unpublished."}
				</p>
			</div>
			<div className={styles.content}>
				<Markdown
					remarkPlugins={[remarkGfm]}
					rehypePlugins={[rehypeRaw, rehypeHighlight]}
					urlTransform={urlTransform}
					remarkRehypeOptions={{ allowDangerousHtml: true }}
					components={{
						a: ({ href, ...props }) => (href !== undefined ? <Link href={href} {...props} /> : <a {...props} />),
						iframe: ({ src }) => (
							// Ignore all other props
							<iframe
								src={src}
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								referrerPolicy="strict-origin-when-cross-origin"
								allowFullScreen
							/>
						),
					}}
				>
					{markdown}
				</Markdown>
			</div>
		</>
	);
}

export async function generateStaticParams() {
	const paths = await getAllPosts();
	return paths.map((path) => ({ path: path.split("/").slice(1) }));
}

// Should prevent directory traversal by allowlisting paths
export const dynamicParams = false;
