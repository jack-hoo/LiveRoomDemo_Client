<template>
  <div>
    <scroll style="margin-top: 350px">
      <div v-for="(guest, index) in guests" :key="index" class="box">
        <span style="color: #44cc00">{{guest.userEntity.randomName}}</span>
        <span style="color: mediumvioletred;margin-left: 15px">{{guest.userEntity.ip}}</span>
        <span style="color: rgba(75,60,32,0.19);margin-left: 15px">{{guest.accessTime|formatDate}}</span>
      </div>
      <div v-if="!guests.length" class="empty">暂无访客记录</div>
    </scroll>
  </div>
</template>
<script>
  import { formatDate } from '../public/utils/Date'
  import { getHistoryGuests } from '../api/api'

  export default {
    data () {
      return {
        guests: []
      }
    },
    filters: {
      formatDate (time) {
        return formatDate(new Date(time), 'yyyy-MM-dd hh:mm')
      }
    },
    mounted () {
      getHistoryGuests().then(res => {
        this.guests = res.data
      }).catch(err => {
        console.error('获取访客记录失败', err)
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
