#!/usr/bin/env node
import { createServer } from "node:http"

const server = createServer()
server.on("request", (await import("./app.js")).default)
server.on("error", console.error)
server.on("listening", function (this: typeof server) {
	const addr = this.address()
	console.log(`Listening on ${addr ? typeof addr === "string" ? addr : `${addr.port} on ${addr.address}` : "Unknown Socket"}`)
})
server.on("close", function () {
	console.log("HTTP server closed")
})

server.listen({
	host: "::",
	port: 8080
})

process.on("SIGTERM", function () {
	console.warn("SIGTERM signal received: closing HTTP server")
	server.close()
})
