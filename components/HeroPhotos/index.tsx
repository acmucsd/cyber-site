import UnoPlayer from "@/public/assets/diamonds/2022_cyber_board_games.jpg";
import KickoffAudience from "@/public/assets/diamonds/2022_cyber_kickoff.jpg";
import SamDiamond from "@/public/assets/diamonds/2022_cyber_speedfriend_sam_diamond.jpg";
import JayAudience from "@/public/assets/diamonds/2023_cyber_camp.jpg";
import KickoffCrowd from "@/public/assets/diamonds/2024_kickoff_crowd.jpg";
import Hike from "@/public/assets/diamonds/hike_line.jpg";
import NickKneeling from "@/public/assets/diamonds/lockpick_101_kneel.jpg";
import NickPresent from "@/public/assets/diamonds/lockpick_101_nick.jpg";
import LockpickJig from "@/public/assets/diamonds/lockpick_102_jig.jpg";
import RedRoom from "@/public/assets/diamonds/rubber_ducky_1984.jpg";
import RubberDuckyPeople from "@/public/assets/diamonds/rubber_ducky_people_with_usb.jpg";
import RubberDucky from "@/public/assets/diamonds/rubber_ducky_usb.jpg";
import Image, { StaticImageData } from "next/image";
import styles from "./style.module.css";

type HeroPhoto = {
	image: StaticImageData;
	alt: string;
	position: { x: number; y: number; size: number };
};

const photos: HeroPhoto[] = [
	{
		image: KickoffCrowd,
		alt: "a crowd surrounds a UCSD kiosk at ACM Cyber Kickoff 2024",
		position: { x: 4, y: 4, size: 10 },
	},
	{
		image: RubberDucky,
		alt: "a USB rubber ducky consisting of an Arduino board encased in a light blue 3D-printed case",
		position: { x: 9, y: 2, size: 2 },
	},
	{
		image: NickKneeling,
		alt: "Nick demonstrates lockpicking",
		position: { x: 6, y: 1, size: 3 },
	},
	{
		image: SamDiamond,
		alt: "a person forms a diamond with their hands",
		position: { x: 4, y: 2, size: 2 },
	},
	{
		image: LockpickJig,
		alt: "people picking locks on a jig",
		position: { x: 1, y: 4, size: 3 },
	},
	{
		image: KickoffAudience,
		alt: "a room of people at ACM Cyber Kickoff 2022",
		position: { x: 0, y: 7, size: 4 },
	},
	{
		image: RubberDuckyPeople,
		alt: "people at a table program the Arduino boards in their USB rubber duckies",
		position: { x: 2, y: 11, size: 2 },
	},
	{
		image: JayAudience,
		alt: "a room of people at Cyber Camp 2023",
		position: { x: 6, y: 14, size: 3 },
	},
	{
		image: NickPresent,
		alt: "Nick explains types of locks standing next to his presentation",
		position: { x: 9, y: 14, size: 3 },
	},
	{
		image: UnoPlayer,
		alt: "a person holds a deck of Uno cards, smiling",
		position: { x: 12, y: 14, size: 2 },
	},
	{
		image: RedRoom,
		alt: "a room illuminated in red light of people watching a person on the projector",
		position: { x: 14, y: 11, size: 2 },
	},
	{
		image: Hike,
		alt: "people hiking at Torrey Pines",
		position: { x: 14, y: 7, size: 4 },
	},
].reverse();

export default function HeroPhotos() {
	return (
		<div className={styles.blobWrapper}>
			<div className={styles.blob} />
			<div className={styles.gridWrapper}>
				<div className={styles.grid}>
					{photos.map(({ image, alt, position }, i) => (
						<div
							key={image.src}
							className={styles.imageWrapper}
							style={{
								gridRow: `${position.y + 1} / ${position.y + 1 + position.size}`,
								gridColumn: `${position.x + 1} / ${position.x + 1 + position.size}`,
								animationDelay: `${i * 0.1 + 0.5}s`,
								animationDuration: `${i * 0.05 + 1}s`,
							}}
						>
							<Image
								src={image}
								alt={alt}
								width={50 * position.size}
								height={50 * position.size}
								// This is mostly to silence the NextJS warning about the big
								// image contributing to LCP
								priority={i === photos.length - 1}
								className={styles.image}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
