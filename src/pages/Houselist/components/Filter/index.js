import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'
import {API} from '../../../../utils/api'
import styles from './index.module.css'
import { getCurrentCity } from '../../../../utils/index'

// 数据要写在父组件  四个都要判断
const titleStatus = {
  area:false,
  mode:false,
  price:false,
  more:false
}
export default class Filter extends Component {
  state={
    titleSelectedStatus:titleStatus,
    openType:'',
    filterData:[]
  }
  componentDidMount(){
    this.getFilterData()
  }
  async getFilterData(){
    let dingwei = await getCurrentCity()
    let res = await API.get('/houses/condition?id='+dingwei.value)
    console.log("筛选数据",res)
    this.setState({
      filterData:res.data.body
    })
  }
  onTitltClick=(type)=>{
    console.log('执行了filter',type);
    this.setState({
      titleSelectedStatus:{
        ...titleStatus,
        [type]:true  //属性是变量可以加中括号
      },
      openType:type
    })
  }
  // 父  点击取消得函数
  onCancel=()=>{
    console.log('取消');
    this.setState({
      openType:''
    })
  }
  // 父  点击确定得函数
  onSave=(value)=>{
    console.log('确认的value值',value);
    this.setState({
      openType:''
    })
  }
  renderPicker=()=>{
    let {openType} = this.state
    if(openType==='area'||openType==='mode'||openType==='price'){
      let {area,subway,rentType,price} = this.state.filterData
      let data=[]
      let cols=3
      // eslint-disable-next-line default-case
      switch(openType){
        case 'area' :
          data=[area,subway]
          cols=3
          break;
        case 'mode':
          data=rentType
          cols=1
          break;
        case 'price':
          data=price
          cols=1
          break;
      }
      return <FilterPicker cols={cols} data={data} onCancel={this.onCancel} onSave={this.onSave} />
    }else{
      return null
    }
  }
  renderMask=()=>{
    let {openType} = this.state
    if(openType==='area'||openType==='mode'||openType==='price'){
      return <div className={styles.mask} />
    }else{
      return null
    }
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {this.renderMask()}
        {/* <div className={styles.mask} /> */}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle titleSelectedStatus={this,this.state.titleSelectedStatus} onTitltClick={this.onTitltClick} />

          {/* 前三个菜单对应的内容： */}
          {this.renderPicker()}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
