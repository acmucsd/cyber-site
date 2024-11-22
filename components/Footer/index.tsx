import DiscordIcon from "@/public/assets/discord.svg";
import SDCTFIcon from "@/public/assets/sdctf-white.svg";
import Image from "next/image";
import styles from "./style.module.css";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.content}>
				<a href="https://acmurl.com/cyber-discord">
					<Image src={DiscordIcon} alt="Discord icon" width={48} height={48} />
				</a>
				<a href="https://sdc.tf">
					<Image src={SDCTFIcon} alt="Discord icon" width={48} height={48} />
				</a>
			</div>
		</footer>
	);
}
