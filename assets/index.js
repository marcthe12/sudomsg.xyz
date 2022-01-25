document.getElementById("nav-toogle").addEventListener("click", async() => {
    const navlinks = Array.from(document.getElementsByClassName("navlinks"));
    for (const navlink of navlinks) {
        navlink.classList.toggle("navopen");
    }
    return false;
});
window.addEventListener("load", async() => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js", { type: "module" });
    }
});