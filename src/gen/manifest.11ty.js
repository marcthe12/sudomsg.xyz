module.exports = class {
    data() {
        return {
            permalink: "/app.webmanifest"
        };
    }

    render(data) {
        return JSON.stringify({
            $schema: "https://json.schemastore.org/web-manifest-combined.json",
            name: data.metadata.title,
            lang: data.metadata.language,
            start_url: "/",
            id: "/",
            scope: "/",
            display: "minimal-ui",
            background_color: data.metadata.theme,
            theme_color: data.metadata.theme,
            description: data.metadata.description,
            icons: [192, 512, 1024].map(size => ({
                src: `/favicon/${size}.png`,
                type: "image/png",
                sizes: `${size}x${size}`,
                purpose: "maskable"
            }))
        });
    }
};