const path = require('path');

module.exports = {
    // 入口
    entry: path.join(__dirname, './src/index.js'),
    // 输出文件
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'kaimo.js'
    }
}