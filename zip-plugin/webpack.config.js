const path = require('path');
const ZipPlugin = require('./plugins/zip-plugin.js');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js'
    },
    mode: 'production',
    plugins: [
        new ZipPlugin({
            name: 'zip plugin kaimo313',
            filename: 'kaimoZip'
        })
    ]
}