import  { pages } from "../template/Base.js"
import setStingRoute from "../utils/setStingRoute.js"
import { doctype } from "../template/xml.js"
import { c } from "../template/vdom.js"
import { lastmod, loc, url, urlset } from "../template/sitemap.js"

setStingRoute("/sitemap.xml", "sitemap.xml", async () => doctype({},
	c(urlset, { xmlns: new URL("http://www.sitemaps.org/schemas/sitemap/0.9") },
		...pages.map(page =>
			c(url, {},
				c(loc, {}, (page.url?.href) ?? ""),
				...(page.date_mod ? [c(lastmod, {}, page.date_mod.toISOString())] : [])
			)
		)
	)
))
