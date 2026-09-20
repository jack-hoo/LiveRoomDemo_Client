<template>
  <div>
    <scroll style="margin-top: 350px">
      <div v-for="(guest, index) in getOnlineGuest" :key="guest.ip || index" class="box">
        <span style="color: #44cc00">{{guest.randomName}}</span>
        <span style="color: mediumvioletred;margin-left: 15px">{{guest.ip}}</span>
      </div>
      <div v-if="!getOnlineGuest.length" class="empty">暂无在线嘉宾</div>
    </scroll>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import { getOnlineGuests } from '../api/api'

  export default {
    computed: {
      ...mapGetters([
        'getOnlineGuest'
      ])
    },
    methods: {
      ...mapActions([
        'setOnlineGuest'
      ])
    },
    mounted () {
      getOnlineGuests().then(res => {
        this.setOnlineGuest(res.data)
      }).catch(err => {
        // 原来没有 catch，接口挂掉时 Promise 静默 reject，页面一直空白且控制台无提示
        console.error('获取在线嘉宾失败', err)
      })
    }
  }
</script>
<style scoped>
  .box {
    padding: 6px;
  }

  .empty {
    padding: 20px;
    text-align: center;
    color: #999;
  }
</style>
