import router from "../router.js";
import strHandler from "./strHandler.js";

export default function setStingRoute<T>(url: string, type: string | string[], content: () => Promise<T>): void {
	router.get(url, strHandler(type, content));
}
