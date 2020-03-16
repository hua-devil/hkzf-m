import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import './index.scss'
import PropTypes from 'prop-types'
// 单独封装得组件不能使用路由操作
 class NavHeader extends Component {
  render() {
    return <NavBar 
    className="navbar"
    mode="light"  // dark 深蓝色
    icon={<Icon type="left" />}
    onLeftClick={() => {this.props.history.go(-1)}}
    >{this.props.children}</NavBar>
    // 1.可以属性写{this.props.title}    <NavHeader title='地图找房'></NavHeader>
    // 2.传值 {this.props.children} <NavHeader>地图找房</NavHeader>
  }
}
NavHeader.propTypes={
  children:PropTypes.string
}
NavHeader.defaultProps = {
  children:'默认导航栏'
}
// 导出withRouter  包裹一下就可以使用路由操作
export default withRouter(NavHeader)