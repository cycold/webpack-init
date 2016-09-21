/**
 * https://github.com/webpack/expose-loader
 * 暴露webpack 内部模块到 window
 * require.resolve这里会返回jquery在node_module中绝对路径,
 * 在代码中需要显示的导入jquery,才会暴露出去 (require('jquery')或者import 'jquery')
 * 或者直接配置到loader中
 */

module.exports = {
  // 将内部的$,Zepto变量挂载到window 即 window.$ = require.resolve('webpack-zepto')
  // test: require.resolve('webpack-zepto'),
  // loader: 'expose?$!expose?Zepto',

  // 暴露jQuery
  // test: require.resolve('jquery'),
  // loader: 'expose?$!expose?jQuery',
}
