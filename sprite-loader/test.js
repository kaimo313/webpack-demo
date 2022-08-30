const Spritesmith = require('spritesmith');
const fs = require('fs');
const path = require('path');

const sprites = [
    './src/img/kaimo-001.png',
    './src/img/kaimo-002.jpg',
    './src/img/kaimo-003.png'
];

// 生成精灵表
Spritesmith.run({
    src: sprites
}, function handleResult(err, result) {
    // 如果有错误，抛出它
    if (err) {
        throw err;
    }
    console.log("result---->", result)
    // 输出图片
    fs.mkdir('./dist', { recursive: true }, function(err) {
        if (err) throw err;
        console.log("目录创建成功");
        // 使用 fs.writeFileSync 将数据同步写入文件
        fs.writeFileSync(path.join(__dirname + '/dist/sprite.png'), result.image);
        console.log("输出图片完毕");
    });
});
