/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
    entry: "./source/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    devServer: {
        host: "localhost",
        port: 8000,
        historyApiFallback: {
            index: "index.html",
        },
    },
};
