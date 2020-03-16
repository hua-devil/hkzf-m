import React, { Component } from 'react'
// 在map组件 = 使用百度地图
// 注意 1 原生js 是自带定位的
// navigator.geolocation.getCurrentPosition((position)=>{
//   console.log('位置',position)
// })
import './map.scss'
// import { NavBar, Icon } from 'antd-mobile'
import NavHeader from '../../components/NavHeader'
let BMap = window.BMap
export default class Map extends Component {
  componentDidMount(){
    this.initMap()
  }
  initMap(){
    // 引入全局变量要加window
    // 创建地图实例
    var map = new BMap.Map("container")
    // 设置中心点坐标
    var point = new BMap.Point(116.404, 39.915)
    // 地图初始化，同时设置地图展示级别
    map.centerAndZoom(point, 15);
  }
  render() {
    return <div className="map">
        {/* 顶部导航栏 */}
        <NavHeader>地图找房</NavHeader>
        {/* 创建div用来显示地图 */}
        <div id="container"></div>
      </div>
  }
}


