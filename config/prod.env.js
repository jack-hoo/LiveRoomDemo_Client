/*
 * 生产构建的运行时配置。
 *
 * 这些值会被 webpack.DefinePlugin 原样替换到代码里，所以每个值都必须是一段
 * 合法的 JS 源码——字符串要带上内层引号，写成 '"..."' 的形式。
 *
 * 对应的读取逻辑在 src/config/index.js。
 */
module.exports = {
  NODE_ENV: '"production"',

  // 后端接口前缀，要和服务端的 server.context-path（或 war 包名）一致
  API_BASE: '"/LiveDemo"',

  // 直播源(HLS/m3u8)。留空则页面显示"未配置直播源"，聊天室和弹幕仍可用。
  // 例: '"http://your-host/hls/demo.m3u8"'
  HLS_SOURCE: '""',

  // 播放器封面图，留空则不显示
  PLAYER_POSTER: '""',

  // 推流地址，用于"我要直播"的提示文案。例: '"rtmp://your-host/live/demo"'
  PUBLISH_URL: '""',

  // 点击"我要直播"后切换到的播放地址，通常是你推流那一路的 HLS 地址
  PUBLISH_PLAYBACK_URL: '""'
}
