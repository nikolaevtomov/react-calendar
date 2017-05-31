const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const BUILD_ENV = process.env.NODE_ENV
const DEPLOYMENT_ENV = process.env.DEPLOYMENT_ENV || 'local'
const HOST = process.env.CLIENT_HOST || '0.0.0.0'
const PORT = process.env.CLIENT_PORT || 3000

const isDev = BUILD_ENV !== 'production'

// console.log('BUILD_ENV', BUILD_ENV)

module.exports = {

  entry: [
    'babel-polyfill'
  ].concat(isDev ? [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'app', 'index.js')
  ] : [
    path.join(__dirname, 'app', 'index.js')
  ]),

  output: {
    path: path.join(__dirname, 'dist'),
    filename: isDev ? 'bundle.js' : 'bundle.[hash].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /.js?$/,
        include: path.join(__dirname, 'app'),
        exclude: /(node_modules)/,
        // use: ['babel-loader'],
        use: ['babel-loader?cacheDirectory=true']
      },
      {
        test: /\.css$/,
        use: isDev
        ? [ 'style-loader', 'css-loader', 'postcss-loader' ]
        : ExtractTextPlugin.extract([
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { minimize: true } },
          { loader: 'postcss-loader' }
        ]),
        exclude: /(node_modules)/
      },
      {
        test: /\.scss$/,
        use: isDev
        ? [ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ]
        : ExtractTextPlugin.extract({ use: [ 'css-loader', 'postcss-loader', 'sass-loader' ] }),
        exclude: /(node_modules)/
      },
      { test: /\.html$/, use: ['html-loader'] },
      {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: { limit: 100000 }
        }
      }
    ]
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.jsx', '.scss', '.js', '.json'],
    alias: {
      root: path.resolve(__dirname, 'app'),
      fonts: path.resolve(__dirname, 'app/static/fonts'),
      images: path.resolve(__dirname, 'app/static/images')
    }
  },

  devtool: isDev ? 'cheap-source-map' : 'cheap-module-source-map',

  context: path.join(__dirname, 'app'),

  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'app'),
    host: HOST,
    port: PORT
  },

  plugins: [

    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app', 'index.html')
    }),

    new webpack.HotModuleReplacementPlugin(),

    new ExtractTextPlugin({
      disable: isDev,
      filename: 'bundle.[hash].css',
      allChunks: true
    }),

    new webpack.DefinePlugin({
      '__DEV__': JSON.stringify(isDev),
      '__DEBUG__': JSON.stringify(process.env.DEBUG),
      '__ENVIRONMENT__': JSON.stringify(BUILD_ENV),
      'process.env.NODE_ENV': JSON.stringify(BUILD_ENV),
      '__DEPLOYMENT_ENV__': JSON.stringify(DEPLOYMENT_ENV)
    }),

    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/) // eslint-disable-line

  ].concat(isDev ? [] : [

    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        toplevel: true,
        sort: true,
        eval: true,
        properties: true
      },
      compress: {
        warnings: false,
        properties: true,
        sequences: true,
        dead_code: true,
        conditionals: true,
        comparisons: true,
        evaluate: true,
        booleans: true,
        unused: true,
        loops: true,
        hoist_funs: true,
        cascade: true,
        if_return: true,
        join_vars: true,
        drop_console: true,
        drop_debugger: true,
        unsafe: true,
        hoist_vars: true,
        negate_iife: true,
        screw_ie8: true
      },
      output: { comments: false },
      exclude: [/\.min\.js$/gi]
    }),

    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } }
    }),

    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    })
  ])

}
