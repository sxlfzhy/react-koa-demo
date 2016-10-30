const webpack = require('webpack')
const ENV = process.env.NODE_ENV || 'development'
const HtmlwebpackPlugin = require('html-webpack-plugin')

const OpenBrowserPlugin = require('open-browser-webpack-plugin')

const sourcePath = './static/src/'
const buildPath = './static/dist/'

const proxys = {
  '/mis_test/': {
    target: 'http://mis_test.xuebadev.com/',
    changeOrigin: true,
    host: 'mis_test.xuebadev.com',
    secure: false
  }
}

const debugList = [
  'question_bank',
  'teacher',
  'account',
  'validate',
  'manageCourse',
  'courseware',
  'homework',
  'teacherPc',
  'config',
  'student'
]

debugList.forEach((item) => {
  proxys[`/${item}/`] = {
    target: 'http://teacher-qa.xuebadev.com/',
    changeOrigin: true,
    host: 'teacher-qa.xuebadev.com',
    secure: false
  }
})

module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    port: 8080,
    proxy: {
      '/app/': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        host: 'localhost:8000',
        secure: false
      }
    }
  },
  entry: {
    bundle: sourcePath + 'entry/index.jsx'
  },
  output: {
    path: buildPath,
    filename: ENV === 'production' ? '[name].[hash:8].js' : '[name].js',
    chunkFilename: ENV === 'production' ? '[id].[chunkhash:8].js' : '[id].js'
  },
  watch: true,
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
      title: '学霸君中后台框架React实现',
      template: sourcePath + 'page.ejs',
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.DefinePlugin({
      _DEV_: ENV !== 'production',
      _DEBUG_: ENV === 'debug'
    })
  ].concat(
    ENV === 'production' ? [
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.CommonsChunkPlugin('common.js')
    ] : [
      new webpack.HotModuleReplacementPlugin(),
      new OpenBrowserPlugin({
        url: 'http://localhost:8080'
      })
    ]
  )
}
