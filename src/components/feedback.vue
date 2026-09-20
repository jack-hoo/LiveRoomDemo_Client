<template>
  <div>
    <von-header theme="balanced">
      <a href="#about" class="button button-icon ion-ios-arrow-back" slot="left"></a>
      <span slot="title">问题反馈</span>
    </von-header>
    <div class="tip">
      这是一个演示项目，没有后端反馈接口。<br>
      发现问题请到
      <a href="https://github.com/jack-hoo/LiveRoomDemo_Client/issues" target="_blank"
         rel="noopener noreferrer">GitHub Issues</a>
      提交，谢谢！
    </div>
  </div>
</template>
<script>
  /*
   * 原来这里是一个文本框加"发送"按钮，点击后弹一句"信息已发送，谢谢您的反馈"，
   * 但代码里根本没有任何请求——用户以为反馈提交了，其实什么都没发生。
   * 与其留一个假的表单，不如直接指向真正能收到反馈的地方。
   */
  export default {}
</script>
<style scoped>
  .tip {
    margin-top: 64px;
    padding: 20px;
    font-size: 15px;
    line-height: 1.8;
    color: #666;
  }
</style>
