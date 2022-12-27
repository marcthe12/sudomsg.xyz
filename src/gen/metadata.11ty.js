module.exports = class {
    data() {
        return {
            //permalink: "/assets/metadata.js"
            permalink: false
        };
    }

    render() {
        const date = new Date()
        return `export default = ${date.toISOString()}`
    }
};
