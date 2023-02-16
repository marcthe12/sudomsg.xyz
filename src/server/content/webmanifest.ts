import  metadata from "../metadata.js"
import { contentType } from "mime-types"
import setStingRoute from "../utils/setStingRoute.js"

setStingRoute("/app.webmanifest", "app.webmanifest", async () => ({
	$schema: "https://json.schemastore.org/web-manifest-combined.json",
	name: metadata.title,
	lang: metadata.language,
	start_url: "/",
	id: "/", scope: "/",
	display: "minimal-ui",
	background_color: metadata.theme,
	theme_color: metadata.theme,
	description: metadata.description,
	icons: ["png", "svg"].flatMap(format => format == "svg" ? {
		src: "/favicon.svg",
		type: contentType(format),
		sizes: "any",
		purpose: "any maskable"
	} : [192, 512, 1024].map(size => ({
		src: `/favicon.svg?format=${format}&width=${size}`,
		type: contentType(format),
		sizes: `${size}x${size}`,
		purpose: "maskable"
	})))
}))
