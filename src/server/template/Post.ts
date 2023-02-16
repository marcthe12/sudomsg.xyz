import schema from "../utils/schema.js"
import metadata from "../metadata.js"
import Base, { content } from "./Base.js"
import h from "./header.js"
import slugify from "@sindresorhus/slugify"
import { c } from "./vdom.js"
import type { PageI } from "./Page.js"
import { article, small, time, span, a, p, div } from "./html.js"

export var posts: ReturnType<typeof Post>[] = []

interface PostI extends Omit<PageI, "url"> {
	title: string,
	description: string,
	date_pub: Date,
	date_mod?: Date
}

export default function Post<Type extends PostI>(data: Type): ReturnType<typeof Base<Type & {url: string;}>> {
	var args = {
		...data,
		content() {
			var { date_mod, title, date_pub, description } = this
			return c(article, { itemscope: true, itemtype: schema("BlogPosting") },
				c(h, { level: 1, itemprop: "headline" }, title),
				c(small, {},
					...(date_mod ? [
						c(time, { datetime: date_mod.toISOString(), itemprop: "dateModified" }, date_mod.toDateString()),
						"- Modified "
					] : []),
					c(time, { datetime: date_pub.toISOString(), itemprop: "datePublished" }, date_pub.toDateString())
					, " - ",
					c(span, { itemprop: "author", itemscope: true, itemtype: schema("Person") },
						c(a, { href: metadata.author.url, rel: "author", itemprop: "url" },
							c(span, { itemprop: "name" }, metadata.author.name))
					),
					c(p, { itemprop: "abstract" }, description)
				),
				c(div, { itemprop: "articleBody" }, c(content, { data }))
			)
		},
		url: `/posts/${slugify(data.title)}`
	}
	const post = Base(args)
	posts.push(post)
	return post
}

