# LiveRoomDemo(移动端)
> 这是一个用Vue.js写的一个直播间Demo,主要实现了以下功能
* 拉取服务器上的直播流(移动端拉取hls流、电脑端拉取rtmp流)
* 基于websocket的直播聊天室
* 直播间弹幕
* 直播间的实时数据统计    
* [演示地址(电脑端与移动端效果不同哦)](http://www.veton.cc:8080/LiveDemo/live_room)

## 技术栈   

- VUE全家桶
- UI层vonic
- axios
- 视频播放器: vue-video-player + videojs-contrib-hls
- websocket客户端: vue-stomp
- 弹幕插件: vue-barrage
- 打包工具:webpack

## 运行截图   
> 全局效果
![全局](https://github.com/jack-hoo/LiveRoomDemo_Client/blob/master/static/screenshot/quanju.jpg)
> 弹幕效果
![弹幕](https://github.com/jack-hoo/LiveRoomDemo_Client/blob/master/static/screenshot/danmu.png)

## 安装运行(需要配合服务端)

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
