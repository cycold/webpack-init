
const config = require('../config')

const proxyOption = {}

Object.keys(config.proxyTable).forEach(key => {
  proxyOption[key] = {
    target: config.proxyTable[key],
    headers: {
      Referer: config.proxyTable[key]
    }
  }
})

// https://github.com/nodejitsu/node-http-proxy#options
module.exports = proxyOption
