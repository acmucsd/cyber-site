"use client";

import Logo from "@/public/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./style.module.css";

export default function Navbar() {
	const pathname = usePathname();

	return (
		<header className={styles.navbar}>
			<nav className={styles.container}>
				<Link href="/" className={styles.logoWrapper}>
					<Image src={Logo} alt="ACM Cyber logo" width={36} height={36} />
					<span>
						<strong>ACM</strong> Cyber
					</span>
				</Link>
				<Link href="/about" className={styles.link}>
					About
					{pathname.startsWith("/about") ? <span className={styles.active} /> : null}
				</Link>
				<Link href="/events" className={styles.link}>
					Events
					{pathname.startsWith("/event") ? <span className={styles.active} /> : null}
				</Link>
				<Link href="/resources" className={styles.link}>
					Resources
					{pathname.startsWith("/resources") ? <span className={styles.active} /> : null}
				</Link>
			</nav>
		</header>
	);
}
