const sw_cache = {
    offline: "/offline.html",
    default: [
        "/index.css",
        "/prism.css",
        "/index.js",
        "/favicon.svg",
        "/offline.html",
        "/"
    ],
    // eslint-disable-next-line no-undef
    store: VERSION,
}

self.addEventListener('install', event => {
    self.skipWaiting()
    event.waitUntil((async() => {
        const cache = await self.caches.open(sw_cache.store)
        cache.addAll(sw_cache.default)
    })())
})

self.addEventListener('activate', event => {
    event.waitUntil((async() => {
        const keys = await self.caches.keys()
        Promise.all(keys.map(key => {
            if (key !== sw_cache.store) {
                return self.caches.delete(key)
            }
        }))
    })())
})

self.addEventListener('fetch', event => {
    if (event.request.method != 'GET') {
        return
    }

    const req_url = new URL(event.request.url)
    if (req_url.origin != self.location.origin) {
        return
    }

    event.respondWith((async() => {
        const cacheres = await self.caches.match(event.request)
        return cacheres || (async() => {
            try {
                const response = await self.fetch(event.request)
                const cache = await self.caches.open(sw_cache.store)
                cache.put(event.request, response.clone())
                return response
            } catch {
                return self.caches.match(sw_cache.offline)
            }
        })()
    })())


})