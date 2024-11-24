import Button from "@/components/Button";
import styles from "./not-found.module.css";

export default function NotFound() {
	return (
		<div className={styles.container}>
			<div className={styles.blob} />
			<div className={styles.content}>
				<h1>
					<span className={styles.statusCode}>404</span> Page not found
				</h1>
				<p>Perhaps the URL was misspelled, or the page was moved.</p>
				<div className={styles.buttons}>
					<Button href="/" primary>
						Return home
					</Button>
					<Button href="https://acmurl.com/cyber-discord">Get help on Discord</Button>
				</div>
			</div>
		</div>
	);
}
