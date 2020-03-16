import React, { Component } from 'react'
// 在map组件 = 使用百度地图
// 注意 1 原生js 是自带定位的
// navigator.geolocation.getCurrentPosition((position)=>{
//   console.log('位置',position)
// })
import './map.scss'
import styles from './map.module.css'
// import { NavBar, Icon } from 'antd-mobile'
import NavHeader from '../../components/NavHeader'
// 导入定位城市
import { getCurrentCity } from '../../utils/index'
let BMap = window.BMap
export default class Map extends Component {
  componentDidMount(){
    this.initMap()
  }
  async initMap(){
    // 引入全局变量要加window
    // 1.获取当前定位城市
    let dingwei = await getCurrentCity()
    console.log('定位城市',dingwei);  // label是城市  value是id
    // 创建地图实例
    var map = new BMap.Map("container")
    // 2.城市名转换成坐标 经纬度
    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(dingwei.label, (point)=>{
      console.log('城市转换得坐标点',point);
      // 地图初始化，同时设置地图展示级别
      map.centerAndZoom(point, 11);//放大缩小级别11
      
    }, dingwei.label);


    // // 创建地图实例
    // var map = new BMap.Map("container")
    // 设置中心点坐标
    // var point = new BMap.Point(116.404, 39.915)
    // 地图初始化，同时设置地图展示级别
    // map.centerAndZoom(point, 15);
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


