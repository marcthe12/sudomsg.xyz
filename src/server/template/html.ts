import isDefined from "../utils/isDefined.js"
import tag, { render as rend, prenderdata, node, Attribute as Attr, element } from "./vdom.js"

export function doctype(...content: node[]) {
	return `<!DOCTYPE html>${render(content).content}`
}

export const render = rend("html", function (node, content) {
	const close = [
		"img",
		"input",
		"br",
		"hr",
		"frame",
		"area",
		"base",
		"basefont",
		"col",
		"isindex",
		"link",
		"meta",
		"param",
		"html",
		"body",
		"p",
		"li",
		"dt",
		"dd",
		"option",
		"thead",
		"th",
		"tbody",
		"tr",
		"td",
		"tfoot",
		"colgroup",
	].includes(node.name.toLowerCase()) ? undefined : `</${node.name}>`
	var list = Object.entries(node.attr).map(([prop, val]) => {
		if (!isDefined(val)) {
			return ""
		}

		if (typeof val == "boolean") {
			return val ? prop : ""
		}
		var v: string = Array.isArray(val) ? val.join(" ") : "" + val

		if (/[\s?"'<=>`]/.test(v)) {
			v = `"${v}"`
		}
		return `${prop}=${v}`
	}).join(" ")
	if (list) {
		list = ` ${list} `
	}
	const open = `<${node.name}${list}>`
	return `${open}${content ?? ""}${close ?? ""}`
})

export const data = prenderdata("html")

export interface Attribute extends Attr {
	class?: string | string[],
	id?: string,
	accesskey?: string
	dir?: "ltr" | "rtr" | "auto"
	draggable?: "true" | "false" | "auto"
	lang?: string
	role?: string
	is?: string
	itemid?: URL
	itemprop?: string
	itemref?: string[]
	itemtype?: URL
	itemscope?: boolean
	property?: string
}

export default function t<T extends string = string>(name: T, attr?: Attribute, ...content: node[]) {
	return tag(name, {
		...attr,
		itemtype: attr?.itemtype?.href,
		itemid: attr?.itemtype?.href
	}, ...content)
}

export function body(attr: Attribute, ...content: node[]) {
	return t("body", attr, ...content);
}

export function head(attr: Attribute, ...content: element[]) {
	return t("head", attr, ...content);
}

export function html(attr: Attribute, ...content: node[]) {
	return t("html", attr, ...content);
}

export function a(attr: Attribute, ...content: node[]) {
	return t("a", attr, ...content);
}


export function abbr(attr: Attribute, ...content: node[]) {
	return t("abbr", attr, ...content);
}


export function address(attr: Attribute, ...content: node[]) {
	return t("address", attr, ...content);
}


export function area(attr: Attribute) {
	return t("area", attr);
}


export function article(attr: Attribute, ...content: node[]) {
	return t("article", attr, ...content);
}


export function aside(attr: Attribute, ...content: node[]) {
	return t("aside", attr, ...content);
}


export function audio(attr: Attribute, ...content: node[]) {
	return t("audio", attr, ...content);
}


export function b(attr: Attribute, ...content: node[]) {
	return t("b", attr, ...content);
}


export function base(attr: Attribute, ...content: node[]) {
	return t("base", attr, ...content);
}


export function bdi(attr: Attribute, ...content: node[]) {
	return t("bdi", attr, ...content);
}


export function bdo(attr: Attribute, ...content: node[]) {
	return t("bdo", attr, ...content);
}


export function blockquote(attr: Attribute, ...content: node[]) {
	return t("blockquote", attr, ...content);
}

export function br(attr: Attribute) {
	return t("br", attr);
}


export function button(attr: Attribute, ...content: node[]) {
	return t("button", attr, ...content);
}


export function canvas(attr: Attribute, ...content: node[]) {
	return t("canvas", attr, ...content);
}


export function caption(attr: Attribute, ...content: node[]) {
	return t("caption", attr, ...content);
}


export function cite(attr: Attribute, ...content: node[]) {
	return t("cite", attr, ...content);
}


export function code(attr: Attribute, ...content: node[]) {
	return t("code", attr, ...content);
}


export function col(attr: Attribute) {
	return t("col", attr);
}


export function colgroup(attr: Attribute, ...content: node[]) {
	return t("colgroup", attr, ...content);
}


export function hdata(attr: Attribute, ...content: node[]) {
	return t("data", attr, ...content);
}


export function datalist(attr: Attribute, ...content: node[]) {
	return t("datalist", attr, ...content);
}


export function dd(attr: Attribute, ...content: node[]) {
	return t("dd", attr, ...content);
}


export function del(attr: Attribute, ...content: node[]) {
	return t("del", attr, ...content);
}


export function details(attr: Attribute, ...content: node[]) {
	return t("details", attr, ...content);
}


export function dfn(attr: Attribute, ...content: node[]) {
	return t("dfn", attr, ...content);
}


export function dialog(attr: Attribute, ...content: node[]) {
	return t("dialog", attr, ...content);
}


export function div(attr: Attribute, ...content: node[]) {
	return t("div", attr, ...content);
}


export function dl(attr: Attribute, ...content: node[]) {
	return t("dl", attr, ...content);
}


export function dt(attr: Attribute, ...content: node[]) {
	return t("dt", attr, ...content);
}


export function em(attr: Attribute, ...content: node[]) {
	return t("em", attr, ...content);
}


export function embed(attr: Attribute) {
	return t("embed", attr);
}


export function fieldset(attr: Attribute, ...content: node[]) {
	return t("fieldset", attr, ...content);
}


export function figcaption(attr: Attribute, ...content: node[]) {
	return t("figcaption", attr, ...content);
}


export function figure(attr: Attribute, ...content: node[]) {
	return t("figure", attr, ...content);
}


export function footer(attr: Attribute, ...content: node[]) {
	return t("footer", attr, ...content);
}


export function form(attr: Attribute, ...content: node[]) {
	return t("form", attr, ...content);
}

export function header(attr: Attribute, ...content: node[]) {
	return t("header", attr, ...content);
}


export function hgroup(attr: Attribute, ...content: node[]) {
	return t("hgroup", attr, ...content);
}


export function hr(attr: Attribute) {
	return t("hr", attr);
}

export function i(attr: Attribute, ...content: node[]) {
	return t("i", attr, ...content);
}


export function iframe(attr: Attribute, ...content: node[]) {
	return t("iframe", attr, ...content);
}


export function img(attr: Attribute) {
	return t("img", attr);
}


export function input(attr: Attribute) {
	return t("input", attr);
}


export function ins(attr: Attribute, ...content: node[]) {
	return t("ins", attr, ...content);
}


export function kbd(attr: Attribute, ...content: node[]) {
	return t("kbd", attr, ...content);
}


export function label(attr: Attribute, ...content: node[]) {
	return t("label", attr, ...content);
}


export function legend(attr: Attribute, ...content: node[]) {
	return t("legend", attr, ...content);
}


export function li(attr: Attribute, ...content: node[]) {
	return t("li", attr, ...content);
}


export function link(attr: Attribute) {
	return t("link", attr);
}


export function main(attr: Attribute, ...content: node[]) {
	return t("main", attr, ...content);
}


export function map(attr: Attribute, ...content: node[]) {
	return t("map", attr, ...content);
}


export function mark(attr: Attribute, ...content: node[]) {
	return t("mark", attr, ...content);
}


export function menu(attr: Attribute, ...content: node[]) {
	return t("menu", attr, ...content);
}


export function meta(attr: Attribute) {
	return t("meta", attr);
}


export function meter(attr: Attribute, ...content: node[]) {
	return t("meter", attr, ...content);
}


export function nav(attr: Attribute, ...content: node[]) {
	return t("nav", attr, ...content);
}


export function noscript(attr: Attribute, ...content: node[]) {
	return t("noscript", attr, ...content);
}


export function object(attr: Attribute, ...content: node[]) {
	return t("object", attr, ...content);
}


export function ol(attr: Attribute, ...content: node[]) {
	return t("ol", attr, ...content);
}


export function optgroup(attr: Attribute, ...content: node[]) {
	return t("optgroup", attr, ...content);
}


export function option(attr: Attribute, ...content: node[]) {
	return t("option", attr, ...content);
}


export function output(attr: Attribute, ...content: node[]) {
	return t("output", attr, ...content);
}


export function p(attr: Attribute, ...content: node[]) {
	return t("p", attr, ...content);
}


export function picture(attr: Attribute, ...content: node[]) {
	return t("picture", attr, ...content);
}


export function pre(attr: Attribute, ...content: node[]) {
	return t("pre", attr, ...content);
}


export function progress(attr: Attribute, ...content: node[]) {
	return t("progress", attr, ...content);
}


export function q(attr: Attribute, ...content: node[]) {
	return t("q", attr, ...content);
}


export function rp(attr: Attribute, ...content: node[]) {
	return t("rp", attr, ...content);
}


export function rt(attr: Attribute, ...content: node[]) {
	return t("rt", attr, ...content);
}


export function ruby(attr: Attribute, ...content: node[]) {
	return t("ruby", attr, ...content);
}


export function s(attr: Attribute, ...content: node[]) {
	return t("s", attr, ...content);
}


export function samp(attr: Attribute, ...content: node[]) {
	return t("samp", attr, ...content);
}


export function script(attr: Attribute, ...content: node[]) {
	return t("script", attr, ...content);
}


export function section(attr: Attribute, ...content: node[]) {
	return t("section", attr, ...content);
}


export function select(attr: Attribute, ...content: node[]) {
	return t("select", attr, ...content);
}


export function slot(attr: Attribute, ...content: node[]) {
	return t("slot", attr, ...content);
}


export function small(attr: Attribute, ...content: node[]) {
	return t("small", attr, ...content);
}


export function source(attr: Attribute) {
	return t("source", attr);
}


export function span(attr: Attribute, ...content: node[]) {
	return t("span", attr, ...content);
}


export function strong(attr: Attribute, ...content: node[]) {
	return t("strong", attr, ...content);
}


export function style(attr: Attribute, ...content: node[]) {
	return t("style", attr, ...content);
}


export function sub(attr: Attribute, ...content: node[]) {
	return t("sub", attr, ...content);
}


export function summary(attr: Attribute, ...content: node[]) {
	return t("summary", attr, ...content);
}


export function sup(attr: Attribute, ...content: node[]) {
	return t("sup", attr, ...content);
}


export function table(attr: Attribute, ...content: node[]) {
	return t("table", attr, ...content);
}


export function tbody(attr: Attribute, ...content: node[]) {
	return t("tbody", attr, ...content);
}


export function td(attr: Attribute, ...content: node[]) {
	return t("td", attr, ...content);
}


export function template(attr: Attribute, ...content: node[]) {
	return t("template", attr, ...content);
}


export function textarea(attr: Attribute, ...content: node[]) {
	return t("textarea", attr, ...content);
}


export function tfoot(attr: Attribute, ...content: node[]) {
	return t("tfoot", attr, ...content);
}


export function th(attr: Attribute, ...content: node[]) {
	return t("th", attr, ...content);
}


export function thead(attr: Attribute, ...content: node[]) {
	return t("thead", attr, ...content);
}


export function time(attr: Attribute, ...content: node[]) {
	return t("time", attr, ...content);
}


export function title(attr: Attribute, ...content: node[]) {
	return t("title", attr, ...content);
}


export function tr(attr: Attribute, ...content: node[]) {
	return t("tr", attr, ...content);
}


export function track(attr: Attribute) {
	return t("track", attr);
}


export function u(attr: Attribute, ...content: node[]) {
	return t("u", attr, ...content);
}


export function ul(attr: Attribute, ...content: node[]) {
	return t("ul", attr, ...content);
}


export function hvar(attr: Attribute, ...content: node[]) {
	return t("var", attr, ...content);
}

export function video(attr: Attribute, ...content: node[]) {
	return t("video", attr, ...content);
}


export function wbr(attr: Attribute) {
	return t("wbr", attr);
}