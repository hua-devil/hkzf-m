// 封装localstorag
// 获取token
let getToken = ()=>{
  return localStorage.getItem("my-token")
}
let setToken = (val)=>{
  localStorage.setItem('my-token',val)
}
let removeToken = ()=>{
  localStorage.removeItem("my-token")
}
let isAuth=()=>{
  return !!getToken()
}

// 导出
export {getToken, setToken, removeToken, isAuth}