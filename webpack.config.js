const HtmlWebPackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const webpack = require('webpack');

const path = require('path');
const theme = require('./src/theme/theme');

const PUBLIC_PATH = '/public';

module.exports = {
    entry: './src/index.js',
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@atoms': path.resolve(__dirname, 'src/components/atoms/'),
            '@molecules': path.resolve(__dirname, 'src/components/molecules/'),
            '@organisms': path.resolve(__dirname, 'src/components/organisms/'),
            '@pages': path.resolve(__dirname, 'src/components/pages/'),
            '@templates': path.resolve(__dirname, 'src/components/templates/')
        }
    },
    devServer: {
        hot: true,
        historyApiFallback: true,
        port: 3300
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/, /test/],
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.(less|css)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                modifyVars: {
                                    ...theme
                                },
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/' // <- this right here
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html',
            filename: './index.html'
        }),
        new CompressionPlugin(),
        new webpack.DefinePlugin({
            'process.env.PUBLIC_PATH': JSON.stringify(PUBLIC_PATH)
        })
    ]
};
