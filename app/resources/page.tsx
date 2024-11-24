import { getAllPosts } from "@/lib/util/posts";
import Link from "next/link";
import styles from "./page.module.css";

export default async function Page() {
	const paths = await getAllPosts();

	return (
		<div className={styles.container}>
			<p>We&rsquo;re still cooking!</p>
			<ul>
				{paths.map((path) => (
					<li key={path}>
						<Link href={`/resources${path}`}>{path}</Link>
					</li>
				))}{" "}
			</ul>
		</div>
	);
}
