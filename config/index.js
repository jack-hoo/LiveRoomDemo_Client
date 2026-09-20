// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

// 后端接口前缀，要和服务端的 server.context-path（或 war 包名）保持一致
var API_BASE = process.env.API_BASE || '/LiveDemo'
// 开发模式下后端的地址
var API_TARGET = process.env.API_TARGET || 'http://127.0.0.1:8085'

// 原来 proxyTable 是空的：dev 模式下前端跑在 8080、后端在 8085，
// 所有接口请求都会打到 8080 然后 404，开发模式实际上是用不了的。
//
// ws: true 是必须的——SockJS 握手后会升级成 WebSocket，不开这个选项聊天室连不上。
// changeOrigin 保持 false：服务端靠 session 认身份，改写 Host 反而容易踩坑。
var proxyTable = {}
proxyTable[API_BASE] = {
  target: API_TARGET,
  ws: true,
  changeOrigin: false
}

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 生产产物最终是要拷进服务端静态资源目录、由 Spring Boot 在 /LiveDemo 下托管的。
    //
    // 原来这里是 assetsSubDirectory:'static' + assetsPublicPath:'/'，产出的 HTML 里
    // 引用的是 /static/js/xxx.js 这种「从域名根开始」的绝对路径。服务端带 context-path
    // 时这个路径根本对不上，所以当年是手工把 HTML 里的路径一个个改成相对路径再提交的——
    // 每次重新构建都要重来一遍，也很容易漏掉。
    //
    // 改成空字符串后产出的就是 js/xxx.js 这样的相对路径：页面在 /LiveDemo/live_room，
    // 相对路径正好解析到 /LiveDemo/js/xxx.js，和服务端的目录结构天然对齐，
    // 直接整个目录拷过去即可，不需要再改任何东西。
    assetsSubDirectory: '',
    assetsPublicPath: '',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: proxyTable,
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    cssSourceMap: false
  }
}
