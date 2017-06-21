<template>
  <div class="page">
    <div class="page-content">
      <von-header theme="balanced" style="">
        <a href="#/" class="button button-icon ion-ios-arrow-back" slot="left"></a>
        <span slot="title">直播间demo说明</span>
        <a href="http://www.baidu.com" class="button button-icon ion-social-github" slot="right"></a>
      </von-header>
      <div class="">
        <scroll class="content-box">
          <h4>1.功能说明:</h4>
          <ul>
            <li>1.观看直播</li>
            <li>2.切换直播源</li>
            <li>3.聊天室</li>
            <li>4.发送弹幕</li>
            <li>5.在线人数实时监控</li>
            <li>6.直播间访问记录</li>
          </ul>
          <h4>2.使用说明:</h4>
          <ul >
            <li>
              1.切换直播源
              <p>
                本直播间(移动端)默认的直播源是http://183.207.249.15/PLTV/3/224/3221225529/index.m3u8,如果你想尝试自己推流，点击我要直播按钮之后，你可以选择推流工具OBS(专业级别，适用于电脑端推流)或者手机端的推流软件
                Yasea(灰常强大的开源手机端推流软件)我这里给一个<a href="https://pan.baidu.com/s/1gfcgLYb">下载链接</a>apk非常小才1.2M,
                然后在推流软件中选择推流地址rtmp://www.veton.cc/live/demo,推送到本站服务器地址，即可看到你的直播内容，你可以分享直播间地址，你的好友就能看到你的直播内容啦~~.
              </p>
            </li>
            <li>
              2.项目源码地址
              <p><a href="https://github.com/jack-hoo/LiveRoomDemo_Client">https://github.com/jack-hoo/LiveRoomDemo_Client</a>欢迎star!</p>
            </li>
          </ul>
          <h4>3.技术说明:</h4>
          <ul>
            <li>
              1.前端技术(移动端)
              <p>
                <span>项目架构：Vue2+vue-router2+vuex2+axios</span><br>
                <span>UI框架: Vonic2.0</span><br>
                <span>视频播放器: vue-video-player + videojs-contrib-hls</span><br>
                <span>websocket客户端: vue-stomp</span><br>
                <span>弹幕插件: vue-barrage</span><br>
                <span>打包工具:webpack</span><br>
                <span>访问地址: <a href="http://www.veton.cc:8080/LiveDemo/live_room">请使用手机访问效果更佳</a></span>
              </p>

            </li>
            <li>
              2.前端技术(电脑端)
              <p >
                <span>项目架构: Jquery + BootStrap </span><br>
                <span>视频播放器: video.js</span><br>
                <span>websocket客户端: stomp.js + sockjs.js</span><br>
                <span>弹幕插件: Jquery.danmu.js</span><br>
                <span>模版引擎: thymeleaf</span><br>
                <span>访问地址: <a href="http://www.veton.cc:8080/LiveDemo/live_room">请使用电脑访问效果更佳</a></span>
              </p>

            </li>
            <li>
              2.后端技术
              <p >
                <span>IDE: IntelliJ IDEA</span><br>
                <span>项目架构: SpringBoot1.5.4 +Maven3.0 </span><br>
                <span>主数据库: Mysql5.7</span><br>
                <span>辅数据库: redis3.2 </span><br>
                <span>数据库访问层: spring-boot-starter-data-jpa + spring-boot-starter-data-redis</span><br>
                <span>websocket: spring-boot-starter-websocket</span><br>
                <span>消息中间件: RabbitMQ/3.6.10</span>
              </p>

            </li>
            <li>
              3.服务器部署
              <p>
                <span>视频直播模块: nginx-rtmp-module</span><br>
                <span>web应用服务器: tomcat8.0</span><br>
                <span>服务器: 腾讯云centos6.5</span>
              </p>

            </li>
          </ul>
          <h4>4.bug说明:</h4>
          <ul>
            <li>
              1.在移动端使用QQ等浏览器播放过视频后,输入框和弹幕无法显示。
              <p>
                <span>原因:由于QQ、UC等主流浏览器会检测网页中的video标签，并使用浏览器自带的视频播放器播放视频，
                导致无法显示弹幕和输入框。(在很多直播平台也存在这样的问题，比如熊猫TV的移动端。)</span><br>
              <p>解决办法:使用谷歌(手机端）浏览器,或尝试访问本直播间的电脑端</p>
              </p>
            </li>
          </ul>
          <h4>5.关于作者:</h4>
          <ul>
            <li>作者: 胡上杰</li>
            <li>学历: 本科</li>
            <li>个人简历: <a href="/LiveDemo/resume">胡上杰的简历</a></li>
            <li>毕业院校: 江西财经大学软件工程</li>
            <li>技术栈:JavaWeb全栈开发</li>
            <li>Demo技术详解: <a href="">here</a></li>
            <li>博客地址: <a href="http://blog.csdn.net/hushangjie">csdn</a></li>
            <li>开源项目地址: <a href="https://github.com/jack-hoo">github</a></li>
            <li>状态: 求职中(谢谢各位老板和猎手)</li>
            <li>联系方式: 15579870840</li>
            <li>邮箱: 979783618@qq.com</li>
          </ul>
        </scroll>
        <md-button class="button button-balanced" style="border-radius:0px;position: fixed;
        bottom: 0px;width: 100%" @click.native="feedback" >
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
      feedback(){
        this.$router.push('/feedback')
      }   ,
      open: function () {
        console.log('slideoutOpen')
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

  ul > li >p{
    color: black;
  }
  ul > li >p >span{
    color: #a16014
  }
  .content-box {
    margin-top: 80px;
    padding: 4px;
    margin-bottom: 55px;
  }


</style>
