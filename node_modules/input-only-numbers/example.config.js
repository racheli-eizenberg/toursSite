const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const buildOutput = `${__dirname}/example/js`;
module.exports = {
    entry: {
        app: __dirname + '/src/app.js'
    },
    output: {
        path: buildOutput,
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([buildOutput])
    ]
}