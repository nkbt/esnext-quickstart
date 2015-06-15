'use strict';

var path = require('path');
var webpack = require('webpack');

var webpackConfig = {
  devtool: 'eval',

  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.json$/, loader: 'json'},
      {test: /\.(mp4|svg|png|jpg|gif|otf|eot|ttf|woff|woff2)$/, loader: 'url'},
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          auxiliaryCommentBefore: 'istanbul ignore next'
        },
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'spec')]
      }
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

var hasCoverage = global.process.argv.reduce(function (result, arg) {
  return arg.indexOf('coverage') !== -1 || result;
}, false);
if (hasCoverage) {
  webpackConfig.module.postLoaders = [{
    test: /src\/.*\.js$/,
    loader: 'istanbul-instrumenter'
  }];
}


module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'spec/index.js'
    ],
    webpack: webpackConfig,
    webpackMiddleware: {
      quiet: true
    },
    exclude: [],
    preprocessors: {
      'spec/index.js': ['webpack'],
      'src/**/*.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
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
