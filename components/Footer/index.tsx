import ACMIcon from "@/public/assets/acm.svg";
import DiscordIcon from "@/public/assets/discord.svg";
import SDCTFIcon from "@/public/assets/sdctf.svg";
import YoutubeIcon from "@/public/assets/youtube.svg";
import Image from "next/image";
import styles from "./style.module.css";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<a href="https://acmurl.com/cyber-discord">
					<Image src={DiscordIcon} alt="Discord Icon" width={48} height={48} />
				</a>
				<a href="https://sdc.tf">
					<Image src={SDCTFIcon} alt="SDCTF Icon" width={48} height={48} />
				</a>
				<a href="https://acmurl.com/youtube">
					<Image src={YoutubeIcon} alt="Youtube Icon" width={48} height={48} />
				</a>
				<a href="http://acmucsd.com">
					<Image src={ACMIcon} alt="ACM Icon" width={48} height={48} />
				</a>
			</div>
		</footer>
	);
}
