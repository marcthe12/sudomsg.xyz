import { URL } from "node:url";

export default function createUrl(url: string | URL, base?: string | URL | undefined): URL {
	return url instanceof URL ? url : new URL(url, base);
}
