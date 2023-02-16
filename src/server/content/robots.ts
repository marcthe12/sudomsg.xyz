import curl from "../utils/curl.js"
import setStingRoute from "../utils/setStingRoute.js"

setStingRoute("/robots.txt", "robots.txt", async () => Object.entries({
	"User-agent": "*",
	Disallow: "",
	Sitemap: curl("sitemap.xml")
}).map(([key, val]) => `${key}: ${val}`).join("\n")
)
