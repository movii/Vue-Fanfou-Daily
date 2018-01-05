const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnaylizer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const webpackProdConfig = merge(base, {
  plugins: [
     new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new BundleAnaylizer({
      analyzerPort: 3333,
      openAnalyzer: false
    }),
    new ExtractTextPlugin({
      filename: 'common.[chunkhash].css',
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        'screw_ie8': true,
        'warnings': false,
        'unused': true,
        'dead_code': true,
      },
      output: {
        comments: false,
      },
      sourceMap: false
    })
  ]
})

module.exports = webpackProdConfig