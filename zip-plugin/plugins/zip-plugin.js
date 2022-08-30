const JSzip = require('jszip');
const zip = new JSzip();
const path = require('path');
const RawSource = require('webpack-sources').RawSource;

class ZipPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        // emit 是异步的，这里需要使用 tapAsync
        compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
            // 创建一个目录，读取传参 filename
            const folder = zip.folder(this.options.filename);

            for (let filename in compilation.assets) {
                // 打印的是 RawSource
                console.log(compilation.assets[filename]);
                const source = compilation.assets[filename].source();
                console.log('source---->', source);
                // 把内容添加到 folder
                folder.file(filename, source);
            }
            // 生成 zip
            zip.generateAsync({
                type: 'nodebuffer'
            }).then(content => {
                console.log('content---->', content);
                // 将内容挂载到assets上面去
                console.log('compilation.options--->', compilation.options);
                // 绝对路径
                const outputPath = path.join(
                    compilation.options.output.path,
                    this.options.filename + '.zip'
                )
                console.log("绝对路径--->", outputPath);
                // 相对路径
                const outputRelativePath = path.relative(
                    compilation.options.output.path,
                    outputPath
                );
                console.log("相对路径--->", outputRelativePath);
                // 将内容挂载到assets上面去 使用 RawSource 将 buffer 转为 source
                compilation.assets[outputRelativePath] = new RawSource(content);
                // 执行 callback
                callback();
            })
        })
    }
}
module.exports = ZipPlugin;