'use strict';


require('babel-core/polyfill');
require('./static/reset.css');
require('./static/base.css');


const React = require('react');


const App = require('./app/App');


React.render(<App />, document.querySelector('#app'));
