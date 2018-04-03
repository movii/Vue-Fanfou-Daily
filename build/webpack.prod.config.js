const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnaylizer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const webpackProdConfig = merge(base, {
  mode: 'production',
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    })
  ],
  optimization: {
    minimize: true
  }
})

module.exports = webpackProdConfig