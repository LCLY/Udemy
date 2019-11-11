const path = require("path"); //absolute path
module.exports = {
    // entry point is where webpack start bundling
    entry: "./src/js/index.js",
    // where to save our bundle file
    output: {
        path: path.resolve(__dirname, "dist/js"), //__dirname is current absolute path
        // so we are joining the absolute path with the dir we want which is dist/js
        filename: "bundle.js",
    },
    mode: "development", //there will be optimization if its production mode, minifying and tree shaking
};
