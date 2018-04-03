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
    new webpackHtmlPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      favicon: path.resolve(__dirname, '../src/assets/favicon.ico'),
      filename: 'index.html'
    })
  ],
  optimization: {
    namedModules: true,
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      maxAsyncRequests: Infinity,
      maxInitialRequests: Infinity,
      name: true,
      cacheGroups: {
        default: {
          chunks: 'async',
          minSize: 30000,
          minChunks: 2,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          priority: -20,
          reuseExistingChunk: true,
        },
        
        Vue: {
          name: 'Vue',
          test: ({ resource } = {}) => resource && resource.match(/esm\.js$/),
          priority: 0,
          reuseExistingChunk: true
        },
        
        venders: {
          name: 'vendors',
          enforce: true,
          test: ({ resource }) => (
            resource &&
            resource.indexOf('node_modules') >= 0 &&
            resource.match(/\.js$/)
          ),
          priority: -10,
          reuseExistingChunk: true
        },
        
        List: {
          name: 'List',
          test: ({ resource } = {}) => (resource && /List/.test(resource)) || (resource && /Item/.test(resource)),
          priority: -5,
          reuseExistingChunk: true
        },

        LeanCloud: {
          name: 'LeanCloud',
          test: ({ resource } = {}) => resource && resource.match(/av-min\.js$/),
          priority: 0,
          reuseExistingChunk: true
        }
      }
    }
  }
}