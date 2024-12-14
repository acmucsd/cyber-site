"use client";

import Logo from "@/public/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "react-feather";
import styles from "./style.module.css";

export default function Navbar() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (e.target instanceof Element && e.target.closest(`.${styles.mobileToggle}`)) {
				return;
			}
			setOpen(false);
		};
		document.addEventListener("click", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	return (
		<header className={`${styles.navbar} ${open ? styles.navbarOpen : ""}`}>
			<nav className={styles.container}>
				<Link href="/" className={styles.logoWrapper}>
					<Image src={Logo} alt="ACM Cyber logo" width={36} height={36} />
					<span>
						<strong>ACM</strong> Cyber
					</span>
				</Link>
				<div className={styles.links}>
					<Link href="/about" className={`${styles.link} ${pathname.startsWith("/about") ? styles.active : ""}`}>
						About
					</Link>
					<Link href="/events" className={`${styles.link} ${pathname.startsWith("/event") ? styles.active : ""}`}>
						Events
					</Link>
					<Link href="/resources" className={`${styles.link} ${pathname === "/resources" ? styles.active : ""}`}>
						Resources
					</Link>
				</div>
				<button className={styles.mobileToggle} onClick={() => setOpen((open) => !open)}>
					{open ? <X aria-hidden /> : <Menu aria-hidden />}
				</button>
			</nav>
		</header>
	);
}
