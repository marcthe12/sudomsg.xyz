module.exports = class {
    data() {
        return {
            layout: "base",
            pagination: {
                data: "err",
                size: 1,
            },
            err: {
                offline: "The Page is offline",
                404: "Not Found"
            },
            permalink: data => `/${data.pagination.items}.html`
        };
    }

    render(data) {
        return `<h1 style="color: rgb(139 0 0)">ERROR: ${data.pagination.items}</h1>
		<p>${data.err[data.pagination.items]}</p>`;
    }
};
