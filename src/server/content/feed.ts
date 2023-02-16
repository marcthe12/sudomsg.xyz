import curl from "../utils/curl.js"
import setStingRoute from "../utils/setStingRoute.js"
import { posts } from "../template/Post.js"
import metadata from "../metadata.js"
import { doctype } from "../template/xml.js"
import { c } from "../template/vdom.js"
import { feed, title, link, summary, id, author, subtitle, updated, name, email, entry } from "../template/atom.js"

setStingRoute("/feed", ["application/atom+xml", "xml"], async () => doctype({},
	c(feed, { xmlns: new URL("http://www.w3.org/2005/Atom"), "xml:lang": metadata.language },
		c(title, {}, metadata.title),
		c(subtitle, {}, metadata.description),
		c(link, { href: curl(metadata.feed.atom), rel: "self" }),
		c(link, { href: metadata.url }),
		...(posts[0] ? [c(updated, { date: posts[0].date_mod })] : []),
		c(id, { id: metadata.url }),
		c(author, {},
			c(name, {}, metadata.author.name),
			c(email, {}, metadata.author.email),
		),
		...posts.map(({ url, date_mod, title: Title, description }) =>
			c(entry, {},
				c(title, {}, Title),
				c(link, { href: url }),
				c(updated, { date: date_mod }),
				c(id, { id: url }),
				c(summary, {}, description)
			)
		)
	)
))

