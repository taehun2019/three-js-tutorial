const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;

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
                test: /\.(png|glb|mp3)/,
                type: 'asset/inline'
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        //https://webpack.js.org/configuration/resolve/#resolvemodules
        //https://stackoverflow.com/questions/43281741/how-to-use-paths-in-tsconfig-json
        modules: [
            'node_modules',
            'src/client', 
            'download_modules',
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../../dist/client')
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            title: 'haha',
            template: 'template.html',
            filename: 'index.html',
            inject: 'body',
        }),
        new HTMLInlineCSSWebpackPlugin(),
    ],
    performance: {
        hints: false
    },
};