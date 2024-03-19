const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.config.js');
const webpack = require('webpack')
module.exports = merge(base, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: "[name].js",//输出文件名，[name]表示入口文件js名
        path: path.resolve(__dirname, "../dist")//输出文件路径,
    },
    // devServer: {
    //     contentBase: './dist'
    // },
    plugins: [
        new webpack.DefinePlugin({
          'process.env': require('../config/prod.env')
        }),
        // new HtmlWebpackPlugin({ //配置
        //     filename: 'index.html',//输出文件名
        //     template: './index.html',//以当前目录下的index.html文件为模板生成dist/index.html文件
        // }),
        // new CleanWebpackPlugin(['dist']), //传入数组,指定要删除的目录
        // new webpack.HotModuleReplacementPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        // new HtmlWebpackPlugin({
        //   filename: 'index.html',
        //   template: 'index.html',
        //   inject: true,
        //   favicon: resolve('favicon.ico'),
        //   title: 'vue-element-admin',
        //   path: config.dev.assetsPublicPath + config.dev.assetsSubDirectory
        // })
    ]
});