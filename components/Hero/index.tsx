import { ChevronRight } from "react-feather";
import Button from "../Button";
import styles from "./style.module.css";

export default function Hero() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.blob} />
			<div>
				<h1>We are ACM Cyber</h1>
				<p>UC San Diego&rsquo;s only cybersecurity club.</p>
				<div className={styles.buttons}>
					<Button href="https://acmurl.com/cyber-discord" className={styles.hasIcon} primary>
						Join our Discord
						<ChevronRight aria-hidden />
					</Button>
				</div>
			</div>
		</div>
	);
}
