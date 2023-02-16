import type { URL } from "node:url";

export default function relUrl(url: URL) {
	return url.pathname + url.search + url.hash;
}
