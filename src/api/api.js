/**
 * Created by Administrator on 2017/6/17.
 */
import axios from 'axios'
/*let base = 'http://192.168.1.107:8085';
axios.defaults.baseURL = base;*/
axios.defaults.baseURL = "/LiveDemo"
export const getOnlineGuests = params =>{ return axios.get('/online_guests',{params,params})}

export const getHistoryGuests = params =>{ return axios.get('/history_guests',{params,params})}

export const getToServer = params => {return axios.get('/live_room',{params,params})}

