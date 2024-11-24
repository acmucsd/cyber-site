"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";

const format = new Intl.NumberFormat("en-US");

export type StatProps = {
	count: number;
	duration: number;
};
export default function Stat({ count, duration }: StatProps) {
	const [progress, setProgress] = useState(0);
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!ref.current) {
			return;
		}

		let paintId: number | undefined;
		let startTime: number;
		const paint = () => {
			let progress = (Date.now() - startTime) / duration;
			if (progress >= 1) {
				setProgress(1);
				return;
			}
			// cubic ease out
			progress = (progress - 1) ** 3 + 1;
			setProgress(progress);
			window.requestAnimationFrame(paint);
		};
		const observer = new IntersectionObserver(
			([{ intersectionRatio }]) => {
				if (intersectionRatio < 0.5) {
					return;
				}
				startTime = Date.now();
				paint();
				observer.disconnect();
			},
			{ threshold: 0.5 },
		);
		observer.observe(ref.current);

		return () => {
			observer.disconnect();
			if (paintId !== undefined) {
				window.cancelAnimationFrame(paintId);
			}
		};
	}, [duration]);

	return (
		<strong className={styles.number} ref={ref}>
			{format.format(Math.round(progress * count))}
			{progress === 1 ? <span className={styles.plus}>+</span> : null}
		</strong>
	);
}
