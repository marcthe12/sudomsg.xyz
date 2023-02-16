import express from "express"
import relDir from "./utils/relDir.js"
import  { errHandler, notFound, offline } from "./errHanadler.js"

const dir = relDir(import.meta.url)

await import("./build.js")
export const app = express()

app.set("views", false)
app.set("etag", "strong")
app.set("x-powered-by", false)
app.set("trust proxy", true)

app.use((await import("morgan")).default(":remote-addr :method :url :http-version :status :response-time ms"))
app.use((await import("./router.js")).default)
app.use("/offline", offline)
app.use((await import("./img.js")).default(dir("../../assets")))
app.use(express.static(dir("../../assets"), { index: false }))
app.use(express.static(dir("../client"), { index: false }))
app.use(express.static(dir("../worker"), { index: false }))
app.use((await import("./img.js")).default(dir("/static")))
app.use(express.static(dir("/static"), { index: false }))
app.get("/favicon.ico", (_req, res) => {
	res.status(204).send()
})

app.use(notFound)
app.use(errHandler)

export default app 
