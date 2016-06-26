const webpack = require('webpack');
// const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
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
        contentBase: './static/index.html',
        port: 8080,
        proxy: [
            {
                path: "/app/*",
                target: "http://localhost:8000",
                host: "localhost"
            }
        ]
    },
    entry: {
        bundle: './static/entry/index.jsx',
    },
    output: {
        path: __dirname + '/static/',
        filename: 'bundle.js'
    },
    watch: true,
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=10192'
            }
        ]
    },
    plugins: [
        // commonsPlugin,
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({url: 'http://localhost:8080'})
    ]
};
