'use strict';

var path = require('path');
var webpack = require('webpack');

var webpackConfig = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['', '.js']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'spec')
      },
      {
        test: /\.js$/,
        loader: 'isparta',
        include: path.join(__dirname, 'src')
      }
    ],
    loaders: [
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.json$/, loader: 'json'},
      {test: /\.(mp4|svg|png|jpg|gif|otf|eot|ttf|woff|woff2)$/, loader: 'url'}
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react/addons',
      TestUtils: 'react/lib/ReactTestUtils'
    })
  ],
  stats: {
    colors: true
  }
};


module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'spec/webpack.tests.js'
    ],
    webpack: webpackConfig,
    webpackMiddleware: {
      quiet: true
    },
    exclude: [],
    preprocessors: {
      'spec/webpack.tests.js': ['webpack']
    },
    reporters: ['nyan'],
    junitReporter: {
      outputFile: '../reports/js/tests/karma.xml',
      suite: ''
    },
    coverageReporter: {
      dir: './coverage/',
      subdir: function (browser) {
        return browser.toLowerCase().split(/[ /-]/)[0];
      },
      reporters: [
        {type: 'cobertura', file: 'cobertura.xml'},
        {type: 'text', file: 'text.txt'},
        {type: 'text-summary', file: 'text-summary.txt'},
        {type: 'html'}
      ]
    },
    captureTimeout: 90000,
    browserNoActivityTimeout: 60000,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true
  });
};
