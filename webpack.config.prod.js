const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        js: './src/index',
        vendor: [
            'json-loader',
            'lodash',
            'react',
            'react-bootstrap',
            'react-dom',
            'react-router',
            'react-router-redux',
            'redux',
            'redux-devtools',
            'redux-devtools-dock-monitor',
            'redux-devtools-log-monitor',
            'redux-thunk'
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'build'),
        publicPath: '/assets/'
    },
    plugins: [
        new webpack.IgnorePlugin(/^(hapi|inert|bunyan)$/),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.bundle.js'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: 'body',
            hash: true
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.json/,
            loader: 'json'
        }]
    }
};