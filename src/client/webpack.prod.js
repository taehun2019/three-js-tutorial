const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin');

module.exports = {
    mode: 'production',
    entry: './src/client/client.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // {
            //     test: /\.wasm$/,
            //     use: 'wasm-loader'
            // },
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
        path: path.resolve(__dirname, '../../dist/client'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'haha',
            template: 'template.html',
            filename: 'output.html',
            inject: 'body',
        }),
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/bundle/]), //[/runtime/]),
    ],
    performance: {
        hints: false
    }
};