"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function AffectedSearchPage() {
	const [items, setItems] = useState<string[]>([]);
	const [query, setQuery] = useState("");

	useEffect(() => {
		fetch("/api/canvas-affected")
			.then((r) => r.json())
			.then((data) => {
				if (Array.isArray(data)) setItems(data);
				else if (Array.isArray(data?.items)) setItems(data.items);
			})
			.catch(() => setItems([]));
	}, []);

	const q = query.trim().toLowerCase();
	const results = q ? items.filter((it) => it.toLowerCase().includes(q)) : items;

	return (
		<div className={styles.container}>
			<h1 className={styles.title}></h1>
			<input
				className={styles.input}
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Type to search..."
				aria-label="Search affected.json"
			/>
			<div className={styles.count}>
				{results.length} result{results.length !== 1 ? "s" : ""}
			</div>
			<ul className={styles.list}>
				{results.map((r, i) => (
					<li key={i} className={styles.item}>
						{r}
					</li>
				))}
			</ul>
		</div>
	);
}
