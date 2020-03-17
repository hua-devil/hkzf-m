// 配置axios
import axios from 'axios'
// 配置基本地址 
// 第一种写法
// axios.defaults.baseURL = 'http://api-haoke-dev.itheima.net'
// 第二种写法
const API = axios.create({
  baseURL : 'http://api-haoke-dev.itheima.net'
})
export {API}