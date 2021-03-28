const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: ['./src/js/index.js', './src/sass/todo.scss'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src/js'),
                ],
                exclude: /node_module/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_module/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: {
                                    'postcss-preset-env': {
                                        stage: 0,
                                        browsers: [
                                            'last 4 versions',
                                            'not ie < 9',
                                        ],
                                    },
                                }
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                    }
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/todo.css',
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: 'src/assets',
                to: './assets',
            }],
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
    devServer: {
        contentBase: './dist',
    },
    devtool: 'source-map',
    mode: 'development',
};