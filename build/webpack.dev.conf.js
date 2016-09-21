/**
* 开发环境配置文件
* 参考: http://webpack.github.io/docs/configuration.html
*/
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.conf')
const plugins = require("./webpack/plugins")
const config = require("./config")


module.exports = webpackMerge(webpackBaseConfig, {
  plugins: plugins.dev
})
