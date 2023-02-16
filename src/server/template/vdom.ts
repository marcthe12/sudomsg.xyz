export type component<
	T extends Attribute = Attribute,
	U extends node[] = node[],
	R extends node = node
> = ((attr: T, ...content: U) => R)

export interface Attribute {
	[key: string]: unknown,
}

export interface element<T extends string = string> {
	name: T,
	attr: Attribute,
	content: node[],
}

export function iselement<T extends string = string>(e: unknown): e is element<T> {
	return typeof e === "object" && e !== null && "name" in e;
}

export interface typed_data<T extends string = string> {
	content: string,
	type: T
}

export function istyped<T extends string = string>(e: unknown): e is typed_data<T> {
	return typeof e === "object" && e !== null && "type" in e;
}

export type node = element | typed_data | node[] | string

export function c<
	T extends Attribute = Attribute,
	U extends node[] = node[],
	R extends node = node
>(name: component<T, U, R>, attr: T, ...content: U): R {
	return name(attr, ...content)
}

export default function t<T extends string = string>(name: T, attr?: Attribute, ...content: node[]): element<T> {
	return {
		name,
		attr: attr ?? ({} as Attribute),
		content
	}
}

export function frag<T extends node[] = node[]>(_attr: Attribute, ...content: T) {
	return content
}

export function join({sep = ""}: Attribute & {sep?: string}, ...content: string[]) {
	return content.join(sep)
}

export function prenderdata<T extends string = string>(type: T) {
	return function (content: string): typed_data<T> {
		return {
			content,
			type
		}
	}
}

export function render<T extends string = string>(type: T, rendFunc: (node: element, content: string) => string) {
	const data = prenderdata(type)
	return function rend(Node: node): typed_data<T> {
		if (Array.isArray(Node)) {
			return data(Node.map(element => rend(element).content ?? "").join(""))
		}

		if (typeof Node == "string") {
			return data(Node)
		}

		if (iselement(Node)) {
			return data(rendFunc(Node, rend(Node.content).content))
		}

		if (istyped<T>(Node)) {
			if (Node.type == type) {
				return Node
			} else {
				throw new Error(Node.type + "is not valid. The type must be:" + type)
			}
		}
		throw new TypeError("" + Node)
	}
}

export function getText(node: node): string {
	if (Array.isArray(node)) {
		return node.map(element => getText(element) ?? "").join("")
	}

	if (typeof node == "string") {
		return node
	}

	if (iselement(node)) {
		return getText(node.content)
	}

	throw new TypeError("" + node)
}
