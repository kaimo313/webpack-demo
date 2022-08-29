const loaderUtils = require("loader-utils");

module.exports = function(source) {
	console.log ('loader a is executed');
    const url = loaderUtils.interpolateName(this, '[name]_[hash].[ext]', source);
    console.log("url---->", url);
    this.emitFile(url, source);
	return source;
};