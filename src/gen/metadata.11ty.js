module.exports = class {
    data() {
        return {
            permalink: "/assets/metadata.js"
        };
    }

    render() {
        const obj = JSON.stringify({
            version: new Date().toISOString()
        });
        return `const obj = '${obj}'
        export default () => JSON.parse(obj);`;
    }
};