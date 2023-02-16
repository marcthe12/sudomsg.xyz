import hljs from "highlight.js"
import { data, Attribute, code as Code } from "./html.js"
import { c } from "./vdom.js"

interface Syntax extends Attribute {
	lang: string
}

export default function code({ lang, ...attr }: Syntax, content: string) {
	return c(
		Code,
		{
			class: attr.class ?? "hljs",
			...attr
		},
		data(hljs.highlight(content,{ language: lang }).value)
	)
}