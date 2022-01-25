module.exports = class {
    data() {
        return {
            layout: "page",
            tags: [
                "posts"
            ]
        };
    }

    render(data) {
        return `<small>
			<time datetime="${data.page.date.toISOString()}">${data.page.date.toDateString()}</time> - <a rel=author href="${data.metadata.author.url}">${data.metadata.author.name}</a>
		</small>
		${data.content}`;
    }
};
