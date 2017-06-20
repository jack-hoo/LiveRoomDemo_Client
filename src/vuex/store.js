/**
 * Created by Administrator on 2017/6/17.
 */
import Vue from 'vue'
import VueX from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(VueX)
const state ={
  onlineGuest:[]
}
const mutations={
  SETONLINEGUEST(state,onlineGuest){
    state.onlineGuest = onlineGuest
  }
}
//创建store 实例
export default new VueX.Store({
  actions,
  getters,
  state,
  mutations
})
