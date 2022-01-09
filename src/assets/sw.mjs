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
    const precache = async() => {
        const cache = await self.caches.open(sw_cache.store);
        return cache.addAll(sw_cache.default)
    }
    event.waitUntil(precache())
})

self.addEventListener('activate', async event => {
    const invalidatecache = async() => {
        const keys = await self.caches.keys()
        Promise.all(
            keys.map(key => {
                if (key !== sw_cache.store) {
                    return self.caches.delete(key)
                }
            }))
    }
    event.waitUntil(invalidatecache())
})

self.addEventListener('fetch', async event => {
    const cache_fetch = async() => {
        if (event.request.method != 'GET') {
            return
        }

        if (event.request.url.origin != self.location.origin) {
            return
        }

        const cacheres = await self.caches.match(event.request)
        if (cacheres !== undefined) {
            return cacheres
        }
        try {
            const response = await self.fetch(event.request)
            const cache = await self.caches.open(sw_cache.store)
            cache.put(event.request, response.clone())
            return response
        } catch {
            return self.caches.match(sw_cache.offline)
        }
    }

    event.respondWith(cache_fetch())
})