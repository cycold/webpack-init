/**
* 设置外部变量 可以直接require($)外部加载的变量(比如通过cdn加载jquery得到$,在webpack模块内部就可以直接使用)
* http://code.oneapm.com/javascript/2015/07/07/webpack_performance_1
* http://webpack.github.io/docs/configuration.html#externals
*/

const config = require("../config")

const externals = [
  {
    //jQuery: true,
    $: true,              // module.exports = $;
    Vue: true,            // module.exports = Vue;
    VueRouter: true,      // module.exports = VueRouter;
    Vuex: true,           // module.exports = Vuex;
    VueValidator: true,   // ....

    // 转换外部全局变量到内部模块调用 let Vue = require(vue)  ==> require(vue)加载的就是外部的变量 Vue
    "vue": "var Vue",     // module.exports = vue = Vue
    "vuex": "var Vuex",
    "vue-router": "var VueRouter",
    "vue-validator":  "var VueValidator",
  }
]

module.exports = config.cdn ? externals : []
