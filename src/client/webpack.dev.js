const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/client/client.ts',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './dist/client',
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }, 
            {
                test: /\.png/,
                type: 'asset/inline'
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../../dist/client')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'haha',
            template: 'template.html',
            filename: 'index.html'
        })
    ],
    performance: {
        hints: false
    },
};