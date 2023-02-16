window.addEventListener("load", async function () {
	try {
		const navlinks : HTMLAnchorElement[] = Array.from(document.getElementsByClassName("navlinks")) as HTMLAnchorElement[]

		document.getElementById("nav-toogle")?.addEventListener("click", async () => {
			navlinks.forEach(navlink => { navlink.style.display === "hidden" ? "block" : "hidden" })
			return false
		})

		Array.from(document.getElementsByTagName("time")).forEach(time => {
			time.textContent = new Date(time.dateTime).toLocaleDateString(undefined,{dateStyle:"full"})
		})

		if ("serviceWorker" in navigator) {
			await navigator.serviceWorker.register("/sw.js", { type: "module" })
		}
	} catch (error) {
		console.error(error)
	}
})
