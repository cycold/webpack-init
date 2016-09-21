'use strict'
/**
* Created by cycold on 2016-05-13
*/

const ip     = require('ip').address()
const config = require('../config')
const proxy  = require('./proxy')

module.exports = {
  // static server map path
  contentBase: "src/",
  open: true,
  hot: true,
  port: config.port,
  host: ip,
  // enable HTML5 history routing
  historyApiFallback: true,
  // suppress useless text
  noInfo: false,

  quiet: false,             // display nothing to the console
  lazy: false,              // if true switch into lazy mode that means no watching, but recompilation on every request
  watchOptions: {           // watch options (only lazy: false)
    aggregateTimeout: 300,
    poll: true
  },

  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  },

  // 代理配置
  proxy: proxy
}
