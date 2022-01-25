module.exports = class {
        async data() {
            return {
                permalink: "/feed.xml"
            };
        }

        async render(data) {
                return `<?xml version="1.0" encoding="utf-8"?>
	<feed xmlns="http://www.w3.org/2005/Atom">
		<title>${data.metadata.title}</title>
		<subtitle>${data.metadata.description}</subtitle>
		<link href="${new URL(data.url, data.metadata.url)}" rel="self"/>
		<link href="${data.metadata.url}"/>
		<updated>${this.getNewestCollectionItemDate((data.collections.posts) || []).toISOString()}</updated>
		<id>${data.metadata.url}</id>
		<author>
			<name>${data.metadata.author.name}</name>
			<email>${data.metadata.author.email}</email>
		</author>
		${(await Promise.all((data.collections.posts || []).map(async post => `<entry>
			<title>${post.data.title}</title>
			<link href="${new URL(post.url, data.metadata.url)}"/>
			<updated>${post.date.toISOString()}</updated>
			<id>${new URL(post.url, data.metadata.url)}</id>
			<content type="html"><![CDATA[${await this.convertHtmlToAbsoluteUrls(post.templateContent, new URL(post.url, data.metadata.url)) || ""}]]></content>
		</entry>`))).join()}
	</feed>`;
    }
};
