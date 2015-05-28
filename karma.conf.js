'use strict';


module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/react-jasmine-matchers/lib/index.js',
      'spec/index.js'
    ],
    webpack: require('./webpack.config').karma,
    exclude: [
    ],
    preprocessors: {
      'node_modules/react-jasmine-matchers/lib/index.js': ['webpack'],
      'spec/**/*.js': ['webpack'],
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
