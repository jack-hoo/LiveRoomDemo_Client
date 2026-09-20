// https://github.com/shelljs/shelljs
require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var path = require('path')
var chalk = require('chalk')
var shell = require('shelljs')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
shell.rm('-rf', assetsPath)
shell.mkdir('-p', assetsPath)
shell.config.silent = true
shell.cp('-R', 'static/*', assetsPath)

// vonic assets
var vonicAssetsPath = path.join(assetsPath, 'vonic')
shell.mkdir('-p', vonicAssetsPath)
shell.cp('-R', 'node_modules/vonic/dist/*', vonicAssetsPath)

// webpack.prod.conf.js 把 vue / vue-router / axios 配成了 externals，也就是说它们
// 不进 bundle，运行时要从全局变量拿。这些文件必须由 HTML 自己加载。
//
// 原来 index.tpl.html 是从 unpkg CDN 加载的，这让离线环境和内网部署直接不可用，
// 也给页面加了三个不受控的外部依赖。这里改为从 node_modules 拷一份到产物里，
// 版本与 yarn.lock 锁定的完全一致，不再依赖任何外部 CDN。
var vendorLibs = [
  'node_modules/vue/dist/vue.min.js',
  'node_modules/vue-router/dist/vue-router.min.js',
  'node_modules/axios/dist/axios.min.js'
]
var jsAssetsPath = path.join(assetsPath, 'js')
shell.mkdir('-p', jsAssetsPath)
vendorLibs.forEach(function (lib) {
  shell.cp(lib, jsAssetsPath)
})
shell.config.silent = false

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
})
