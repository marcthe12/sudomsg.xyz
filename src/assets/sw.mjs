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

self.addEventListener('install', async event => {
    self.skipWaiting()
    const cache = await self.caches.open(sw_cache.store);
    event.waitUntil(cache.addAll(sw_cache.default))
})

self.addEventListener('activate', async event => {
    const keys = await self.caches.keys()

    event.waitUntil(Promise.all(keys.map(key => {
        if (key !== sw_cache.store) {
            return self.caches.delete(key)
        }
    })))
})

self.addEventListener('fetch', async event => {
    if (event.request.method != 'GET') {
        return
    }

    const a = new URL(event.request.url)
    if (a.origin != self.location.origin) {
        return
    }

    const cacheres = await self.caches.match(event.request)
    if (cacheres !== undefined) {
        event.respondWith(cacheres)
    }
    try {
        const response = await self.fetch(event.request)
        const cache = await self.caches.open(sw_cache.store)
        cache.put(event.request, response.clone())
        event.respondWith(response)
    } catch {
        event.respondWith(self.caches.match(sw_cache.offline))
    }

})