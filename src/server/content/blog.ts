import  { posts } from "../template/Post.js"
import  Base from "../template/Base.js"
import  { c } from "../template/vdom.js"
import  h from "../template/header.js"
import relUrl from "../utils/relUrl.js"
import schema from "../utils/schema.js"
import  metadata from "../metadata.js"
import { div, article, a, small, time, span, p } from "../template/html.js"

Base({
	title: "Blog Posts",
	url: "/blog",
	content() {
		return c(div, { itemscope: true, itemtype: schema("Blog"), role: "feed", "aria-busy": "false" },
			...posts.map((post, index, { length }) => {
				const { date_mod, date_pub, title, description, url } = post
				return c(article, { itemprop: "blogPost", itemscope: true, itemtype: schema("BlogPosting"), "aria-posinset": index, "aria-setsize": length },
					c(h, { level: 1, itemprop: "headline" }, c(a, { href: relUrl(url), itemprop: "sameAs" }, title)),
					c(small, {},
						date_pub != date_mod ? [
							c(time, { datetime: date_mod.toISOString(), itemprop: "dateModified" }, date_mod.toDateString()),
							"- Modified "
						] : [],
						c(time, { datetime: date_pub.toISOString(), itemprop: "datePublished" }, date_pub.toDateString())
						, " - ",
						c(span, { itemprop: "author", itemscope: true, itemtype: schema("Person") },
							c(a, { href: metadata.author.url, rel: "author", itemprop: "url" },
								c(span, { itemprop: "name" }, metadata.author.name))
						),
					),
					c(p, { itemprop: "abstract" }, description)
				)
			}))
	}
}).setupRoute()
