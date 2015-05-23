'use strict';


require('babel-core/polyfill');
require('./utils/reset.css');
require('./utils/base.css');


const React = require('react');


const App = require('./app/App');


React.render(<App />, document.querySelector('#app'));
