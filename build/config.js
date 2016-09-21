/**
* webpack项目 全局配置
*/

const path = require('path')
const ip = require('ip').address()

const production = process.env.NODE_ENV === 'production'
const debug      = !production

// server ip/domain config
const API_SERVER = 'http://192.168.1.112:8088'
const SSO_SERVER = 'http://192.168.1.233:8080'
const PORT       = 5555

module.exports = {
  // 环境
  production        : production,                                                  // 产品环境
  debug             : !production,                                                 // 开发环境
  cdn               : false,                                                       // cdn环境

  // 入口模板文件
  templates         : [
    {
      filename : 'index.html',
      template : path.resolve(__dirname, "../index.html"),
    },
  ],


  // 本地dev server端口配置
  api_server        : API_SERVER,
  sso_server        : SSO_SERVER,
  port              : PORT,

  // 路径
  node_modules_path : path.resolve(__dirname, "../node_modules"),                  // node_module目录
  projectPath       : path.resolve(__dirname, "../"),                              // 项目根路径
  srcPath           : path.resolve(__dirname, "../src/"),                          // 项目源码路径
  buildPath         : path.resolve(__dirname, "../dist/"),                         // 最终打包目录路径
  assetsPath        : path.resolve(__dirname, "../src/assets/"),                   // 项目静态资源路径
  faviconPath       : path.resolve(__dirname, "../src/assets/", "favicon.png"),

  assetsRootPath    : "/",
  assetsDirectory   : "assets",

  // 当使用style-loader并且启用source-map时,此时样式是以 blob:http 形式加载,会导致字体路径无效
  // 使用blob:http:// 加载css时, css中使用路径会没有效果
  // 比如 background-image: url("/assets/images/logo.jpg") 这里的url会无效
  // https://github.com/webpack/style-loader/issues/93
  // 最新修复见: https://github.com/webpack/style-loader/pull/124
  publicPath        : production ? "/" : `http://${ip}:${PORT}/`,                                                         // 资源对外访问路径(express的static server path)

  // 是否开启css sourceMap
  // http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts
  // http://stackoverflow.com/questions/30762323/webpack-must-i-specify-the-domain-in-publicpath-for-url-directive-to-work-in
  // https://github.com/webpack/style-loader/issues/55
  // OTS parsing error: invalid version tag
  sourceMap      : production ? '' : '?sourceMap',
  devtool        : production ? '#source-map' : '#eval-source-map',

  // 代理请求配置 (https://github.com/chimurai/http-proxy-middleware)
  proxyTable: {
    '/api/**'     : SSO_SERVER,
  },

  // 模块内自由变量注入 (注: 不是全局变量没有挂载到window, 只允许模块内访问)
  injection: {
    VERSION       : JSON.stringify("0.0.1"),
    PRODUCTION    : production,
    DEBUG         : debug,
    'process.env' : {
      NODE_ENV    : debug ? '"development"' : '"production"'
    }
  },
}

