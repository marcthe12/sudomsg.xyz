module.exports = class {
        data() {
            return {
                layout: "base",
                title: "Blog"
            };
        }

        render(data) {
                return `<div role="feed" aria-busy="false">
			${(data.collections.posts || []).map((post, index, array) => `<article aria-posinset="${index}" aria-setsize="${array.len}">
				<h1>
					<a href="${post.url}">${post.data.title}</a>
				</h1>
				<small>
				<time datetime="${data.page.date.toISOString()}">${data.page.date.toDateString()}</time> - <a rel=author href="${data.metadata.author.url}">${data.metadata.author.name}</a>
				</small>
				<p>${post.data.description}</p>
			</article>	
			`).join()}
		</div>`;
	}
};
