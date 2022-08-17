const React = require('react');
// 引入大加法
const kaimoLargeNumber = require('kaimo-large-number');
// 图片
const logo = require('./images/logo.png');
console.log(logo);
// 样式
const s = require('./search.less');
console.log(s);


class Search extends React.Component {

  constructor() {
    super(...arguments);

    this.state = {
      Text: null
    }
  }

  loadComponent() {
    // 动态加在text.js，返回一个promise
    import('./text.js').then((Text) => {
      console.log(Text);
      this.setState({
        Text: Text.default
      });
    })
  }

  render() {
    const { Text } = this.state;
    const kaimoLarge = kaimoLargeNumber('777', '666');
    return <div className="search-text">
      凯小默的博客666
      { Text ? <Text /> : null }
      大加法操作'777'+'666'：{ kaimoLarge }
      <img src={ logo.default } onClick={ this.loadComponent.bind(this) } />
    </div>
  }
}

module.exports = <Search />;