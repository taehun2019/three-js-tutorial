const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin');

module.exports = (env) => {
    // const facebook = env.AD_NETWORK === 'Facebook';
    // if (env.AD_NETWORK === 'Facebook') {
    //     return facebookModule(env);
    // }

    return {
        mode: 'production',
        entry: './src/client/client.ts',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                },
                {
                    test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                    use: 'base64-inline-loader'
                },
                {
                    test: /\.(png|glb|mp3|wav)/,
                    type: 'asset/inline'
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            modules: [
                'node_modules',
                'src/client', 
                'download_modules',
            ],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, '../../dist/client'),
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development'),
                'process.env.AD_NETWORK': JSON.stringify(env.AD_NETWORK),
            }),
            new MiniCssExtractPlugin({
              filename: "[name].css",
              chunkFilename: "[id].css"
            }),
            new HtmlWebpackPlugin({
                title: 'haha',
                template: 'template.html',
                filename: 'output.html',
                inject: 'body',
            }),
            new HTMLInlineCSSWebpackPlugin(),
            new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/bundle/]), //[/runtime/]),
        ],
        performance: {
            hints: false
        }
    };
}

const facebookModule = (env) => {
    return {
        mode: 'production',
        entry: './src/client/client.ts',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                },
                {
                    test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                    use: 'base64-inline-loader'
                },
                {
                    test: /\.(png|glb|mp3|wav)/,
                    type: 'asset/inline'
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            modules: [
                'node_modules',
                'src/client', 
                'download_modules',
            ],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, '../../dist/client/facebook'),
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development'),
                'process.env.AD_NETWORK': JSON.stringify(env.AD_NETWORK),
            }),
            new MiniCssExtractPlugin({
              filename: "[name].css",
              chunkFilename: "[id].css"
            }),
            new HtmlWebpackPlugin({
                title: 'haha',
                template: 'template.html',
                filename: 'output.html',
                inject: 'body',
            }),
            // new HTMLInlineCSSWebpackPlugin(),
            // new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/bundle/]), //[/runtime/]),
        ],
        performance: {
            hints: false
        }
    };
}