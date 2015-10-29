var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var env = process.env.NODE_ENV || 'production';


var embedFileSize = 65536;
var assetsLoaders = [
  {
    test: /\.css$/,
    loader: 'style!css?modules&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]'
  },
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

var entry = [
  './src/reset.css',
  './src/normalize.css',
  './src/index.js'
];

var production = {
  devtool: 'source-map',
  entry: entry,
  output: {filename: 'bundle.js', path: path.resolve('example')},
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"' + env + '"'
      }
    })
  ],

  module: {
    loaders: assetsLoaders.concat([
      {test: /\.js$/, loader: 'babel', include: [path.resolve('src')]}
    ])
  },
  resolve: {extensions: ['', '.js']},
  stats: {colors: true}
};


var development = {
  devtool: 'eval',

  entry: entry.concat([
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server'
  ]),
  output: {filename: 'bundle.js', path: path.resolve('./example')},
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"' + env + '"'
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: assetsLoaders.concat([
      {test: /\.js$/, loaders: ['react-hot', 'babel'], include: [path.resolve('src')]}
    ]),
    preLoaders: [
      {test: /\.js$/, loaders: ['eslint'], include: [path.resolve('src')]}
    ]
  },
  resolve: {extensions: ['', '.js']},
  stats: {colors: true},
  eslint: {configFile: 'src/.eslintrc'},
  devServer: {
    hot: true,
    historyApiFallback: true,
    stats: {
      // Do not show list of hundreds of files included in a bundle
      chunkModules: false,
      colors: true
    }
  }
};


// For compatibility with Node 0.10
require('babel-core/polyfill');


module.exports = env === 'production' ? production : development;
