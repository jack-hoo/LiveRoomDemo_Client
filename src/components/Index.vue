<template>
  <div>
    <von-header theme="balanced">
      <a href="#about" class="button" slot="left">demo说明</a>
      <span slot="title">直播间Demo</span>
      <button class="button" slot="right" @click="changehls">我要直播</button>
    </von-header>
    <div class="video">
      <video-player v-if="hasSource" :options="playerOptions" ref="videoPlayer"
                    @ready="playerReadied">
      </video-player>
      <!-- 没配置直播源时给个明确提示，而不是留一块黑屏让人以为是坏了 -->
      <div v-else class="no-source">
        未配置直播源。请在 <code>config/prod.env.js</code>（或 <code>config/dev.env.js</code>）中
        设置 <code>HLS_SOURCE</code>；搭建推流服务见服务端仓库的 docs/DEPLOYMENT.md。
      </div>
    </div>
    <div>
      <tabs position="bottom" ref="tabs" :tab-items="tabs" :tab-index="tabIndex" :on-tab-click="onTabClick">
      </tabs>
      <keep-alive>
        <router-view>
        </router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
  import Slideout from 'vue-slideout'
  import { mapGetters } from 'vuex'
  import { HLS_SOURCE, PLAYER_POSTER, PUBLISH_URL, PUBLISH_PLAYBACK_URL } from '../config'

  // 底部 tab 和路由一一对应。原来是四段结构相同的 if，加一个 tab 就得再抄一遍。
  const TABS = [
    { label: '聊天室', path: '/' },
    { label: '现场嘉宾', path: '/guest' },
    { label: '房间信息', path: '/roomInfo' },
    { label: '访客记录', path: '/history' }
  ]

  export default {
    computed: {
      ...mapGetters([
        'getOnlineGuest'
      ]),
      player () {
        return this.$refs.videoPlayer && this.$refs.videoPlayer.player
      },
      hasSource () {
        return !!HLS_SOURCE
      }
    },
    data () {
      return {
        playerOptions: {
          height: 220,
          sources: [{
            withCredentials: false,
            type: 'application/x-mpegURL',
            // 原来写死的是某个第三方电视台的 m3u8 地址，早已失效，
            // 把别人的流硬编码进开源项目也不合适。改为从配置读取。
            src: HLS_SOURCE
          }],
          autoPlay: true,
          controlBar: {
            timeDivider: false,
            durationDisplay: false
          },
          flash: { hls: { withCredentials: false } },
          html5: { hls: { withCredentials: false } },
          poster: PLAYER_POSTER
        },
        tabs: TABS.map(tab => tab.label),
        tabIndex: 0
      }
    },
    methods: {
      changehls () {
        if (!PUBLISH_URL) {
          $dialog.alert({
            effect: 'default',
            title: '提示',
            content: '尚未配置推流地址，请设置 PUBLISH_URL 后重新构建。',
            okText: '确定',
            okTheme: 'assertive'
          })
          return
        }
        $dialog.alert({
          effect: 'default',
          title: '提示',
          content: `请使用推流软件推送到 ${PUBLISH_URL}，即可在本直播间看到您的直播内容，具体操作请看 demo 说明`,
          okText: '确定',
          okTheme: 'assertive'
        })
        // 原来不判空就调 this.player.pause()，播放器还没 ready 时会直接抛 TypeError
        if (!this.player || !PUBLISH_PLAYBACK_URL) {
          return
        }
        this.player.pause()
        this.player.src(PUBLISH_PLAYBACK_URL)
        this.player.play()
      },
      onTabClick (index) {
        if (index === this.tabIndex || !TABS[index]) {
          return
        }
        this.tabIndex = index
        this.$router.push(TABS[index].path)
      },
      playerReadied (player) {
      }
    },
    components: {
      Slideout
    }
  }
</script>
<style>
  .video {
    margin-top: 44px;
  }

  .no-source {
    padding: 20px;
    color: #888;
    font-size: 14px;
    line-height: 1.6;
    text-align: center;
  }

  .tabs {
    position: relative;
  }

  .tabs-bottom {
    top: -20px !important;
  }

  .tab-body {
    margin: 10px;
    font-family: "-apple-system", "Helvetica Neue", "Roboto", "Segoe UI", sans-serif;
    font-size: 16px;
    margin-bottom: 45px;
  }

  .tabs-striped.tabs-color-positive .tab-item.tab-item-active,
  .tabs-striped.tabs-color-positive .tab-item.active,
  .tabs-striped.tabs-color-positive .tab-item.activated {
    color: #4c0;
    border: 0 solid #4c0;
    border-top-width: 0px !important;
    border-bottom-width: 3px;
  }

  .tabs-striped.tabs-color-positive .tab-item {
    color: #a2a2a2;
  }

  .tabs-striped .tabs {
    border: none;
  }
</style>
