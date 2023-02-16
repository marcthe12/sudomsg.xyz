import metadata from "../metadata.js"
import curl from "../utils/curl.js"
import setStingRoute from "../utils/setStingRoute.js"
import isDefined from "../utils/isDefined.js"
import { Attribute, doctype, html as html_1, head, meta, title as title_1, link, script, body, header, nav, a, main, footer } from "./html.js"
import { c, node } from "./vdom.js"
import type { URL } from "url"

export var pages: (ReturnType<typeof Base>)[] = []

type content<T extends node = node> = T | (() => T)

interface BasePageI<T extends node = node> {
	url?: string | URL | undefined,
	content: content<T>,
	date_mod?: Date | undefined,
	date_pub?: Date
}

export interface BaseI<T extends node = node> extends BasePageI<T> {
	title?: string,
	description?: string,
	keywords?: string[],
	isHighlight?: boolean
}

export function content<Type extends BasePageI>({ data }: Attribute & { data: Type }): node {
	return data.content instanceof Function ? data.content() : data.content
}

function BasePage<Type extends BasePageI>(data: Type): Type & {
	setupRoute(url?: URL): void;
	render(): Promise<string>;
	date_mod: Type["date_pub"];
	url: URL | undefined
} {
	return {
		...data,
		setupRoute(url?: URL): void {
			url ??= this.url
			if (isDefined(url)) {
				setStingRoute(url.pathname, "html", this.render.bind(this))
			} else {
				throw new Error();

			}
		},
		async render(): Promise<string> {
			console.profile()
			const a = doctype(c(content, { data: this }))
			console.profileEnd()
			return a
		},
		date_mod: data.date_mod ?? data.date_pub,
		url: isDefined(data.url) ? curl(data.url) : undefined,
	}
}

export default function Base<Type extends BaseI>(data: Type): ReturnType<typeof BasePage<Type>> {
	const arg = {
		...data,
		content() {
			var { title, description, keywords, url, isHighlight = true } = this
			if (!url) {
				isHighlight = false
			}
			return c(html_1, { lang: metadata.language },
				c(head, {},
					...(url ? [c(meta, { property: "og:locale", content: metadata.language })] : []),
					c(title_1, { property: "og:title" }, title || metadata.title),
					c(meta, { name: "theme-color", content: metadata.theme }),
					...(url ? [
						c(meta, { name: "description", property: "og:description", content: description || metadata.description }),
						...(Array.isArray(keywords) ? [c(meta, { name: "keywords", contents: keywords })] : []),
						c(meta, { property: "og:url", content: url }),
						c(link, { rel: "canonical", href: url }),
						c(meta, { property: "og:site_name", content: metadata.title }),
						c(meta, { name: "author", content: metadata.author.name }),
						c(meta, { property: "og:type", content: "website" }),
						c(meta, { name: "viewport", content: "width=device-width, initial-scale=1" }),
						c(meta, { name: "twitter:card", content: "summary" }),
						c(link, { rel: "alternate", href: metadata.feed.atom, type: "application/atom+xml", title: metadata.title }),
						c(meta, { property: "og:image", content: "/favicon.svg?format=png&width=1024" })
					] : []),
					c(link, { rel: "icon", href: "/favicon.ico", sizes: "any" }),
					c(link, { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }),
					c(link, { rel: "apple-touch-icon", href: "/favicon.svg?format:png&width=192" }),
					c(link, { rel: "manifest", href: "/app.webmanifest" }),
					c(link, { rel: "stylesheet", href: "/index.css" }),
					c(script, { type: "module", src: "/index.js" }),
					...(isHighlight ? [c(link, { rel: "stylesheet", href: "/syntax.css" })] : [])
				),
				c(body, {},
					c(header, {}, c(nav, {},
						c(a, { href: "#", id: "nav-toogle" }, "Sudomsg"),
						...Object.entries({
							Home: "/",
							Blog: "/blog",
							About: "/about",
							Git: "/cgit",
						}).map(([name, href]) => c(a, { href, class: "navlinks" }, name))
					)),
					c(main, {}, c(content, { data })),
					c(footer, {},
						"Subscribe: ",
						c(a, { href: metadata.feed.atom, type: "application/atom+xml" }, "Atom")
					)
				)
			)
		}
	}
	const base = BasePage(arg)
	if (isDefined(base.url)) {
		pages.push(base)
	}
	return base
}
