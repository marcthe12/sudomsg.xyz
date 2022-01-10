---
layout: base.njk
pagination:
    data: err
    size: 1
    alias: error
permalink: "/{{ error.code }}.html"
---
# ERROR: {{ error.code }} {.err}

{{ error.msg }}
