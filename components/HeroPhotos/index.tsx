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
	position: { x: number; y: number; size: number };
};

const photos: HeroPhoto[] = [
	{ image: KickoffCrowd, position: { x: 4, y: 4, size: 10 } },
	{ image: RubberDucky, position: { x: 9, y: 2, size: 2 } },
	{ image: NickKneeling, position: { x: 6, y: 1, size: 3 } },
	{ image: SamDiamond, position: { x: 4, y: 2, size: 2 } },
	{ image: LockpickJig, position: { x: 1, y: 4, size: 3 } },
	{ image: KickoffAudience, position: { x: 0, y: 7, size: 4 } },
	{ image: RubberDuckyPeople, position: { x: 2, y: 11, size: 2 } },
	{ image: JayAudience, position: { x: 6, y: 14, size: 3 } },
	{ image: NickPresent, position: { x: 9, y: 14, size: 3 } },
	{ image: UnoPlayer, position: { x: 12, y: 14, size: 2 } },
	{ image: RedRoom, position: { x: 14, y: 11, size: 2 } },
	{ image: Hike, position: { x: 14, y: 7, size: 4 } },
];

export default function HeroPhotos() {
	return (
		<div className={styles.gridWrapper}>
			<div className={styles.grid}>
				{photos.map((photo, i) => (
					<div
						key={photo.image.src}
						className={styles.imageWrapper}
						style={{
							gridRow: `${photo.position.y + 1} / ${photo.position.y + 1 + photo.position.size}`,
							gridColumn: `${photo.position.x + 1} / ${photo.position.x + 1 + photo.position.size}`,
							animationDelay: `${(photos.length - i) * 0.1 + 0.5}s`,
							animationDuration: `${(photos.length - i) * 0.05 + 1}s`,
						}}
					>
						<Image src={photo.image} alt="" fill />
					</div>
				))}
			</div>
		</div>
	);
}
