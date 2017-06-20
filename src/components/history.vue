<template>
  <div>
    <scroll style="margin-top: 350px">
      <div v-for="guest in guests" class="box">
        <span style="color: #44cc00">{{guest.userEntity.randomName}}</span>
        <span style="color: mediumvioletred;margin-left: 15px">{{guest.userEntity.ip}}</span>
        <span style="color: rgba(75,60,32,0.19);margin-left: 15px">{{guest.accessTime|formatDate}}</span>
      </div>
    </scroll>
  </div>
</template>
<script>
  import {formatDate} from '../public/utils/Date'
  import {getHistoryGuests} from '../api/api'
  export default{
    data(){
      return {
          guests:[]
      }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh : mm');
      }
    },
    methods: {

    },
    mounted(){
      getHistoryGuests().then(res =>{
          this.guests = res.data
        })
    }

  }
</script>
<style scoped>
  .box {
    padding: 6px;
  }
</style>
