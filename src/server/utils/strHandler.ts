import type express from "express";

export default function strHandler<T>(type: string | string[], content: () => Promise<T>) {
	return async (_req: express.Request, res: express.Response) => {
		const data = await content();
		res.format(Object.fromEntries((Array.isArray(type) ? type : [type]).map(t => [t, () => res.send(data)])));
	};
}
