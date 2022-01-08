const main = async() => {
    window.addEventListener('load', async() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
        }
    })
}

main()