---
layout: base.njk
pagination:
    data: err
    size: 1
    alias: error
permalink: "/{{ error.code }}.html"
eleventyExcludeFromCollections: true
---
# ERROR: {{ error.code }} {.err}

{{ error.msg }}
