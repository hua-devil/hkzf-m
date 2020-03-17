import React, { Component } from 'react'
import axios from 'axios'
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
    // 获取所有区得房子
    this.initMap()
  }
  async initMap(){
    // 引入全局变量要加window
    // 1.获取当前定位城市
    let dingwei = await getCurrentCity()
    console.log('定位城市',dingwei);  // label是城市  value是id
    // 创建地图实例
    this.map = new BMap.Map("container")
    // 2.城市名转换成坐标 经纬度
    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(dingwei.label, async (point)=>{
      console.log('城市转换得坐标点',point);
      // 地图初始化，同时设置地图展示级别
      this.map.centerAndZoom(point, 11);//放大缩小级别11
      this.map.addControl(new BMap.NavigationControl());   //缩放控件   
      this.map.addControl(new BMap.ScaleControl());   //比例尺  
      // map.addControl(new BMap.OverviewMapControl());  //右下角小地图  
      this.map.addControl(new BMap.MapTypeControl());    //切换地图 卫星  三维 控件
      this.renderOVerlays(dingwei.value)
    },dingwei.label)
  }
  async renderOVerlays(id){
    // 先获取所有区得数据
    let res = await axios.get('http://api-haoke-dev.itheima.net/area/map?id='+id)
    console.log('房子套数',res);
    
    res.data.body.forEach((item) => {
      // 创建一个最简单得文字覆盖物
      // 每个数据都有自己得经纬度，需要用百度方法转换一下普通得经纬度
      let point = new BMap.Point(item.coord.longitude,item.coord.latitude)
      var opts = {
        position : point,    // 指定文本标注所在的地理位置
        offset   : new BMap.Size(-35, -30)    //设置文本偏移量  修改圈圈位置
      }
      var label = new BMap.Label('', opts);  // 创建文本标注对象
      label.setContent(`
        <div class="${styles.bubble}">
            <p class="${styles.name}">${item.label}</p>
            <p>${item.count}套</p>
      </div>`)
        label.setStyle({
          border:'none',
          padding:0
        });
        label.addEventListener('click',() => {
          console.log('覆盖物被点击了id',item.value);
          this.map.centerAndZoom(point, 13)
          this.renderOVerlays(item.value)
        })
      this.map.addOverlay(label);  
    })
    /* 
      // 创建一个最简单得文字覆盖物
      // var opts = {
      //   position : point,    // 指定文本标注所在的地理位置
      //   offset   : new BMap.Size(30, -30)    //设置文本偏移量
      // }
      // 方法1
      // 创建label    类似div最外层盒子
      // var label = new BMap.Label(
      //   `<div class="${styles.bubble}">
      //       <p class="${styles.name}">朝阳区</p>
      //       <p>10套</p>
      //   </div>`, opts);  // 创建文本标注对象

      // 方法2
      var label = new BMap.Label('', opts);  // 创建文本标注对象
      label.setContent(`
        <div class="${styles.bubble}">
            <p class="${styles.name}">朝阳区</p>
            <p>10套</p>
      </div>`)
        // 覆盖物样式
        // const labelStyle = {
        //   cursor: 'pointer',
        //   border: '0px solid rgb(255, 0, 0)',
        //   padding: '0px',
        //   whiteSpace: 'nowrap',
        //   fontSize: '12px',
        //   color: 'rgb(255, 255, 255)',
        //   textAlign: 'center'
        // }
        label.setStyle({});
        label.addEventListener('click',  () => {
          console.log('覆盖物被点击了');
        })
        map.addOverlay(label);  
    }, dingwei.label);
    

    // // 创建地图实例
    // var map = new BMap.Map("container")
    // 设置中心点坐标
    // var point = new BMap.Point(116.404, 39.915)
    // 地图初始化，同时设置地图展示级别
    // map.centerAndZoom(point, 15);
    */
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


