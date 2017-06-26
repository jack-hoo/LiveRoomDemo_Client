# LiveRoomDemo(客户端)
> 这是一个用Vue.js写的一个直播间Demo,主要实现了以下功能
* 拉取服务器上的直播流(移动端拉取hls流、电脑端拉取rtmp流)
* 基于websocket的直播聊天室
* 直播间弹幕
* 直播间的实时数据统计    
* [演示地址(电脑端与移动端效果不同哦)](http://139.199.82.213:8080/LiveDemo/live_room)
* [博客地址](https://segmentfault.com/a/1190000009892006)
## 技术栈  

- VUE全家桶
- UI层vonic
- axios
- 视频播放器: vue-video-player + videojs-contrib-hls
- websocket客户端: vue-stomp
- 弹幕插件: vue-barrage
- 打包工具:webpack

## 运行截图
### 手机端
![手机端](https://github.com/jack-hoo/LiveRoomDemo_Client/blob/master/static/screenshot/mb.gif)    

![户外直播](https://github.com/jack-hoo/LiveRoomDemo_Client/blob/master/static/screenshot/huwai.png)    

![lol](https://github.com/jack-hoo/LiveRoomDemo_Client/blob/master/static/screenshot/lol2.png)    

![lol2](https://github.com/jack-hoo/LiveRoomDemo_Client/blob/master/static/screenshot/lol.png)    

>移动端弹幕    

![mbdamu](https://github.com/jack-hoo/LiveRoomDemo_Client/blob/master/static/screenshot/mbdanmu.png)    

### 电脑端 

![全局](https://github.com/jack-hoo/LiveRoomDemo_Client/blob/master/static/screenshot/quanju.jpg)   

> 弹幕效果    

![弹幕](https://github.com/jack-hoo/LiveRoomDemo_Client/blob/master/static/screenshot/danmu.png)    

![户外直播](https://github.com/jack-hoo/LiveRoomDemo_Client/blob/master/static/screenshot/mzdemo.jpg)
## 安装运行(需要配合[服务端](https://github.com/jack-hoo/LiveRoomDemo_Server))

- quick


``` bash
git clone https://github.com/jack-hoo/LiveRoomDemo_Client.git
cd LiveRoomDemo_Client
npm install -g yarn
yarn
```

- development

```bash
npm run dev
```

- build

```bash
npm run build
```
