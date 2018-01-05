const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const loadersOptions = [
  'css-loader',
  'sass-loader',
  {
    loader: 'sass-resources-loader',
    options: {
      resources: [
        path.resolve(__dirname, '../src/style/mixin/flexbox.scss')
      ]
    }
  }
]

module.exports = {
  extractCSS: isProd,
  preserveWhitespace: false,
  loaders: {
    scss: isProd
      ?  ExtractTextPlugin.extract({
        use: loadersOptions,
        fallback: 'vue-style-loader'
      })
      : ['vue-style-loader'].concat(loadersOptions)
  }
}