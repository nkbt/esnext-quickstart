'use strict';

let path = require('path');
let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let config = require('./webpack.config.js').development;

let server = new WebpackDevServer(webpack(config), {
  contentBase: 'src/static/',
  stats: {
    // Do not show list of hundreds of files included in a bundle
    chunkModules: false,
    colors: true
  },
  publicPath: '/assets/',
  hot: true
});

server.use('/', (req, res) => res.sendFile(path.join(__dirname, '/src/static/index.html')));

server.listen(3000, 'localhost', err =>
err ? console.error(err) : console.log('Listening on http://localhost:3000'));
