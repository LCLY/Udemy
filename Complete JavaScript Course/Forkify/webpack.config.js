const path = require("path"); //absolute path
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    // entry point is where webpack start bundling
    entry: "./src/js/index.js",
    // where to save our bundle file
    output: {
        path: path.resolve(__dirname, "dist"), //__dirname is current absolute path
        // so we are joining the absolute path with the dir we want which is dist
        filename: "js/bundle.js",
    },
    // mode: "development", //there will be optimization if its production mode, minifying and tree shaking
    devServer: {
        contentBase: "./dist",
    },
    // It allows us to do complex processing of our input files and in this case its the index.html file
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
        }),
    ],
};
