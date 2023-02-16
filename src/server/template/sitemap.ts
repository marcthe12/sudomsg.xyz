import type { element } from "./vdom.js";
import t, { Attribute } from "./xml.js";

export function urlset(attr: Attribute, ...content: element<'url'>[]) {
	return t("urlset", attr, ...content);
}

export function url(
	attr: Attribute,
	...content: element<"loc" | "lastmod" | "changefreq" | "priority">[]
) {
	return t("url", attr, ...content);
}

export function loc(attr: Attribute, ...content: string[]) {
	return t("loc", attr, ...content);
}

export function lastmod(attr: Attribute, content: string) {
	return t("lastmod", attr, content);
}

export function changefreq(attr: Attribute,
	content: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
) {
	return t("changefreq", attr, content);
}

export function priority(attr: Attribute, content: string) {
	return t("priority", attr, content);
}