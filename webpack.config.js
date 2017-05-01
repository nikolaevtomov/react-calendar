var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')
var precss = require('precss')
var autoprefixer = require('autoprefixer')

var BUILD_ENV = process.env.NODE_ENV
var DEPLOYMENT_ENV = process.env.DEPLOYMENT_ENV || 'local'

var isDev = BUILD_ENV !== 'production'

module.exports = {
  // eval-source-map, cheap-source-map or cheap-module-source-map
  devtool: isDev ? 'eval' : 'cheap-module-source-map',
  context: path.join(__dirname, 'app'),

  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    path.join(__dirname, 'app', 'index.js')
  ],

  output: {
    filename: isDev ? 'bundle.js' : 'bundle.[hash].js',
    publicPath: '/',
    path: path.join(__dirname, 'dist')
  },

  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel?cacheDirectory=true',
        include: path.join(__dirname, 'app'),
        exclude: /(node_modules)/
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style!css!postcss') },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!postcss!sass') },
      { test: /\.html$/, loader: 'html' }
    ]
  },

  include: [
    path.resolve(__dirname, 'node_modules')
  ],

  postcss: function () {
    return {
      defaults: [precss, autoprefixer],
      cleaner: [autoprefixer({ browsers: ['last 2 version'] })]
    }
  },

  plugins: [
    new ExtractTextPlugin(isDev ? 'bundle.css' : 'bundle.[hash].css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      '__DEV__': JSON.stringify(isDev),
      '__DEBUG__': JSON.stringify(process.env.DEBUG),
      '__ENVIRONMENT__': JSON.stringify(BUILD_ENV),
      'process.env.NODE_ENV': JSON.stringify(BUILD_ENV),
      '__DEPLOYMENT_ENV__': JSON.stringify(DEPLOYMENT_ENV)
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false,
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false
      },
      exclude: [/\.min\.js$/gi]
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    })
  ],

  resolve: {
    modulesDirectories: ['node_modules'],
    alias: {
      root: path.resolve(__dirname, 'app'),
      static: path.resolve(__dirname, 'static')
    },
    extensions: ['', '.jsx', '.scss', '.js', '.json']
  },

  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'app')
  }

}
