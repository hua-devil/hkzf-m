// 配置axios
import axios from 'axios'
// 配置基本地址 
// 第一种写法
// axios.defaults.baseURL = 'http://api-haoke-dev.itheima.net'
// 第二种写法
import {BASE_URL} from './url'
import {getToken,removeToken} from './token'
const API = axios.create({
  baseURL : BASE_URL
})
// 请求拦截器
// axios.interceptors.request.use(function(config){
API.interceptors.request.use(function(config){
  console.log('config',config)
  // startWith 以什么开头
  if(config.url.startsWith('/user') 
  && !config.url.startsWith('/user/registered')
  && !config.url.startsWith('/user/login')
  ){
    config.headers.authorization=getToken()
  }
  return config
})

// 响应拦截器   同一判断状态码
API.interceptors.response.use(function(response){
  console.log('响应拦截器',response)
  if(response.data.status===400){
    removeToken()
    console.log('token有问题，删了')
  }else if(response.data.status===501){
    console.log('服务器有问题，请稍等')
  }
})



export {API}