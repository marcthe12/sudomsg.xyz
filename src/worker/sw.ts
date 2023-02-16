declare var self: ServiceWorkerGlobalScope;
export {};


const sw_cache = {
	offline: "/offline",
	default: [
		"/index.js",
		"/index.css",
		"/app.webmanifest",
		"/favicon.svg"
	],
	store: "app",
}

async function install() {
	const cache = await self.caches.open(sw_cache.store)
	return cache.addAll([sw_cache.offline, ...sw_cache.default])
}

async function activate() {
	const keys = await self.caches.keys()
	return Promise.all(keys.map(key => {
		return key !== sw_cache.store ? self.caches.delete(key) : undefined
	}))
}

async function req(event: FetchEvent) {
	const cache = await caches.open(sw_cache.store)
	const cachedResponse = await cache.match(event.request)
	var networkResponse
	try {
		networkResponse = await fetch(event.request)
		if (networkResponse.ok) {
			cache.put(event.request, networkResponse.clone())
		}
	} catch(error) {
		console.error(error)
		if (event.request.mode === "navigate") {
			networkResponse = await caches.match("/offline")
		}
	}
	return (cachedResponse || networkResponse) as Response

}

self.addEventListener("install", event => event.waitUntil(install()))

self.addEventListener("activate", event => event.waitUntil(activate()))

self.addEventListener("fetch", event => event.respondWith(req(event)))
