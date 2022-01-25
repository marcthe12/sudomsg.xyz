import metadata from "/assets/metadata.js"

const data = metadata()

const sw_cache = {
    offline: "/offline.html",
    default: [
        "/assets/index.css",
        "/vendor/prism.css",
        "/assets/index.js",
        "/favicon/icon.svg",
        "/offline.html",
    ],
    store: data.version,
};

(function() {
    self.addEventListener("install", event => {
        self.skipWaiting();
        event.waitUntil((async() => {
            const cache = await self.caches.open(sw_cache.store);
            return cache.addAll(sw_cache.default);
        })());
    });

    self.addEventListener("activate", event => {
        event.waitUntil((async() => {
            const keys = await self.caches.keys();
            return Promise.all(keys.map(key => {
                if (key !== sw_cache.store) {
                    return self.caches.delete(key);
                }
            }));
        })());
    });

    self.addEventListener("fetch", event => {
        event.respondWith((async() => {
            if (event.request.method != "GET") {
                return fetch(event.request);
            }

            const req_url = new URL(event.request.url);
            if (req_url.origin != self.location.origin) {
                return fetch(event.request);
            }

            const cacheres = await self.caches.match(event.request);
            return cacheres || (async() => {
                try {
                    const response = await self.fetch(event.request);
                    const cache = await self.caches.open(sw_cache.store);
                    cache.put(event.request, response.clone());
                    return response;
                } catch {
                    return self.caches.match(sw_cache.offline);
                }
            })();
        })());
    });
})();