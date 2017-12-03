const merge = require('webpack-merge');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
    plugins: [new MinifyPlugin()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env'] }
                }
            }
        ]
    }
});
