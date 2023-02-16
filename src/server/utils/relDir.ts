import { dirname, join } from "node:path";
import { URL, fileURLToPath } from "node:url";

export default function relDir(url: URL | string) {
	const base = dirname(fileURLToPath(url));
	return function (dirname: string) {
		return join(base, dirname);
	};
}
