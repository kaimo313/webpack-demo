import React from 'react';
import ReactDOM from 'react-dom';
import './search.less';
import logo from './images/logo.png';
console.log(logo);
import '../../common/index.js';
import { kaimo666 } from './tree-shaking.js';

class Search extends React.Component {
  render() {
    const kaimo = kaimo666();
    return <div className="search-text">
      { kaimo }
      凯小默的博客666
      <img src={ logo } />
    </div>
  }
}

ReactDOM.render(
  <Search/>,
  document.getElementById('root')
)