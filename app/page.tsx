import Button from "@/components/Button";
import EventsPreview from "@/components/EventsPreview";
import Hero from "@/components/Hero";
import Stat from "@/components/Stat";
import Testimonial from "@/components/Testimonial";
import { getAllCyberEvents } from "@/lib/api/EventsAPI";
import Kickoff2022 from "@/public/assets/kickoff-2022.jpg";
import Lockpicking101 from "@/public/assets/lockpicking-101.jpg";
import OpenGraphPreview from "@/public/assets/open-graph-preview.png";
import GetInvolved from "@/public/assets/testimonials/getinvolved.jpg";
import Loris from "@/public/assets/testimonials/loris.jpg";
import Nick from "@/public/assets/testimonials/nick.jpg";
import Sebastian from "@/public/assets/testimonials/sebastianprehn.jpg";
import Thomas from "@/public/assets/testimonials/thomas-dick.jpg";
import { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";

// Cache the events for 1 hour
export const revalidate = 3600;

export const metadata: Metadata = {
	openGraph: {
		images: [{ url: OpenGraphPreview.src, width: OpenGraphPreview.width, height: OpenGraphPreview.height }],
	},
};

export default async function Home() {
	const events = await getAllCyberEvents(true);

	return (
		<div className={styles.container}>
			<Hero />
			<div className={styles.stats}>
				<div className={styles.stat}>
					<Stat count={4} duration={1000} />
					<span className={styles.statDesc}>CTFs</span>
				</div>
				<div className={styles.stat}>
					<Stat count={events.length} duration={1500} />
					<span className={styles.statDesc}>Events</span>
				</div>
				<div className={styles.stat}>
					{/* https://metabase.acmucsd.com/question/46 */}
					<Stat count={767} duration={2000} />
					<span className={styles.statDesc}>Members</span>
				</div>
			</div>
			<EventsPreview events={events} />
			<div className={styles.explainerWrapper}>
				<div className={styles.explainer}>
					<h2>Join ACM Cyber</h2>
					<p>
						To become a member of ACM Cyber, simply attend our events! There&rsquo;s no application or fee associated
						with membership. Everyone is welcome, regardless of experience level.
					</p>
					<div className={styles.buttons}>
						<Button href="https://members.acmucsd.com/" primary>
							Become a member
						</Button>
						<Button href="/events">View events</Button>
					</div>
				</div>
				<Image
					src={Lockpicking101}
					alt="ACM Cyber members pick locks at Lockpicking 101"
					width={600}
					height={300}
					style={{ aspectRatio: "2 / 1" }}
					sizes="(max-width: 800px) 100vw, (max-width: 1200px) 300px, 600px"
				/>
			</div>
			<div className={styles.explainerWrapper}>
				<div className={styles.explainer}>
					<h2>What&rsquo;s a CTF?</h2>
					<p>
						A <strong>Capture the Flag (CTF)</strong> is a competition where people work in teams to find a password,
						called a &ldquo;flag,&rdquo; in as many challenges as they can.
					</p>
					<p>
						Each challenge involves different skillsets, and you often learn something new along the way. Finding the
						flag can involve scouring the internet for clues, looking at hidden parts of files, tricking a website into
						revealing the flag, or manipulating computer memory to fish it out.
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
				<Image
					src={Kickoff2022}
					alt="Members lock in on their laptops at an ACM Cyber event"
					width={600}
					height={400}
					style={{ aspectRatio: "3 / 2" }}
					sizes="(max-width: 800px) 100vw, (max-width: 1200px) 300px, 600px"
				/>
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
						name="Mr. Nicholas R. Petrone"
						role="ACM Cyber President (allegedly)"
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
