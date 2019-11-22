import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import path from 'path';

import baseConfig from './base-config';

const ROOT_PATH = path.resolve('./');

export default {
    ...baseConfig(false),
    devtool: 'none',
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin({
            sourceMap: false,
            parallel: true,
        })],
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEVELOPMENT__: false,
            __STAGING__: false,
            __PRODUCTION__: true,
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(ROOT_PATH, 'src/index.html'),
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new LodashModuleReplacementPlugin(),
    ],
};
