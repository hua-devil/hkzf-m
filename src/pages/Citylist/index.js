import React, { Component } from 'react'
// import { NavBar, Icon ,Toast } from 'antd-mobile';
import './citylist.scss'
import axios from 'axios'
import { getCurrentCity } from '../../utils/index.js'
import { List,AutoSizer } from 'react-virtualized';
import NavHeader from '../../components/NavHeader'

export default class Citylist extends Component {
  state={
    cityList:{},
    cityindex:[],
    activeIndex:0
  }
  listRef=React.createRef()  //1.创建一个ref  2.去给组件加上ref=listRef  3.this.listRef就是获取得组件
  componentDidMount(){
    // 发送请求获取所有城市数据
    this.getCitylist()
  }
  async getCitylist(){
    let res = await axios.get('http://api-haoke-dev.itheima.net/area/city?level=1') 
    console.log(res)
    let {cityList,cityindex} = this.formatCity(res.data.body)

    // 热门城市  定位城市
    let hotres = await axios.get('http://api-haoke-dev.itheima.net/area/hot') 
    cityList['hot'] = hotres.data.body
    cityindex.unshift('hot')
    // 定位城市，都要用，封装一下，没必要一直调用，调用有限制，第一次到位后存下来，localstorage,后面直接用
    let dingwei = await getCurrentCity()
    console.log('定位城市',dingwei);
    cityList['#'] = [dingwei]
    cityindex.unshift('#')
    // console.log('热门城市',hotres);
    console.log('cityList',cityList);
    console.log('cityindex',cityindex);
    this.setState({
      cityList,
      cityindex
    })
  }
  // 格式化城市列表
  formatCity(list){
    let cityList = {
      // b:[b开头的城市]
    }
    // 循环 城市数组 把单词：城市加到cityList对象中
    list.forEach((item)=>{
      // console.log(item);
      // {label: "新乡", value: "AREA|b1dd9469-8757-dd35", pinyin: "xinxiang", short: "xx"}
      // 拿到开头的单词是b的所有城市放到数组
      // cityList.a   cityList['a']
      // 对象有值就拿值  没有值就是undefined
      let word = item.short.substr(0,1)   //bj
      // if(对象里面有b对应){ 已经有了就追加 }
      if(cityList[word]){
        cityList[word].push(item)
      }else{
        cityList[word] = [item]
      }
    })
    // console.log('修改后',cityList);
    //  Object.keys(对象)   把对象的键拿出来 组成一个新数组返回   需要排序  .sort()
    let cityindex = Object.keys(cityList).sort()
    // console.log('单词列表',cityindex);
    return {cityList,cityindex}
  }
  rowRenderer=({
    key,         // Unique key within array of rows
    index,       // 索引号
    isScrolling, // 当前项是否正在滚动中 true正在滚动
    isVisible,   // 当前项在List中是否可见的 true可 (是否在可视区域)
    style        // 重点属性：一定要给每一个行数添加该样式
  }) => {
    let word = this.state.cityindex[index]
    let citys = this.state.cityList[word]
    // console.log(citys);
    return (
      <div
      key={key}
      style={style}
      className="city">
        <div className="title">{this.formatWord(word)}</div>
        {citys.map((item)=>{
          return <div 
            key={item.value} 
            className="name"
            onClick={()=>{
              let hasHouse=['北京','上海','广州','深圳']
              if(hasHouse.indexOf(item.label)===-1){
                Toast.info('暂无房源', 2);
              }else{
                localStorage.setItem('my-city',JSON.stringify(item))
                this.props.history.push("/home/index")
              }
            }}>
              {item.label}
          </div>
        })}
      </div>
    )
  }
  formatWord=(word)=>{
    // 可以写if
    switch (word){
      case '#':
        return '定位城市'
      case 'hot' :
        return '热门城市'
      default:
        return word.toUpperCase()
    }
  }
  getHeight=({index})=>{
    let word = this.state.cityindex[index]
    let citys = this.state.cityList[word]
    return 36+citys.length*50
  }
  renderWords=()=>{
    return this.state.cityindex.map((item,index)=>{
      return <li key={index} className={this.state.activeIndex===index?'active':''}
      onClick={()=>{
        console.log('点击了',this.listRef.current);
        this.listRef.current.scrollToRow(index)
      }}>
        { item==='hot' ? '热' : item.toUpperCase() }
      </li>
    })
  }
  onRowsRendered=({overscanStartIndex,overscanStopIndex,startIndex,stopIndex})=>{
    // console.log('overscanStartIndex',overscanStartIndex);
    // console.log('overscanStopIndex',overscanStopIndex);
    // console.log('startIndex',startIndex);
    // console.log('stopIndex',stopIndex);
    if(this.state.activeIndex!==startIndex){
      this.setState({
        activeIndex:startIndex
      })
    }
    
  }
  render() {
    return (
      <div className="citylist">
        <NavHeader>地图找房</NavHeader>

        {/* <NavBar 
        className="navbar"
        mode="light"  // dark 深蓝色
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.history.go(-1)}
        >城市选择</NavBar> */}
        <AutoSizer>
          {({height,width})=>(  
            <List
              // 组件的宽度
              width={width}
              // 组件的高度
              height={height}
              rowCount={this.state.cityindex.length}  // 渲染总条数
              // 每行的高度
              rowHeight={this.getHeight}  // 不能写死  需要计算
              rowRenderer={this.rowRenderer} //渲染每行的内容
              onRowsRendered={this.onRowsRendered}
              ref={this.listRef}
              scrollToAlignment='start'
            />)}
        </AutoSizer>
        <ul className="city-index">
          {this.renderWords()}
        </ul>
      </div>
    )
  }
}

