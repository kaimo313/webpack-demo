const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

// 设置超时时间
const mocha = new Mocha({
    timeout: '10000ms'
});

// 进入到 template 项目里
process.chdir(path.join(__dirname, 'template'));

// 构建之前需要删掉 dist 目录
rimraf('./dist', () => {
    // 找到打包的配置
    const prodConfig = require('../../lib/webpack.prod.js');
    // 通过 webpack 运行构建
    webpack(prodConfig, (err, stats) => {
        // 错误的情况
        if (err) {
            console.error(err);
            process.exit(2);
        }
        // 成功打印
        console.log(stats.toString({
            colors: true,
            modules: false, // 不显示
            children: false
        }));
        // 开始执行测试用例
        console.log('Webpack build success, begin run test.');
        // 添加测试用例
        mocha.addFile(path.join(__dirname, 'html-test.js'));
        mocha.addFile(path.join(__dirname, 'css-js-test.js'));
        // 运行
        mocha.run();
    });
});