<template>
  <div class="page">
    <div class="page-content">
      <von-header theme="balanced">
        <a href="#/" class="button button-icon ion-ios-arrow-back" slot="left"></a>
        <span slot="title">直播间demo说明</span>
        <a href="https://github.com/jack-hoo/LiveRoomDemo_Client" target="_blank" rel="noopener noreferrer"
           class="button button-icon ion-social-github" slot="right"></a>
      </von-header>
      <div>
        <scroll class="content-box">
          <h4>1. 功能说明</h4>
          <ul>
            <li>观看直播</li>
            <li>切换直播源</li>
            <li>聊天室</li>
            <li>发送弹幕</li>
            <li>在线人数实时监控</li>
            <li>直播间访问记录</li>
          </ul>

          <h4>2. 使用说明</h4>
          <ul>
            <li>
              自己推流
              <p>
                <span>本项目不内置任何直播源，直播地址需要自行配置。</span><br>
                <span>用 OBS（电脑端）或任意支持 RTMP 的手机推流软件，推送到服务端配置的推流地址，
                  即可在本直播间看到自己的直播内容。</span><br>
                <span>推流服务（nginx-rtmp）的搭建步骤见服务端仓库的 docs/DEPLOYMENT.md。</span>
              </p>
            </li>
            <li>
              源码地址
              <p>
                <a href="https://github.com/jack-hoo/LiveRoomDemo_Client" target="_blank"
                   rel="noopener noreferrer">移动端</a> /
                <a href="https://github.com/jack-hoo/LiveRoomDemo_Server" target="_blank"
                   rel="noopener noreferrer">服务端</a>，欢迎 star!
              </p>
            </li>
          </ul>

          <h4>3. 技术说明</h4>
          <ul>
            <li>
              前端（移动端）
              <p>
                <span>项目架构: Vue2 + vue-router2 + vuex2 + axios</span><br>
                <span>UI 框架: Vonic 2.0</span><br>
                <span>视频播放器: vue-video-player + videojs-contrib-hls</span><br>
                <span>WebSocket 客户端: vue-stomp</span><br>
                <span>弹幕插件: vue2-barrage</span><br>
                <span>打包工具: webpack 2</span>
              </p>
            </li>
            <li>
              前端（电脑端）
              <p>
                <span>项目架构: jQuery + Bootstrap</span><br>
                <span>视频播放器: video.js</span><br>
                <span>WebSocket 客户端: stomp.js + sockjs.js</span><br>
                <span>弹幕插件: jquery.danmu.js</span><br>
                <span>模板引擎: thymeleaf</span>
              </p>
            </li>
            <li>
              后端
              <p>
                <span>项目架构: Spring Boot 1.5.4 + Maven</span><br>
                <span>主数据库: MySQL</span><br>
                <span>辅数据库: Redis</span><br>
                <span>数据访问: spring-boot-starter-data-jpa + spring-boot-starter-data-redis</span><br>
                <span>WebSocket: spring-boot-starter-websocket</span><br>
                <span>消息中间件: RabbitMQ（可选，见服务端配置 liveroom.broker.relay-enabled）</span>
              </p>
            </li>
            <li>
              服务器部署
              <p>
                <span>直播推流/拉流: nginx-rtmp-module</span><br>
                <span>应用服务器: 内嵌 Tomcat 或外部 Tomcat 8</span>
              </p>
            </li>
          </ul>

          <h4>4. 已知限制</h4>
          <ul>
            <li>
              移动端用 QQ、UC 等浏览器播放过视频后，输入框和弹幕会被遮挡
              <p>
                <span>原因: 这类浏览器会劫持页面里的 video 标签，强制用自带播放器全屏播放，
                  导致页面上的弹幕层和输入框被盖住。很多直播平台的移动端都有同样的问题。</span><br>
                <span>规避: 改用 Chrome（手机端）访问，或访问电脑端页面。</span>
              </p>
            </li>
            <li>
              电脑端 RTMP 拉流已无法播放
              <p>
                <span>原因: RTMP 播放依赖 Flash，主流浏览器自 2021 年起已全面移除 Flash 支持。</span><br>
                <span>规避: 使用 HLS(m3u8) 直播源。</span>
              </p>
            </li>
          </ul>
        </scroll>
        <md-button class="button button-balanced"
                   style="border-radius:0px;position: fixed;bottom: 0px;width: 100%"
                   @click.native="feedback">
          反馈问题
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Slideout from 'vue-slideout'

  export default {
    components: {
      Slideout
    },
    methods: {
      feedback () {
        this.$router.push('/feedback')
      }
    }
  }
</script>

<style scoped>
  ul {
    margin-left: 15px;
    font-size: 16px;
    color: rgba(17, 187, 70, 0.81);
  }

  ul > li > p {
    color: black;
  }

  ul > li > p > span {
    color: #a16014
  }

  .content-box {
    margin-top: 80px;
    padding: 4px;
    margin-bottom: 55px;
  }
</style>
