const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: '#cheap-module-eval-source-map',
    entry: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://localhost:8080`,
        'webpack/hot/only-dev-server',
        './src/index.dev'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { 'NODE_ENV': JSON.stringify('development') }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: 'src/index.html'
        }),
        new webpack.IgnorePlugin(/^(hapi|inert|bunyan)$/)
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.json/,
            loader: 'json'
        }]
    }
};