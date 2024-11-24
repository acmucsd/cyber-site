import { dateFormat, getAllPosts, getPost, Post } from "@/lib/util/posts";
import { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
	title: "Resources | ACM Cyber",
};

export default async function Page() {
	const posts = await getAllPosts()
		.then((paths) => Promise.all(paths.map(getPost)))
		.then((posts) => posts.filter((post): post is Post & { published: Date } => !!post.published));
	posts.sort((a, b) => +b.published - +a.published);

	return (
		<div className={styles.container}>
			<p>We&rsquo;re still cooking!</p>
			<ul>
				{posts.map(({ path, published }) => (
					<li key={path}>
						<Link href={`/resources${path}`}>{path}</Link> {dateFormat.format(published)}
					</li>
				))}
			</ul>
		</div>
	);
}
