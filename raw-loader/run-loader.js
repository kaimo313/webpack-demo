const fs = require("fs");
const path = require("path");
const { runLoaders } = require("loader-runner");

runLoaders(
    {
        resource: "./src/kaimo.txt",
        loaders: [
            {
                loader: path.resolve(__dirname, "./src/raw-loader.js"),
                options: {
                    name: "kaimo313"
                }
            }
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