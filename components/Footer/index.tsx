import styles from "./style.module.css";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<a href="https://acmurl.com/cyber-discord">
					<div className={styles["discord-logo"]} aria-label="Join our Discord server." />
				</a>
				<a href="https://sdc.tf">
					<div className={styles["sdctf-logo"]} aria-label="Learn more about SDCTF." />
				</a>
				<a href="https://acmurl.com/youtube">
					<div className={styles["youtube-logo"]} aria-label="Visit our YouTube channel." />
				</a>
				<a href="https://github.com/acmucsd/cyber-site">
					<div className={styles["github-logo"]} aria-label="Leave suggestions on this website's GitHub repository." />
				</a>
				<a href="http://acmucsd.com">
					<div className={styles["acm-logo"]} aria-label="Go to the main ACM website." />
				</a>
			</div>
		</footer>
	);
}
