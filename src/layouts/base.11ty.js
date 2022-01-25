const {oneLine} = require("common-tags")

module.exports = class {
        render(data) {
                return oneLine`<!DOCTYPE html>
			<html lang="${data.metadata.language}">
			<head>
				<meta charset="utf-8">
				<meta property="og:locale content=en_GB">
				<title property="og:title">${data.title || data.metadata.title}</title>
				<meta property="og:site_name" content="${data.metadata.title}">
				<meta name="author" content="${data.metadata.author.name}">
				<meta name="description" property="og:description content="${data.description || data.metadata.description}">
				<meta property="og:type" content="website">
				${data.keywords ? `<meta name="keywords" contents="${data.keywords.join()}>`: ""}
				<meta name="generator" contents="Eleventy v${data.pkg.dependencies["@11ty/eleventy"].replace("^", "")}">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<meta name="twitter:card" content="summary">
				<meta property=og:url content="${new URL(data.page.url, data.metadata.url)}">
				<link rel="canonical" href="${new URL(data.page.url, data.metadata.url)}">
				<link rel="alternate" href="${data.metadata.feed.atom}" type="application/atom+xml" title="${data.metadata.title}">
				<link rel="alternate" href="${data.metadata.feed.json}" type="application/feed+json" title="${data.metadata.title}">
				<meta property="og:image" content="/favicon/1024.png">
				<link rel="icon" href="/favicon.ico" sizes="any">
				<link rel="icon" href="/favicon/icon.svg" type="image/svg+xml">
				<link rel="apple-touch-icon" href="/favicon/192.png">
				<link rel="manifest" href="/app.webmanifest">
				<link rel="stylesheet" href="/assets/index.css">
				<link rel="stylesheet" href="/vendor/prism.css">
				<script type="module" src="/assets/index.js" defer></script>
			</head>
			<body>
				<header>
					<nav>
						<a href="#" id="nav-toogle">Sudomsg</a>
						<a class="navlinks" href="/" >Home</a>
						<a class="navlinks" href="/blog/">Blog</a>
						<a class="navlinks" href="/about/">About</a>
					</nav>
				</header>
				<main>
					${data.content}
				</main>
				<footer>
					Subscribe: <a href="${data.metadata.feed.atom}">RSS</a>
					<a href="${data.metadata.feed.json}">JSON</a>
				</footer>
			</body>
		</html>`;
    }
};
