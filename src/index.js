import 'babel-core/polyfill';
import './utils/reset.css';
import './utils/base.css';


import React from 'react';
import App from './app/App';


React.render(<App />, document.querySelector('#app'));
