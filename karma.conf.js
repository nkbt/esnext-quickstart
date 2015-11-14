'use strict';


var path = require('path');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');

var loaders = [
  {test: /\.css$/, loader: 'null'},
  {test: /\.mp4$/, loader: 'null'},
  {test: /\.svg$/, loader: 'null'},
  {test: /\.png$/, loader: 'null'},
  {test: /\.jpg$/, loader: 'null'},
  {test: /\.gif$/, loader: 'null'},
  {test: /\.(otf|eot|ttf|woff|woff2)/, loader: 'null'},

  // Loader for JSON, used in some tests
  {test: /\.json$/, loader: 'json'}
];

var withCoverage = process.argv.indexOf('coverage') !== -1 || process.env.COVERAGE;

var babelLoader = 'babel?' +
  JSON.stringify({
    presets: ['es2015', 'react'],
    plugins: ['transform-es2015-modules-commonjs', 'transform-object-rest-spread']
  });

var webpackConfig = {
  devtool: 'eval',
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: loaders.concat(withCoverage ?
      [
        {test: /\.js$/, loader: babelLoader, include: [path.resolve('test')]},
        {test: /\.js$/, loader: 'isparta', include: [path.resolve('src')]}
      ] :
      [
        {
          test: /\.js$/, loader: babelLoader, include: [path.resolve('src'), path.resolve('test')]
        }
      ])
  },
  stats: {
    colors: true
  }
};

var coverageDir = path.resolve(
  path.join(process.env.CIRCLE_ARTIFACTS || 'reports', 'coverage')
);


if (withCoverage) {
  rimraf.sync(coverageDir);
  mkdirp.sync(coverageDir);
}


module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/babel-polyfill/browser.js',
      'test/index.js'
    ],
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: {
        chunkModules: false,
        colors: true
      }
    },
    exclude: [],
    preprocessors: {
      'test/index.js': ['webpack']
    },
    reporters: ['progress'],
    junitReporter: {
      outputDir: path.resolve(process.env.CIRCLE_TEST_REPORTS || 'reports'),
      suite: ''
    },
    coverageReporter: {
      dir: coverageDir,
      subdir: '.',
      reporters: [
        {type: 'html'},
        {type: 'lcovonly'},
        {type: 'text'},
        {type: 'text-summary', file: 'text-summary.txt'}
      ]
    },
    captureTimeout: 90000,
    browserNoActivityTimeout: 60000,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
