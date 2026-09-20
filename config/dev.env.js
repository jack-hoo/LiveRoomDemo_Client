var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

/*
 * 开发环境配置：在 prod.env.js 的基础上覆盖需要改的项。
 * 想在本地试自己的直播源，改这里就行，不用动 prod.env.js。
 */
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
