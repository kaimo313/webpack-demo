class MyPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        console.log('my plugin options---->', this.options);
    }
}
module.exports = MyPlugin;