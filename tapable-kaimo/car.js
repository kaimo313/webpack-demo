const {
    SyncHook,
    AsyncSeriesHook
} = require('tapable');

// 创建 Car 类
class Car {
    constructor() {
        this.hooks = {
            accelerate: new SyncHook(['newSpeed']), // 加速 hook
            brake: new SyncHook(), // 刹车 hook
            calculateRoutes: new AsyncSeriesHook(['source', 'target', 'routesList']) // 计算路径 hook
        }
    }
}

// 实例化 Car
const kaimoCar = new Car();

// 绑定同步钩子
kaimoCar.hooks.brake.tap('WarningLampPlugin', () => {
    console.log('WarningLampPlugin');
})

// 绑定同步钩子 并传参
kaimoCar.hooks.accelerate.tap('LoggerPlugin', newSpeed => {
    console.log(`Accelerate to ${newSpeed}`);
})

// 绑定一个异步 Promise 钩子
kaimoCar.hooks.calculateRoutes.tapPromise('calculateRoutes tapPromise', (source, target, routesList, callback) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`tapPromise to ${source} ${target} ${routesList}`);
            resolve()
        }, 1000)
    })
})

/*****************下面开始执行***************/ 

kaimoCar.hooks.brake.call();
kaimoCar.hooks.accelerate.call(313);

console.time('kaimoCar cost');

kaimoCar.hooks.calculateRoutes.promise('Async', 'hook', 'kaimo demo').then(() => {
    console.timeEnd('kaimoCar cost');
}, err => {
    console.error(err);
    console.timeEnd('kaimoCar cost');
})