const loaderUtils = require("loader-utils");
const fs = require('fs');
const path = require('path');

module.exports = function(source) {
	const { name } = loaderUtils.getOptions(this);
    console.log("raw-loader-getOptions-name->", name);
    // 不开启缓存
    this.cacheable(false);

    const json = JSON.stringify(source)
    .replace('666', '313')
    .replace(/\u2028/g, '\\u2028' ) // 为了安全起见, ES6模板字符串的问题
    .replace(/\u2029/g, '\\u2029');

    // throw new Error("Error kaimo313");
    // this.callback(new Error("Error kaimo313"), "");
    // return `export default ${json}`;
    // 可以回传多个值
    // this.callback(null, `export default ${json}`, 1, 2, 3, 4);

    // 上下文方法 async
    const callback = this.async();
    fs.readFile(path.join(__dirname, './async.txt'), 'utf-8', (err, data) => {
        if(err) {
            callback(err, '');
        }
        callback(null, data)
    });
};