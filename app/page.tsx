import Button from "@/components/Button";
import Hero from "@/components/Hero";
import Stat from "@/components/Stat";
import Testimonial from "@/components/Testimonial";
import GetInvolved from "@/public/assets/testimonials/getinvolved.jpg";
import Loris from "@/public/assets/testimonials/loris.jpg";
import Nick from "@/public/assets/testimonials/nick.jpg";
import Sebastian from "@/public/assets/testimonials/sebastianprehn.jpg";
import Thomas from "@/public/assets/testimonials/thomas-dick.jpg";
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
					<h2>Join ACM Cyber</h2>
					<p>
						To become a member of ACM Cyber, simply attend our events! There's no application or fee associated with
						membership. Everyone is welcome, regardless of experience level.
					</p>
					<div className={styles.buttons}>
						<Button href="https://members.acmucsd.com/" primary>
							Become a member
						</Button>
						<Button href="/events">View events</Button>
					</div>
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
			<div className={styles.testimonialsWrapper}>
				<h2>Testimonials</h2>
				<div className={styles.testimonials}>
					<Testimonial
						photo={Sebastian}
						name="Sebastian Larsen Prehn"
						role="Passionate Jugger"
						comment="ACM Cyber seems to be doing a lot of nice work! I'm very envious that I have no way of attending their many events, as they seem to be doing a lot of interesting talks and generally share their passions about cybersecurity (and obviously physical pentesting too)!"
						url="https://bsky.app/profile/sebastianprehn.dk/post/3lazn26uzjk27"
					/>
					<Testimonial
						photo={GetInvolved}
						name="Get Involved"
						role="UCSD Center for Student Involvement"
						comment="ACM Cyber is an organization designed to expand the knowledge of cybersecurity for all members of the UCSD undergraduate community."
						url="https://www.instagram.com/getinvolveducsd/p/CPUAGoJnpr5/"
					/>
					<Testimonial
						photo={Loris}
						name="Loris D'Antoni"
						role="A Professor"
						comment="Who's the target audience here?"
						url="https://twitter.com/lorisdanto/status/1857310017222823938"
					/>
					<Testimonial
						photo={Nick}
						name="Nicholas Petrone"
						role="ACM Cyber President"
						comment="the president? i love that guy"
					/>
					<Testimonial
						photo={Thomas}
						name="Thomas Dickerson"
						role="Co-Founder"
						comment="Joe"
						url="https://bsky.app/profile/elfprince13.mumak.app/post/3layg5ybxzc2q"
					/>
				</div>
			</div>
		</div>
	);
}
