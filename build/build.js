/**
 * 打包编译:
 * 1. 直接打包
 *   npm run build
 * 2. 直接打包,显示打包详细信息
 *   npm run build-details
 */

// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV      = 'production'

var path          = require('path')
var config        = require('./config')
var ora           = require('ora')
var webpack       = require('webpack')
var webpackConfig = require('./webpack.pro.conf')
var argument      = require('shell-arguments')

console.log(
  '\n  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...')
spinner.start()

rm('-rf', config.buildPath)
mkdir('-p', config.buildPath)
cp('-R', config.assetsPath, config.buildPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    assets: true,
    chunks: false,
    modules: argument.details ? true : false,
    chunkModules: argument.details ? true : false,
    children: argument.details ? true : false,
  }) + '\n')
})
