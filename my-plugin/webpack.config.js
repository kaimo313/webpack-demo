const path = require('path');
const MyPlugin = require('./plugins/my-plugin.js');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js'
    },
    mode: 'production',
    plugins: [
        new MyPlugin({
            name: 'my plugin kaimo313'
        })
    ]
}