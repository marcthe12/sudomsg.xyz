import type { element, node } from "./vdom.js";
import t, { Base, Lang, Attribute as Attr } from "./xml.js";

export interface Attribute extends Attr, Base, Lang { }

export function feed(attr: Attribute,
	...content: element<"id" | "title" | "updated" | "author" |
		"link" | "author" | "category" | "contributor" | "generator"
		| "icon" | "logo" | "rights" | "subtitle" | "entry">[]
) {
	return t("feed", attr, ...content);
}

export function entry(
	attr: Attribute,
	...content: element<
		"id" | "title" | "updated" | "author" | "content" | "link" |
		"summary" | "category" | "contributor" | "rights" | "published" | "source">[]
) {
	return t("entry", attr, ...content);
}

export function author(attr: Attribute, ...content: [element<"name" | "email">, element<"name" | "email">]) {
	return t("author", attr, ...content);
}

export function contributor(attr: Attribute, ...content: [element<"name" | "email">, element<"name" | "email">]) {
	return t("contributor", attr, ...content);
}

export function id({ id, ...prop }: Attribute & { id: URL }) {
	return t("id", prop, id.href);
}

export function updated({ date, ...prop }: Attribute & { date: Date }) {
	return t("updated", prop, date.toISOString());
}

export function update({ date, ...prop }: Attribute & { date: Date } ) {
	return t("update", prop, date.toISOString());
}

export function icon(attr: Attribute, ...content: string[]) {
	return t("icon", attr, ...content);
}

export function logo(attr: Attribute, ...content: string[]) {
	return t("logo", attr, ...content);
}

export function name(attr: Attribute, content: string) {
	return t("name", attr, content);
}

export function email(attr: Attribute, content: string) {
	return t("email", attr, content);
}

interface TextAttribute extends Attribute {
	type?: string;
}

export function title(attr: TextAttribute, ...content: node[]) {
	return t("title", attr, ...content);
}

export function subtitle(attr: TextAttribute, ...content: string[]) {
	return t("subtitle", attr, ...content);
}

export function summary(attr: TextAttribute, ...content: string[]) {
	return t("summary", attr, ...content);
}

export function rights(attr: TextAttribute, ...content: string[]) {
	return t("rights", attr, ...content);
}

export function content(attr: TextAttribute, ...child: node[]) {
	return t("content", attr, ...child);
}


interface generatorAttribute extends Attribute {
	uri?: string;
	version?: string
}

export function generator(attr: generatorAttribute, ...content: string[]) {
	return t("generator", attr, ...content);
}

interface linkAttribute extends Attribute {
	href: URL;
	rel?: "alternate" | "enclosure" | "self" | "via";
	type?: string;
	hreflang?: string;
	title?: string;
	length?: number;
}

export function link(attr: linkAttribute) {
	return t("link", { ...attr, href: attr.href.href, length: "" + (attr.length ?? "") });
}

interface catAttribute extends Attribute {
	term: string;
	scheme?: URL;
	label?: string;
}

export function category(attr: catAttribute) {
	return t("category", { ...attr, href: attr.scheme?.href });
}
