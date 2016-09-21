/**
* 产品环境配置文件
* 参考: http://webpack.github.io/docs/configuration.html
*/
const webpackMerge      = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.conf')
const plugins           = require("./webpack/plugins")

module.exports = webpackMerge(webpackBaseConfig, {
  plugins: plugins.pro
})

