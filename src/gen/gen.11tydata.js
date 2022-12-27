const path = require("path");

module.exports = {
    eleventyExcludeFromCollections: true,
        permalink: false, 
    eleventyComputed: {
        //permalink: data => data.permalink || `/${path.relative("/gen", data.page.filePathStem)}.${data.page.outputFileExtension}`
    }
}
