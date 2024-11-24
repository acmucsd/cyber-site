import styles from "./layout.module.css";

export default function ResourceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return <div className={styles.container}>{children}</div>;
}
