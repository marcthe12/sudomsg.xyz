const crypto = require('crypto')

module.exports = () => {
    return {
        sw_cache: {
            offline: "/offline.html",
            default: [
                "/index.css",
                "/prism.css",
                "/index.js",
                "/favicon.svg",
                "/offline.html",
                "/"
            ],
        },
        eleventyComputed: {
            sw_cache: {
                store: data => `${data.env.CF_PAGES_BRANCH || "default"}-${data.env.CF_PAGES_COMMIT_SHA || crypto.randomUUID()}`
            }
        }
    }
}