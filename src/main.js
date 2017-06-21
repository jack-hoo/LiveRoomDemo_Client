import Vue from 'vue'
import Vonic from 'vonic'
import store from './vuex/store'
import Vuex from 'vuex'
import VueVideoPlayer from 'vue-video-player'
import barrage from "vue2-barrage"
import VueStomp from "vue-stomp"
// Page Components
import Index from './components/Index.vue'
import About from './components/About.vue'
import ChatRoom from './components/chatroom.vue'
import Guest from './components/guest.vue'
import History from './components/history.vue'
import FeedBack from './components/feedback.vue'
import RoomInfo from './components/roominfo.vue'

Vue.use(Vuex)
Vue.use(VueStomp,"/LiveDemo/live")
Vue.use(VueVideoPlayer)
Vue.use(barrage)
// Routes
const routes = [
  { path: '/',
    component: Index,
    children:[{
        path: '/',
        component: ChatRoom
    },{
        path:'/guest',
        component: Guest
    },{
        path:'/history',
        component: History
    },{
        path:'/roomInfo',
        component: RoomInfo
    }
  ]},
  { path: '/about', component: About },
  { path: '/feedback', component: FeedBack}
]

Vue.use(Vonic.app, {
  routes: routes,
  store:store
})
