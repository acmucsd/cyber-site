import { PostCard } from "@/components/PostCard";
import { getAllPosts, getPost, PublishedPost } from "@/lib/util/posts";
import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
	title: "Blog | ACM Cyber",
	description: "Browse writeups, guides, and updates from ACM Cyber.",
};

export default async function Page() {
	const posts = await getAllPosts()
		.then((paths) => Promise.all(paths.map(getPost)))
		.then((posts) =>
			posts.filter((post): post is PublishedPost => !!post.published && !post.path.startsWith("/internal/")),
		);
	posts.sort((a, b) => +b.published - +a.published);

	return (
		<div className={styles.container}>
			<h1>Blog</h1>
			<p>Latest guides, writeups, and announcements from ACM Cyber.</p>
			<div className={styles.posts}>
				{posts.map((post) => (
					<PostCard key={post.path} post={post} className={styles.post} />
				))}
			</div>
		</div>
	);
}