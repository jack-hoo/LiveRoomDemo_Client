import axios from 'axios'
import { API_BASE } from '../config'

axios.defaults.baseURL = API_BASE

/*
 * 原来三个方法都写成 axios.get(url, { params, params })。
 * 对象字面量里重复同一个 key，后一个会覆盖前一个，等价于 { params }——
 * 属于无害但会误导读者的写法（严格模式下的老版本 JS 还会直接报错）。
 */
export const getOnlineGuests = params => axios.get('/online_guests', { params })

export const getHistoryGuests = params => axios.get('/history_guests', { params })

export const getToServer = params => axios.get('/live_room', { params })
