module.exports = function(source) {
    const json = JSON.stringify(source)
    .replace('666', '313')
    .replace(/\u2028/g, '\\u2028' ) // 为了安全起见, ES6模板字符串的问题
    .replace(/\u2029/g, '\\u2029');
    return `export default ${json}`;
};