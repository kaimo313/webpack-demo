import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
import './search.less';
import logo from './images/logo.png';
console.log(logo);
import '../../common/index.js';
import { kaimo666 } from './tree-shaking.js';
// 引入大加法
import kaimoLargeNumber from 'kaimo-large-number';


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
    const kaimo = kaimo666();
    const { Text } = this.state;
    const kaimoLarge = kaimoLargeNumber('777', '666');
    return <div className="search-text">
      { kaimo }
      凯小默的博客666
      { Text ? <Text /> : null }
      大加法操作'777'+'666'：{ kaimoLarge }
      <img src={ logo } onClick={ this.loadComponent.bind(this) } />
    </div>
  }
}

ReactDOM.render(
  <Search/>,
  document.getElementById('root')
)