const slugify = require("@sindresorhus/slugify");

module.exports = () => ({
    layout: "post",
    eleventyComputed: {
        permalink: data => `/posts/${slugify(data.title)}/`
    }
});
