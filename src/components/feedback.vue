<template>
  <div>
    <von-header theme="balanced" style="">
      <a href="#about" class="button button-icon ion-ios-arrow-back" slot="left"></a>
      <span slot="title">问题反馈</span>
    </von-header>
    <textarea class="textarea" rows="20" placeholder="请输入您遇到的问题~~"></textarea>
    <md-button class="button button-balanced" style="border-radius:0px;position: fixed;
        bottom: 0px;width: 100%" @click.native="feedback">
      发送
    </md-button>
  </div>
</template>
<script>
  export default {
    methods: {
      feedback(){
        //发送反馈信息
        $toast.show('信息已发送，谢谢您的反馈，我将努力改进！', 2000)
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped>
  .textarea {
    margin-top: 44px;
    padding: 5px;
    width: 100%;
  }
</style>
