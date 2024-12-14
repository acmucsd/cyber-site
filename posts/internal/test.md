---
published: 2024-11-24
title: Markdown testing
description: howdy lmao
---

Hello gamers! [Check this out](./writeups/sdctf2024.md) lol

and this is an [external url](https://github.com/acmucsd/hack-website/commits/main/README.md)

```js
const wow = 3;
console.log("what");
```

```tsx
export default async function ResourcePage({ params }: ResourcePageProps) {
	const { path } = await params;
	const { markdown, title, published } = await getPost(path.join("/"));

	return (
		<>
			<div className={styles.header}>
				{title ? <h1 className={styles.heading}>{title}</h1> : null}
				<p className={styles.publishDate}>{published ? `Posted ${dateFormat.format(published)}.` : "Unpublished."}</p>
			</div>
			<div className={styles.content}>
				<Markdown
					remarkPlugins={[remarkGfm]}
					rehypePlugins={[rehypeRaw, rehypeHighlight]}
					urlTransform={urlTransform}
					remarkRehypeOptions={{ allowDangerousHtml: true }}
					components={{
						a: ({ href, ...props }) => (href !== undefined ? <Link href={href} {...props} /> : <a {...props} />),
					}}
				>
					{markdown}
				</Markdown>
			</div>
		</>
	);
}

export async function generateStaticParams() {
	const paths = await getAllPosts();
	return paths.map((path) => ({ path: path.split("/").slice(1) }));
}

// Should prevent directory traversal by allowlisting paths
export const dynamicParams = false;
```
