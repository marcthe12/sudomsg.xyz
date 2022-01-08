const eleventysyntaxhighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const eleventyrss = require('@11ty/eleventy-plugin-rss')
const markdown = require('markdown-it')
const markdownattrs = require('markdown-it-attrs')
const { DateTime } = require('luxon')
const postcss = require('postcss')
const postcssenv = require('postcss-preset-env')
const babel = require("@babel/core");
const env = require('./src/data/env')

module.exports = eleventyConfig => {
    eleventyConfig.addPlugin(eleventysyntaxhighlight)
    eleventyConfig.addPlugin(eleventyrss)

    eleventyConfig.setLibrary('md', markdown({
        html: true,
        linkify: true,
        typographer: true
    }).use(markdownattrs))

    eleventyConfig.addFilter('datefmt', date => DateTime.fromJSDate(date, { zone: 'utc' }).toFormat("dd LLL yyyy"))

    eleventyConfig.addExtension("css", {
        outputFileExtension: "css",
        compile: async(content, filename) =>
            async data => {
                const css = await postcss()
                    .use(postcssenv)
                    .process(content, {
                        from: filename,
                        map: data.env.isdevel
                    })

                return css.css
            }
    })

    eleventyConfig.addExtension("mjs", {
        outputFileExtension: "js",
        compile: (content, filename) => {
            return async data => {
                const js = await babel.transformAsync(content, {
                    presets: [
                        ["@babel/preset-env", {
                            "targets": {
                                "esmodules": true,
                            },
                            bugfixes: true
                        }]
                    ],
                    sourceMaps: data.env.isdevel ? "inline" : false,
                    sourceFileName: filename
                })
                return js.code
            }
        }
    })


    eleventyConfig.addPassthroughCopy('static/')
    eleventyConfig.addPassthroughCopy('favicon.svg')
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