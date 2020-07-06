import React from 'react';
import ReactDOM from 'react-dom';
import './search.less';
import logo from './images/logo.png';
console.log(logo);
import '../../common/index.js';
import { kaimo666 } from './tree-shaking.js';

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
    return <div className="search-text">
      { kaimo }
      凯小默的博客666
      { Text ? <Text /> : null }
      <img src={ logo } onClick={ this.loadComponent.bind(this) } />
    </div>
  }
}

ReactDOM.render(
  <Search/>,
  document.getElementById('root')
)