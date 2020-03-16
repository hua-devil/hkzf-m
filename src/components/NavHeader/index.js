import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'
export default class NavHeader extends Component {
  render() {
    return <NavBar 
    className="navbar"
    mode="light"  // dark 深蓝色
    icon={<Icon type="left" />}
    onLeftClick={() => this.props.history.go(-1)}
    >{this.props.children}</NavBar>
    // 1.可以属性写{this.props.title}    <NavHeader title='地图找房'></NavHeader>
    // 2.传值 {this.props.children} <NavHeader>地图找房</NavHeader>
  }
}

