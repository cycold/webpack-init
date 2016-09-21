/**
* 配置webpack模块解析路径,模块别名配置等...
*/

const path = require('path')
const config = require('../config')

module.exports = {
  // require()时,如果没有后缀名,自动添加下面配置的后缀名(下面空后缀名不能省略,表示其他的后缀)
  // 常用: ['', ".webpack.js", ".web.js", '.js', '.scss', '.vue', '.jsx', ".ts", ".tsx", '.styl', '.jade', 'less']
  extensions: ['', '.js', '.scss', '.vue', '.less'],
  //模块别名定义:
  alias: {
    // vue 使用vue.min.js 将不会触发vue-devtool chrome extension 开发环境还是使用commonJs module
    'vue'         : path.join(config.node_modules_path, 'vue/dist/' + (config.production ? 'vue.min.js' : 'vue.common.js')),
    'vuex'        : path.join(config.node_modules_path, 'vuex/dist/vuex.min.js'),
    'vue-router'  : path.join(config.node_modules_path, 'vue-router/dist/vue-router.min.js'),
    'es6-promise' : path.join(config.node_modules_path, 'es6-promise/dist/es6-promise.min.js'),

    'app-style'   : path.join(config.srcPath,'/sass/app.scss'),
  }
}
