const get_cache_info = async() => {
    const response = await fetch('/cache.json')
    return response.json()
}

self.addEventListener('install', async event => {
    const precache = async() => {
        const ver = await get_cache_info()
        const cache = await self.caches.open(ver.store);
        return cache.addAll(ver.default)
    }
    event.waitUntil(precache())
})

self.addEventListener('activate', async event => {
    const invalidatecache = async() => {
        const ver = await get_cache_info()
        const keys = await self.caches.keys()
        Promise.all(
            keys.map(key => {
                if (key !== ver.store) {
                    return self.caches.delete(key)
                }
            }))
    }
    event.waitUntil(invalidatecache())
})

self.addEventListener('fetch', async event => {
    const cache_fetch = async() => {
        const ver = await get_cache_info()
        if (event.request.method != 'GET') {
            return
        }
        const cacheres = await self.caches.match(event.request)
        if (cacheres !== undefined) {
            return cacheres
        }
        try {
            const response = await self.fetch(event.request)
            const cache = await self.caches.open(ver.store)
            cache.put(event.request, response.clone())
            return response
        } catch {
            return self.caches.match(ver.offline)
        }
    }

    event.respondWith(cache_fetch())
})