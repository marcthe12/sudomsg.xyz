const eleventyrss = require("@11ty/eleventy-plugin-rss");

const {
	DateTime
} = require("luxon")

module.exports = function(eleventyConfig) {
    [
        require("@11ty/eleventy-plugin-syntaxhighlight"),
    ].forEach(element => eleventyConfig.addPlugin(element));

    [
        "assets/",
        "favicon/",
        {
            "assets/sw.js": "/sw.js"
        },
        {
            "favicon/icon.ico": "/favicon.ico"
        },
        {
            [require.resolve("prismjs/themes/prism-twilight.min.css")]: "/vendor/prism.css"
        }
    ].forEach(element => eleventyConfig.addPassthroughCopy(element))

	const zone = {
		zone: "utc+5.5"
	}

  Object.entries({
    htmlToAbsoluteUrls: eleventyrss.htmlToAbsoluteUrls
  }).forEach(([k,v]) => eleventyConfig.addAsyncFilter(k, v))
	
	Object.entries({
    readableDate: dateObj => DateTime.fromJSDate(dateObj, zone).toFormat("MMM d, yyyy"),
    htmlDateString: dateObj => DateTime.fromJSDate(dateObj, zone).toFormat("MMM d, yyyy"),
    getNewestCollectionItemDate: eleventyrss.getNewestCollectionItemDate,
    dateToRfc3339: eleventyrss.dateToRfc3339,
    dateToRfc822: eleventyrss.dateToRfc822,
    absoluteUrl: eleventyrss.absoluteUrl,
  }).forEach(([k,v]) => eleventyConfig.addFilter(k, v))

	return {
		dir:
		{
			input: "src",
		},
		templateFormats: [
			"html",
			"md",
			"njk",
			"11ty.js"
		]
	}
}
