module.exports = class {
	data() {
		return {
			permalink: "/feed.json"
		};
	}

	async render(data) {
		const out = {
				version: "https://jsonfeed.org/version/1.1",
				title: data.metadata.title,
				language: data.metadata.language,
				home_page_url: data.metadata.url,
				feed_url: data.page.url,
				description: data.metadata.description,
				author: {
					name: data.metadata.author.name,
					url: data.metadata.author.url
				},
				items: (data.collections.posts || []).map(
					async function (e) {
						const absolutePostUrl = this.absoluteUrl(this.url(e.url), data.metadata.url)
						return {
							id: absolutePostUrl,
							url: absolutePostUrl,
							title: e.data.title,
							date_published: this.dateToRfc3339(e.date),
							content_html: htmlToAbsoluteUrls(e.templateContent, absolutePostUrl),
						}
					}
				)
			}
		  return JSON.stringify(out)
		}
}
