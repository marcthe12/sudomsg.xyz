module.exports = class {
    async data() {
        return {
            permalink: "/feed.json"
        };
    }

    async render(data) {
        return JSON.stringify({
            version: "https://jsonfeed.org/version/1.1",
            title: data.metadata.title,
            language: data.metadata.language,
            home_page_url: data.metadata.url,
            feed_url: new URL(data.page.url, data.metadata.url),
            description: data.metadata.description,
            author: {
                name: data.metadata.author.name
            },
            items: await Promise.all((data.collections.posts || []).map(async post => ({
                id: new URL(post.url, data.metadata.url),
                url: new URL(post.url, data.metadata.url),
                title: new URL(post.url, data.metadata.url),
                content_html: await this.convertHtmlToAbsoluteUrls(post.templateContent, new URL(post.url, data.metadata.url)),
                date_published: post.date.toISOString()
            })).reverse())
        });
    }
};