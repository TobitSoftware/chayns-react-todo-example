import autoprefixer from 'autoprefixer';
import path from 'path';

const ROOT_PATH = path.resolve('./');

export default (dev = false) => ({
    entry: {
        'example.bundle': [path.resolve('src/index')],
    },
    resolve: {
        alias: dev ? { 'react-dom': '@hot-loader/react-dom' } : undefined,
        extensions: ['.js', '.jsx'],
    },
    output: {
        filename: `[name].js${dev ? '' : '?[hash]'}`,
        path: path.resolve(ROOT_PATH, 'build'),
        publicPath: dev ? '/' : undefined,
        chunkFilename: '[name].chunk.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer({ flexbox: 'no-2009' }),
                            ],
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
});
