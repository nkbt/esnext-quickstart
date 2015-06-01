'use strict';


var path = require('path');
var webpack = require('webpack');
var embedFileSize = 65536;


var output = {
  path: path.join(__dirname, 'public', 'assets'),
  filename: 'bundle.js',
  publicPath: '/assets/'
};


var assetsLoaders = [
  {test: /\.css$/, loader: 'style!css?sourceMap'},
  {test: /\.json$/, loader: 'json'},
  {test: /\.mp4$/, loader: 'url?limit=' + embedFileSize + '&mimetype=video/mp4'},
  {test: /\.svg$/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/svg+xml'},
  {test: /\.png$/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/png'},
  {test: /\.jpg$/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/jpeg'},
  {test: /\.gif$/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/gif'},
  {
    test: /\.(otf|eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url?limit=' + embedFileSize
  }
];


var eslintLoader = {
  test: /\.js$/,
  loaders: ['eslint'],
  include: [new RegExp(path.join(__dirname, 'src'))]
};


var production = {
  devtool: 'eval',

  entry: [
    './src/index'
  ],
  output: output,

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [].concat(
      assetsLoaders,
      {test: /\.js$/, loaders: ['babel'], include: [path.join(__dirname, 'src')]}
    ),
    preLoaders: [].concat(eslintLoader)
  },

  resolve: {
    extensions: ['', '.js']
  },

  stats: {
    colors: true
  },

  eslint: {
    configFile: 'src/.eslintrc',
    // Treat all warnings as errors too
    emitError: true
  }
};


var development = {
  devtool: 'eval',

  entry: [
    './src/index',
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server'
  ],
  output: output,

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    loaders: [].concat(
      assetsLoaders,
      {test: /\.js$/, loaders: ['babel', 'react-hot'], include: [path.join(__dirname, 'src')]}
    ),
    preLoaders: [].concat(eslintLoader)
  },

  resolve: {
    extensions: ['', '.js']
  },

  stats: {
    colors: true
  },

  eslint: {
    configFile: 'src/.eslintrc'
  }
};


module.exports = production;
module.exports.development = development;
