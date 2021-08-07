// 需要跑到smoke里template的目录
const path = require('path');
// 更改 Node.js 进程的当前工作目录 __dirname 为 test
process.chdir(path.join(__dirname, 'smoke/template'));

describe('builder-webpack test case', () => {
    require('./unit/webpack-base-test');
});