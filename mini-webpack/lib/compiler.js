const { getAst, getDependencis, transform } = require("./parser.js");
const path = require('path');
const fs = require('fs');

module.exports = class Compiler {
    constructor(options) {
        const { entry, output } = options;
        this.entry = entry;
        this.output = output;
        this.modules = [];
    }
    run() {
        // 从入口文件开始构建
        const entryModule = this.buildModule(this.entry, true);
        this.modules.push(entryModule);
        // 遍历模块依赖进行构建
        this.modules.map(_module => {
            _module.dependencies.map(dependency => {
                this.modules.push(this.buildModule(dependency));
            })
        })
        // 构建完成输出文件
        this.emitFiles();
    }
    /**
     * 构建模块：用于获取文件的路径，ast，相关依赖
     * @param filename 文件路径
     * @param isEntry 是否是入口文件
     * */ 
    buildModule(filename, isEntry) {
        let ast;
        if(isEntry) {
            ast = getAst(filename);
        } else {
            // 获取文件的绝对路径：process.cwd()是指当前node命令执行时所在的文件夹目录
            let absolutePath = path.join(process.cwd(), './src', filename);
            ast = getAst(absolutePath);
        }

        return {
            filename,
            dependencies: getDependencis(ast),
            transformCode: transform(ast)
        }
    }
    // 输出文件
    emitFiles() {
        // 输出的文件路径
        const outputPath = path.join(this.output.path, this.output.filename);
        // 组装依赖的 modules
        let modules = '';
        this.modules.map(_module => {
            modules += `'${_module.filename}': function (require, module, exports) { ${_module.transformCode} },`
        })
        // 组装生成的代码 bundle
        const bundle = `
            (function(modules){
                function require(fileName) {
                    const fn = modules[fileName];
                    const module = { exports: {} };
                    fn(require, module, module.exports);
                    return module.exports;
                }
                require('${this.entry}');
            })({${modules}})
        `;
        console.log("emitFiles--->", outputPath, bundle)
        // recursive: true 参数，不管创建的目录是否存在
        fs.mkdir(this.output.path, { recursive: true }, function(err) {
            if (err) throw err;
            console.log("目录创建成功");
            // 使用 fs.writeFileSync 将数据同步写入文件
            fs.writeFileSync(outputPath, bundle, 'utf-8');
            console.log("打包完毕");
        });
    }
}