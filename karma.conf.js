/* eslint no-process-env:0 */

'use strict';


process.env.NODE_ENV = 'test';


const path = require('path');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const loaders = [
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

const withCoverage = process.argv.indexOf('coverage') !== -1 || process.env.COVERAGE;


const jsLoaders = [
  {test: /\.js$/, loader: 'babel', include: [path.resolve('src'), path.resolve('test')]}
];
const jsLoadersWithCoverage = [
  {test: /\.js$/, loader: 'babel', include: [path.resolve('test')]},
  {test: /\.js$/, loader: 'isparta', include: [path.resolve('src')]}
];


const webpackConfig = {
  devtool: 'eval',
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: loaders.concat(withCoverage ? jsLoadersWithCoverage : jsLoaders)
  },
  stats: {
    colors: true
  }
};

const coverageDir = path.resolve(
  path.join(process.env.CIRCLE_ARTIFACTS || 'reports', 'coverage')
);


if (withCoverage) {
  rimraf.sync(coverageDir);
  mkdirp.sync(coverageDir);
}


module.exports = config => config.set({
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
