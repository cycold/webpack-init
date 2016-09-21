/**
 * webpack postcss config
 * https://github.com/postcss/postcss-loader
 */

 const precss       = require('precss')
 const autoprefixer = require('autoprefixer')({
   browsers: ['last 2 versions', 'Android >= 4.0'],
   cascade: false, //是否美化属性值 默认：true 像这样：
                   //-webkit-transform: rotate(45deg);
                   //        transform: rotate(45deg);
   remove: true     //是否去掉不必要的前缀 默认：true
 })

module.exports = function () {
  return [precss, autoprefixer]
}

