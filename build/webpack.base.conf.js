/**
* webpack配置文件
* 参考: http://webpack.github.io/docs/configuration.html
*/

const path   = require('path')
const config = require("./config")

const loaders   = require("./webpack/loaders")
const resolve   = require("./webpack/resolve")
const noParse   = require("./webpack/noParse")
const postcss   = require("./webpack/postcss")
const devServer = require("./webpack/devServer")
const vue       = require("./webpack/vue")
const externals = require("./webpack/externals")

module.exports = {
  // 项目路径上下文, 给入口点路径参考 这里配置项目根路径
  context: config.projectPath,
  // 入口点配置 (注意这里的入口点路径必须是相对路径,相对于context定义的路径)
  entry: {
    app: "./src/app.js",
  },
  output: {
    // 编译后, 存放打包文件输出的目录
    path: config.buildPath,
    // 资源访问路径 (所有js,css,img文件都依赖此路径访问)
    publicPath: config.publicPath,

    // 打包后文件命名
    filename: path.join(config.assetsDirectory, `js/[name]${config.production ? '.[chunkhash]' : ''}.js`),
    // chunk文件命名, (比如代码分割点中的代码块命名)
    chunkFilename: path.join(config.assetsDirectory, `js/[id]${config.production ? '.[chunkhash]' : ''}.js`),
  },

  // 模块定义
  module: {
    // 设置loader
    loaders: loaders,
    // 设置不需要webpack解析的模块(比如直接加载某些已经压缩的文件.min.js), 加快编译速度
    noParse: noParse
  },

  // 配置模块别名等
  resolve: resolve,

  // 设置外部变量 可以直接require($)外部加载的变量(比如通过cdn加载jquery得到$,在webpack模块内部就可以直接使用)
  // http://code.oneapm.com/javascript/2015/07/07/webpack_performance_1/
  externals: externals,

  // postcss config
  postcss: postcss,

  // vue-loader config:
  // https://github.com/vuejs/vue-loader/tree/master/docs/en/configurations
  vue: vue,

  // source map
  devtool: config.devtool,

  devServer: devServer,

}
