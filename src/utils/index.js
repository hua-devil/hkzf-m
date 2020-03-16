// 封装获取当前定位城市的函数
// 思路  百度调用接口   有次数限制
// 我们没有必要每次都调用嘚城市接口
// 如果不使用promise 函数是异步的
import axios from 'axios'
export let getCurrentCity=()=>{
  console.log('封装执行了')
  let city = JSON.parse(localStorage.getItem('my-city'))
  if(!city){
    return new Promise(function(resolve,reject){
      var myCity = new window.BMap.LocalCity();
      myCity.get(async (result)=>{
        var cityName = result.name;  // 只是名字
        console.log("当前定位城市:"+cityName)
        let res = await axios.get('http://api-haoke-dev.itheima.net/area/info?name='+cityName)
        console.log('定位城市',res);
        localStorage.setItem('my-city',JSON.stringify(res.data.body))
        resolve(res.data.body)
      })
    })
    // return p
  }else{
    // 有值，直接用
    // 为了格式一致  也需要返回promise
    // return new Promise(function(resolve,reject){
    //   resolve(city)
    // })
    // 简化写法
    return Promise.resolve(city)
  }
}
