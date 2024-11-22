import Hero from "@/components/Hero";
import Stat from "@/components/Stat";
import styles from "./page.module.css";

export default function Home() {
	return (
		<div className={styles.container}>
			<Hero></Hero>
			<div className={styles.stats}>
				<div className={styles.stat}>
					<Stat count={1234} duration={1000} />
					<span className={styles.statDesc}>Members</span>
				</div>
				<div className={styles.stat}>
					<Stat count={1234} duration={1500} />
					<span className={styles.statDesc}>Events</span>
				</div>
				<div className={styles.stat}>
					<Stat count={1234} duration={2000} />
					<span className={styles.statDesc}>Something else</span>
				</div>
			</div>
			{"Resources"}
			{"event archive"}
		</div>
	);
}
