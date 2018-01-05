const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const webpackHtmlPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    app: [
      './src/main.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new cleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      ),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'list',
      minChunks: ({ resource } = {}) => (
        (resource && /List/.test(resource)) ||
        (resource && /Item/.test(resource))
      ),
    }),
    new webpackHtmlPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      favicon: path.resolve(__dirname, '../src/assets/favicon.ico'),
      filename: 'index.html'
    })
  ]
}