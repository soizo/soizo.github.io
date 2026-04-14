// projects.js — livepage link setup
document.querySelectorAll("a[livepage]").forEach((a) => {
	const name = a.getAttribute("livepage");
	const base = `https://soizo.github.io/${name}/`;

	a.href = base;
	a.rel = "noopener noreferrer";

	// fetch the livepage's HTML and extract its favicon URL,
	// then set it as a CSS custom property for ::before
	fetch(base)
		.then((r) => r.text())
		.then((html) => {
			const doc = new DOMParser().parseFromString(html, "text/html");
			const icon =
				doc.querySelector('link[rel="icon"]') ||
				doc.querySelector('link[rel="shortcut icon"]') ||
				doc.querySelector('link[rel*="icon"]');
			const url = icon
				? new URL(icon.getAttribute("href"), base).href
				: `${base}favicon.ico`;
			a.style.setProperty("--favicon", `url("${url}")`);
		})
		.catch(() => {
			a.style.setProperty("--favicon", `url("${base}favicon.ico")`);
		});
});
