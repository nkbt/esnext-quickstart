'use strict';


const path = require('path');
const webpack = require('webpack');
const assign = require('lodash/object/assign');
const embedFileSize = 65536;

const config = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.optimize.DedupePlugin()
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css?sourceMap'},
      {test: /\.json$/, loader: 'json'},
      {test: /\.mp4/, loader: 'url?limit=' + embedFileSize + '&mimetype=video/mp4'},
      {test: /\.svg/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/svg+xml'},
      {test: /\.png$/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/png'},
      {test: /\.jpg/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/jpeg'},
      {test: /\.gif/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/gif'},
      {
        test: /\.(otf|eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=' + embedFileSize
      }
    ],
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: [new RegExp(path.join(__dirname, 'src'))]
      }
    ]
  },
  node: {
    __filename: true
  },
  stats: {
    colors: true
  },
  eslint: {
    configFile: 'src/.eslintrc'
  }
};

const production = assign({}, config, {
  plugins: config.plugins.concat(new webpack.NoErrorsPlugin()),
  module: assign({}, config.module, {
    loaders: config.module.loaders.concat({
      test: /\.js$/,
      loaders: ['babel'],
      include: [path.join(__dirname, 'src')]
    })
  }),
  eslint: assign({}, config.eslint, {emitError: true})
});

const development = assign({}, config, {
  entry: config.entry.concat([
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server'
  ]),
  plugins: config.plugins.concat(new webpack.HotModuleReplacementPlugin()),
  module: assign({}, config.module, {
    loaders: config.module.loaders.concat({
      test: /\.js$/,
      loaders: ['babel', 'react-hot'],
      include: [path.join(__dirname, 'src')]
    })
  }),

  devtool: 'eval'

});


const hasCoverage = global.process.argv
  .reduce((result, arg) => arg.indexOf('coverage') !== -1 || result, false);


const karma = assign({}, config, {
  module: assign({}, config.module, {
    loaders: config.module.loaders.concat({
      test: /\.js$/,
      loaders: ['babel'],
      include: [path.join(__dirname, 'src'), path.join(__dirname, 'spec')]
    })
  }, hasCoverage ? {
    postLoaders: [{
      test: /ui\/src\/.*\.js$/,
      loader: 'istanbul-instrumenter'
    }]
  } : {}),

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react/addons',
      TestUtils: 'react/lib/ReactTestUtils'
    })
  ],

  cache: true,
  debug: true,

  devtool: 'eval'
});

module.exports = production;
module.exports.development = development;
module.exports.karma = karma;
