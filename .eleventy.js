const eleventy = require("@11ty/eleventy");
const eleventysyntaxhighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyrss = require("@11ty/eleventy-plugin-rss");

const markdown = require("markdown-it");
const markdownattrs = require("markdown-it-attrs");
const markdownanchor = require("markdown-it-anchor");
const markdownfootnote = require("markdown-it-footnote");

const slugify = require("@sindresorhus/slugify");

module.exports = eleventyConfig => {

    [
        eleventy.EleventyRenderPlugin,
//        eleventysyntaxhighlight,
        eleventyrss

    ].forEach(element => eleventyConfig.addPlugin(element));


    eleventyConfig.addPassthroughCopy([
        "assets/",
        "_headers",
        "_redirects",
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
    ].forEach(element => eleventyConfig.addPassthroughCopy(element)));

    eleventyConfig.setLibrary("md", markdown({
            html: true,
            linkify: true,
            typographer: true
        }).use(markdownattrs)
        .use(markdownanchor, {
            permalink: markdownanchor.permalink.headerLink(),
            slugify: slug => slugify(slug)
        }).use(markdownfootnote));

    eleventyConfig.addFilter("getNewestCollectionItemDate", eleventyrss.getNewestCollectionItemDate);
    eleventyConfig.addJavaScriptFunction("convertHtmlToAbsoluteUrls", eleventyrss.convertHtmlToAbsoluteUrls);

    eleventyConfig.setBrowserSyncConfig({
        snippet: false,
    });

    return {
        dir: {
            input: "src",
            output: "dist",
            includes: "includes",
            data: "data",
            layouts: "layouts"
        },

        dataTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        templateFormats: [
            "html",
            "md",
            "njk",
            "11ty.js"
        ]
    };
};
