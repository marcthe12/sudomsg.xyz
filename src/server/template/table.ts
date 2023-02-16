import { c, node } from "./vdom.js";
import { Attribute, caption, table as Table, td, th, thead, tr } from "./html.js";

interface TableAttr extends Attribute {
	header: boolean;
	data: node[][];
	caption?: string;
}

export default function table({ header, data, caption: captio, ...attr }: TableAttr) {
	const capt = captio ? c(caption, {}, captio) : undefined;
	if (header) {
		const [head, ...tbldata] = data;
		return c(Table, attr,
			...tbldata.map(
				row => c(tr, {}, ...row.map(
					key => c(td, {}, key ?? "")
				))
			),
			c(thead, {}, c(tr, {}, ...(head ?? []).map(e => c(th, {}, e ?? "")))),
			...(capt ? [capt] : [])
		);
	} else {
		return c(Table, attr, ...data.map(
			row => c(tr, {}, ...row.map(
				key => c(td, {}, key ?? "")
			))
		),
			...(capt ? [capt] : [])
		);
	}
}
