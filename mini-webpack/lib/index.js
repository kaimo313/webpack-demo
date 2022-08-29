// 编译模块
const Compiler = require('./compiler.js');
// 获取配置
const options = require('../minipack.config.js');
// 实例化 compiler
new Compiler(options).run();