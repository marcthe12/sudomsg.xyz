import  { posts } from "./template/Post.js"
import  { pages } from "./template/Base.js"

const postMod = [
]

const pageMod = [
	...postMod,
	"./content/about.js",
	"./content/index.js"
]

const routes = [
	...pageMod,
	"./content/webmanifest.js",
	"./content/robots.js",
	"./content/blog.js",
	"./content/sitemap.js",
	"./content/feed.js",
]

function datecmp(a: { date_mod?: Date| undefined }, b: { date_mod?: Date | undefined }): number {
	return (a.date_mod ?? new Date()).valueOf() - (b.date_mod ?? new Date()).valueOf()
}

await Promise.all(postMod.map(mod => import(mod)))
posts.sort(datecmp).reverse()
await Promise.all(pageMod.map(mod => import(mod)))
pages.sort(datecmp).reverse()
await Promise.all(routes.map(mod => import(mod)))

