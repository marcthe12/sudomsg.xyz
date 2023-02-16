import type { URL } from "node:url";
import createUrl from "./createUrl.js";

export default function schema(type: string | URL): URL {
	return createUrl(type, "http://schema.org/");
}
