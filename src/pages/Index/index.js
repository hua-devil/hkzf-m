/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
// 导入轮播图
import { Carousel,Flex, WingBlank, Grid } from 'antd-mobile'
// 导入axios 
import axios from 'axios'
import './index.css'
import './index.scss'
// 导入图片   本地的需要引入
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'
// 导入定位
import { getCurrentCity } from '../../utils'
const navs = [{
  id: 0,
  img: nav1,
  title: '整租',
  path: '/home/houselist'
}, {
  id: 1,
  img: nav2,
  title: '合租',
  path: '/home/houselist'
}, {
  id: 2,
  img: nav3,
  title: '地图找房',
  path: '/home/map'
}, {
  id: 3,
  img: nav4,
  title: '去出租',
  path: '/rent/add'
}]
export default class Index extends Component {
  state = {
    swiperData: [],  // 轮播图数组
    imgHeight: 176,  // 图片盒子高度
    ispaly:false,
    groups:[],
    news:[],
    cityName:''
  }
  async componentDidMount() {
    // 页面打开  axios发送请求 获取轮播图数据
    this.getSwiper()
    this.getGroups()
    this.getNews()

    // 根据ip获取定位
    // 方法1
    // function myFun(result){
    //   var cityName = result.name;
    //   alert("当前定位城市:"+cityName);
    // }
    // var myCity = new window.BMap.LocalCity();
    // myCity.get(myFun); 
    // 方法2  回调 改成箭头函数，不然this指向有问题
    // var myCity = new window.BMap.LocalCity();
    // myCity.get((result)=>{
    //   var cityName = result.name;
    //   // alert("当前定位城市:"+cityName);
    //   this.setState({
    //     cityName:cityName
    //   })
    // }); 
    // 使用封装得方法
    let dingwei = await getCurrentCity()
    this.setState({
      cityName:dingwei.label
    })
  }
  async getSwiper(){
    let res = await axios.get('http://api-haoke-dev.itheima.net/home/swiper')
    console.log('轮播图',res)
    this.setState({
      swiperData:res.data.body
    },()=>{
      // 一定设置好 了
      this.setState({
      ispaly:true
      })
    })
  }
  // 获取租房小组
  async getGroups(){
    let res = await axios.get('http://api-haoke-dev.itheima.net/home/groups?area=AREA%7C88cff55c-aaa4-e2e0')
    console.log('租房小组数据',res);
    if(res.data.status===200){
      this.setState({
        groups:res.data.body
      })
    }
  }
  // 获取最新资讯
  async getNews(){
    let res = await axios.get('http://api-haoke-dev.itheima.net/home/news?area=AREA%7C88cff55c-aaa4-e2e0')
    console.log('最新资讯',res);
    if(res.data.status===200){
      this.setState({
        news:res.data.body
      })
    }
  }
  renderSwiper(){
    return this.state.swiperData.map(val => (
      <a
        key={val.id}
        href="http://www.itcast.cn"
        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
      >
        <img
          src={`http://api-haoke-dev.itheima.net${val.imgSrc}`}
          alt=""
          style={{ width: '100%', verticalAlign: 'top' }}
          onLoad={() => {
            // fire window resize event to change height
            window.dispatchEvent(new Event('resize'));
            this.setState({ imgHeight: 'auto' });
          }}
        />
      </a>
    ))
  }
  renderNavs(){
    return navs.map((item)=>{
      return <Flex.Item key={item.id} 
      onClick={()=>this.props.history.push(item.path)}>
        <img src={item.img} alt=""/>
        <p>{item.title}</p>
      </Flex.Item>
    })
  }
  renderNews(){
    return this.state.news.map((item)=>{
      return <li key={item.id}>
        <div className="news-left">
          <img src={`http://api-haoke-dev.itheima.net${item.imgSrc}`} />
        </div>
        <div className="news-right">
          <h3>{item.title}</h3>
          <div className="time">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </div>
        </div>
      </li>
    })
  }
  render() {
    return (
      <div className="index">
        {/* 搜索栏部分 */}
        <Flex className='searchBox'>
            <Flex className='searchLeft'>
                <div
                className='location'
                onClick={()=>{
                  this.props.history.push("/citylist")
                }}
                >
                {this.state.cityName}
                <i className="iconfont icon-arrow" />
                </div>
                <div
                className='searchForm'
                >
                    <i className="iconfont icon-seach" />
                    请输入小区或地址
                </div>
            </Flex>
            <i className="iconfont icon-map" 
             onClick={()=>{
              this.props.history.push("/map")
             }} />
        </Flex>
        {/* 轮播图  使用框架 
        WingBlank 两边留白  去掉
        */}
        <Carousel
          autoplay={this.state.ispaly}  // 是否自动切换  false不切换
          infinite  // 是否循环滚动
          // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          // afterChange={index => console.log('slide to', index)}
        >
          {this.renderSwiper()}
        </Carousel>
        {/* 整租合租  flex大盒子   图片http的可以显示  本地的图片默认不显示*/}
        <Flex className="navs">
          {this.renderNavs()}
        </Flex>
        {/* 租房小组 */}
        <div className='groups'>
          {/* 标题 */}
          <div className='groups-title'>
            <h2>租房小组</h2>
            <p>更多</p>
          </div>
          {/* 内容部分 自己写的 */}
          <div className='groups-content'>
            {/* <div className='item'>
              家住回龙观
            </div>
            <div className='item'>
              家住回龙观
            </div>
            <div className='item'>
              家住回龙观
            </div>
            <div className='item'>
              家住回龙观
            </div> */}
          </div>
          {/* 内容部分 自己写的 框架 */}
          {/* 内容部分 groups 思想数据  一行占两个 那个格子的内容 */}
          {/* Grid 棒外面循环data的数组  columnNum 每行占几个  默认四个 
          renderItem  自定义创建买个各自的内容 函数 一个数据 执行一次
          */}
          <Grid
          data={this.state.groups}  //数组
          columnNum={2}   // 每行个数
          square={false}   //是否为正方形
          activeStyle={true}   //是否点击显示黑色
          hasLine={false}   //是否有边框
          renderItem={item => (
            <Flex className="grid-item" justify="between">
              <div className="desc">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <img src={`http://api-haoke-dev.itheima.net${item.imgSrc}`} alt="" />
            </Flex>
          )}
          />
        </div>
        {/* 最新资讯 */}
        <div className='news'>
          <h3>最新资讯</h3>
          <ul>
            {this.renderNews()}
          </ul>
        </div>
      </div>
    )
  }
}