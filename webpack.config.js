const path = require('path')
const webpack = require('webpack')

// clean-webpack-plugin
const cwp = require('clean-webpack-plugin');
const clean_webpack = new cwp(['public/dist'], {
    root: __dirname,
    verbose: false,
    dry: false
})

// extract-text-webpack-plugin
const etwp= require('extract-text-webpack-plugin')
const extract_scss = new etwp('common.css')

// BundleAnalyzerPlugin
const wba = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const bundle_analyzer = new wba({
  analyzerPort: 3333,
  openAnalyzer: false
})

// CommonsChunkPlugin
const common_chucks_vendor = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  minChunks: (module) => (
    module &&
    /node_modules/.test(module.context) &&
    !/\.css$/.test(module.request)
  )
})

// define 'production' mode for vue
const prod_mode = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
})

// Uglify JavaScript Plugin
const uglify_js = new webpack.optimize.UglifyJsPlugin({
  sourceMap: true,
  compress: { warnings: false }
})

// webpack.LoaderOptionsPlugin for minimize static files in 'production' mode
const loader_options = new webpack.LoaderOptionsPlugin({
  minimize: true
})

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    app: [
      './public/src/main.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: isProd,
          preserveWhitespace: false
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  plugins: [
    clean_webpack,
    common_chucks_vendor,
    bundle_analyzer
  ].concat(
    isProd 
    ? [
      prod_mode,
      extract_scss,
      uglify_js,
      loader_options
    ] 
    : []
  )
}
