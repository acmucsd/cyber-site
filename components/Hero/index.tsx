import { ChevronRight } from "react-feather";
import Button from "../Button";
import HeroPhotos from "../HeroPhotos";
import styles from "./style.module.css";

export default function Hero() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.blob} />
			<div className={styles.content}>
				<h1 className={styles.big}>
					<span className={styles.weAre}>We are</span>{" "}
					<span className={styles.acmCyber}>
						ACM <span className={styles.cyber}>Cyber</span>
					</span>
				</h1>
				<p className={styles.tagline}>UC San Diego&rsquo;s largest cybersecurity community.</p>
				<div className={styles.buttons}>
					<Button href="https://acmurl.com/cyber-discord" className={styles.hasIcon} primary>
						Join our Discord
						<ChevronRight size={24} aria-hidden />
					</Button>
				</div>
			</div>
			<HeroPhotos />
		</div>
	);
}
