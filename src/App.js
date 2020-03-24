import React,{Component} from 'react'
// import { Button } from 'antd-mobile';
// 配置基本路由
import { BrowserRouter,Route,Link,Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Citylist from './pages/Citylist'
import Map from './pages/Map'
import HouseDetail from './pages/HouseDetail'
import Login from './pages/Login'
import Rent from './pages/Rent'
import RentAdd from './pages/Rent/Add'
import RentSearch from './pages/Rent/Search'
// import {isAuth} from './utils/token'
import AuthRoute from './components/AuthRoute'
export default class App extends Component{
  render() {
    return <BrowserRouter>
      <div className="App">
        {/* App一般配置路由 */}
        <Route exact path="/" 
        render={(props)=>{
          return <Redirect to="/home/index"></Redirect>
        }}></Route>
        <Route path="/home" component={Home}></Route>
        <Route exact path="/citylist" component={Citylist}></Route>
        <Route exact path="/map" component={Map}></Route>
        {/* 配置详情页面路由 */}
        <Route exact path="/detail/:id" component={HouseDetail}></Route>
        {/* 配置登录页面路由 */}
        <Route exact path="/login" component={Login}></Route>
        {/* 配置/rent房屋管理页面路由   第一种*/}
        {/* <Route exact path="/rent" component={Rent}></Route> */}
        
        <AuthRoute exact={true} path="/rent" Yemian={Rent}></AuthRoute>
        <AuthRoute exact={true} path="/rent/add" Yemian={RentAdd}></AuthRoute>
        <AuthRoute exact={true} path="/rent/search" Yemian={RentSearch}></AuthRoute>
        {/* 第二种写法 */}
        {/* <Route 
        exact path="/rent" 
        render={(props)=>{
          // 如果登录了，有token，就可以看rent
          // 如果没有登录，强制跳转登录
          if(isAuth()){
            return <Rent></Rent>
          }else{
            return <Redirect to="/login"></Redirect>
          }
        }}></Route> */}
      </div>
    </BrowserRouter>
  }
}