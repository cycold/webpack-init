/**
* loaders 集中配置 便于管理
*/

const config = require('../config')
const expose = require('./expose')

//https://github.com/webpack/extract-text-webpack-plugin
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const loaders = {
  'js': {
    test: /\.js$/,
    // https://github.com/babel/babel-loader#using-cachedirectory-fails-with-enoent-error
    loaders: ['babel-loader?cacheDirectory'],
    // 设置srcPatch加快模块解析速度,同时排除了node_mdules目录
    include: [config.srcPath]
  },
  'jsx': {
    test: /\.jsx?$/,
    loaders: ['babel-loader'],
    include: [config.srcPath]
  },
  'vue': {
    test: /\.vue$/,
    loaders: ['vue-loader'],
    include: [config.srcPath]
  },
  'scss': {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader' + config.sourceMap + '!postcss-loader!sass-loader' + config.sourceMap),
    // loader: 'style-loader!css-loader' + config.sourceMap + '!postcss-loader!sass-loader' + config.sourceMap,
    include: [config.srcPath]
  },
  'css': {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader' + config.sourceMap + '!postcss-loader'),
    // loader: 'style-loader!css-loader' + config.sourceMap + '!postcss-loader',
  },
  'less': {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader' + config.sourceMap + '!postcss-loader!less-loader' + config.sourceMap),
    // loader: 'style-loader!css-loader' + config.sourceMap + '!postcss-loader!less-loader' + config.sourceMap,
    include: [config.srcPath]
  },
  'json': {
    test: /\.json$/,
    loaders: ['json-loader']
  },
  'html': {
    test: /\.(html|tpl)$/,
    loaders: ['html-loader']
  },
  'images': {
    test: /\.(png|jpe?g|gif)$/i,
    loader: 'url-loader?limit=10000&&name=[name]-[hash:8].[ext]'
  },
  'fonts': {
    test: [/\.(woff|eot|ttf)$/i, /\.(woff\?\w+$|eot\?\w+$|ttf\?\w+$)$/i],  //.ttf?2d12af
    loader: 'url-loader?limit=10000&name=[name]-[hash:8].[ext]'
  },
  'woff': {
    test: [/\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/i],
    loader: "url-loader?limit=10000&name=[name]-[hash:8].[ext]&minetype=application/font-woff"
  },
  'ttf': {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/i,
    loader: 'url-loader?limit=10000&name=[name]-[hash:8].[ext]'
  },
  'eot': {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/i,  // .eot?v=2.0.0
    loader: 'url-loader?limit=10000&name=[name]-[hash:8].[ext]'
  },
  'svg': {
    test: [/\.svg(\?v=\d+\.\d+\.\d+)?$/i, /\.svg\?\w+$/i], //.svg?2d12af
    loader: 'url-loader?limit=10000&&name=[name]-[hash:8].[ext]&mimetype=image/svg+xml'
  }
}

if (expose.test && expose.loader) {
  loaders.expose = expose
}

module.exports = Object.keys(loaders).map(key => loaders[key])
