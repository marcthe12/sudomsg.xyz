import slugify from "@sindresorhus/slugify"
import t, { Attribute, getText, node } from "./vdom.js"

interface head extends Attribute {
	level: 1 | 2 | 3 | 4 | 5 | 6
}

export default function ({ level, ...attr }: head, ...content: node[]) {
	return t(`h${level}`, { id: slugify(getText(content)), ...attr }, ...content)
}
