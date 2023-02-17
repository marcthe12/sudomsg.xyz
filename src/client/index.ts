window.addEventListener("load", async function () {
	try {
		const navlinks: HTMLAnchorElement[] = Array.from(document.getElementsByClassName("navlinks")) as HTMLAnchorElement[]

		document.getElementById("nav-toogle")?.addEventListener("click", async () => {
			navlinks.forEach(navlink => {
				navlink.style.display = window.matchMedia("(max-width: 30rem)").matches ? navlink.style.display === "block" ? "" : "block" : "";
			});
			return false;
		})


		if ("serviceWorker" in navigator) {
			await navigator.serviceWorker.register("/sw.js", { type: "module" })
		}
	} catch (error) {
		console.error(error)
	}
})
