import { dateFormat, getAllPosts, getPost } from "@/lib/util/posts";
import { Metadata } from "next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

	return (
		<>
			<div>
				{title ? <h1>{title}</h1> : null}
				<p className={styles.publishDate}>{published ? `Posted ${dateFormat.format(published)}.` : "Unpublished."}</p>
			</div>
			<Markdown
				remarkPlugins={[remarkGfm]}
				urlTransform={(url, key) => {
					if (key === "href") {
						if (url.endsWith(".md") && !/^https?:\/\//.test(url)) {
							return url.replace(/\.md$/, "");
						}
					}
					return url;
				}}
			>
				{markdown}
			</Markdown>
		</>
	);
}

export async function generateStaticParams() {
	const paths = await getAllPosts();
	return paths.map((path) => ({ path: path.split("/").slice(1) }));
}

// Should prevent directory traversal by allowlisting paths
export const dynamicParams = false;
