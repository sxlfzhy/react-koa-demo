const webpack = require('webpack')
const ENV = process.env.NODE_ENV || 'development'
const HtmlwebpackPlugin = require('html-webpack-plugin')

const sourcePath = './src/'
const buildPath = './dist/'

module.exports = {
  entry: {
    bundle: sourcePath + 'entry/index.jsx'
  },
  output: {
    path: buildPath,
    filename: '[name].[hash:8].js',
    chunkFilename: '[id].[chunkhash:8].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel!eslint'
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
      loader: 'url-loader?limit=10192'
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=application/octet-stream'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=image/svg+xml'
    }, {
      test: /\.json$/,
      loader: 'json'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  imageWebpackLoader: {
    progressive: true,
    optimizationLevel: 7,
    interlaced: false,
    pngquant: {
      quality: '65-90',
      speed: 4
    }
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: '君君辅导－老师信息平台',
      template: sourcePath + 'page.ejs',
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.DefinePlugin({
      _DEV_: ENV !== 'production',
      _DEBUG_: ENV === 'debug',
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.LimitChunkCountPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false  // remove all comments
      },
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin('common.js')
  ]
}
