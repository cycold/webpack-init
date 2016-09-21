/**
 * 统一插件配置 包含开发环境和产品环境
 */
const path = require("path")
const webpack = require('webpack')

// https://github.com/webpack/extract-text-webpack-plugin
// https://github.com/ampedandwired/html-webpack-plugin
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const config = require('../config')

// config html-webpack-plugin
const htmlPlugins = []
config.templates.forEach(value => {
  htmlPlugins.push(new HtmlWebpackPlugin(Object.assign({
    inject: true,
    // https://github.com/kangax/html-minifier#options-quick-reference
    minify: {
      removeComments: config.production ? true : false,
      collapseWhitespace: config.production ? true : false,
      removeAttributeQuotes: config.production ? true : false,
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  }, value)))
})


// 开发环境插件配置
const devPlugins = htmlPlugins.concat([

  //  注入自由变量
  new webpack.DefinePlugin(config.injection),

  // 抽取样式到单个文件中 http://webpack.github.io/docs/stylesheets.html
  // The ExtractTextPlugin generates an output file per entry, so you must use [name], [id] or [contenthash]
  // when using multiple entries.
  new ExtractTextPlugin(path.join(config.assetsDirectory, 'css/[name].[contenthash].css'), {
    allChunks: false, // 设置false,对于多个入口,每个入口里的所有css都会打包成一个文件(每个入口一个文件),
                      // 设置为true,那么就是所有的入口中的css都会打包成一个文件(所有入口共用一个文件)
    disable: config.production ? false : true    // 是否禁用此插件 开发环境禁用(不需要提取) 产品环境启用
  }),

  // 使用 ProvidePlugin 自动加载模块 key会自动挂载到每个模块内(相当于每个模块自动执行require语句)
  // http://webpack.github.io/docs/list-of-plugins.html#provideplugin
  // Automatically loaded modules. Module (value) is loaded when the identifier (key)
  // is used as free variable in a module. The identifier is filled with the exports of the loaded module.
  // new webpack.ProvidePlugin({
  //     $: 'jquery',
  //     jQuery: 'jquery',
  //   }
  // ),
])


// 产品环境配置插件
const proPlugins = devPlugins.concat([

  // https://github.com/jantimon/favicons-webpack-plugin
  new FaviconsWebpackPlugin({
     // Your source logo
     logo: config.faviconPath,
     // The prefix for all image files (might be a folder or a name)
     prefix: 'assets/favicons/[hash]-',
     // Emit all stats of the generated icons
     emitStats: false,
     // The name of the json containing all favicon information
     statsFilename: 'iconstats-[hash].json',
     // Generate a cache file with control hashes and
     // don't rebuild the favicons until those hashes change
     persistentCache: true,
     // Inject the html into the html-webpack-plugin
     inject: true,
     // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
     background: '#fff',
     // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
     title: 'Webpack App',

     // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
     icons: {
       android: false,
       appleIcon: false,
       appleStartup: false,
       coast: false,
       favicons: true,
       firefox: false,
       opengraph: false,
       twitter: false,
       yandex: false,
       windows: false
     }
  }),

  // 提取各个chunk中共同的依赖(包括js,css)到一个文件中,这里提取共有的样式到common.css文件,共有的js到commons.js中
  // http://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
  // http://webpack.github.io/docs/stylesheets.html#styles-in-commons-chunk
  // new webpack.optimize.CommonsChunkPlugin('common', 'common.js')

  // split vendor js into its own file
  new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
          // any required modules inside node_modules are extracted to vendor
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(config.node_modules_path) === 0
          )
      }
  }),

  // extract webpack runtime and module manifest to its own file in order to
  // prevent vendor hash from being updated whenever app bundle is updated
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    chunks: ['vendor']
  }),

  // optimize module ids by occurence count
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),

  // https://github.com/mishoo/UglifyJS2#compressor-options
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      // drop掉所有的console语句
      drop_console: false
    },
    mangle: {
      // You can specify all variables that should not be mangled.
      // For example if your vendor dependency doesn't use modules
      // and relies on global variables. Most of angular modules relies on
      // angular global variable, so we should keep it unchanged
      // except: ['$super', '$', 'exports', 'require', 'angular']
    }
  }),
])

module.exports = {
  dev: devPlugins,
  pro: proPlugins
}
