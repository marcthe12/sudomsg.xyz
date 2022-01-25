module.exports = {
    extends: "eslint:recommended",
    rules: {
        semi: ["error", "always"],
        quotes: ["error", "double"]
    },
    parserOptions: {
        ecmaVersion: "latest",
    },
    env: {
        es2021: true,
        worker: true,
        browser: true,
        node: true
    }
};