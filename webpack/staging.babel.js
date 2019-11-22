import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import path from 'path';

import baseConfig from './base-config';

const ROOT_PATH = path.resolve('./');

export default {
    ...baseConfig(false),
    devtool: 'hidden-source-map',
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin({
            sourceMap: true,
            parallel: true,
        })],
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEVELOPMENT__: false,
            __STAGING__: true,
            __PRODUCTION__: false,
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(ROOT_PATH, 'src/index.html'),
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new LodashModuleReplacementPlugin(),
    ],
};
