import React,{Component} from 'react'
// import { Button } from 'antd-mobile';
// 配置基本路由
import { BrowserRouter,Route,Link,Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Citylist from './pages/Citylist'
import Map from './pages/Map'
import HouseDetail from './pages/HouseDetail'
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
      </div>
    </BrowserRouter>
  }
}