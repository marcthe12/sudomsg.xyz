const path = require("path")

module.exports = {
    eleventyExcludeFromCollections: true,
    eleventyComputed: {
        permalink: data => data.permalink || `/${path.relative("/assets", data.page.filePathStem)}.${data.page.outputFileExtension}`
    }
}