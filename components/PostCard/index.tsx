import { dateFormat, PublishedPost } from "@/lib/util/posts";
import Link from "next/link";
import styles from "./style.module.css";

export type PostCardProps = {
	post: PublishedPost;
	className?: string;
};
export function PostCard({ post, className }: PostCardProps) {
	return (
		<Link href={post.path} className={`${styles.card} ${className}`}>
			<div className={styles.title}>{post.title}</div>
			{post.description ? <div>{post.description}</div> : null}
			<div className={styles.date}>{dateFormat.format(post.published)}</div>
		</Link>
	);
}
