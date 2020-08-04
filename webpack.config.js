/* Webpack 4.23 is used to compile and bundle all the project files so they're ready to be loaded into a browser, 
   it does this with the help of loaders and plugins that are configured in the webpack.config.js file. */

/* It compiles TypeScript files using ts-loader, loads angular templates with raw-loader, 
   and injects the bundled scripts into the body of the index.html page using the HtmlWebpackPlugin. 
   It also defines a global config object with the plugin webpack.DefinePlugin. */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.ts',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader', 'angular2-template-loader']
            },
            {
                test: /\.(html|css)$/,
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new webpack.DefinePlugin({
            // global app config object
            config: JSON.stringify({
                apiUrl: 'http://localhost:4000'
            })
        })
    ],
    devServer: {
        historyApiFallback: true
    }
}