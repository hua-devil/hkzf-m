import React, { Component } from 'react'
import { Route,Redirect } from 'react-router-dom'
import Rent from '../../pages/Rent'
import { isAuth } from '../../utils/token'
export default class AuthRoute extends Component {
  render() {
    let {path,exact,Yemian} = this.props
    return <Route 
    exact ={exact}
    path={path}
    render={(newprops)=>{
      // 如果登录了，有token，就可以看rent
      // 如果没有登录，强制跳转登录
      if(isAuth()){
        return <Yemian {...newprops}></Yemian>
      }else{
        return <Redirect to="/login"></Redirect>
      }
    }}></Route>
  }
}
