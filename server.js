'use strict';


var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js').development;


var server = new WebpackDevServer(webpack(config), {
  contentBase: 'src/static/',
  stats: {
    // Do not show list of hundreds of files included in a bundle
    chunkModules: false,
    colors: true
  },
  publicPath: '/assets/',
  hot: true
});


server.use('/', function (req, res) {
  return res.sendFile(path.join(__dirname, '/src/static/index.html'));
});


server.listen(3000, 'localhost', function (err) {
  return err ? console.error(err) : console.log('Listening on http://localhost:3000');
});
