module.exports = class {
    data() {
        return {
            layout: "base",
        };
    }

    render(data) {
        return `<article>
			<h1>${data.title}</h1>
			${data.content}
		</article>`;
    }
};
