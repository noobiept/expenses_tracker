module.exports = {
    root: true,
    env: {
        node: true,
    },
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "prettier",
        "prettier/@typescript-eslint",
    ],
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
    },
};
