module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'))
  eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-rss'))

  eleventyConfig.setLibrary('md', require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
  }).use(require('markdown-it-attrs')))

  const { DateTime } = require('luxon')
  eleventyConfig.addFilter('datefmt', date => {
    return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat("dd LLL yyyy");
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
      '11ty.js'
    ]
  }
}
