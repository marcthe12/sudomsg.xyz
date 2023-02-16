import Base, { BaseI, content } from "./Base.js"
import h from "./header.js"
import { article } from "./html.js"
import { c, node } from "./vdom.js"

export interface PageI<T extends node = node> extends BaseI<T> {
	title: string
}

export default function Page<Type extends PageI>(data: Type): ReturnType<typeof Base<Type>> {
	const arg = {
		...data,
		content() {
			var { title } = this
			return c(article, {},
				c(h, { level: 1 }, title),
				c(content, { data })
			)
		}

	}
	return Base(arg)
}