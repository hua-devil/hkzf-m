// 配置axios
import axios from 'axios'
// 配置基本地址 
// 第一种写法
// axios.defaults.baseURL = 'http://api-haoke-dev.itheima.net'
// 第二种写法
import {BASE_URL} from './url'
const API = axios.create({
  baseURL : BASE_URL
})
export {API}