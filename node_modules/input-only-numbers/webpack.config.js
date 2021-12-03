const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const buildOutput = `${__dirname}/dist`;
module.exports = {
    entry: {
        app: __dirname + '/src/index.js'
    },
    output: {
        path: buildOutput,
        filename: 'index.js',
        libraryTarget: 'umd'
    },
    module: { 
        rules: [
            {
                test: /\.js$/,
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