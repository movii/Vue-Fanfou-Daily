const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const bundle_anaylizer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const webapck_dev_config = merge(base, {
  mode: 'development',
  devtool: '#cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new bundle_anaylizer({
      analyzerPort: 3333,
      openAnalyzer: false
    })
  ]
})

module.exports = webapck_dev_config