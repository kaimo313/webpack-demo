const fs = require("fs");
const path = require("path");
const { runLoaders } = require("loader-runner");

runLoaders(
    {
        resource: "./src/kaimo.txt",
        loaders: [
            path.resolve(__dirname, "./src/raw-loader.js")
        ],
        context: {
            minimize: true
        },
        readResource: fs.readFile.bind(fs),
    },
    (err, result) => {
        err ? console.error(err) : console.log(result)
    }
);