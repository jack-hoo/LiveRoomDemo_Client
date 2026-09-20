/**
 * 运行时配置集中在这里，避免把服务器地址、直播流地址散落在各个组件里写死。
 *
 * 这些值在构建时由 webpack.DefinePlugin 从 config/dev.env.js / config/prod.env.js 注入，
 * 所以不同环境只需要改那两个文件，不用动业务代码。
 */

/**
 * 后端接口前缀。要和服务端的 server.context-path（或 war 包名）保持一致。
 * 开发模式下 build/dev-server.js 会把这个前缀代理到本地后端，见 config/index.js 的 proxyTable。
 */
export const API_BASE = process.env.API_BASE || '/LiveDemo'

/** WebSocket(SockJS) 端点，服务端注册在 context-path + /live 上 */
export const WS_ENDPOINT = `${API_BASE}/live`

/**
 * 默认直播源（HLS / m3u8）。
 *
 * 原来这里写死的是一个第三方电视台的 m3u8 地址，既早已失效，也不该把别人的流
 * 硬编码进开源项目。请换成你自己的推流地址，搭建方式见服务端仓库 docs/DEPLOYMENT.md。
 */
export const HLS_SOURCE = process.env.HLS_SOURCE || ''

/** 播放器封面图，留空则不显示 */
export const PLAYER_POSTER = process.env.PLAYER_POSTER || ''

/** 推流地址，用于"我要直播"的提示文案；留空则提示未配置 */
export const PUBLISH_URL = process.env.PUBLISH_URL || ''

/** 点击"我要直播"后切换到的播放地址，通常就是你推流那一路的 HLS 地址 */
export const PUBLISH_PLAYBACK_URL = process.env.PUBLISH_PLAYBACK_URL || ''
