import Button from "@/components/Button";
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
			<div>
				<div className={styles.explainer}>
					<h2>What&rsquo;s a CTF?</h2>
					<p>
						A Capture the Flag (CTF) is a competition where people work in teams to try to find a password, called a
						&ldquo;flag,&rdquo; in as many challenges as they can.
					</p>
					<p>
						Each challenge varies in difficulty, involves different skillsets, and often requires learning something new
						along the way. Finding the flag can involve scouring the internet for clues, looking at hidden parts of
						images, tricking a website into revealing the flag, or manipulating memory to fish it out.
					</p>
					<p>
						We host a CTF every spring. Anyone around the world can compete, and no experience is required. We&rsquo;re
						also looking for challenge developers. If you&rsquo;re interested in participating or helping, join our
						Discord server and let us know!
					</p>
					<div className={styles.buttons}>
						<Button href="https://sdc.tf/" primary>
							Learn more
						</Button>
						<Button href="https://acmurl.com/cyber-discord">Join the Discord</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
