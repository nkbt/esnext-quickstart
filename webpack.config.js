var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var env = process.env.NODE_ENV || 'production';


var embedFileSize = 65536;
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


var production = {
  devtool: 'source-map',
  entry: ['./src/index.js'],
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

  entry: [
    './src/index.js',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server'
  ],
  output: {filename: 'bundle.js', path: path.resolve('example')},
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
  devServer: {
    stats: {
      // Do not show list of hundreds of files included in a bundle
      chunkModules: false,
      colors: true
    }
  },
  eslint: {configFile: 'src/.eslintrc'}
};


module.exports = env === 'production' ? production : development;
