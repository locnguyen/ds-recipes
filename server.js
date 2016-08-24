/*eslint no-console: 0*/
const webpackConfig = require('./webpack.config.dev');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const DEFAULT_PORT = 8080;
const DEFAULT_HOST = '127.0.0.1';

if (process.env.NODE_ENV === 'production') {
    const Hapi = require('hapi');
    const inert = require('inert');
    const path = require('path');
    const bunyan = require('bunyan');
    const LOG = bunyan.createLogger({ name: 'app' });
    const server = new Hapi.Server();

    server.connection({
        port: process.env.PORT || DEFAULT_PORT
    });

    server.register(inert, (err) => {
        if (err) {
            throw err;
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            file: {
                path: path.join(__dirname, 'build', 'index.html')
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/assets/{param*}',
        handler: {
            directory: {
                path: path.join(__dirname, 'build')
            }
        }
    });

    server.start((err) => {
        if (err) {
            LOG.error({ error: err });
            throw err;
        }

        LOG.info(`Server has started at ${server.info.uri}`);
    });
} else {
    new WebpackDevServer(webpack(webpackConfig), {
        historyApiFallback: true,
        hot: true,
        publicPath: webpackConfig.output.publicPath,
        stats: {
            chunks: false,
            colors: true,
            'errors-only': true
        },
        watch: true
    }).listen(DEFAULT_PORT, DEFAULT_HOST, (error) => {
        if (error) {
            console.error(error);
        }

        console.info(`Listening at http://${DEFAULT_HOST}:${DEFAULT_PORT}`);
    });
}

