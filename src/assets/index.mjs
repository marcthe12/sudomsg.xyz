const main = async () => {
    window.addEventListener('load', async () => {
        if ('serviceWorker' in navigator) {
            try {
                var sw = await navigator.serviceWorker.register('/sw.js')
            } catch {
                console.log("Service Worker failed to register")
            }
        }
    })
}

main()
