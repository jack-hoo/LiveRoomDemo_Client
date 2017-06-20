<template>
    <div>
      <scroll style="margin-top: 355px" class="tab-body">
        <div style="" v-for="message in messages">
          <span style="color: cornflowerblue;">{{message.creator}}:</span>
          <span>{{message.msgBody}}</span>
        </div>
      </scroll>
      <div class="von-input-wrapper input">
        <input ref="input" type="text" @keyup.13="sendMsg" class="input-text" v-model="inputText" placeholder="加入聊天室">
        <input type="button" @click="sendMsg" class="button button-balanced" style="float: right;width: 20%;" value="发送">
      </div>
    </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import { getToServer } from '../api/api'
  export default{
    data(){
      /*http://192.168.1.115:8085/live*/
      return {
        endPoint:"/LiveDemo/live",
        inputText:'',
        messages:[],
      }
    },
    stompClient: {
      monitorIntervalTime: 100000,
      stompReconnect: false,
      timeout(orgCmd) {
      }
    },
    methods: {
      ...mapActions([
          'setOnlineGuest'
      ]),
      sendMsg(){
        this.sendToServer()
        this.inputText = "";
        this.$refs.input.focus();
      },
      onConnected(frame){
        this.messages.push({
          creator:'系统消息',
          msgBody:'连接成功！'
        })
        this.$stompClient.subscribe('/topic/group', this.receiveMsg, {id:0});
        this.$stompClient.subscribe('/topic/online_user', this.receiveOnlineGuest, this.onFailed);
      },
      receiveOnlineGuest(frame){
          //console.log(typeof JSON.parse(frame.body))
          console.log(frame.body)
          //this.setOnlineGuest(JSON.parse(frame.body))
      },
      onFailed(frame){
        this.messages.push({
          creator:'系统消息',
          msgBody:'连接失败!'
        })
        //alert('Failed: ' + JSON.stringify(frame));
      },
      connectSrv(){
        this.messages.push({
          creator:'系统消息',
          msgBody:'连接中...'
        })
        var headers = {
          //"login": 'guest',
          //"passcode": 'guest',
          // additional header
        };
        this.connetWM(this.endPoint,headers, this.onConnected, this.onFailed);
      },
      getInvokeId(){
        let hex = (this.invokeIdCnt++ ).toString(16);
        var zero = '0000';
        var tmp  = 4-hex.length;
        return zero.substr(0,tmp) + hex;
      },
      sendToServer(){
        let destination = '/demo/chat'
        let body = this.inputText;
        let invokeId = this.getInvokeId();
        this.sendWM(destination, body, invokeId ,function (frame) {
            /*console.log("frame!!")
          console.log("sendWM返回消息=" + frame.body);*/
        }, 3000);
      },
      receiveMsg(frame){
        //收到订阅消息
        this.messages.push(JSON.parse(frame.body))
        this.send({
         text:JSON.parse(frame.body).msgBody,
         speed:parseInt(Math.random()*4+1, 10),
         color:'white',
         classname:'style'+parseInt(Math.random()*3+1, 10),
         });
      },
      disconnect(){
        this.disconnetWM();
      }
    },
    mounted(){
      getToServer().then(res =>{
        console.log(res)
        this.connectSrv();
      })
      //this.$refs.input.focus();
      this.send = this.$start(document.querySelector('.video'),[0,0.5])
    }
  }
</script>
<style scoped>
  .input{
    position: absolute;
    bottom: 0px;
    width: 100%;
    z-index:999999;
  }
  .input-text{
    float: left;
    width: 80%;
    height: 44px !important;
    border-radius: 4px;
    padding-left: 10px !important;
  }
</style>
