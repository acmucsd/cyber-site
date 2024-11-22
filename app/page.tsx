import styles from "./page.module.css";

export default function Home() {
	return (
		<div className={styles.container}>
			{"<Hero></Hero>"}
			{"<Sponsorship></Sponsorship>"}
			{"Resources"}
			{"event archive"}
		</div>
	);
}
