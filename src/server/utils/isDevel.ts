import type express from "express";

export default function isDevel(app: express.Express) {
	return app.get("env") === "development";
}
