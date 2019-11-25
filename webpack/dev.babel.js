import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import path from 'path';
import fs from 'fs';

import baseConfig from './base-config';

const ROOT_PATH = path.resolve('./');

const ssl = {};

try {
    ssl.cert = fs.readFileSync(path.join(__dirname, 'ssl', 'ssl.crt'));
    ssl.key = fs.readFileSync(path.join(__dirname, 'ssl', 'ssl.key'));
} catch (e) {
    // eslint-disable-next-line no-console
    console.log('\n---------------------------\nNo SSL Certificate found.\n---------------------------\n');
}

export default {
    ...baseConfig(true),
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        host: '0.0.0.0',
        compress: true,
        cert: ssl.cert,
        key: ssl.key,
        port: 8080,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
    },
    devtool: 'inline-source-map',
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            __DEVELOPMENT__: true,
            __STAGING__: false,
            __PRODUCTION__: false,
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(ROOT_PATH, 'src/index.dev.html'),
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
};
