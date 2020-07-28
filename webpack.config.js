const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// @ts-ignore
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// @ts-ignore
const OptimizedCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// @ts-ignore
const Autoprefixer = require ('autoprefixer');
// @ts-ignore
const TerserWebpackPlugin = require('terser-webpack-plugin');
// @ts-ignore
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// @ts-ignore

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    
    if (isProd) {
// @ts-ignore
        config.minimizer = [
            new OptimizedCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    
    return config;
}

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin( {
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
    
    if (isProd) {
        base.push(new BundleAnalyzerPlugin())
    }
    
    return base;
}

module.exports = {
    context: path.resolve(__dirname, 'source'),
    mode: 'development',
    entry: ['./app/index.ts'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.ts', '.json', 'css', '.png'],
        alias: {
            '@components': path.resolve(__dirname, 'source/components')
        }
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                Autoprefixer()
                            ],
                            sourceMap: true
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)/,
                use: ['file-loader']
            },
            {
                test: /\.tsx?$/,
                use: [ 'ts-loader'/*, 'eslint-loader'*/ ],
                exclude: /node_modules/,
            }
        ]
    }
}