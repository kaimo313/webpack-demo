// 引入断言库
const assert = require('assert');

describe('webpack.base.js test case', () => {
    const baseConfig = require('../../lib/webpack.base.js');
    console.log(baseConfig);
    // 看看entry是否正常
    it('entry', () => {
        assert.equal(baseConfig.entry.index, 'D:/MyGithub/webpack-demo/my-project/builder-webpack/test/smoke/template/src/index/index.js');
        assert.equal(baseConfig.entry.search, 'D:/MyGithub/webpack-demo/my-project/builder-webpack/test/smoke/template/src/search/index.js');
    });
});