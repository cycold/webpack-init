/**
* 排除某些模块不需要webpack解析,主要便于加快编译速度,以及减少编译后文件大小 
* https://github.com/vuejs/vue-hackernews/blob/gh-pages/webpack.config.js
*/

module.exports = [
  /vue.min.js/,
  /vuex.min.js/,
  /vue-router.min.js/,
  /es6-promise\.js$/,
  /bootstrap\.css$/,
  // /mobiscroll\.\w+\.(js)$/
]
