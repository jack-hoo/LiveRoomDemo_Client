<template>
  <div>
    <von-header theme="balanced">
      <a href="#about" class="button" slot="left">demo说明</a>
      <span slot="title">直播间Demo</span>
      <button class="button" slot="right" @click="changehls">我要直播</button>
    </von-header>
    <div class="video">
      <video-player :options="playerOptions" ref="videoPlayer"
                    @ready="playerReadied"
                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
                    @ended="onPlayerEnded($event)"
                    @loadeddata="onPlayerLoadeddata($event)"
                    @waiting="onPlayerWaiting($event)"
                    @playing="onPlayerPlaying($event)"
                    @timeupdate="onPlayerTimeupdate($event)"
                    @canplay="onPlayerCanplay($event)"
                    @canplaythrough="onPlayerCanplaythrough($event)"
                    @statechanged="playerStateChanged($event)">
      </video-player>
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
  import {mapGetters, mapActions} from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'getOnlineGuest'
      ]),
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    data() {
      return {
        playerOptions: {
          // videojs and plugin options
          height: 220,
          sources: [{
            withCredentials: false,
            type: "application/x-mpegURL",
            src: "http://183.207.249.15/PLTV/3/224/3221225529/index.m3u8"
          }],
          autoPlay: true,
          controlBar: {
            timeDivider: false,
            durationDisplay: false
          },
          flash: {hls: {withCredentials: false}},
          html5: {hls: {withCredentials: false}},
          poster: "http://opikkf1o0.bkt.clouddn.com/minerOnline/images/daotian.jpg"
        },
        tabs: [
          "聊天室",
          "现场嘉宾",
          "房间信息",
          "访客记录"
        ],
        tabIndex: 0,
      }
    },
    methods: {
      changehls(){
        //console.log(this.player)
        $dialog.alert({
          effect: 'default',
          title: '提示',
          content: '请使用推流软件推送到rtmp://www.veton.cc/live/demo,即可在本直播间看到您的直播内容,具体操作请看demo说明',
          okText: '确定',
          okTheme: 'assertive'
        })
        this.player.pause()
        this.player.src("http://www.veton.cc/hls/demo.m3u8")
        this.player.play()
      },
      open: function () {
        console.log('slideoutOpen')
      },
      onTabClick(index){
        console.log(index)
        if (index == 0 && index != this.tabIndex) {
          this.tabIndex = index;
          this.$router.push('/')
        }
        if (index == 1 && index != this.tabIndex) {
          this.tabIndex = index;
          this.$router.push('/guest')
        }
        if (index == 2 && index != this.tabIndex) {
          this.tabIndex = index;
          this.$router.push('/roomInfo')
        }
        if (index == 3  && index != this.tabIndex) {
          this.tabIndex = index;
          this.$router.push('/history')
        }
      },
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      onPlayerEnded(player) {
        // console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
        // console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        // console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate(player) {
        // console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
      }
    },
    mounted() {
      //this.$refs.tabs.tabItems[1]="现场嘉宾"+this.getOnlineGuest.length
      // console.log('this is current player instance object', this.player)
      /*setTimeout(() => {
       // console.log('dynamic change options', this)
       this.playerOptions.muted = false
       }, 2000)*/
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

  .tabs-striped.tabs-background-positive .tabs {
  / / background-color: #8be24a;
  }

  .tabs-striped.tabs-color-positive .tab-item.tab-item-active, .tabs-striped.tabs-color-positive .tab-item.active, .tabs-striped.tabs-color-positive .tab-item.activated {
    color: #4c0;
  }

  .tabs-striped.tabs-color-positive .tab-item {
    color: #a2a2a2;
  }

  .tabs-background-light .tabs, .tabs-background-light > .tabs {
  / / border-color: #4c0;
  }

  .tabs-striped .tabs {
    border: none;
  }

  .tabs-striped.tabs-color-positive .tab-item.tab-item-active, .tabs-striped.tabs-color-positive .tab-item.active, .tabs-striped.tabs-color-positive .tab-item.activated {
    border: 0 solid #4c0;
    border-top-width: 0px !important;
    border-bottom-width: 3px;
  }

</style>
