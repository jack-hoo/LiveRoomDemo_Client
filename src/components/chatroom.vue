<template>
  <div>
    <scroll style="margin-top: 355px" class="tab-body">
      <!-- 原来 v-for 没有 key，Vue 会在控制台一直报警告，列表复用也容易串行 -->
      <div v-for="(message, index) in messages" :key="index">
        <span style="color: cornflowerblue;">{{message.creator}}:</span>
        <span>{{message.msgBody}}</span>
      </div>
    </scroll>
    <div class="von-input-wrapper input">
      <input ref="input" type="text" @keyup.enter="sendMsg" class="input-text" v-model="inputText"
             placeholder="加入聊天室">
      <input type="button" @click="sendMsg" class="button button-balanced"
             style="float: right;width: 20%;" value="发送">
    </div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import { getToServer } from '../api/api'
  import { WS_ENDPOINT } from '../config'

  export default {
    data () {
      return {
        endPoint: WS_ENDPOINT,
        inputText: '',
        messages: [],
        // 原来这个计数器从未初始化，getInvokeId() 里的 this.invokeIdCnt++ 是
        // undefined++ → NaN，拼出来的 invokeId 永远是字符串 "0NaN"。
        invokeIdCnt: 0,
        connected: false
      }
    },
    stompClient: {
      monitorIntervalTime: 100000,
      stompReconnect: false,
      timeout (orgCmd) {
      }
    },
    methods: {
      ...mapActions([
        'setOnlineGuest'
      ]),
      sendMsg () {
        const body = this.inputText.trim()
        // 原来不做判空，回车就会把空串发给服务端
        if (!body) {
          return
        }
        if (!this.connected) {
          this.pushSystemMessage('尚未连接到服务器，请稍后再试')
          return
        }
        this.sendToServer(body)
        this.inputText = ''
        this.$refs.input.focus()
      },
      pushSystemMessage (text) {
        this.messages.push({ creator: '系统消息', msgBody: text })
      },
      onConnected (frame) {
        this.connected = true
        this.pushSystemMessage('连接成功！')
        this.$stompClient.subscribe('/topic/group', this.receiveMsg, { id: 0 })
        this.$stompClient.subscribe('/topic/online_user', this.receiveOnlineGuest, this.onFailed)
      },
      receiveOnlineGuest (frame) {
        // 服务端推送的是当前在线用户集合，直接同步到 vuex，
        // "现场嘉宾" 标签页就能实时刷新，不用每次切页再拉一次接口。
        try {
          this.setOnlineGuest(JSON.parse(frame.body))
        } catch (e) {
          console.error('解析在线用户列表失败', e)
        }
      },
      onFailed (frame) {
        this.connected = false
        this.pushSystemMessage('连接失败!')
      },
      connectSrv () {
        this.pushSystemMessage('连接中...')
        const headers = {}
        this.connetWM(this.endPoint, headers, this.onConnected, this.onFailed)
      },
      getInvokeId () {
        const hex = (this.invokeIdCnt++).toString(16)
        const zero = '0000'
        return zero.substr(0, Math.max(0, 4 - hex.length)) + hex
      },
      sendToServer (body) {
        const destination = '/demo/chat'
        const invokeId = this.getInvokeId()
        this.sendWM(destination, body, invokeId, function (frame) {
        }, 3000)
      },
      receiveMsg (frame) {
        const message = JSON.parse(frame.body)
        this.messages.push(message)
        if (this.send) {
          this.send({
            text: message.msgBody,
            speed: parseInt(Math.random() * 4 + 1, 10),
            color: 'white',
            classname: 'style' + parseInt(Math.random() * 3 + 1, 10)
          })
        }
      },
      disconnect () {
        this.connected = false
        this.disconnetWM()
      }
    },
    mounted () {
      // 必须先请求 /live_room：服务端在这一步把访客写进 session，
      // 之后 WebSocket 握手拦截器才认这个连接，否则握手会被直接拒绝。
      getToServer().then(() => {
        this.connectSrv()
      }).catch(err => {
        console.error('初始化直播间失败', err)
        this.pushSystemMessage('无法连接到服务器，请检查后端是否已启动')
      })
      this.send = this.$start(document.querySelector('.video'), [0, 0.5])
    },
    beforeDestroy () {
      // 原来没有做清理，组件销毁后 STOMP 连接还挂着
      if (this.connected) {
        this.disconnect()
      }
    }
  }
</script>
<style scoped>
  .input {
    position: absolute;
    bottom: 0px;
    width: 100%;
    z-index: 999999;
  }

  .input-text {
    float: left;
    width: 80%;
    height: 44px !important;
    border-radius: 4px;
    padding-left: 10px !important;
  }
</style>
