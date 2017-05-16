var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')

var BUILD_ENV = process.env.NODE_ENV
var DEPLOYMENT_ENV = process.env.DEPLOYMENT_ENV || 'local'
var HOST = process.env.CLIENT_HOST || '0.0.0.0'
var PORT = process.env.CLIENT_PORT || 3000

var isDev = BUILD_ENV !== 'production'

// console.log('NODE_ENV:', process.env.NODE_ENV)

module.exports = {

  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'app', 'index.js')
  ],

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
        use: isDev ? [
          { loader: 'style-loader', options: {} },
          { loader: 'css-loader', options: {} },
          { loader: 'postcss-loader', options: {} }
        ]
        : ExtractTextPlugin.extract([
          { loader: 'style-loader', options: {} },
          { loader: 'css-loader', options: {} },
          { loader: 'postcss-loader', options: {} }
        ])
      },
      {
        test: /\.scss$/,
        use: isDev ? [
          { loader: 'style-loader', options: {} },
          { loader: 'css-loader', options: {} },
          { loader: 'postcss-loader', options: {} },
          { loader: 'sass-loader', options: {} }
        ]
        : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: {} },
            { loader: 'postcss-loader', options: {} },
            { loader: 'sass-loader', options: {} }
          ]
        })
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
          options: {
            limit: 100000
          }
        }
      }
    ]
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.jsx', '.scss', '.js', '.json'],
    alias: {
      root: path.resolve(__dirname, 'app'),
      static: path.resolve(__dirname, 'static')
    }
  },

  // eval, source-map, eval-source-map, cheap-source-map or cheap-module-source-map
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

    new webpack.HotModuleReplacementPlugin(),

    new ExtractTextPlugin({
      disable: isDev,
      // filename: isDev ? 'bundle.css' : 'bundle.[hash].css',
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

    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false,
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: { comments: false },
      exclude: [/\.min\.js$/gi]
    }),

    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    })

  ]

}
