import isDefined from "../utils/isDefined.js"
import tag, { render, prenderdata, node, element, Attribute as Attr } from "./vdom.js"

type encoding = "UTF-8" | "UTF-16" | "ISO-10646-UCS-2" | "ISO-10646-UCS-4" | "ISO-8859-1" | "ISO-8859-2" | "ISO-8859-3" | "ISO-8859-4" |
	"ISO-8859-5" | "ISO-8859-6" | "ISO-8859-7" | "ISO-8859-8" | "ISO-8859-9" | "ISO-2022-JP" | "Shift_JIS" | "EUC-JP"

interface xmlDeclaration {
	version?: "1.0",
	encoding?: encoding
	standalone?: boolean
}

export function doctype(options: xmlDeclaration, content: node): string {
	const version = `version=${options.version ?? `"1.0"`} `
	const encoding = isDefined(options.encoding) ? `encoding="${options.encoding}" ` : ""
	const standalone = isDefined(options.standalone) ? `standalone="${options.standalone ? "yes" : "no"}" ` : ""
	return `<?xml ${version}${encoding}${standalone}?>${xmlrender(content).content}`
}

export const xmlrender = render("xml", function (node: element, content: string) {
	var list = Object.entries(node.attr).map(([prop, val]): string => {
		if (!isDefined(val)) {
			return ""
		}
		var v: string = Array.isArray(val) ? val.join(" ") : "" + val
		return `${prop}="${v}"`
	}).join(" ")
	if (list) {
		list = ` ${list} `
	}
	const open = `<${node.name}${list}>`
	const close = `</${node.name}>`
	if (content || !close) {
		return `${open}${content || ""}${close}`
	} else {
		return `<${node.name}${list}/>`
	}
})

export const xmldata = prenderdata("xml")

export interface Attribute extends Attr {
	xmlns?: URL
}

export interface Base extends Attribute {
	["xml:base"]?: string
}

export interface Lang extends Attribute {
	["xml:lang"]?: string
}

export default function t<T extends string = string>(name: T, attr?: Attribute, ...content: node[]) {
	return tag(name, { ...attr, xmlns: attr?.xmlns?.href }, ...content)
}
