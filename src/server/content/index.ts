import { c } from "../template/vdom.js"
import  code from "../template/syntax.js"
import  Page from "../template/Page.js"
import { pre } from "../template/html.js"

Page({
	title: "Welcome",
	url: "/",
	isHighlight: true,
	content() {
		return c(pre, { class: "pad", },
			"$ ", c(code, { lang: "bash" }, "sudo cat ~root/msg"),
			`
Hello World!
Welcome to my blog.
I occassion leave my writings here. Hope you will enjoy them :).
$`
		)
	}
}).setupRoute()
