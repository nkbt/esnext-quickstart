'use strict';


process.env.NODE_ENV = 'production';


const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const embedFileSize = 65536;
const assetsLoaders = [
  {
    test: /\.css$/,
    loader: 'style!css?modules&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]'
  },
  {test: /\.json$/, loader: 'json'},
  {test: /\.mp4$/, loader: `url?limit=${embedFileSize}&mimetype=video/mp4`},
  {test: /\.svg$/, loader: `url?limit=${embedFileSize}&mimetype=image/svg+xml`},
  {test: /\.png$/, loader: `url?limit=${embedFileSize}&mimetype=image/png`},
  {test: /\.jpg$/, loader: `url?limit=${embedFileSize}&mimetype=image/jpeg`},
  {test: /\.gif$/, loader: `url?limit=${embedFileSize}&mimetype=image/gif`},
  {
    test: /\.(otf|eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: `url?limit=${embedFileSize}`
  }
];

const entry = [
  './src/reset.css',
  './src/normalize.css',
  './src/index.js'
];


module.exports = {
  devtool: '#source-map',
  entry,
  output: {filename: 'bundle.js', path: path.resolve('example')},
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
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
