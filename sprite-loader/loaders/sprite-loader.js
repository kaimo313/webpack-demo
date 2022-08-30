const Spritesmith = require('spritesmith');
const fs = require('fs');
const path = require('path');

module.exports = function(source) {
    const callback = this.async();
    console.log("source---->", source)
    // 配置所有需要合图的
    const imgs = source.match(/url\((\S*)\?__sprite/g);
    console.log("imgs-->", imgs)
    const sprites = [];

    // 遍历生成需要合图的图片路径
    for(let i = 0; i < imgs.length; i++) {
        const img = imgs[i].match(/url\((\S*)\?__sprite/)[1];
        console.log('img---->', img)
        sprites.push(path.join(__dirname, img));
    }
    console.log("sprites---->", sprites)

    // 生成精灵表
    Spritesmith.run({
        src: sprites
    }, function handleResult(err, result) {
        // 如果有错误，抛出它
        if (err) {
            throw err;
        }
        console.log("result---->", result)
        // 输出图片到 dist 文件夹
        fs.mkdir(path.join(process.cwd() + '/dist'), { recursive: true }, function(err) {
            if (err) throw err;
            console.log("目录创建成功");
            // 使用 fs.writeFileSync 将数据同步写入文件
            fs.writeFileSync(path.join(process.cwd(), 'dist/sprite.jpg'), result.image);
            console.log("图片输出完毕");
            // 然后替换 css 里的图片路径为雪碧图的路径
            source = source.replace(/url\((\S*)\?__sprite/g, (match) => {
                return `url("dist/sprite.jpg"`;
            })
            callback(null, source);
            fs.writeFileSync(path.join(process.cwd(), 'dist/index.css'), source);
            console.log("样式替换完毕");
        });
    });
}
