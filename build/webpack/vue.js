/**
* webpack配置文件 vue 字段配置
* vue-loader config:
* https://github.com/vuejs/vue-loader/tree/master/docs/en/configurations
*/

//https://github.com/webpack/extract-text-webpack-plugin
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const config = require("../config")

module.exports = {
  // vue-loader使用ExtractTextPlugin插件时,产品环境中不使用style-loader, 开发环境使用style-loader便于调试
  loaders: {
    css: ExtractTextPlugin.extract((config.production ? '' : 'vue-style-loader!') + "css-loader" + config.sourceMap + "!postcss-loader"),
    sass: ExtractTextPlugin.extract((config.production ? '' : 'vue-style-loader!') + "css-loader" + config.sourceMap + "!postcss-loader!sass-loader"+ config.sourceMap),
    less: ExtractTextPlugin.extract((config.production ? '' : 'vue-style-loader!') + "css-loader" + config.sourceMap + "!postcss-loader!less-loader"+ config.sourceMap),
  }
}

