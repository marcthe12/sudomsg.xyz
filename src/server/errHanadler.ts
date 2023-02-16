import Base from "./template/Base.js"
import createError from "http-errors"
import t, { c } from "./template/vdom.js"
import h from "./template/header.js"
import { STATUS_CODES } from "node:http"
import app from "./app.js"
import isDevel from "./utils/isDevel.js"
import isDefined from "./utils/isDefined.js"
import type express from "express"
import type { HttpError } from "http-errors"

interface ErrObj {
	code: number | string,
	msg: string,
	debug?: string | undefined
}

async function errorTemplate(data: ErrObj): Promise<{ html: string; text: string; obj: ErrObj }> {
	const { code, msg, debug } = data
	const arg = {
		...data,
		title: msg,
		content() {
			return [
				c(h, { level: 1, style: "color: darkred" }, `ERROR: ${code}`),
				t("p", {}, msg),
				isDefined(debug) && isDevel(app) ? t("p", {}, t("pre", {}, debug)) : ""
			]
		}
	}
	return {
		html: await Base(arg).render(),
		text: `${code} - ${msg}
${debug || ""}`,
		obj: data
	}

}

async function errRender(res: express.Response,	opt: ErrObj) {
	const msg = await errorTemplate(opt)
	res.format({
		html: () => {
			res.send(msg.html)
		},
		json: () => {
			res.send(msg.obj)
		},
		default: () => {
			res.type("txt").send(msg.text)
		}
	})
}

export const errHandler = async function (
	err: HttpError,
	_req: express.Request,
	res: express.Response,
	_next: express.NextFunction
) {
	res.status(err.status || 500)

	await errRender(res, {
		code: res.statusCode,
		msg: res.statusMessage || STATUS_CODES[res.statusCode] || "Unknown",
		debug: err.stack
	})

	console.error(err + (err.stack ?? ""))
}

export function notFound(_req: express.Request,
	_res: express.Response,
	next: express.NextFunction
) {
	next(createError(404))
}

export async function offline(_req: express.Request,
	res: express.Response) {
	await errRender(res, {
		code: "Offline",
		msg: "Can not reach the website. Check your Network",
	})
}