const fs = require('fs');
const babylon = require('babylon');
const { default: traverse } = require('babel-traverse');
const { transformFromAst } = require('babel-core');

module.exports = {
    // 获取文件的 ast
    getAst: path => {
        // 同步读取文件
        console.log("getAst----path>", path)
        const content = fs.readFileSync(path, 'utf-8');
        console.log("getAst---->", content)
        // 分析AST，从中得到 import 的模块信息（路径）
        return babylon.parse(content, {
            sourceType: 'module'
        })
    },
    // 获取文件的依赖
    getDependencis: ast => {
        const dependencies = [];
        traverse(ast, {
            // ImportDeclaration 方法：当遍历到 import 时的一个回调
            ImportDeclaration: ({ node }) => {
                // 将依赖 push 到 dependencies 中
                dependencies.push(node.source.value);
            }
        });
        return dependencies;
    },
    transform: ast => {
        // es6 转化为 es5
        const { code } = transformFromAst(ast, null, {
            presets: ['env']
        });
        return code;
    }
}