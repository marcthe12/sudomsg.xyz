import sharp from "sharp"
import { createReadStream } from "node:fs"
import { extname, join } from "node:path"
import createError from "http-errors"
import type express from "express"

function transform(format: keyof sharp.FormatEnum, width?: number, height?: number): sharp.Sharp {
	var transform = sharp().withMetadata()

	if (format) {
		transform = transform.toFormat(format)
	}

	if (width || height) {
		transform = transform.resize({ width, height })
	}

	return transform
}

function errorHand(next: express.NextFunction) {
	return function (err: NodeJS.ErrnoException) {
		switch (err.code) {
			case "ENOENT":
				next()
				break
			case "EISDIR":
			case "EPERM":
				next(createError(401))
				break
			default:
				next(err)
		}
	}
}

export default function (path: string) {
	return async function (req: express.Request, res: express.Response, next: express.NextFunction) {
		const err_handler = errorHand(next)

		const filepath = join(path, req.path)
		const ext = extname(filepath).substring(1)
		if (![
			"svg", "heic", "heif", "avif", "jpeg", "jpg", "jpe", "tile", "dz",
			"png", "raw", "tiff", "tif", "webp", "gif", "jp2", "jpx", "j2k",
			"j2c", "jxl"
		].includes(ext)) {
			return next()
		}
		const width = parseInt(String(req.query['width']))
		const height = parseInt(String(req.query['height']))
		var { format = ext } = req.query as { format?: string }
		if (format == "svg") {
			if (ext == "svg") {
				const stream = createReadStream(filepath)
				stream.on("error", err_handler)
				res.format({
					[format]: function () {
						return stream.pipe(res)
					}
				})
			} else {
				return next(createError(400))
			}
			return
		}

		const stream = createReadStream(filepath)
		stream.on("error", err_handler)
		res.format({
			[format]: function () {
				return stream.pipe(
					transform(
						format as keyof sharp.FormatEnum,
						!isNaN(width) ? width : undefined,
						!isNaN(height) ? height : undefined
					)
				).pipe(res)
			}
		})
	}
}

