const eleventysyntaxhighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const eleventyrss = require('@11ty/eleventy-plugin-rss')
const markdown = require('markdown-it')
const markdownattrs = require('markdown-it-attrs')
const { DateTime } = require('luxon')
const postcss = require('postcss')
const postcssenv = require('postcss-preset-env')
const babel = require("@babel/core");
const crypto = require('crypto')

module.exports = eleventyConfig => {
    eleventyConfig.addPlugin(eleventysyntaxhighlight)
    eleventyConfig.addPlugin(eleventyrss)

    eleventyConfig.setLibrary('md', markdown({
        html: true,
        linkify: true,
        typographer: true
    }).use(markdownattrs))

    eleventyConfig.addFilter('datefmt', date => DateTime.fromJSDate(date, { zone: 'utc' }).toFormat("dd LLL yyyy"))
    eleventyConfig.addFilter("tojson", obj => JSON.stringify(obj))


    eleventyConfig.addExtension("css", {
        outputFileExtension: "css",
        compileOptions: {
            permalink: "raw"
        },
        compile: async(content, filename) =>
            async data => {
                const css = await postcss()
                    .use(postcssenv)
                    .process(content, {
                        from: filename,
                        map: data.env.NODE_ENV == "develoment"
                    })

                return css.css
            }
    })

    eleventyConfig.setBrowserSyncConfig({
        snippet: false,
    });

    eleventyConfig.addExtension("mjs", {
        outputFileExtension: "js",
        compileOptions: {
            permalink: "raw"
        },
        compile: (content, filename) =>
            async data => {
                const js = await babel.transformAsync(content, {
                    presets: [
                        ["@babel/preset-env", {
                            "targets": {
                                "esmodules": true,
                            },
                            bugfixes: true
                        }]
                    ],
                    plugins: [
                        ["transform-define", {
                            VERSION: `${data.env.CF_PAGES_BRANCH || "default"}-${data.env.CF_PAGES_COMMIT_SHA || crypto.randomUUID()}`
                        }]
                    ],
                    sourceMaps: data.env.NODE_ENV == "develoment" ? "inline" : false,
                    sourceFileName: filename
                })
                return js.code
            }
    })


    eleventyConfig.addPassthroughCopy('static/')
    eleventyConfig.addPassthroughCopy('_headers')
    eleventyConfig.addPassthroughCopy('_redirects')
    eleventyConfig.addPassthroughCopy('favicon/')
    eleventyConfig.addPassthroughCopy('favicon.ico')

    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: 'includes',
            data: 'data',
            layouts: 'layouts'
        },

        dataTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        templateFormats: [
            'html',
            'md',
            'njk',
            '11ty.js',
            'css',
            'mjs'
        ]
    }
}