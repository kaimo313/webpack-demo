const fs = require("fs");
const path = require("path");
const { runLoaders } = require("loader-runner");

runLoaders(
    {
        resource: "./loaders/index.css",
        loaders: [
            path.resolve(__dirname, "./loaders/sprite-loader.js")
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