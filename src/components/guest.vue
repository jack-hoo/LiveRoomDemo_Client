<template>
  <div>
    <scroll style="margin-top: 350px">
      <div v-for="guest in getOnlineGuest" class="box">
        <span style="color: #44cc00">{{guest.randomName}}</span>
        <span style="color: mediumvioletred;margin-left: 15px">{{guest.ip}}</span>
      </div>
    </scroll>
  </div>
</template>
<script>
  import {mapGetters , mapActions} from 'vuex'
  import { getOnlineGuests } from '../api/api'
  export default{
    data(){
      return {}
    },
    computed: {
      ...mapGetters([
        'getOnlineGuest'
      ])
    },
    methods:{
      ...mapActions([
          'setOnlineGuest'
    ])
    },
    mounted(){
      //console.log("guest ready!")
      getOnlineGuests().then(res =>{
          this.setOnlineGuest(res.data)
      })
    }
  }
</script>
<style scoped>
  .box {
    padding: 6px;
  }
</style>
