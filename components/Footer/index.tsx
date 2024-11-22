import styles from "./style.module.css";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<a href="https://acmurl.com/cyber-discord">
					<div className={styles["discord-logo"]} />
				</a>
				<a href="https://sdc.tf">
					<div className={styles["sdctf-logo"]} />
				</a>
				<a href="https://acmurl.com/youtube">
					<div className={styles["youtube-logo"]} />
				</a>
				<a href="http://acmucsd.com">
					<div className={styles["acm-logo"]} />
				</a>
			</div>
		</footer>
	);
}
