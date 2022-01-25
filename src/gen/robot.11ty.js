module.exports = class {
    data() {
        return {
            permalink: "/robot.txt"
        };
    }

    render(data) {
        return `User-agent: * 
        Disallow: 
        Sitemap: ${new URL("/sitemap.xml",data.metadata.url)}`;
    }
};