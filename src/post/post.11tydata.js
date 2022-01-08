const slugify = require("@sindresorhus/slugify")

module.exports = () => ({
	layout: "post.njk",
	eleventyComputed: {
		permalink: data => `/posts/${slugify(data.title)}/`
	}
})