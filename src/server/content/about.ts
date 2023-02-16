import Page from "../template/Page.js"
import metadata from "../metadata.js"
import { c } from "../template/vdom.js"
import h from "../template/header.js"
import schema from "../utils/schema.js"
import { img, picture, source, div, p, span, ul, li, a } from "../template/html.js"

Page({
	title: "About Me",
	url: "/about",
	content() {
		return c(div, { itemscope: true, itemtype: schema("Person") },
			c(h, { level: 2, itemprop: "name" }, metadata.author.name),
			c(picture, { class: "side" },
				c(source, { srcset: [128, 256, 512].map(width => `${metadata.author.image}?format=png&width=${width} ${width}w`).join(", ") }),
				c(img, { itemprop: "image", alt: "A Photo of me", src: metadata.author.image })
			),
			c(p, { itemprop: "description" }, "I am an analytical and passionate third year ",
				c(span, { itemprop: "affiliation", itemtype: schema("CollegeOrUniversity"), itemscope: true }, c(span, { itemprop: "name" }, "CHRIST University")),
				" ", c(span, {}, "student"), ` pursuing B. Tech in Computer Engineering in Bengaluru. I am eager to further my knowledge, develop my skills ",
				"and gain experience to convert my interest in computers into a fulfilling career.`),
			c(p, {}, "Contact Details"),
			c(ul, {},
				c(li, {}, c(a, { href: `mailto:${metadata.author.email}`, itemprop: "email" }, "Email")),
				c(li, {}, c(a, { href: "https://github.com/marcthe12", itemprop: "sameas" }, "Github")),
				c(li, {}, c(a, { href: "https://www.linkedin.com/in/marc-pervaz-boocha-200706236/", itemprop: "sameas" }, "LinkedIn")),
			),
		)
	}
}).setupRoute()


