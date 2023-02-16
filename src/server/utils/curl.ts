import type { URL } from "node:url";
import metadata from "../metadata.js";
import createUrl from "./createUrl.js";

export default function curl(path: string | URL) {
	return createUrl(path, metadata.url);
}
