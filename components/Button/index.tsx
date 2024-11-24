import Link from "next/link";
import { MouseEvent, PropsWithChildren } from "react";
import styles from "./style.module.css";

export type ButtonProps = PropsWithChildren<{
	primary?: boolean;
	small?: boolean;
	className?: string;
	href?: string;
	download?: string;
	target?: "_blank";
	onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}>;
export default function Button({
	primary = false,
	small = false,
	className = "",
	href,
	download,
	target,
	onClick,
	children,
}: ButtonProps) {
	className = `${className} ${styles.button} ${primary ? styles.primary : ""} ${small ? styles.small : ""}`;
	if (href) {
		return (
			<Link href={href} download={download} target={target} onClick={onClick} className={className}>
				{children}
			</Link>
		);
	} else {
		return (
			<button type="button" onClick={onClick} className={className}>
				{children}
			</button>
		);
	}
}
